import { StopsType } from "./types";

const fs = require("fs");
const path = require("path");
const csvParse = require("csv-parse");

const dname =
  process.env.NODE_ENV === "dev" ? __dirname + '/./' : "node_modules/js-mta/build/";

export default class MTA {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  stops(): Promise<StopsType> {
    const stops = fs.readFileSync(path.resolve(dname, "mta-data/stops.txt"));

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
}

console.log(new MTA('123').stops())