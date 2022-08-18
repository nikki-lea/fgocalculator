import "@testing-library/jest-dom";
import calcShopTicketSQ from "../utils/calcShopTicketSQ";

describe("calcShopTicketSQ", () => {
  it("handles 5 shop tickets purchased monthly", () => {
    const result = calcShopTicketSQ({
      startDate: "2022-09-15",
      endDate: "2022-12-14",
      monthlyShopTickets: 5
    });
    expect(result).toEqual(30);
  });

  it("handles 0 shop tickets purchased monthly", () => {
    const result = calcShopTicketSQ({
      startDate: "2022-09-15",
      endDate: "2022-12-14",
      monthlyShopTickets: 0
    });
    expect(result).toEqual(0);
  });
});
