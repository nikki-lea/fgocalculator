import { ExcludeOptions } from "../contexts";
import { TotalSQProps } from "../types/utils/calcTotalSQForDate";
import calcCumulativeLoginSQ from "./calcCumulativeLoginSQ";
import calcDaysDiffData from "./calcDaysDiffData";
import calcShopTicketSQ from "./calcShopTicketSQ";

const calcTotalSQForDate = ({
  excludeOptions,
  cumulativeLoginsCount,
  currentTickets,
  monthlyShopTickets,
  startDate,
  endDate,
  questSQ,
  currentSQ
}: TotalSQProps) => {
  const { masterMissions, dailyLogins, dailyLoginTickets, eventSQ } =
    calcDaysDiffData({ startDate, endDate });

  const cumulativeLoginsSQ = calcCumulativeLoginSQ(
    cumulativeLoginsCount,
    dailyLogins
  );

  const shopTicketSQ = calcShopTicketSQ({
    startDate,
    endDate,
    monthlyShopTickets
  });
  const totalSQForBanner =
    (excludeOptions?.has(ExcludeOptions.loginBonuses)
      ? 0
      : cumulativeLoginsSQ) +
    currentSQ +
    (excludeOptions?.has(ExcludeOptions.tickets) ? 0 : 3 * currentTickets) +
    (excludeOptions?.has(ExcludeOptions.masterMissions) ? 0 : masterMissions) +
    (!excludeOptions?.has(ExcludeOptions.loginBonuses) &&
    !excludeOptions?.has(ExcludeOptions.tickets)
      ? dailyLoginTickets * 7
      : 0) +
    (!excludeOptions?.has(ExcludeOptions.loginBonuses) &&
    excludeOptions?.has(ExcludeOptions.tickets)
      ? dailyLoginTickets * 4
      : 0) +
    (excludeOptions?.has(ExcludeOptions.tickets) ? 0 : shopTicketSQ) +
    questSQ +
    (excludeOptions?.has(ExcludeOptions.events) ? 0 : eventSQ);
  return totalSQForBanner;
};

export default calcTotalSQForDate;
