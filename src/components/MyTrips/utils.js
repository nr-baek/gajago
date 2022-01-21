import dayjs from 'dayjs';

export const getPrevAndNextTripOfToday = (planArray = []) => {
  const today = dayjs(new Date()).format('YYYY-MM-DD');

  let prevTrip;
  let nextTrip;
  let prevTripEndDate = '0000-00-00';
  let nextTripStartDate;
  let howManyDaysAgo;
  let dDay;

  for (let i = 0; i < planArray.length; i++) {
    const plan = planArray[i];

    if (plan.endDate <= today && plan.endDate > prevTripEndDate) {
      prevTripEndDate = plan.endDate;
      prevTrip = plan;
    } else if (plan.startDate >= today) {
      nextTripStartDate = plan.startDate;
      nextTrip = plan;
      break;
    }
  }

  if (prevTrip) {
    howManyDaysAgo = Math.round(dayjs(today).diff(prevTripEndDate, 'day', true));
  }
  if (nextTrip) {
    dDay = Math.round(dayjs(nextTripStartDate).diff(today, 'day', true));
  }

  return [prevTrip, howManyDaysAgo, nextTrip, dDay];
};
