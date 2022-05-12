import dayjs from 'dayjs';
import '../../firebase';
import { getDatabase, ref as dbRef, get, query, orderByChild } from 'firebase/database';

const today = dayjs(new Date()).format('YYYY-MM-DD');

const db = getDatabase();

export const getPlanData = async (uid) => {
  let planArray = [];
  try {
    await get(query(dbRef(db, `users/${uid}/plans`), orderByChild('startDate'))).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          planArray.push({
            key: child.key,
            ...child.val(),
          });
          return false;
        });
      } else {
        console.log('No data available');
      }
    });
    return planArray;
  } catch (error) {
    console.error(error);
  }
};

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

export const createScheduleInfo = (planArray = []) => {
  const tripScheduleInfo = {
    schedulesByRegion: {
      beforeToday: {
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
      },
      afterToday: {
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
      },
    },
    overallRegionalSchedule: {
      beforeToday: [],
      afterToday: [],
    },
    sortedOverallSchedule: [...planArray],
  };

  planArray.forEach((plan) => {
    if (plan.endDate <= today) {
      tripScheduleInfo.schedulesByRegion.beforeToday[plan.region].push(plan);
      tripScheduleInfo.overallRegionalSchedule.beforeToday.push(plan);
    } else if (plan.startDate >= today) {
      tripScheduleInfo.schedulesByRegion.afterToday[plan.region].push(plan);
      tripScheduleInfo.overallRegionalSchedule.afterToday.push(plan);
    }
  });

  return tripScheduleInfo;
};

export const countPublicReview = (planArray = []) => {
  const publicReviewCount = planArray.reduce((acc, curr) => {
    if (curr.openReview) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return publicReviewCount;
};

export const createTrophyInfoObj = (schedulesByRegionOfBeforeToday) => {
  const regionCountOfTrip = Object.entries(schedulesByRegionOfBeforeToday).reduce((acc, curr) => {
    if (curr[0] !== 'overseas' && curr[1].length > 0) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const isOwner = regionCountOfTrip === 17;

  return { isOwner, regionCountOfTrip };
};
