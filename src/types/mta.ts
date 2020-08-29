import { StopIdType } from "./stops";

export type RouteType =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "J"
  | "L"
  | "M"
  | "N"
  | "Q"
  | "R"
  | "W"
  | "Z"
  | "SIR";

type ShapeLat = string;
type ShapeLng = string;
export type ShapesType = Array<[string, ShapeLat, ShapeLng, string, ""]>;

export type StopsType = {
  [key in StopIdType]: {
    stop_id: StopIdType;
    stop_code: string;
    stop_name: string;
    stop_desc: string;
    stop_lat: string;
    stop_lon: string;
    zone_id: string;
    stop_url: string;
    location_type: string;
    parent_station: string;
  }
};

export type TripsType = {
  [trip_id: string]: {
    route_id: RouteType;
    service_id: string;
    trip_id: string;
    trip_headsign: string;
    direction_id: string;
    block_id: string;
    shape_id: string;
  };
};

export type ObjNameType = "stop_id" | "trip_id" | "shape_id";
export type FileNameType =
  | "shapes.txt"
  | "stop_times.txt"
  | "stops.txt"
  | "trips.txt";
