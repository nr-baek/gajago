import { HeartTwoTone, SmileTwoTone, MehTwoTone, FrownTwoTone } from '@ant-design/icons/lib/icons';
import dayjs from 'dayjs';
import React from 'react';
import { REGION_NAME } from '../../common';
import { StyledButton } from './styles';

function ReviewListButton({ trip, id, handleClick }) {
  return (
    <li id={id} onClick={handleClick}>
      <StyledButton>
        {trip.expression === 'good' && <SmileTwoTone className="expression" twoToneColor="#26b820" />}
        {trip.expression === 'soSo' && <MehTwoTone className="expression" twoToneColor="#e4af00" />}
        {trip.expression === 'bad' && <FrownTwoTone className="expression" twoToneColor="#e93600" />}
        <div className="title">
          <span className="reviewTitle">{trip.reviewTitle}</span>
          <p className="regionAndTripTitle">
            <span>
              ({REGION_NAME[trip.region]}) {trip.tripTitle}
            </span>
          </p>
        </div>
        <div className="term">
          {trip.startDate === trip.endDate
            ? dayjs(trip.endDate).format('YYYY.MM.DD')
            : dayjs(trip.startDate).format('YYYY.MM.DD') + ' ~ ' + dayjs(trip.endDate).format('YYYY.MM.DD')}
        </div>
        <div className="likes">
          <HeartTwoTone twoToneColor="#eb2f2f" /> {trip.likes}
        </div>
      </StyledButton>
    </li>
  );
}

export default ReviewListButton;
