import { StopsType, TripsType } from "./types";

const fs = require("fs");
const path = require("path");
const csvParse = require("csv-parse");

const dname =
  process.env.NODE_ENV === "dev"
    ? __dirname + "/mta-data/"
    : "node_modules/js-mta/dist/mta-data/";

export default class MTA {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  stops(): Promise<StopsType> {
    const stops = fs.readFileSync(path.resolve(dname, "stops.txt"));

    return new Promise((resolve, reject) => {
      csvParse(
        stops,
        {
          columns: true,
          objname: "stop_id"
        },
        (err: string, data: any) => {
          if (err) return reject(err);

          return resolve(data);
        }
      );
    });
  }

  trips(): Promise<TripsType> {
    const trips = fs.readFileSync(path.resolve(dname, "trips.txt"));

    return new Promise((resolve, reject) => {
      csvParse(
        trips,
        {
          columns: true,
          objname: "trip_id"
        },
        (err: string, data: any) => {
          if (err) return reject(err);

          return resolve(data);
        }
      );
    });
  }
}

new MTA("123").trips().then(console.log);
