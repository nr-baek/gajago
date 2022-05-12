import dayjs from 'dayjs';
const today = dayjs(new Date()).format('YYYY-MM-DD');

export const getPrevAndNextTripOfToday = (overallRegionalSchedule) => {
  const tripsBeforeToday = overallRegionalSchedule.beforeToday;
  const tripsAfterToday = overallRegionalSchedule.afterToday;
  const prevTrip = tripsBeforeToday.length > 0 && tripsBeforeToday[tripsBeforeToday.length - 1];
  const nextTrip = tripsAfterToday.length > 0 && tripsAfterToday[0];
  let howManyDaysAgo;
  let dDay;

  if (prevTrip) {
    howManyDaysAgo = Math.round(dayjs(today).diff(prevTrip.endDate, 'day', true));
  }
  if (nextTrip) {
    dDay = Math.round(dayjs(nextTrip.startDate).diff(today, 'day', true));
  }

  return [prevTrip, howManyDaysAgo, nextTrip, dDay];
};
