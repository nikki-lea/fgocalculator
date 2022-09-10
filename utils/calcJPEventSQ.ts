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
  const monthsCount = momentEnd.diff(momentStart, "months");
  for (let i = 0; i < monthsCount + 2; i++) {
    const month = momentStart.month() + 1;
    const year = momentStart.year();
    const monthString = month < 10 ? `0${month}` : month;
    const dateString = `${year}-${monthString}`;
    if (EventSQData[dateString]) {
      eventSQ = eventSQ + EventSQData[dateString];
    }
    momentStart.add(1, "months");
  }
  return eventSQ;
};

export default calcJPEventSQ;
