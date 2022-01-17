import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { StyledCalendar } from './styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import AddPlanModal from './AddPlanModal';
import { useSelector } from 'react-redux';

// dayjs extend
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const Calendar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [date, setDate] = useState(dayjs());
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  const generate = useCallback((date) => {
    console.log('generate');
    const startWeek = date.startOf('month').week();
    const endWeek = date.endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week();
    let calendar = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="week" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              const current = date.week(week).startOf('week').add(i, 'day');
              const isGrayed = current.format('MM') === date.format('MM') ? '' : 'grayed';
              return (
                <div className={`box ${isGrayed}`} key={i} data-date={current.format('D')} data-day={7 - i}>
                  <span className={`text`}>{current.format('D')}</span>
                </div>
              );
            })}
        </div>,
      );
    }
    return calendar;
  }, []);

  const setPrevMonth = useCallback(() => {
    setDate((date) => date.subtract(1, 'month'));
  }, []);

  const setAfterMonth = useCallback(() => {
    setDate((date) => date.add(1, 'month'));
  }, []);

  return (
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
        {generate(date)}
      </div>
      <AddPlanModal show={show} handleClose={handleClose} />
    </StyledCalendar>
  );
};

export default Calendar;
