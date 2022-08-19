import moment from "moment";
import { JPEventPropsType, YearsRangeType } from "../types/utils/calcJPEventSQ";

const buildEventTimeRanges = ({
  startDate,
  endDate
}: JPEventPropsType): YearsRangeType => {
  const momentStart = moment(startDate, "YYYY-MM-DD");
  const momentEnd = moment(endDate, "YYYY-MM-DD");
  let rangeData = [
    {
      [momentStart.year()]: {
        [momentStart.month()]: [momentStart.date(), momentEnd.date()]
      }
    }
  ];
  // Savings start and end in the same year
  if (momentStart.year() === momentEnd.year()) {
    // Savings are within the month
    if (momentStart.month() !== momentEnd.month()) {
      rangeData = [
        {
          [momentStart.year()]: {
            [momentStart.month()]: [momentStart.date(), 31],
            [momentEnd.month()]: [1, momentEnd.date(), 31]
          }
        }
      ];
    }
    return rangeData;
  } else {
    // Year one is only one month in december
    let yearOneData = {
      [momentStart.year()]: {
        [momentStart.month()]: [momentStart.date(), 31]
      }
    };

    //2nd year spans more than one month
    let yearTwoData = {
      [momentEnd.year()]: {
        1: [1, 31],
        [momentEnd.month()]: [1, momentEnd.date()]
      }
    };

    // Years are different
    if (1 + momentStart.month() < 12) {
      // Starting year spans multiple months, end on the last day of december
      yearOneData[momentStart.year()] = {
        ...yearOneData[momentStart.year()],
        12: [1, 31]
      };
    }

    if (1 + momentEnd.month() === 1) {
      // 2nd year spans only one month
      yearTwoData[momentEnd.year()] = {
        ...yearTwoData[momentEnd.year()],
        1: [1, momentEnd.date()]
      };
    }
    return [yearOneData, yearTwoData];
  }
};

const calcJPEventSQ = ({ startDate, endDate }: JPEventPropsType): number => {
  if (!startDate || !endDate) {
    return 0;
  }
  return 0;
};

export default calcJPEventSQ;
