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
import { Link } from 'react-router-dom';
import { LeftBarBtn } from './styles';

function Navigation() {
  return (
    <ul>
      <li>
        <Link to="/">
          <LeftBarBtn className="">
            <div />
            <ScheduleFilled />
            {/* <ScheduleOutlined /> */}
            <span>Schedule</span>
          </LeftBarBtn>
        </Link>
      </li>
      <li>
        <Link to="/">
          <LeftBarBtn className="active">
            <div />
            <CarOutlined />
            {/* <CarFilled /> */}
            <span>My Trips</span>
          </LeftBarBtn>
        </Link>
      </li>
      <li>
        <Link to="/">
          <LeftBarBtn>
            {/* <div /> */}
            <RocketOutlined />
            {/* <RocketFilled /> */}
            <span>Review</span>
          </LeftBarBtn>
        </Link>
      </li>
      <li>
        <Link to="/">
          <LeftBarBtn>
            {/* <div /> */}
            <SmileOutlined />
            {/* <SmileFilled /> */}
            <span>Stories</span>
          </LeftBarBtn>
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
