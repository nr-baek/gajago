import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

function MarkingBar({ currentDateMarkingInfo, mouseoverHandler, mouseoutHandler, isHover }) {
  const { start, end, title, tripType, renderDates, fromPrevMonth, key } = currentDateMarkingInfo;
  const emoji = {
    couple: '💖',
    family: '💛',
    friends: '💚',
    alone: '💜',
  };

  const markingBarRef = useRef(null);

  useEffect(() => {
    const markingBar = markingBarRef.current;
    markingBar.addEventListener('mouseenter', () => {
      mouseoverHandler(key);
    });
    markingBar.addEventListener('mouseout', () => {
      mouseoutHandler();
    });

    return () => {
      markingBar.removeEventListener('mouseenter', () => {
        mouseoverHandler(key);
      });
      markingBar.removeEventListener('mouseout', () => {
        mouseoutHandler();
      });
    };
  }, [mouseoverHandler, mouseoutHandler, key]);

  return (
    <div
      ref={markingBarRef}
      className={`marKingBar ${tripType} ${start && 'start'} ${end && 'end'} ${fromPrevMonth && 'fromPrevMonth'} ${
        isHover && 'hover'
      }`}
      style={{ width: `${renderDates * 14.28}%` }}
    >
      {start && emoji[tripType]} {(start || fromPrevMonth) && title}
    </div>
  );
}

export default MarkingBar;
