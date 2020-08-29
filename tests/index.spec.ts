import MTA from "../src/index";
import { getDataFeedUrlFromRoute } from "../src/model";
import { RouteType } from "../src/types";
import { StopIdType } from "../src/types/stops";

const mta = new MTA(process.env.MTA_API_KEY || "");

describe("MTA", () => {
  describe("stops()", () => {
    it("reads and parses stops", async () => {
      expect.assertions(1);
      const stops = await mta.stops().then();

      expect(stops["S31S"].stop_id).toBe("S31S");
    });
  });

  describe("trips()", () => {
    it("reads and parses trips", async () => {
      expect.assertions(1);
      const trips = await mta.trips().then();

      expect(
        trips["SIR-FA2017-SI017-Sunday-00_147100_SI..N03R"].trip_headsign
      ).toBe("St George");
    });
  });

  describe("shapes()", () => {
    it("reads and parses shapes", async () => {
      expect.assertions(2);
      const shapes = await mta.shapes().then();

      expect(shapes[100][1]).toEqual("40.729283");
      expect(shapes[200][2]).toEqual("-73.967929");
    });
  });

  describe("getRealTimeFeed()", () => {
    it("fetches and parses realtime feed", async () => {
      const rtf = await mta
        .getRealTimeFeed(
          "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace"
        )
        .then();

      expect(rtf.entity).toBeDefined();
    });
  });

  describe("getSchedule()", () => {
    it("gets arrival times", async () => {
      const rtf = await mta
        .getRealTimeFeed(
          "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g"
        )
        .then();

      const schedule = mta.getSchedule(rtf, "G35");

      expect(schedule[0]).toBeDefined();
    });
  });

  describe("nextScheduledArrivalTime()", () => {
    it("gets next arrival time", async () => {
      const rtf = await mta
        .getRealTimeFeed(
          "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g"
        )
        .then();

      const nextArrivalTime = mta.getNextScheduledArrival(rtf, "G35");
      expect(nextArrivalTime).toBeDefined();
    });
  });

  describe("getStopsForRoute()", () => {
    it("gets all stop_id's for a route", async () => {
      const route = "A";
      const stops = await mta.getStopsForRoute(route);

      expect(stops.length).toBe(177);
    });
  });

  describe("getDataFeedUrlFromRoute()", () => {
    it("gets data feed url for route", async () => {
      const route = "1";
      const url = getDataFeedUrlFromRoute(route);

      const stops = await mta.stops()
      const rtf = await mta.getRealTimeFeed(url);
      const stopsForRoute = await mta.getStopsForRoute(route);

      const times = stopsForRoute.map((stopId) => {
        const nextArrivalTime = mta.getNextScheduledArrival(rtf, stopId as StopIdType);
        return [stops[stopId as StopIdType].stop_name, new Date(nextArrivalTime).toString()];
      });

      console.log(times);

      expect(url).toBe(
        "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"
      );
    });
  });
});
