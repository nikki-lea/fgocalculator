import "@testing-library/jest-dom";
import calcDaysDiffData from "../utils/calcDaysDiffData";

describe("calcDaysDiffData", () => {
  it("handles missing start date", () => {
    const result = calcDaysDiffData({ startDate: "", endDate: "" });
    expect(result.dailyLogins).toEqual(0);
    expect(result.masterMissions).toEqual(0);
  });

  it("calculates master mission SQ and daily login count", () => {
    const result = calcDaysDiffData({
      startDate: "2022-9-15",
      endDate: "2022-12-14"
    });
    expect(result.dailyLogins).toEqual(90);
    expect(result.masterMissions).toEqual(39);
  });
});
