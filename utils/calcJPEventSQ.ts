import moment from "moment";
import { JPEventPropsType } from "../types/utils/calcJPEventSQ";
import EventSQData from "../data/events";

const calcJPEventSQ = ({ startDate, endDate }: JPEventPropsType): number => {
  if (!startDate || !endDate) {
    return 0;
  }
  let eventSQ = 0;
  const momentStart = moment(startDate, "YYYY-MM-DD");
  const momentEnd = moment(endDate, "YYYY-MM-DD");
  const dailyLogins = momentEnd.diff(momentStart, "days");
  for (let i = 0; i < dailyLogins; i++) {
    momentStart.add(1, "days");
    const month = momentStart.month() + 1;
    const day = momentStart.day();
    const year = momentStart.year();
    const dateString = `${year}-${month}-${day}`;
    if (EventSQData[dateString]) {
      eventSQ = eventSQ + EventSQData[dateString];
    }
  }
  return eventSQ;
};

export default calcJPEventSQ;
