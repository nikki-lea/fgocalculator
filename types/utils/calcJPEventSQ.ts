export type JPEventPropsType = {
  startDate: string;
  endDate: string;
};

export type TimeRangeType = {
  [year: number]: {
    [monthData: number]: number[];
  };
};

export type YearsRangeType = TimeRangeType[];
