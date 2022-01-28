import dayjs from 'dayjs';

const generatePlanArrayToReview = (planArray, isWritten) => {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const sortedPlanArray = [];

  for (let i = 0; i < planArray.length; i++) {
    const plan = planArray[i];

    if (plan.startDate <= today && plan.endDate <= today) {
      if (isWritten && plan.review) {
        sortedPlanArray.push(plan);
      } else if (!isWritten && !plan.review) {
        sortedPlanArray.push(plan);
      }
    } else if (plan.startDate > today) {
      break;
    }
  }

  return sortedPlanArray;
};

export const generateUnWrittenReviewArray = (planArray) => {
  return generatePlanArrayToReview(planArray, false);
};

export const generateWrittenReviewArray = (planArray) => {
  return generatePlanArrayToReview(planArray, true);
};
