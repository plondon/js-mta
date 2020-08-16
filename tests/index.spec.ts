import MTA from "../src/index";

const mta = new MTA("apiKey");

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
});
