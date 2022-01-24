import React, { useCallback, useState } from 'react';
import { TripBox } from './styles';
import TripMap from './TripMap';
import TripsInfo from './TripsInfo';

function MyTrips() {
  const [currentRegion, setCurrentRegion] = useState('allRegion');

  const onClickRegion = useCallback((e) => {
    setCurrentRegion(e.target.id);
  }, []);
  return (
    <TripBox>
      <TripsInfo currentRegion={currentRegion} />
      <TripMap onClickRegion={onClickRegion} />
    </TripBox>
  );
}

export default MyTrips;
