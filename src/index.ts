import {
  GTFSRealtime,
  TripUpdate,
  StopsType,
  TripsType,
  ObjNameType,
  FileNameType,
  ShapesType
} from "./types";
import request from "request";

const fs = require("fs");
const path = require("path");
const csvParse = require("csv-parse");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");

const dname =
  process.env.NODE_ENV === "dev"
    ? __dirname + "/mta-data/"
    : "node_modules/js-mta/dist/mta-data/";

export default class MTA {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getDataFromTxt(
    objname: ObjNameType,
    file: FileNameType
  ): Promise<StopsType & TripsType & ShapesType> {
    const data = fs.readFileSync(path.resolve(dname, file));

    return new Promise((resolve, reject) => {
      csvParse(
        data,
        {
          columns: true,
          objname
        },
        (err: string, data: any) => {
          if (err) return reject(err);

          return resolve(data);
        }
      );
    });
  }

  stops(): Promise<StopsType> {
    return this.getDataFromTxt("stop_id", "stops.txt");
  }

  trips(): Promise<TripsType> {
    return this.getDataFromTxt("trip_id", "trips.txt");
  }

  shapes(): Promise<ShapesType> {
    return this.getDataFromTxt("shape_id", "shapes.txt");
  }

  getSchedule(GTFS: GTFSRealtime["response"], stopId: string) {
    const obj: {[x: string]: any} = {}
    
    GTFS.entity.map(entity => {
      console.log(entity)
      if (!entity.tripUpdate) return;

      // @ts-ignore
      const stopTimeUpdates: Array<TripUpdate["stopTimeUpdate"]> =
        entity.tripUpdate.stopTimeUpdate;

      stopTimeUpdates.forEach((stu) => {
        console.log(stu)
        if (stu?.stopId.includes(stopId)) {
          obj[stopId] = stu.arrival
        }
      })
    });

    return obj
  }

  getRealTimeFeed(url: string): Promise<GTFSRealtime["response"]> {
    const requestSettings = {
      headers: { "x-api-key": this.apiKey },
      method: "GET",
      url,
      encoding: null
    };

    return new Promise((resolve, reject) => {
      request(requestSettings, (error, response) => {
        if (error) {
          reject(error);
        }

        if (response && response.statusCode === 200) {
          const feed: GTFSRealtime["response"] = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
            response.body
          );
          return resolve(feed);
        }

        reject("Invalid response code");
      });
    });
  }
}
