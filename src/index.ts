import {
  GTFSRealtime,
  TripUpdate,
  StopsType,
  TripsType,
  ObjNameType,
  FileNameType,
  ShapesType,
  StopTimeEvent,
  RouteType
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
    file: FileNameType,
    objname?: ObjNameType
  ): Promise<StopsType & TripsType & ShapesType> {
    const data = fs.readFileSync(path.resolve(dname, file));

    return new Promise((resolve, reject) => {
      csvParse(
        data,
        objname ? {
          columns: true,
          objname
        } : {},
        (err: string, data: any) => {
          if (err) return reject(err);

          return resolve(data);
        }
      );
    });
  }

  stops(): Promise<StopsType> {
    return this.getDataFromTxt("stops.txt", "stop_id");
  }

  trips(): Promise<TripsType> {
    return this.getDataFromTxt("trips.txt", "trip_id");
  }

  shapes(): Promise<ShapesType> {
    return this.getDataFromTxt("shapes.txt");
  }

  getNextScheduledArrival(GTFS: GTFSRealtime["response"], stopId: StopIdType) {
    const nextScheduledArrivals = this.getSchedule(GTFS, stopId)
    const time = nextScheduledArrivals[0]?.time.low
    
    if (!time) return 'No scheduled arrival time.'

    return new Date(time * 1000)
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

  async getStopsForRoute (route: RouteType) {
    const allStops = await this.stops()
    const allShapes = await this.shapes()
    const shapesForRoute = allShapes.filter((val) => val[0].split('..')[0] === route)
    const latlngs = shapesForRoute.map((val) => [val[1], val[2]])
    const stops = Object.keys(allStops).filter((stopId) => {
      const latMatch = latlngs.some((val) => val[0] === allStops[stopId as StopIdType].stop_lat)
      const lngMatch = latlngs.some((val) => val[1] === allStops[stopId as StopIdType].stop_lon)

      return latMatch && lngMatch
    })
    
    return stops
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
