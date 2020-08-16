export type StopsType = {
  [stop_id: string]: {
    stop_id: string;
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
