import dayjs from 'dayjs';

export const getStartAndEndDateOfDisplay = (date) => {
  const startWeek = date.startOf('month').week();
  const endWeek = date.endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week();
  const startOfMonth = date.week(startWeek).startOf('week').format('YYYY-MM-DD');
  const endOfMonth = date.week(endWeek).endOf('week').format('YYYY-MM-DD');

  return [startOfMonth, endOfMonth];
};

export const makeMarkingInfoObj = (startOfMonth, displayPlans = []) => {
  const markingInfoObj = {};

  if (displayPlans.length) {
    displayPlans.forEach((plan) => {
      const { startDate, days } = plan;

      let RemainingDatesOfRender = days;
      let startDateOfRender = startDate;
      let firstDayOfWeek = dayjs(startDate).day();
      let renderDates = 7 - firstDayOfWeek >= RemainingDatesOfRender ? RemainingDatesOfRender : 7 - firstDayOfWeek;

      while (RemainingDatesOfRender > 0) {
        markingInfoObj[startDateOfRender] = { ...plan, renderDates };
        if (startDateOfRender === startDate) markingInfoObj[startDateOfRender].start = true;
        if (startDateOfRender === startOfMonth) markingInfoObj[startDateOfRender].fromPrevMonth = true;
        RemainingDatesOfRender -= renderDates;
        if (RemainingDatesOfRender === 0) markingInfoObj[startDateOfRender].end = true;
        startDateOfRender = dayjs(startDateOfRender).add(renderDates, 'day').format('YYYY-MM-DD');
        renderDates = 7 > RemainingDatesOfRender ? RemainingDatesOfRender : 7;
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

  return [isOwner, tripCount];
};
