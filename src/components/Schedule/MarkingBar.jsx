import React from 'react';

function MarkingBar({ currentDateMarkingInfo }) {
  const { start, end, title, tripType, renderDates, fromPrevMonth } = currentDateMarkingInfo;
  const emoji = {
    couple: '💖',
    family: '💛',
    friends: '💚',
    alone: '💜',
  };
  return (
    <div
      className={`marKingBar ${tripType} ${start && 'start'} ${end && 'end'} ${fromPrevMonth && 'fromPrevMonth'} `}
      style={{ width: `${renderDates * 14.28}%` }}
    >
      <span className="title">
        {start && emoji[tripType]} {(start || fromPrevMonth) && title}
      </span>
    </div>
  );
}

export default MarkingBar;
