import dayjs from 'dayjs';

export const getFirstDateAndLastDateOfCalendar = (date) => {
  const startWeek = date.startOf('month').week();
  const endWeek = date.endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week();
  const firstDate = date.week(startWeek).startOf('week').format('YYYY-MM-DD');
  const lastDate = date.week(endWeek).endOf('week').format('YYYY-MM-DD');

  return [firstDate, lastDate];
};

export const filterPlansOfMonth = (date, planArray) => {
  const [firstDate, lastDate] = getFirstDateAndLastDateOfCalendar(date);
  let sortedPlan = [];

  if (planArray && planArray.length) {
    sortedPlan = planArray.filter((plan) => {
      const { startDate, endDate } = plan;

      const isStartDateInDisplay = startDate >= firstDate && startDate <= lastDate;
      const isEndDateInDisplay = endDate >= firstDate && endDate <= lastDate;
      const isIncludeMonth = startDate < firstDate && endDate > lastDate;

      return isStartDateInDisplay || isEndDateInDisplay || isIncludeMonth;
    });
  }

  return sortedPlan;
};

export const makeMarkingInfoObj = (firstDateOfCalendar, displayPlans = []) => {
  const markingInfoObj = {};

  if (displayPlans.length) {
    displayPlans.forEach((plan) => {
      const { startDate, days } = plan;

      const dayOfTheWeekOfTheStartDate = dayjs(startDate).day();

      let countDates = days; // 그려야할 여행일 수 카운트
      let startDateOfMarkingBar = startDate; // 마킹바가 그려질 시작날짜

      // 주 내에서 마킹바가 그려질 길이
      let numberOfDatesToRender =
        7 - dayOfTheWeekOfTheStartDate >= countDates ? countDates : 7 - dayOfTheWeekOfTheStartDate;

      while (countDates > 0) {
        markingInfoObj[startDateOfMarkingBar] = { ...plan, numberOfDatesToRender };
        if (startDateOfMarkingBar === startDate) {
          markingInfoObj[startDateOfMarkingBar].start = true;
        }
        if (startDateOfMarkingBar === firstDateOfCalendar) {
          markingInfoObj[startDateOfMarkingBar].fromPrevMonth = true;
        }
        countDates -= numberOfDatesToRender;
        if (countDates === 0) markingInfoObj[startDateOfMarkingBar].end = true;
        startDateOfMarkingBar = dayjs(startDateOfMarkingBar).add(numberOfDatesToRender, 'day').format('YYYY-MM-DD');
        numberOfDatesToRender = 7 > countDates ? countDates : 7;
      }
    });
  }

  return markingInfoObj;
};

export const checkTrophyInfo = (planArray) => {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const beforeTripObj = {};

  for (let i = 0; i < planArray.length; i++) {
    const plan = planArray[i];

    if (plan.endDate <= today) {
      if (plan.region === 'overseas') {
        continue;
      }
      beforeTripObj[plan.region] = beforeTripObj[plan.region] ? beforeTripObj[plan.region] + 1 : 1;
    } else {
      break;
    }
  }

  const regionCount = Object.values(beforeTripObj).length;
  const tripCount = Object.values(beforeTripObj).reduce((acc, cur) => acc + cur, 0);
  const isOwner = regionCount === 17;

  return { isOwner, tripCount };
};
