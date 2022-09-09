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
  const monthsCount = momentEnd.diff(momentStart, "month");
  for (let i = 0; i < monthsCount; i++) {
    momentStart.add(1, "month");
    const month = momentStart.month() + 1;
    const year = momentStart.year();
    const monthString = month < 10 ? `0${month}` : month;
    const dateString = `${year}-${monthString}`;
    console.log(dateString);
    if (EventSQData[dateString]) {
      eventSQ = eventSQ + EventSQData[dateString];
    }
  }
  return eventSQ;
};

export default calcJPEventSQ;
