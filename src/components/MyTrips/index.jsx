import React from 'react';
import { TripBox } from './styles';
import TripMap from './TripMap';
import TripsInfo from './TripsInfo';

function MyTrips() {
  return (
    <TripBox>
      <TripsInfo />
      <TripMap />
    </TripBox>
  );
}

export default MyTrips;
