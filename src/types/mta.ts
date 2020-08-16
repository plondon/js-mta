import { StopIdType } from "./stops";

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
  };
};

export type TripsType = {
  [trip_id: string]: {
    route_id: string;
    service_id: string;
    trip_id: string;
    trip_headsign: string;
    direction_id: string;
    block_id: string;
    shape_id: string;
  };
};

export type ShapesType = {
  [shape_id: string]: {
    shape_id: string;
    shape_pt_lat: string;
    shape_pt_lon: string;
    shape_pt_sequence: string;
    shape_dist_traveled: string;
  };
};

export type ObjNameType = "stop_id" | "trip_id" | "shape_id";
export type FileNameType =
  | "shapes.txt"
  | "stop_times.txt"
  | "stops.txt"
  | "trips.txt";
