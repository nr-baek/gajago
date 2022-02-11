import dayjs from 'dayjs';

// 작성 안한 리뷰 배열 만드는 함수 (예만 있음 돼!!!)
export const generateUnWrittenReviewArray = (planArray) => {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const sortedPlanArray = [];

  for (let i = 0; i < planArray.length; i++) {
    const plan = planArray[i];

    if (plan.startDate <= today && plan.endDate <= today) {
      if (!plan.review) {
        sortedPlanArray.push(plan);
      }
    } else if (plan.startDate > today) {
      break;
    }
  }

  return sortedPlanArray;
};

export const generateTripsObjectByRegion = (tripArray) => {
  const tripObj = {
    allRegion: [],
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

  tripArray.forEach((trip) => {
    tripObj[trip.region].push(trip);
  });

  tripObj.allRegion = [...tripArray];

  return tripObj;
};
