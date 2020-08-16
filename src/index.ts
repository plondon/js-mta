import {
  StopsType,
  TripsType,
  ObjNameType,
  FileNameType,
  ShapesType
} from "./types";

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
          objname: objname
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
}

new MTA("123").shapes().then(console.log);
