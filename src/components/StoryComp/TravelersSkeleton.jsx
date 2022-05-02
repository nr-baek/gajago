import React from 'react';
import { Skeleton } from './styles';

function TravelersSkeleton() {
  return (
    <>
      {[...new Array(9)].map((v, i) => (
        <Skeleton key={i}>
          <div className="avatar" />
          <div className="nickname" />
          <div className="count" />
        </Skeleton>
      ))}
    </>
  );
}

export default TravelersSkeleton;
