import { CarTwoTone, CheckOutlined } from '@ant-design/icons';
import React from 'react';

function UnWrittenReviewList({ id, isChecked, clickListHandler, trip }) {
  return (
    <li key={id} id={id} className={isChecked ? 'select' : ''} onClick={clickListHandler}>
      {isChecked ? <CheckOutlined /> : <CarTwoTone twoToneColor={'#3c199b'} />}
      <span className="date">
        {trip.startDate === trip.endDate ? trip.startDate : `${trip.startDate} ~ ${trip.endDate}`}
      </span>{' '}
      <span className="title">{trip.title}</span>
    </li>
  );
}

export default React.memo(UnWrittenReviewList);
