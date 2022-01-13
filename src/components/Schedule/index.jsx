import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { StyledCalendar } from './styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// dayjs extend
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const Calendar = () => {
  const [date, setDate] = useState(dayjs());

  const generate = () => {
    const startWeek = date.startOf('month').week();
    const endWeek = date.endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week();
    let calendar = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="week" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              const current = date
                .clone()
                .week(week)
                .startOf('week')
                .add(n + i, 'day');
              const isGrayed = current.format('MM') === date.format('MM') ? '' : 'grayed';
              return (
                <div className={`box ${isGrayed}`} key={i}>
                  <span className={`text`}>{current.format('D')}</span>
                </div>
              );
            })}
        </div>,
      );
    }
    return calendar;
  };

  const setPrevMonth = () => {
    setDate(date.subtract(1, 'month'));
  };

  const setAfterMonth = () => {
    setDate(date.add(1, 'month'));
  };

  return (
    <StyledCalendar>
      <h1>Schedule</h1>
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
        {generate()}
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
