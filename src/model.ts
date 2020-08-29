import { RouteType } from "./types";

export function getDataFeedUrlFromRoute(line: RouteType): string {
  switch (line) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
      return "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs";
    case "7":
      return "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-7";
    case "A":
    case "C":
    case "E":
      return "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace";
    case "B":
    case "D":
    case "F":
    case "M":
      return "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm";
    case "G":
      return "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g";
    case "J":
    case "Z":
      return "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz";
    case "N":
    case "Q":
    case "R":
    case "W":
      return "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw";
    case "L":
      return "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs";
    case "SIR":
      return "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-si";
  }
}
