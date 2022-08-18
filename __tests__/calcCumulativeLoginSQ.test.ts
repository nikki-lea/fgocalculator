import "@testing-library/jest-dom";
import "../utils/calcCumulativeLoginSQ";
import calcCumulativeLoginSQ from "../utils/calcCumulativeLoginSQ";

describe("calcCumulativeLogin", () => {
  it("handles 50 initial logins", () => {
    const result = calcCumulativeLoginSQ(0, 55);
    expect(result).toEqual(20);
  });
  it("handles 80 initial logins", () => {
    const result = calcCumulativeLoginSQ(0, 80);
    expect(result).toEqual(30);
  });
  it("handles inital 100 cumulative logins", () => {
    const result = calcCumulativeLoginSQ(80, 30);
    expect(result).toEqual(30);
  });
  it("handles 160 logins total", () => {
    const result = calcCumulativeLoginSQ(105, 55);
    expect(result).toEqual(30);
  });
  it("handles 260 logins total", () => {
    const result = calcCumulativeLoginSQ(105, 155);
    expect(result).toEqual(90);
  });
});
