import React from 'react';
import { useSelector } from 'react-redux';
import EmptyTripList from './EmptyTripList';

import NextTripMemo from './NextTripMemo';
import PrevTripMemo from './PrevTripMemo';
import TripList from './TripList';
import { InfoBoard, TripListInfo } from './styles';
import { getPrevAndNextTripOfToday } from './utils';

function TripsInfo({ currentRegion }) {
  const schedule_info = useSelector((state) => state.schedule_info);
  const [prevTrip, howManyDaysAgo, nextTrip, dDay] = getPrevAndNextTripOfToday(schedule_info.overallRegionalSchedule);

  return (
    <InfoBoard>
      <div className="prevAndNextInfo">
        <PrevTripMemo prevTrip={prevTrip} howManyDaysAgo={howManyDaysAgo} />
        <NextTripMemo nextTrip={nextTrip} dDay={dDay} />
      </div>
      <TripListInfo>
        {schedule_info.sortedOverallSchedule.length ? <TripList currentRegion={currentRegion} /> : <EmptyTripList />}
      </TripListInfo>
      <div className="nail tl" />
      <div className="nail tr" />
      <div className="nail bl" />
      <div className="nail br" />
    </InfoBoard>
  );
}

export default TripsInfo;
