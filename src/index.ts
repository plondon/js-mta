import { StopsType } from "./types";

const fs = require("fs");
const path = require("path");
const csvParse = require("csv-parse");

export default class MTA {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  stops(): Promise<StopsType> {
    // @ts-ignore
    const stops = fs.readFileSync(path.join(__dirname, "./mta-data/stops.txt"));

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
