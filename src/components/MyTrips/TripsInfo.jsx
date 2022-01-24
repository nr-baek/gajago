import React from 'react';
import { useSelector } from 'react-redux';
import EmptyTripList from './EmptyTripList';

import NextTripMemo from './NextTripMemo';
import PrevTripMemo from './PrevTripMemo';
import TripList from './TripList';
import { InfoBoard, TripListInfo } from './styles';
import { getPrevAndNextTripOfToday, generateTripsObjectByRegion } from './utils';

function TripsInfo({ currentRegion }) {
  const planArray = useSelector((state) => state.user.planData);
  const [prevTrip, howManyDaysAgo, nextTrip, dDay] = getPrevAndNextTripOfToday(planArray);
  const [beforeTripObj, nextTripObj] = generateTripsObjectByRegion(planArray);

  console.log(beforeTripObj, nextTripObj);

  return (
    <InfoBoard>
      <div className="prevAndNextInfo">
        <PrevTripMemo prevTrip={prevTrip} howManyDaysAgo={howManyDaysAgo} />
        <NextTripMemo nextTrip={nextTrip} dDay={dDay} />
      </div>
      <TripListInfo>
        {planArray.length ? (
          <TripList beforeTripObj={beforeTripObj} nextTripObj={nextTripObj} currentRegion={currentRegion} />
        ) : (
          <EmptyTripList />
        )}
      </TripListInfo>
      <div className="nail tl" />
      <div className="nail tr" />
      <div className="nail bl" />
      <div className="nail br" />
    </InfoBoard>
  );
}

export default TripsInfo;
