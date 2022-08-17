import moment from "moment";
import { DiffPropsType, DiffCalcsType } from "../types/utils/calcDaysDiff";

const calcDaysDiffData = ({
  startDate,
  endDate
}: DiffPropsType): DiffCalcsType => {
  const momentStart = moment(startDate, "YYYY-MM-DD");
  const momentEnd = moment(endDate, "YYYY-MM-DD");
  const dailyLogins = momentEnd.diff(momentStart, "days");
  const masterMissions = (dailyLogins / 7) * 3;
  console.log(startDate);
  console.log(endDate);
  return { masterMissions, dailyLogins };
};

export default calcDaysDiffData;
