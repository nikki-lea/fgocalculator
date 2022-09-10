import "@testing-library/jest-dom";
import calcProbability from "../utils/calcProbability";

describe("calcProbability", () => {
  it("calculates the right probability for a 5 star servant", () => {
    const result = calcProbability({ sq: 1170, rarity: 5, type: "SERVANT" });
    expect(result).toEqual(97);
  });

  it("calculates the right probability for a 4 star servant", () => {
    const result = calcProbability({ sq: 510, rarity: 4, type: "SERVANT" });
    expect(result).toEqual(94);
  });

});
