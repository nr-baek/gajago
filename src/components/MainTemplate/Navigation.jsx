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
import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LeftBarBtn } from './styles';

function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickHandler = useCallback(
    (e) => {
      navigate(`/${e.currentTarget.id}`);
    },
    [navigate],
  );

  return (
    <ul>
      <li>
        <LeftBarBtn id="schedule" className={pathname === '/schedule' ? 'active' : ''} onClick={onClickHandler}>
          {pathname === '/schedule' && <div />}
          {pathname === '/schedule' ? <ScheduleFilled /> : <ScheduleOutlined />}
          <span>Schedule</span>
        </LeftBarBtn>
      </li>
      <li>
        <LeftBarBtn id="myTrips" className={pathname === '/myTrips' ? 'active' : ''} onClick={onClickHandler}>
          {pathname === '/myTrips' && <div />}
          {pathname === '/myTrips' ? <CarFilled /> : <CarOutlined />}
          <span>My Trips</span>
        </LeftBarBtn>
      </li>
      <li>
        <LeftBarBtn id="reviews" className={pathname === '/reviews' ? 'active' : ''} onClick={onClickHandler}>
          {pathname === '/reviews' && <div />}
          {pathname === '/reviews' ? <RocketFilled /> : <RocketOutlined />}
          <span>Review</span>
        </LeftBarBtn>
      </li>
      <li>
        <LeftBarBtn id="story" className={pathname === '/story' ? 'active' : ''} onClick={onClickHandler}>
          {pathname === '/story' && <div />}
          {pathname === '/story' ? <SmileFilled /> : <SmileOutlined />}
          <span>Story</span>
        </LeftBarBtn>
      </li>
    </ul>
  );
}

export default Navigation;
