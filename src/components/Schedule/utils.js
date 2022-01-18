export const getStartAndEndDateOfDisplay = (date) => {
  const startWeek = date.startOf('month').week();
  const endWeek = date.endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week();
  const startOfMonth = date.week(startWeek).startOf('week').format('YYYY-MM-DD');
  const endOfMonth = date.week(endWeek).endOf('week').format('YYYY-MM-DD');

  return [startOfMonth, endOfMonth];
};
