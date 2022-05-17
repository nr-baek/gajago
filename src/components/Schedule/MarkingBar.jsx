import React from 'react';
import { useRef } from 'react';
import { TRIP_TYPE_EMOJI } from '../../common';

function MarkingBar({ currentDateMarkingInfo, setCurrentHover, isHover, setShowModal, markingDate, setModalInfo }) {
  const { start, end, title, tripType, numberOfDatesToRender, fromPrevMonth, key } = currentDateMarkingInfo;
  const markingBarRef = useRef(null);

  return (
    <div
      ref={markingBarRef}
      className={`markingBar ${tripType} ${start && 'start'} ${end && 'end'} ${fromPrevMonth && 'fromPrevMonth'} ${
        isHover && 'hover'
      }`}
      style={{ width: `${numberOfDatesToRender * 14.28}%` }}
      onMouseEnter={() => {
        setCurrentHover(() => ({ key, date: markingDate }));
      }}
      onMouseOut={() => {
        setCurrentHover({ key: '', date: '' });
      }}
      onClick={() => {
        setShowModal(() => {
          setModalInfo({ key, date: markingDate });
          return true;
        });
      }}
    >
      {start && TRIP_TYPE_EMOJI[tripType]} {(start || fromPrevMonth) && title}
    </div>
  );
}

export default React.memo(MarkingBar);
