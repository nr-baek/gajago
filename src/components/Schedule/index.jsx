import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { StyledCalendar } from './styles';
import ScheduleModal from './ScheduleModal';
import MarkingBar from './MarkingBar';

import { useSelector } from 'react-redux';
import { filterPlansOfMonth, getFirstDateAndLastDateOfCalendar, makeMarkingInfoObj } from './utils';

// dayjs extend
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const MonthAndYear = forwardRef(({ onClick, date }, ref) => (
  <span className="showMonth" onClick={onClick} ref={ref}>
    <span className="month">{date.format('MM')}</span>
    <span className="year">{date.format('YYYY')}</span>
  </span>
));
const today = dayjs().format('YYYY-MM-DD');
const Calendar = () => {
  const planArray = useSelector((state) => state.schedule_info.sortedOverallSchedule);

  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(dayjs());
  const [markingInfo, setMarkingInfo] = useState({});
  const [hoveredMarkingInfo, setHoveredMarkingInfo] = useState({ key: '', date: '' });
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ key: '', date: '' });

  const handleCloseModal = useCallback(() => setShowModal(false), []);
  const handleShowModal = useCallback(
    () =>
      setShowModal(() => {
        setModalInfo({ key: '', date: '' });
        return true;
      }),
    [],
  );
  const clickPrevMonth = useCallback(() => {
    setDate((date) => date.subtract(1, 'month'));
  }, []);
  const clickAfterMonth = useCallback(() => {
    setDate((date) => date.add(1, 'month'));
  }, []);
  const changeMonth = useCallback((date) => {
    setDate(dayjs(date));
  }, []);

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
              const currentDate = date.week(week).startOf('week').add(i, 'day');
              const currentDateString = currentDate.format('YYYY-MM-DD');
              const MarkingInfoOfCurrentDate = markingInfo[currentDateString];
              const isGrayed = currentDate.format('MM') === date.format('MM') ? '' : 'grayed';
              const isToday = today === currentDateString ? 'today' : '';

              return (
                <div className={`box ${isGrayed}`} key={i}>
                  <span className={`dateNumber ${isToday}`}>{currentDate.format('D')}</span>
                  {MarkingInfoOfCurrentDate && (
                    <MarkingBar
                      isHover={MarkingInfoOfCurrentDate.key === hoveredMarkingInfo.key}
                      markingDate={currentDateString}
                      currentDateMarkingInfo={MarkingInfoOfCurrentDate}
                      setCurrentHover={setHoveredMarkingInfo}
                      setShowModal={setShowModal}
                      setModalInfo={setModalInfo}
                    />
                  )}
                </div>
              );
            })}
        </div>,
      );
    }
    return calendar;
  };

  useEffect(() => {
    const [firstDate] = getFirstDateAndLastDateOfCalendar(date);
    const displayPlans = filterPlansOfMonth(date, planArray);
    const markingInfoObj = makeMarkingInfoObj(firstDate, displayPlans);

    setMarkingInfo(markingInfoObj);
    setIsLoading(false);
  }, [date, planArray]);

  return isLoading ? (
    <div>loading..</div>
  ) : (
    <StyledCalendar>
      <div>
        <h1>Schedule</h1>
        <button className="addBtn" onClick={handleShowModal}>
          Add New
        </button>
      </div>
      <div className="selectedMonth">
        <LeftOutlined className="changeMonth" onClick={clickPrevMonth} />
        <span>
          <DatePicker
            customInput={<MonthAndYear date={date} />}
            dateFormat="MM.yyyy"
            showMonthYearPicker
            onChange={changeMonth}
            selected={new Date(date)}
          />
        </span>
        <RightOutlined className="changeMonth" onClick={clickAfterMonth} />
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
      <ScheduleModal
        showModal={showModal}
        handleClose={handleCloseModal}
        modalPlanData={markingInfo[modalInfo.date]}
        setModalInfo={setModalInfo}
      />
    </StyledCalendar>
  );
};

export default Calendar;
