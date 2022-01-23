import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Index, StyledList, Tab } from './styles';
import { generateDividedBeforeAfterObj } from './utils';

function TripList({ beforeTripObj, nextTripObj }) {
  const planArray = useSelector((state) => state.user.planData);
  const [currentRegion, setCurrentRegion] = useState('allPart');
  const [indexTab, setIndexTab] = useState(0);
  const { beforeTrip, afterTrip } = generateDividedBeforeAfterObj(planArray);

  const generateList = (lists) => {
    const emoji = {
      couple: '💖',
      family: '💛',
      friends: '💚',
      alone: '💜',
    };

    return lists.map((list) => {
      const { startDate, endDate, title, tripType } = list;
      return (
        <li key={title}>
          <div>
            {emoji[tripType]}
            {title}
          </div>
          <div className="date">
            {startDate}~{endDate}
          </div>
        </li>
      );
    });
  };

  const checkedGenerateList = (indexTab, lists) => {
    if (lists.length === 0) {
      return indexTab ? <p>등록된 여행 일정 없음.</p> : <p>다녀온 여행 기록 없음.</p>;
    }

    return generateList(lists);
  };

  return (
    <div className="tripList">
      <p className="memoTitle"># 나의 여행 리스트</p>
      <Index>
        <Tab selected={indexTab === 0} onClick={() => setIndexTab(0)} tab={0}>
          지난여행
        </Tab>
        <Tab selected={indexTab === 1} onClick={() => setIndexTab(1)} tab={1}>
          여행예정
        </Tab>
      </Index>
      <StyledList indexTab={indexTab}>
        {indexTab === 0 ? checkedGenerateList(indexTab, beforeTrip) : checkedGenerateList(indexTab, afterTrip)}
      </StyledList>
    </div>
  );
}

export default TripList;
