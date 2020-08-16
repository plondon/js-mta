import {
  GTFSRealtime,
  TripUpdate,
  StopsType,
  TripsType,
  ObjNameType,
  FileNameType,
  ShapesType,
  StopTimeEvent
} from "./types";
import request from "request";
import { StopIdType } from "./types/stops";

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

  getSchedule(GTFS: GTFSRealtime["response"], stopId: StopIdType) {
    const schedule: Array<StopTimeEvent | undefined> = []
    
    GTFS.entity.map(entity => {
      if (!entity.tripUpdate) return;

      // @ts-ignore
      const stopTimeUpdates: Array<TripUpdate["stopTimeUpdate"]> =
        entity.tripUpdate.stopTimeUpdate;

      stopTimeUpdates.forEach((stu) => {
        if (stu?.stopId.includes(stopId)) {
          schedule.push(stu.arrival)
        }
      })
    });

    return schedule
  }

  getNextScheduledArrival(GTFS: GTFSRealtime["response"], stopId: StopIdType) {
    const nextScheduledArrivals = this.getSchedule(GTFS, stopId)
    const time = nextScheduledArrivals[0]?.time.low
    
    if (!time) return 'No scheduled arrival time.'

    return new Date(time * 1000)
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
