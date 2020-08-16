import MTA from "../src/index";

const mta = new MTA("apiKey");

describe("stops()", () => {
  it("reads and parses stops", async () => {
    expect.assertions(1);
    const stops = await mta.stops().then();

    expect(stops["S31S"].stop_id).toBe("S31S");
  });
});
