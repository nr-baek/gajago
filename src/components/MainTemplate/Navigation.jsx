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
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { LeftBarBtn } from './styles';

function Navigation() {
  const [currentPage, setCurrentPage] = useState('schedule');

  const clickSchedule = useCallback(() => {
    setCurrentPage('schedule');
  }, []);
  const clickMyTrips = useCallback(() => {
    setCurrentPage('myTrips');
  }, []);
  const clickReview = useCallback(() => {
    setCurrentPage('review');
  }, []);
  const clickStories = useCallback(() => {
    setCurrentPage('stories');
  }, []);

  return (
    <ul>
      <li>
        <Link to="/">
          <LeftBarBtn className={currentPage === 'schedule' && 'active'} onClick={clickSchedule}>
            {currentPage === 'schedule' && <div />}
            {currentPage === 'schedule' ? <ScheduleFilled /> : <ScheduleOutlined />}
            <span>Schedule</span>
          </LeftBarBtn>
        </Link>
      </li>
      <li>
        <Link to="/myTrips">
          <LeftBarBtn className={currentPage === 'myTrips' && 'active'} onClick={clickMyTrips}>
            {currentPage === 'myTrips' && <div />}
            {currentPage === 'myTrips' ? <CarFilled /> : <CarOutlined />}
            <span>My Trips</span>
          </LeftBarBtn>
        </Link>
      </li>
      <li>
        <Link to="/reviews">
          <LeftBarBtn className={currentPage === 'review' && 'active'} onClick={clickReview}>
            {currentPage === 'review' && <div />}
            {currentPage === 'review' ? <RocketFilled /> : <RocketOutlined />}
            <span>Review</span>
          </LeftBarBtn>
        </Link>
      </li>
      <li>
        <Link to="/story">
          <LeftBarBtn className={currentPage === 'stories' && 'active'} onClick={clickStories}>
            {currentPage === 'stories' && <div />}
            {currentPage === 'stories' ? <SmileFilled /> : <SmileOutlined />}
            <span>Story</span>
          </LeftBarBtn>
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
