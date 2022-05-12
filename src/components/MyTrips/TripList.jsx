import { Modal } from 'react-bootstrap';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import TripInfo from '../Schedule/TripInfo';
import { Index, StyledList, Tab, PostIt } from './styles';
import { REGION_NAME, TRIP_TYPE_EMOJI } from '../../common';

function TripList({ currentRegion }) {
  const { overallRegionalSchedule, schedulesByRegion } = useSelector((state) => state.schedule_info);

  const [indexTab, setIndexTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const handleClose = useCallback(() => setShowModal(false), []);

  const generateList = (lists) => {
    return lists.map((list) => {
      const { startDate, endDate, title, tripType } = list;
      return (
        <li
          key={title + startDate}
          onClick={() => {
            setShowModal(() => {
              setModalInfo(list);
              return true;
            });
          }}
        >
          <button>
            <div className="title">
              {TRIP_TYPE_EMOJI[tripType]}
              {title}
            </div>
            <div className="date">
              {startDate}~{endDate}
            </div>
          </button>
        </li>
      );
    });
  };

  const checkedGenerateList = (indexTab, lists = []) => {
    if (lists.length === 0) {
      return indexTab ? (
        <p className="noPlanMsg">등록된 여행 일정 없음.</p>
      ) : (
        <p className="noPlanMsg">다녀온 여행 기록 없음.</p>
      );
    }

    return generateList(lists);
  };

  const renderTripList = () => {
    if (currentRegion === 'allRegion') {
      return indexTab === 0
        ? checkedGenerateList(indexTab, overallRegionalSchedule.beforeToday)
        : checkedGenerateList(indexTab, overallRegionalSchedule.afterToday);
    } else {
      return indexTab === 0
        ? checkedGenerateList(indexTab, schedulesByRegion.beforeToday[currentRegion])
        : checkedGenerateList(indexTab, schedulesByRegion.afterToday[currentRegion]);
    }
  };

  return (
    <>
      <div className="tripList">
        {currentRegion !== 'allRegion' && <PostIt className="region">{REGION_NAME[currentRegion]}</PostIt>}
        <p className="memoTitle"># 나의 여행 리스트</p>
        <Index>
          <Tab selected={indexTab === 0} onClick={() => setIndexTab(0)} tab={0}>
            지난여행
          </Tab>
          <Tab selected={indexTab === 1} onClick={() => setIndexTab(1)} tab={1}>
            여행예정
          </Tab>
        </Index>
        <StyledList indexTab={indexTab}>{renderTripList()}</StyledList>
      </div>
      <Modal size="lg" show={showModal} onHide={handleClose}>
        <TripInfo planData={modalInfo} handleClose={handleClose} />
      </Modal>
    </>
  );
}

export default TripList;
