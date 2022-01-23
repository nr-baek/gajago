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

    if (plan.endDate < today && plan.endDate > prevTripEndDate) {
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

export const generateTripsObjectByRegion = (planArray = []) => {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const beforeTripObj = {
    Seoul: [],
    Busan: [],
    DaeGu: [],
    InCheon: [],
    DaeJeon: [],
    GwangJu: [],
    UlSan: [],
    SeJong: [],
    GyeongGi: [],
    GangWon: [],
    ChungBuk: [],
    ChungNam: [],
    JeonBuk: [],
    JeonNam: [],
    GyeongBuk: [],
    GyeongNam: [],
    JeJu: [],
    overseas: [],
  };
  const nextTripObj = {
    Seoul: [],
    Busan: [],
    DaeGu: [],
    InCheon: [],
    DaeJeon: [],
    GwangJu: [],
    UlSan: [],
    SeJong: [],
    GyeongGi: [],
    GangWon: [],
    ChungBuk: [],
    ChungNam: [],
    JeonBuk: [],
    JeonNam: [],
    GyeongBuk: [],
    GyeongNam: [],
    JeJu: [],
    overseas: [],
  };

  for (let i = 0; i < planArray.length; i++) {
    const plan = planArray[i];

    if (plan.startDate < today) {
      beforeTripObj[plan.region].push(plan);
    } else {
      nextTripObj[plan.region].push(plan);
    }
  }

  return [beforeTripObj, nextTripObj];
};

export const generateDividedBeforeAfterObj = (planArray) => {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const beforeAfterObj = { beforeTrip: [], afterTrip: [] };

  planArray.forEach((plan) => {
    if (plan.startDate < today) {
      beforeAfterObj.beforeTrip.push(plan);
    } else {
      beforeAfterObj.afterTrip.push(plan);
    }
  });

  return beforeAfterObj;
};
