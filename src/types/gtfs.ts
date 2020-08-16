export const enum Occupancy {
  EMPTY,
  MANY_SEATS_AVAILABLE,
  FEW_SEATS_AVAILABLE,
  STANDING_ROOM_ONLY,
  CRUSHED_STANDING_ROOM_ONLY,
  FULL,
  NOT_ACCEPTING_PASSENGERS,
  UNKNOWN = -1
}
export const enum Congestion {
  UNKNOWN_CONGESTION_LEVEL,
  RUNNING_SMOOTHLY,
  STOP_AND_GO,
  CONGESTION,
  SEVERE_CONGESTION
}

declare interface Time {
  delay: number;
  time: number;
  uncertainty: number;
}

interface RealTimeTrip {
  tripId: string;
  startTime: string;
  startDate: string;
  scheduleRelationship: number;
  routeId: string;
  directionId: number;
}
interface Vehicle {
  id: string;
  label: string;
  licensePlate: string;
}

export interface TripUpdate {
  trip: RealTimeTrip;
  stopTimeUpdate?: {
    stopSequence: number;
    arrival?: Time;
    departure?: Time;
    stopId: string;
    scheduleRelationship: number;
  };
  vehicle: Vehicle;
  timestamp: number;
  delay: number;
}
export interface VehicleUpdate {
  trip: RealTimeTrip;
  position?: {
    latitude: number;
    longitude: number;
    bearing: string;
    odometer: number;
    speed: number;
  };
  occupancyStatus?: Occupancy;
  vehicle: Vehicle;
  timestamp: number;
}
export interface Entity {
  id: string;
  tripUpdate?: TripUpdate;
  vehicle?: VehicleUpdate;
  isDeleted: boolean;
}

export interface GTFSRealtime {
  status: string;
  response: {
    header: {
      timestamp: number;
      gtfsRealtimeVersion: string;
      incrementality: number;
    };
    entity: Entity[];
  };
}
