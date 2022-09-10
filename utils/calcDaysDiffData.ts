import moment from "moment";
import { DiffPropsType, DiffCalcsType } from "../types/utils/calcDaysDiffData";

const calcDaysDiffData = ({
  startDate,
  endDate
}: DiffPropsType): DiffCalcsType => {
  if (!startDate || !endDate) {
    return { masterMissions: 0, dailyLogins: 0, dailyLoginTickets: 0 };
  }
  const momentStart = moment(startDate, "YYYY-MM-DD");
  const momentEnd = moment(endDate, "YYYY-MM-DD");
  const dailyLogins = momentEnd.diff(momentStart, "days");
  const dailyLoginTickets = momentEnd.diff(momentStart, "weeks");
  const masterMissions = Math.round((dailyLogins / 7) * 3);
  return { masterMissions, dailyLogins, dailyLoginTickets };
};

export default calcDaysDiffData;
