import "@testing-library/jest-dom";
import calcJPEventSQ from "../utils/calcJPEventSQ";

describe("calcJPEventSQ", () => {
  it("handles missing start date", () => {
    const result = calcJPEventSQ({ startDate: "", endDate: "" });
    expect(result).toEqual(0);
  });

  it("calculates event SQ for an interval within a year but on different months", () => {
    const result = calcJPEventSQ({
      startDate: "2022-9-15",
      endDate: "2022-12-14"
    });
    expect(result).toEqual(166);
  });
});
