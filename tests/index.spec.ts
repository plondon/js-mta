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

  describe("shapes()", () => {
    it("reads and parses shapes", async () => {
      expect.assertions(2);
      const shapes = await mta.shapes().then();

      expect(shapes["SI.S31R"].shape_pt_lon).toBe("-74.251961");
      expect(shapes["SI.S31R"].shape_pt_lat).toBe("40.512764");
    });
  });
});
