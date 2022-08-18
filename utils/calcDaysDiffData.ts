import moment from "moment";
import { DiffPropsType, DiffCalcsType } from "../types/utils/calcDaysDiffData";

const calcDaysDiffData = ({
  startDate,
  endDate
}: DiffPropsType): DiffCalcsType => {
  if (!startDate || !endDate) {
    return { masterMissions: 0, dailyLogins: 0 };
  }
  const momentStart = moment(startDate, "YYYY-MM-DD");
  const momentEnd = moment(endDate, "YYYY-MM-DD");
  console.log(momentStart.month());
  console.log(momentStart.year());
  const dailyLogins = momentEnd.diff(momentStart, "days");
  const masterMissions = Math.round((dailyLogins / 7) * 3);
  return { masterMissions, dailyLogins };
};

export default calcDaysDiffData;
