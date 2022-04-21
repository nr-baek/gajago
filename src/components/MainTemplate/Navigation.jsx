import {
  ScheduleOutlined,
  ScheduleFilled,
  CarOutlined,
  SmileOutlined,
  CarFilled,
  SmileFilled,
  RocketOutlined,
  RocketFilled,
} from '@ant-design/icons/lib/icons';
import React from 'react';
import usePageState from '../../hooks/usePageState';
import { LeftBarBtn } from './styles';

function Navigation() {
  const [currentPage, onClickHandler] = usePageState();

  return (
    <ul>
      <li>
        <LeftBarBtn id="schedule" className={currentPage === 'schedule' ? 'active' : ''} onClick={onClickHandler}>
          {currentPage === 'schedule' && <div />}
          {currentPage === 'schedule' ? <ScheduleFilled /> : <ScheduleOutlined />}
          <span>Schedule</span>
        </LeftBarBtn>
      </li>
      <li>
        <LeftBarBtn id="myTrips" className={currentPage === 'myTrips' ? 'active' : ''} onClick={onClickHandler}>
          {currentPage === 'myTrips' && <div />}
          {currentPage === 'myTrips' ? <CarFilled /> : <CarOutlined />}
          <span>My Trips</span>
        </LeftBarBtn>
      </li>
      <li>
        <LeftBarBtn id="reviews" className={currentPage === 'reviews' ? 'active' : ''} onClick={onClickHandler}>
          {currentPage === 'reviews' && <div />}
          {currentPage === 'reviews' ? <RocketFilled /> : <RocketOutlined />}
          <span>Review</span>
        </LeftBarBtn>
      </li>
      <li>
        <LeftBarBtn id="story" className={currentPage === 'story' ? 'active' : ''} onClick={onClickHandler}>
          {currentPage === 'story' && <div />}
          {currentPage === 'story' ? <SmileFilled /> : <SmileOutlined />}
          <span>Story</span>
        </LeftBarBtn>
      </li>
    </ul>
  );
}

export default Navigation;
