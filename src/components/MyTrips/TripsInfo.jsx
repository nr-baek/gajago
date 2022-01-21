import React from 'react';
import { useSelector } from 'react-redux';

import NextTripMemo from './NextTripMemo';
import PrevTripMemo from './PrevTripMemo';
import { InfoBoard, TripList } from './styles';
import { getPrevAndNextTripOfToday } from './utils';

function TripsInfo() {
  const planArray = useSelector((state) => state.user.planData);
  const [prevTrip, howManyDaysAgo, nextTrip, dDay] = getPrevAndNextTripOfToday(planArray);

  return (
    <InfoBoard>
      <div className="prevAndNextInfo">
        <PrevTripMemo prevTrip={prevTrip} howManyDaysAgo={howManyDaysAgo} />
        <NextTripMemo nextTrip={nextTrip} dDay={dDay} />
      </div>
      <TripList>여행 내역</TripList>
      <div className="nail tl" />
      <div className="nail tr" />
      <div className="nail bl" />
      <div className="nail br" />
    </InfoBoard>
  );
}

export default TripsInfo;
