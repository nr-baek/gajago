import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { StyledCalendar } from './styles';
import AddPlanModal from './AddPlanModal';
import MarkingBar from './MarkingBar';

import { useSelector } from 'react-redux';
import { getStartAndEndDateOfDisplay } from './utils';

// dayjs extend
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const Calendar = () => {
  console.log('Calender render');
  const planArray = useSelector((state) => state.user.planData);
  const [date, setDate] = useState(dayjs());
  const [show, setShow] = useState(false);
  const [markingInfo, setMarkingInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  const renderCalendar = (date) => {
    const startWeek = date.startOf('month').week();
    const endWeek = date.endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week();
    let calendar = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="week" key={week}>
          {Array(7)
            .fill(0)
            .map((_, i) => {
              const current = date.week(week).startOf('week').add(i, 'day');
              const currentDateStr = current.format('YYYY-MM-DD');
              const currentDateMarkingInfo = markingInfo[currentDateStr];
              const isGrayed = current.format('MM') === date.format('MM') ? '' : 'grayed';

              return (
                <div className={`box ${isGrayed}`} key={i}>
                  <span className="dateNumber">{current.format('D')}</span>
                  {markingInfo[currentDateStr] && <MarkingBar currentDateMarkingInfo={currentDateMarkingInfo} />}
                </div>
              );
            })}
        </div>,
      );
    }
    return calendar;
  };

  const filterPlansOfMonth = useCallback(() => {
    const [startOfMonth, endOfMonth] = getStartAndEndDateOfDisplay(date);
    let sortedPlan = [];

    if (planArray && planArray.length) {
      sortedPlan = planArray.filter((plan) => {
        const { startDate, endDate } = plan;
        const isStartDateInDisplay = startDate >= startOfMonth && startDate <= endOfMonth;
        const isEndDateInDisplay = endDate >= startOfMonth && endDate <= endOfMonth;
        const isIncludeMonth = startDate < startOfMonth && endDate > endOfMonth;

        return isStartDateInDisplay || isEndDateInDisplay || isIncludeMonth;
      });
    }

    return sortedPlan;
  }, [planArray, date]);

  useEffect(() => {
    const [startOfMonth] = getStartAndEndDateOfDisplay(date);
    const displayPlans = filterPlansOfMonth(date);
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
    setMarkingInfo(markingInfoObj);
    setIsLoading(false);
  }, [filterPlansOfMonth, date]);

  const setPrevMonth = useCallback(() => {
    setDate((date) => date.subtract(1, 'month'));
  }, []);

  const setAfterMonth = useCallback(() => {
    setDate((date) => date.add(1, 'month'));
  }, []);

  return isLoading ? (
    <div>loading..</div>
  ) : (
    <StyledCalendar>
      <div>
        <h1>Schedule</h1>
        <button onClick={handleShow}>Add New</button>
      </div>
      <div className="selectedMonth">
        <LeftOutlined className="changeMonth" onClick={setPrevMonth} />
        <span className="showMonth">
          <span className="month">{date.format('MM')}</span>
          <span className="year">{date.format('YYYY')}</span>
        </span>
        <RightOutlined className="changeMonth" onClick={setAfterMonth} />
      </div>
      <div className="body">
        <div className="days">
          <span>SUN</span>
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
        </div>
        {renderCalendar(date)}
      </div>
      <AddPlanModal show={show} handleClose={handleClose} />
    </StyledCalendar>
  );
};

export default Calendar;
