import { CrownTwoTone, TrophyFilled } from '@ant-design/icons/lib/icons';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useEffect, useState, useCallback } from 'react';
import { Korea } from './styles';
import { useSelector } from 'react-redux';

function TripMap({ onClickRegion }) {
  const { schedulesByRegion } = useSelector((state) => state.schedule_info);
  const { regionCountOfTrip } = useSelector((state) => state.user.trophyInfo);

  const [visitRate, setVisitRate] = useState(0);
  const [isTripKing, setIsTripKing] = useState(false);

  const tripsOfBeforeToday = schedulesByRegion.beforeToday;
  const VisitRateOfAllRegion = (regionCountOfTrip / 17) * 100;

  useEffect(() => {
    let visitRateTimerId;
    let isTripKingTimerId;
    visitRateTimerId = setTimeout(() => {
      setVisitRate(VisitRateOfAllRegion);
    }, 200);
    if (VisitRateOfAllRegion >= 100) {
      isTripKingTimerId = setTimeout(() => {
        setIsTripKing(true);
      }, 1200);
    }

    return () => {
      clearTimeout(visitRateTimerId);
      clearTimeout(isTripKingTimerId);
    };
  }, [VisitRateOfAllRegion]);

  const generateClassName = useCallback((tripObj, region) => {
    const tripCount = tripObj[region].length;
    const colorOfCount = ['', 'once', 'twice', 'threeTimes', 'fourTimes', 'fiveTimes'];

    if (tripCount < 6) {
      return `region ${colorOfCount[tripCount]}`;
    }
    return `region fiveTimes`;
  }, []);

  return (
    <Korea>
      <div className="clickSign">Click!</div>
      <svg id="allRegion" height="590" width="590" viewBox="0 0 1000 1050" onClick={onClickRegion}>
        <g>
          <path
            id="Seoul"
            className={generateClassName(tripsOfBeforeToday, 'Seoul')}
            d=" M 178 231 l -4 2 -4 3 -1 0 0 1 -3 1 -4 -5 -4 0 -6 1 -4 3 -2 -1 -1 -1 -3 2 -3 -3 -1 -3 -2 -3 0 0 -1 -2 -3 2 -3 1 -2 -4 0 -8 -3 -1 0 0 0 0 0 0 -2 -1 -3 -2 2 -4 3 -3 0 -1 0 0 0 0 0 -1 1 0 4 2 7 1 2 -2 0 1 2 0 1 -4 2 -8 7 -1 4 2 0 -3 1 -1 2 -4 3 -4 2 0 3 2 7 2 2 8 1 4 1 1 0 0 0 2 0 2 0 1 0 0 -1 6 3 0 8 -1 0 5 -4 3 -1 5 z "
          />
          <path
            id="Busan"
            className={generateClassName(tripsOfBeforeToday, 'Busan')}
            d=" M 496 722 l 0 4 -1 0 -2 -5 -1 6 -1 -2 0 0 -1 0 -1 1 -1 2 0 1 -1 -1 -1 -6 -1 -6 -2 3 -2 -3 0 2 0 0 0 0 0 0 0 0 -1 0 1 0 -4 1 -2 -5 -1 5 -1 2 0 0 -2 0 -7 -2 0 -2 2 -2 -1 -3 -5 -4 -2 -2 4 -1 9 0 0 -5 1 -6 5 -1 6 -2 7 -1 4 -6 1 -4 2 0 3 1 1 -3 6 -3 4 -1 1 -5 3 -6 7 0 3 -2 0 -3 0 0 2 -3 1 3 0 0 1 0 2 0 4 -1 4 4 1 3 0 1 -1 1 5 1 -7 4 -1 6 -1 4 -1 0 0 0 0 -1 -1 2 -1 1 2 2 -1 4 -2 4 -3 6 -3 4 0 1 0 0 -5 0 -4 0 -2 -1 -1 4 -1 4 1 -1 0 4 -7 0 -2 -4 -1 1 -3 4 z "
          />
          <path
            id="DaeGu"
            className={generateClassName(tripsOfBeforeToday, 'DaeGu')}
            d=" M 441 530 l 3 1 3 7 0 4 2 9 1 7 -4 4 -2 -1 0 4 -1 2 -3 6 -2 7 0 8 -4 2 -4 2 -3 1 -3 -5 -6 0 -5 3 -1 6 -3 7 -2 3 -5 0 -7 3 -7 1 0 -8 -4 -4 -1 -3 5 -2 6 0 0 -5 -5 -4 -1 -5 3 -5 3 -2 8 -1 0 -5 -8 -4 -6 0 0 -5 2 -5 3 -4 3 -3 5 -1 2 7 3 3 1 0 2 -4 3 -7 0 -7 2 2 1 1 3 -2 6 -4 3 -3 5 -1 z "
          />
          <path
            id="InCheon"
            className={generateClassName(tripsOfBeforeToday, 'InCheon')}
            d=" M 91 229 l 1 -2 0 1 0 0 1 0 1 0 0 -1 1 0 -1 -1 0 0 0 0 2 0 -4 -5 0 -5 1 -3 0 0 1 0 -1 0 0 -1 0 0 1 -1 0 -1 4 -1 4 -1 -5 -1 -3 -1 -1 -1 -2 1 1 -3 5 -3 3 -4 4 1 3 3 5 4 4 3 5 2 -2 4 -1 3 -1 5 -2 2 2 5 2 3 -1 7 -1 2 -2 3 -1 -3 -1 6 -7 2 -1 6 -6 1 -1 0 -3 -5 -2 -4 -1 -5 5 -2 -4 -2 0 -3 -2 2 z M 82 219 l 3 1 0 0 1 2 2 3 -2 2 -4 1 -8 5 -9 7 -4 -2 -3 -3 -1 0 -2 1 -2 -4 4 -5 4 -2 7 -1 7 -3 1 -4 z M 64 156 l 3 2 4 4 7 4 0 4 2 3 -1 2 -2 4 2 3 -1 4 0 3 2 0 0 2 -1 1 1 1 -1 1 1 2 1 2 1 1 -1 0 -5 4 -8 1 -8 0 -5 -4 0 -4 4 -3 0 -5 -2 -4 1 0 0 -1 -5 -3 -1 -8 0 -7 4 -4 0 0 1 0 z "
          />
          <path
            id="GwangJu"
            className={generateClassName(tripsOfBeforeToday, 'GwangJu')}
            d=" M 113 687 l 2 3 6 3 7 -3 4 -2 2 0 1 0 0 0 0 0 1 0 0 0 1 -1 4 0 4 3 2 3 -1 1 1 1 3 4 6 3 1 4 -1 7 -4 4 -3 4 -7 1 -7 0 -6 2 -1 1 -1 0 -1 1 -4 1 -8 -1 0 -4 -4 -5 -4 -1 -7 0 -4 -7 -1 -1 3 -3 2 -6 2 -4 2 0 1 1 4 -4 1 -4 0 0 0 0 z "
          />
          <path
            id="DaeJeon"
            className={generateClassName(tripsOfBeforeToday, 'DaeJeon')}
            d=" M 223 432 l 1 6 4 1 0 0 3 0 4 -4 1 0 0 2 -1 2 3 2 2 6 5 1 0 5 -2 6 -2 3 -2 7 -1 8 1 7 -5 3 -2 4 -7 -1 -3 -4 -2 -1 1 -2 -1 -2 1 -1 0 0 -3 -2 -2 6 -1 6 -3 4 -1 1 -1 -4 -3 -4 -1 1 -1 0 -2 -3 -1 -7 -5 -4 1 -2 1 -3 2 -8 1 -7 0 -6 9 -3 2 -3 2 -3 2 -5 z "
          />
          <path
            id="UlSan"
            className={generateClassName(tripsOfBeforeToday, 'UlSan')}
            d=" M 550 641 l 2 6 -1 7 -1 8 -3 3 0 0 -1 0 0 1 0 0 -2 1 -5 -1 1 -1 0 -1 -1 -3 -4 -4 -4 1 -2 0 -1 0 0 0 -1 -3 -1 -7 -4 -1 -6 -2 -4 -5 -2 -3 -4 -3 -5 -3 -1 -3 -3 1 -1 0 0 0 -2 0 -3 -2 -4 -4 5 -5 0 -8 3 -4 1 0 1 1 4 -3 3 0 -2 -3 0 -2 1 -1 0 -1 2 -4 4 -2 4 -1 9 -1 5 0 4 3 3 3 4 7 6 -1 3 -2 4 -2 7 2 1 0 7 3 2 8 0 7 -1 8 -2 4 2 -1 -2 5 -1 4 -1 -1 0 1 -2 1 -2 -6 -3 -6 -3 -1 2 2 -2 1 2 1 1 3 -3 1 2 0 0 0 1 1 0 4 z "
          />
          <path
            id="SeJong"
            className={generateClassName(tripsOfBeforeToday, 'SeJong')}
            d=" M 184 410 l -2 -2 0 -5 1 -9 -1 -4 -1 1 0 0 -1 0 -1 -4 3 -4 3 0 5 2 5 3 6 3 2 0 0 0 0 0 0 0 2 1 2 2 -2 4 -1 4 2 4 0 3 0 3 2 1 3 3 6 2 3 4 3 2 0 8 -6 2 -2 5 -2 3 -2 3 -9 3 -6 -1 -6 -4 -1 -3 -3 -9 0 -7 2 -7 1 -4 0 0 0 0 -1 1 z "
          />
          <path
            id="GyeongGi"
            className={generateClassName(tripsOfBeforeToday, 'GyeongGi')}
            d=" M 81 192 l 1 -2 -1 -1 -1 -7 -1 -3 1 -3 1 -4 -2 -3 0 -5 4 2 4 2 4 1 3 -1 4 -2 4 0 3 5 -1 -4 -1 -12 -1 -1 0 -1 0 0 0 0 0 0 0 0 3 -2 -1 -5 0 0 1 -3 0 -5 -1 1 -1 -4 3 -6 7 -2 7 -2 3 -2 5 -2 1 -4 1 -1 1 -1 3 -3 1 -6 1 -7 4 -4 3 -2 3 2 1 0 3 -5 1 -3 0 0 1 -2 2 -3 3 -7 8 2 3 -5 1 0 1 0 3 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 3 1 3 -1 1 0 1 3 4 9 1 5 6 1 4 -2 3 -3 4 0 -1 1 -1 5 0 6 4 2 3 3 2 -1 5 -3 5 0 6 2 1 5 1 8 2 6 6 2 6 1 2 5 6 3 4 3 1 3 -1 1 1 2 0 1 -1 4 -4 3 -5 4 -4 6 0 5 -1 2 1 2 1 6 -3 3 -1 4 7 1 -1 7 0 8 8 0 5 1 4 3 5 3 3 4 4 0 4 0 1 -1 3 2 7 3 4 3 1 2 -5 2 -4 2 1 1 -1 0 -3 4 2 5 2 3 0 6 -1 3 -1 5 -4 7 0 8 -1 7 0 6 -1 4 -1 6 -4 6 -2 5 -4 3 -8 0 0 7 -3 4 -1 1 -1 -1 -1 1 0 -1 0 3 -5 3 0 2 0 0 -2 1 -4 -2 -2 0 -3 1 -2 -1 -3 0 -2 5 -3 4 -5 3 -4 3 1 1 1 1 -5 4 -4 2 -4 2 -4 1 1 3 0 1 0 0 0 0 -2 3 -4 -4 -6 -3 -3 -3 -5 -3 -5 -2 -8 2 -1 3 -1 0 -2 0 -4 1 -7 1 -8 2 -6 2 -3 4 0 -4 -8 1 -8 -1 0 -7 3 -8 -9 -1 2 -7 -6 -3 -1 -5 -10 -11 0 -5 0 -4 -2 1 -1 -1 -1 1 -1 0 0 0 0 0 0 0 1 -4 2 -3 -3 0 -1 -4 -3 -5 -2 0 -2 1 -2 -1 2 3 -7 1 0 -7 0 -7 3 -2 -1 -1 1 0 6 -4 2 0 -3 1 -4 4 -2 3 2 1 4 3 3 3 -1 1 2 1 3 3 0 1 0 4 2 -1 3 -1 -2 -2 0 0 0 -1 1 -1 -1 -2 0 0 0 0 -1 -2 5 -3 6 1 5 0 0 0 1 2 -1 1 1 1 0 1 1 -4 1 0 -1 6 3 -6 1 -4 2 -1 -1 -1 3 0 4 3 1 1 1 -2 1 0 0 0 2 1 -1 -2 -7 -3 -7 -2 -4 -1 0 0 -1 0 -2 -2 -8 -5 -1 -4 9 -7 7 -2 -5 -2 0 -1 1 -1 0 -1 1 -2 1 -7 -2 -3 -2 -5 2 -2 1 -5 1 -3 3 2 2 1 0 0 0 0 0 0 3 1 0 8 2 4 3 -1 3 -2 1 2 0 0 2 3 1 3 3 3 3 -2 1 1 2 1 4 -3 6 -1 4 0 4 5 3 -1 0 -1 1 0 4 -3 4 -2 3 -8 1 -5 4 -3 0 -5 -8 1 -3 0 1 -6 0 0 0 -1 0 -2 0 -2 0 0 -1 -1 -1 -4 -2 -8 -7 -2 -3 -2 -2 0 -3 4 -2 4 -1 1 0 3 -4 -2 -7 1 -2 8 -1 4 -2 0 0 -1 -2 2 -7 -1 -4 -2 -1 0 0 1 0 0 0 0 0 1 -3 3 -5 -2 -4 -3 -5 -4 -3 -3 -4 -1 -3 4 -5 3 -7 -1 -2 -5 z M 120 292 l -5 1 -3 4 -5 4 -2 2 9 10 5 0 -1 -7 -1 -2 0 -1 3 -2 5 -4 -3 -2 1 -1 1 -1 -1 -2 1 -4 z "
          />
          <path
            id="GangWon"
            className={generateClassName(tripsOfBeforeToday, 'GangWon')}
            d=" M 409 61 l 2 3 0 0 0 3 3 4 3 5 -2 4 2 -1 2 4 1 6 2 4 2 4 4 5 1 0 -1 0 2 3 4 6 5 5 1 3 4 5 0 0 1 0 0 3 4 6 4 4 3 5 2 4 3 3 3 5 0 -1 0 0 0 0 0 1 3 4 4 4 5 5 3 4 3 2 4 5 3 4 4 6 0 5 2 5 -1 0 1 0 4 4 4 3 0 0 0 0 0 0 0 0 0 1 0 -1 1 4 0 4 0 -1 1 4 2 7 4 4 4 4 2 4 1 1 -1 -1 0 0 0 2 2 4 4 3 4 3 2 7 1 4 0 -1 1 2 3 3 2 3 1 0 1 1 2 1 0 0 0 0 0 1 0 1 0 0 0 1 0 0 0 0 0 0 1 1 2 5 0 6 1 8 2 5 -1 0 0 0 0 0 0 0 -1 -1 -1 1 -1 -1 -1 1 -5 4 -5 2 -3 4 -3 4 0 3 0 3 0 1 1 0 -5 0 -6 -3 -5 -4 -3 -2 -7 -1 -3 5 -3 0 -4 -2 0 1 -1 -1 -5 0 -4 0 0 0 -3 -2 -4 1 -4 6 -7 1 -6 -5 -4 -2 -2 0 -3 4 -1 7 -6 -1 -4 -1 -5 -3 -5 -3 -2 -2 -2 1 -1 0 0 -1 -1 0 0 0 -2 1 -3 -1 -6 -2 -4 -4 -2 -2 -2 2 -5 1 -5 0 -4 -7 -2 -3 -1 1 0 0 -2 -1 -1 1 -2 -1 -1 1 -1 -1 0 1 -1 0 1 0 -4 2 -6 -1 -1 -3 5 -4 4 -5 -10 -2 -3 -2 0 0 -2 0 -3 -2 -5 -1 -3 5 -3 -1 -2 -1 -1 0 -1 -1 -2 4 -2 2 -4 2 -1 0 -1 0 -3 1 -2 -5 -2 -4 0 -1 0 0 -4 -3 -7 1 -5 4 0 1 1 5 0 4 -2 3 -4 2 -1 -1 -3 0 -2 1 -1 -1 -1 1 -4 1 -7 0 -4 -5 -2 -7 1 -6 1 -4 0 -6 1 -7 0 -8 4 -7 1 -5 1 -3 0 -6 -2 -3 -2 -5 3 -4 1 0 -1 -1 4 -2 5 -2 -1 -2 -4 -3 -7 -3 -3 -2 -1 1 -4 0 -4 0 -3 -4 -5 -3 -4 -3 -5 -1 -8 0 0 -8 1 -7 -7 -1 1 -4 3 -3 -1 -5 -1 -3 1 -2 0 -5 4 -6 5 -4 4 -3 1 -4 0 -1 -1 -2 1 -1 -1 -3 -4 -3 -6 -3 -2 -5 -6 -1 -6 -2 -2 -6 -1 -8 -1 -5 -6 -2 -5 0 -5 3 -2 1 -3 -3 -4 -2 0 -6 1 -5 1 -1 -4 0 -3 3 -4 2 -6 -1 -1 -5 -4 -9 -1 -3 -1 0 -3 1 -3 -1 0 -3 0 -3 -1 0 -1 -3 3 -1 -1 -1 2 -2 2 -2 0 0 0 0 1 4 6 -2 2 -2 -1 0 0 0 0 0 2 -1 4 -2 7 1 4 4 1 0 0 -1 0 0 -1 -1 0 0 1 0 0 0 0 0 0 -1 0 1 1 0 0 1 8 1 3 -6 6 0 8 3 3 1 4 2 4 -2 4 -2 6 -3 5 1 0 0 0 0 0 0 0 0 0 0 1 1 7 1 0 2 0 0 2 -2 1 2 6 0 3 0 3 -2 5 4 5 3 7 0 5 -5 0 0 4 1 8 3 2 3 1 1 1 -1 2 1 2 -3 5 0 6 -2 3 -5 6 -1 7 -1 2 -6 5 -3 6 -1 1 -5 2 -6 5 0 0 -5 0 1 0 -2 -3 0 3 -1 4 -8 1 -8 -1 -6 4 -2 6 3 1 4 2 8 3 5 2 4 2 6 2 6 3 4 3 5 3 7 1 3 z "
          />
          <path
            id="ChungBuk"
            className={generateClassName(tripsOfBeforeToday, 'ChungBuk')}
            d=" M 321 275 l 4 3 0 0 0 1 2 4 2 5 3 -1 1 0 1 0 4 -2 2 -2 2 -4 1 1 1 0 2 1 3 1 3 -5 5 1 3 2 2 0 0 0 3 2 10 2 -4 5 -5 4 1 3 6 1 4 -2 -1 0 1 0 0 -1 1 1 1 -1 2 1 1 -1 1 1 1 0 1 -1 2 3 4 7 5 0 5 -1 2 -2 2 2 4 4 6 2 3 1 2 -1 0 0 1 0 0 1 1 0 2 -1 2 2 5 3 -4 1 -2 2 -3 -1 0 1 -5 3 -3 5 -4 3 -4 4 -4 2 -4 4 -2 5 -3 7 2 8 -2 6 -5 1 -7 1 -7 -3 -4 -3 -4 -4 -4 -2 0 0 -3 4 -2 6 -6 0 -5 -2 -1 -1 -3 2 -4 4 -1 2 -3 -3 -3 1 -1 5 -1 8 3 4 1 2 -5 0 -3 -3 -1 0 -4 2 -3 -2 -2 -1 -3 6 -6 2 -3 1 -1 1 0 0 0 1 4 1 4 3 1 5 -1 4 -1 2 1 1 -2 -1 -4 -5 -2 -4 0 -1 -4 4 0 4 0 0 -1 1 -6 2 1 5 7 3 2 5 4 3 0 5 -3 3 0 2 0 1 0 0 0 0 0 0 0 1 0 0 0 1 -1 4 0 2 2 2 -2 3 -1 3 3 3 -1 2 1 0 0 3 -3 4 -3 5 1 6 6 0 2 -3 2 3 4 3 2 2 1 0 1 1 2 0 3 -3 6 1 2 5 2 6 1 2 -4 -1 -7 0 0 8 -1 6 -3 4 0 1 0 2 -1 3 -3 6 -5 2 -4 3 -4 2 -9 -1 -8 2 -6 -2 -5 -2 -2 -3 -3 3 -2 -1 -5 -3 -1 -7 -4 -9 0 -6 0 -7 -2 -6 -6 -2 -8 0 -1 -7 1 -8 2 -7 2 -3 2 -6 0 -5 -5 -1 -2 -6 -3 -2 1 -2 0 -2 -1 0 -4 4 -3 0 0 0 -4 -1 -1 -6 0 -8 -3 -2 -3 -4 -6 -2 -3 -3 -2 -1 0 -3 0 -3 -2 -4 1 -4 2 -4 -2 -2 -1 -2 3 -4 5 -5 5 -4 7 1 -1 -5 -1 -5 -5 -4 -5 -2 -2 -5 -3 -5 -3 -3 2 -3 0 0 0 0 0 -1 -1 -3 4 -1 4 -2 4 -2 5 -4 -1 -1 -1 -1 4 -3 5 -3 3 -4 2 -5 3 0 2 1 3 -1 2 0 4 2 2 -1 0 0 0 -2 5 -3 0 -3 0 1 1 -1 1 1 1 -1 3 -4 0 -7 8 0 4 -3 2 -5 4 -6 2 7 4 5 7 0 4 -1 1 -1 1 1 2 -1 3 0 1 1 4 -2 2 -3 0 -4 -1 -5 0 -1 5 -4 z "
          />
          <path
            id="ChungNam"
            className={generateClassName(tripsOfBeforeToday, 'ChungNam')}
            d=" M 53 418 l 1 8 2 5 2 2 0 4 -1 2 3 2 1 2 0 0 -1 5 -6 -1 -5 -2 0 -3 1 0 -3 -2 -1 -6 -2 2 1 -5 1 -3 -1 0 0 0 -1 0 0 -3 0 -8 -2 -3 0 0 0 0 0 -2 3 -3 6 1 0 3 -1 0 0 1 0 0 z M 30 354 l 1 1 2 -3 4 -3 2 -6 0 -8 2 -4 1 1 0 0 0 0 0 0 -1 2 1 1 0 0 1 0 -2 3 0 4 2 4 1 3 -2 2 1 0 -1 2 -2 4 3 3 -1 0 1 0 -1 1 -3 3 6 -1 2 -5 4 3 0 0 0 -1 -1 -3 1 -1 3 -5 6 -3 0 -5 0 -4 0 0 -1 0 -1 1 -2 0 -2 -1 0 0 -2 -2 -4 -3 5 -1 2 -1 -1 0 -1 -2 -6 -2 3 -3 0 -1 3 1 2 -1 6 0 2 1 3 1 2 -4 8 -7 3 3 5 2 3 1 0 1 0 0 6 3 3 2 10 1 6 2 7 -1 2 5 2 7 2 4 1 3 11 3 4 -2 3 -4 6 -2 8 -2 7 -1 4 -1 2 0 1 0 1 -3 8 -2 5 2 5 3 3 3 6 3 4 4 3 3 3 5 2 5 5 2 5 4 1 5 1 5 -7 -1 -5 4 -5 5 -3 4 -1 1 0 0 0 0 0 0 0 0 -2 0 -6 -3 -5 -3 -5 -2 -3 0 -3 4 1 4 1 0 0 0 1 -1 1 4 -1 9 0 5 4 3 2 3 1 -1 0 0 0 0 -1 4 -2 7 0 7 3 9 1 3 6 4 6 1 0 6 -1 7 -2 8 -1 3 -1 2 5 4 1 7 2 3 1 0 1 -1 3 4 1 4 1 -1 3 -4 1 -6 2 -6 3 2 0 0 -1 1 1 2 -1 2 2 1 3 4 7 1 2 -4 5 -3 8 0 6 2 2 6 0 7 0 6 4 9 1 7 -1 4 1 0 0 2 -2 1 1 3 -1 2 -1 0 -3 -4 -8 -2 -2 8 -5 2 -7 -1 -3 -5 -1 -3 0 0 -4 2 -5 -3 -3 -6 -1 -7 -1 -5 -3 -2 -6 2 -5 1 -1 0 -1 0 -3 3 -7 1 -8 2 -2 2 -6 0 -3 -1 -3 -3 -3 -8 -4 -2 -3 -2 -1 1 -2 0 -4 -2 -4 1 -2 2 -7 3 -2 7 0 5 -6 3 -7 4 -8 4 -2 2 -1 0 0 1 -7 -2 -4 1 1 -3 -3 -6 -3 -4 -1 -3 3 -2 -4 -2 -2 -2 0 0 -1 -2 -6 -3 -4 -2 -3 -1 -4 1 0 0 1 2 -2 -1 0 -3 1 -1 0 0 3 -1 3 -9 0 -7 1 -3 0 0 0 -1 1 -1 -1 -3 -5 -6 2 -5 6 -3 5 0 -4 -1 -4 -2 -4 -3 -5 -3 1 -5 1 -2 0 0 2 -1 2 -2 -3 1 -1 0 0 -1 0 0 0 0 1 -1 -2 -3 -1 -6 -1 -9 -2 -6 -1 -6 -7 -4 0 -1 -7 -2 -5 1 -3 3 -4 2 -1 -6 -2 -9 -3 -3 0 -1 0 0 0 0 0 0 0 -2 1 -3 1 -4 -1 0 0 -1 -1 2 -4 3 -5 4 -3 2 -5 0 1 -6 7 0 -1 -6 -4 -4 -2 0 -1 0 -1 0 -1 4 -2 4 -2 1 1 -3 1 -3 0 0 0 0 -1 -2 -1 -4 2 -1 0 -1 0 0 -1 0 1 -1 0 0 1 0 1 -4 2 -7 2 4 2 4 2 3 -1 -5 -1 -4 -1 -1 2 -3 0 -7 3 -4 0 1 0 -1 0 1 2 -1 4 -1 -2 3 -2 2 z "
          />
          <path
            id="JeonBuk"
            className={generateClassName(tripsOfBeforeToday, 'JeonBuk')}
            d=" M 134 519 l 0 -5 2 -7 7 -3 2 -2 4 -1 4 2 2 0 1 -1 3 2 4 2 3 8 3 3 3 1 6 0 2 -2 8 -2 7 -1 3 -3 1 0 1 0 5 -1 6 -2 3 2 1 5 1 7 3 6 5 3 4 -2 0 0 1 3 3 5 7 1 5 -2 2 -8 8 2 3 4 1 0 1 -2 -1 -3 2 -1 0 -2 -1 0 1 -4 5 3 2 1 3 -3 2 3 5 2 6 2 8 -2 9 1 2 4 0 1 0 0 2 4 3 7 -4 7 -3 2 -3 5 -4 3 -3 2 -6 2 -5 2 -3 6 -3 4 -5 3 -2 8 0 5 -3 3 -2 7 -1 8 -2 4 -1 3 -2 8 6 6 2 8 0 5 4 3 -1 5 -3 3 -3 5 -2 3 0 1 0 0 0 0 1 4 -2 3 -4 4 -3 -3 -4 -2 -5 -4 -4 -2 -6 -1 -4 1 -2 4 -4 5 -4 1 -3 -2 -1 0 -3 2 -8 0 -4 -1 -5 -3 -2 2 -2 1 -4 -3 -3 1 -4 3 -5 2 -8 -3 -1 -4 0 -8 -4 -3 0 -2 3 -3 -1 -4 -1 -3 -1 -4 -3 1 -2 -1 -1 4 -1 2 -2 2 -1 0 -1 5 -7 -1 -4 -3 -2 -5 -5 -3 -1 -1 -2 1 -1 -4 -6 2 -5 1 -4 4 0 7 -3 3 0 1 0 2 -3 3 -3 3 -5 3 -4 1 1 2 -4 0 -6 0 -1 1 1 0 -2 2 -7 -1 -2 -5 -1 -4 -2 0 -1 1 -1 -4 -1 -8 -2 -3 -6 -2 4 -9 1 -3 4 -5 4 -3 1 0 0 0 0 0 0 0 2 -1 0 1 1 -1 0 1 1 0 0 1 1 -2 0 1 1 0 -1 0 0 -1 4 -1 3 2 1 1 0 -1 0 -1 2 -4 2 -3 0 0 0 0 0 0 2 0 2 0 4 4 2 5 -1 -5 -2 -5 -8 -2 -9 0 -6 0 -3 1 0 0 -3 -3 -4 -3 -1 -1 1 -2 -1 0 1 -1 -1 -2 1 0 3 -2 6 -5 1 -1 1 0 1 -2 3 -2 -1 -3 -4 -4 -3 -6 -4 -11 -2 0 -3 -1 0 -2 5 -2 6 -11 3 -8 -1 -2 -1 -7 5 1 0 -1 3 0 9 0 7 -2 7 -2 4 2 3 -2 0 -4 8 -4 7 -4 z M 70 573 l 1 6 2 3 3 6 6 7 2 0 3 -3 3 -5 2 -8 1 -4 4 0 7 -1 -1 -8 -1 -4 -3 -5 -7 -1 -2 -6 -1 -6 -5 0 -6 1 -4 12 -2 4 -1 5 z "
          />
          <path
            id="JeonNam"
            className={generateClassName(tripsOfBeforeToday, 'JeonNam')}
            d=" M 118 837 l 1 -4 -1 -7 -2 -4 1 0 0 -1 -1 -3 1 -3 0 -1 0 0 -1 3 -2 8 0 9 -2 8 -3 2 0 0 2 3 -3 4 -3 2 -7 4 -4 0 0 0 0 1 -4 4 -2 6 -2 5 -2 4 -7 2 -3 3 -3 0 0 -1 0 0 0 0 0 0 0 -2 1 -2 0 -1 1 -1 -1 -1 0 -1 0 0 -3 -3 -4 1 0 1 -1 -1 1 -1 0 -1 0 0 -1 -2 1 0 -1 -1 0 0 1 -1 -1 0 3 -3 1 -7 -6 -2 0 -2 2 1 -1 -4 0 -4 0 0 0 0 0 0 -1 -4 -1 -4 0 1 0 -1 -2 1 0 -3 -2 -2 1 -1 -2 -1 -2 -1 -2 3 -3 0 -3 -4 -9 -3 -2 -3 -1 -1 -1 1 -1 -4 -2 -6 -3 -5 0 -1 1 -1 -1 -1 1 -2 2 -5 3 -8 5 1 3 5 2 3 2 2 3 -3 2 -3 0 -1 -2 -4 3 -4 6 -1 3 -1 -6 -1 -7 0 1 -7 5 -4 0 -5 -2 -4 -1 1 2 -5 -1 -6 0 -6 -2 -4 -1 -3 -1 5 0 8 -4 3 -2 0 -3 -3 -2 -5 -1 -2 3 -2 6 -1 0 -3 -2 0 4 -3 4 -3 1 -2 -5 -3 -4 -2 -1 -1 1 0 0 0 1 -2 -4 -1 -2 5 -2 1 0 -1 -1 -1 -1 -1 -2 3 -2 6 -2 0 -1 -2 -1 2 -2 -7 -3 -1 0 1 0 0 0 1 -1 -1 -1 -2 0 0 -1 0 0 0 -2 -1 -3 -1 1 -1 0 0 0 -1 -1 -2 0 -2 5 -1 6 1 4 1 0 0 0 0 2 0 0 -1 -2 -3 1 -3 0 -1 1 1 3 -2 4 1 2 1 3 -3 3 -1 -1 5 -1 4 0 3 2 0 1 -1 0 3 3 4 1 -1 1 -2 0 -1 2 2 1 6 0 4 2 -1 1 1 1 -1 0 0 0 -2 2 -3 2 -6 0 -4 -5 -3 -3 -4 -1 0 -1 -2 -3 -4 -1 -5 2 -4 -4 2 -3 1 1 -2 0 -2 -1 0 1 1 0 1 -2 0 -3 -4 1 -5 1 2 2 -1 0 -1 0 -1 1 0 -2 0 2 -4 -1 0 0 -2 4 -1 4 -2 -1 -3 1 -1 0 -1 0 -1 0 0 0 0 0 0 0 0 1 -2 3 -6 4 1 2 3 0 -3 -4 -4 -1 -4 2 -6 3 -1 6 2 2 3 1 8 1 4 1 -1 2 0 1 4 2 5 7 1 2 -2 -1 0 1 -1 6 0 4 0 -1 -2 4 -1 5 -3 3 -3 3 -3 0 -2 0 -1 3 -3 0 -7 4 -4 5 -1 6 -2 1 4 2 -1 1 1 5 3 2 5 4 3 7 1 1 -5 1 0 2 -2 1 -2 1 -4 2 1 3 -1 1 4 1 3 1 4 -3 3 0 2 4 3 0 8 1 4 8 3 5 -2 4 -3 3 -1 4 3 2 -1 2 -2 5 3 4 1 8 0 3 -2 1 0 3 2 4 -1 4 -5 2 -4 4 -1 6 1 4 2 5 4 4 2 3 3 3 8 2 3 1 4 0 8 4 6 5 3 4 6 0 4 4 4 3 4 4 3 3 5 1 2 0 3 -3 6 -5 3 -1 -2 -3 5 -3 3 0 2 -3 -2 -2 3 -1 1 -4 0 -5 -3 -1 -5 -3 8 5 3 0 1 -2 5 1 3 1 0 0 0 0 0 0 -1 0 0 3 3 9 0 3 -2 0 -1 -1 -1 5 0 3 2 0 0 3 -2 2 7 -2 6 -2 9 1 2 -1 1 -5 2 -3 1 0 0 -3 -3 -4 -2 -1 1 -2 3 0 4 -3 -1 0 5 2 9 0 3 -3 -2 -5 -1 -1 3 -2 -2 -2 -4 0 -2 0 0 0 -3 3 -3 -2 -1 -1 -1 -1 1 1 -4 3 -2 1 -6 -3 -3 -1 0 1 0 0 -1 0 1 0 0 1 -1 0 1 0 -2 -4 -4 -4 -1 0 0 2 -5 -2 -2 0 0 0 -1 0 0 0 -1 -1 -3 0 -4 1 0 -1 0 -4 3 -1 6 -6 1 -1 -3 -1 1 0 -1 -1 1 -4 4 -7 -1 -4 -1 4 2 4 3 0 0 1 0 1 0 1 0 1 1 1 -1 -3 3 -3 3 1 1 -1 0 0 1 1 3 -2 2 0 6 2 3 1 0 0 0 3 3 4 4 1 1 0 0 3 2 2 1 0 1 2 1 -3 0 1 2 1 0 0 0 1 1 1 -1 1 4 -1 7 -6 0 -7 1 -2 3 1 2 4 1 0 0 0 0 -1 1 1 1 -1 1 -2 4 -4 2 0 -1 -2 1 1 3 0 0 -2 1 -3 -1 -1 1 -1 1 0 0 -3 2 -1 5 -3 -1 0 0 0 0 0 -1 0 0 1 1 -1 -2 -3 -3 -2 -3 1 0 -1 -3 -6 -3 -3 -3 -1 1 -1 1 0 -1 -1 1 -3 -1 -3 0 0 1 1 0 -2 0 -2 -1 -1 1 -2 -1 0 1 -1 -1 0 0 0 0 -2 -3 0 -4 0 0 1 -1 1 -1 0 0 2 -2 1 -4 2 2 2 -4 1 -2 -1 -1 1 -1 3 -3 6 -3 2 -6 2 -4 3 -1 2 5 0 4 0 0 1 1 4 0 2 -5 2 -7 -3 -6 -3 1 -3 2 -4 0 -3 -4 -4 3 -2 4 -3 5 -6 1 -4 -2 0 0 0 0 0 -1 -3 4 -3 4 -2 0 1 1 -4 2 -3 4 -1 0 -1 0 -2 2 -8 0 -4 -1 4 2 4 3 -1 1 1 0 0 0 -2 4 3 3 -1 2 0 -1 -1 0 -3 4 -1 7 0 6 -5 2 -2 4 -2 -1 -6 0 -1 4 -4 -2 -3 -2 -1 1 -2 0 -1 -1 -1 1 -2 -4 0 -4 -1 0 z M 61 823 l 3 -2 2 -2 -4 -2 -2 -3 -2 1 0 -2 -1 0 0 0 -1 -3 -2 -3 0 0 -1 0 -1 2 -3 0 -1 -4 1 2 1 0 1 -3 -1 -3 2 0 -1 -2 -2 -1 -4 4 -3 0 1 4 2 5 3 6 5 3 4 2 z M 49 798 l 1 0 2 0 3 4 3 -2 2 -1 0 4 -3 4 0 0 4 3 4 2 0 0 0 0 0 0 4 1 3 1 0 0 0 1 0 0 0 0 1 0 0 -2 -4 -4 -3 -4 4 3 7 2 5 3 5 1 2 1 1 -1 -8 -2 -4 -4 1 -2 1 -2 -1 0 1 0 -3 1 -6 -2 2 -1 -3 -1 -2 -3 -4 -2 2 -3 -1 -1 0 0 0 0 0 0 0 0 -1 0 -2 1 -2 -2 -1 1 -2 0 0 0 0 0 0 0 0 -1 0 0 0 0 -2 0 -4 2 -1 2 0 1 0 0 0 0 z M 122 727 l 4 -1 1 -1 1 0 1 -1 6 -2 7 0 7 -1 3 -4 4 -4 1 -7 -1 -4 -6 -3 -3 -4 -1 -1 1 -1 -2 -3 -4 -3 -4 0 -1 1 0 0 -1 0 0 0 0 0 -1 0 -2 0 -4 2 -7 3 -6 -3 -2 -3 -4 1 0 0 0 0 -1 4 -4 4 -2 -1 -1 0 -2 4 -2 6 -3 3 1 1 4 7 7 0 4 1 4 5 0 4 z M 95 876 l -1 0 -1 -7 0 -5 6 -2 6 2 3 6 1 4 0 0 0 0 2 4 2 6 -4 -1 1 0 -3 0 -7 -1 z M 191 843 l 1 0 0 1 0 0 1 3 -2 6 -2 3 -10 1 -7 -4 0 -6 3 -3 0 0 0 0 0 1 4 2 5 -3 0 0 0 0 1 0 0 0 1 0 2 0 1 0 1 0 z M 27 823 l 5 2 4 3 -1 1 0 0 0 0 0 0 4 2 3 2 0 0 2 2 3 6 1 4 -1 -1 -2 3 0 6 -4 5 -2 2 -1 -2 -2 2 -1 -1 0 0 0 1 0 1 -3 1 -5 2 1 1 -3 1 -3 1 -5 1 -7 1 -5 0 1 -1 -1 0 1 -1 1 -2 -5 -2 -2 -8 3 -4 1 1 1 0 0 0 -1 -3 5 -4 4 -1 0 -1 4 -3 4 -3 0 -1 -1 0 2 -3 z M 281 794 l 2 1 5 3 0 2 -1 0 -1 -1 -1 1 0 -1 0 3 2 5 1 0 1 0 0 4 0 7 1 5 -6 0 -3 -1 -1 0 0 -1 0 0 0 0 -3 -3 0 -7 4 -3 1 -5 -1 -6 -1 -1 0 0 0 0 0 0 0 0 0 -1 z "
          />
          <path
            id="GyeongBuk"
            className={generateClassName(tripsOfBeforeToday, 'GyeongBuk')}
            d=" M 560 528 l 7 2 5 -4 3 -4 3 -4 1 -1 0 0 3 -4 3 2 2 6 -1 8 -2 3 -1 0 0 0 -1 4 0 4 0 0 -1 0 0 -1 0 1 0 0 -2 2 -2 3 0 2 1 0 0 0 1 4 0 4 -1 -1 -1 1 0 0 1 4 -1 3 0 0 0 0 0 0 0 1 -1 3 0 3 0 0 0 1 -1 -1 -1 4 -1 8 -2 7 -1 6 -2 4 -2 4 -7 -3 -1 0 -7 -2 -4 2 -3 2 -6 1 -4 -7 -3 -3 -4 -3 -5 0 -9 1 -4 1 -4 2 -2 4 0 1 -1 1 0 2 2 3 -3 0 -4 3 -1 -1 -1 0 -3 4 -7 0 -5 -4 -3 0 -3 1 -4 3 -4 5 -5 1 -6 3 -8 0 -7 -2 -8 -1 -7 2 -6 -3 -3 -3 -3 -3 -1 -7 0 -5 1 -6 5 -3 6 0 3 5 3 -1 4 -2 4 -2 0 -8 2 -7 3 -6 1 -2 0 -4 2 1 4 -4 -1 -7 -2 -9 0 -4 -3 -7 -3 -1 -9 0 -5 1 -3 3 -7 4 -2 2 -1 -1 -2 -2 0 7 -3 7 -2 4 -1 0 -3 -3 -2 -7 -5 1 -3 3 -3 4 -2 5 0 5 6 0 8 4 0 5 -8 1 -3 2 -3 5 1 5 5 4 0 5 -6 0 -5 2 1 3 4 4 0 8 -5 -3 -3 -3 -7 -1 -8 1 -3 2 -2 0 -3 -2 -5 -3 2 -3 0 0 1 0 2 -4 -1 -7 -2 -4 -3 -3 -5 -4 -2 -4 -1 -4 -1 0 -1 0 -5 -2 -8 0 -7 -2 -5 -3 -1 0 -3 1 -1 -4 -4 -3 -4 -5 4 -7 -3 -7 -2 -4 0 0 0 -1 -2 -4 4 -2 4 -3 5 -2 3 -6 1 -3 0 -2 0 -1 3 -4 1 -6 0 -8 7 0 4 1 -1 -2 -2 -6 -2 -5 -6 -1 -3 3 -2 0 -1 -1 -1 0 -2 -2 -4 -3 -2 -3 -2 3 -6 0 -1 -6 3 -5 3 -4 0 -3 -1 0 1 -2 -3 -3 1 -3 2 -3 -2 -2 0 -2 1 -4 0 -1 0 0 0 -1 0 0 0 0 0 0 0 -1 0 -2 3 -3 0 -5 -4 -3 -2 -5 -7 -3 -1 -5 6 -2 1 -1 0 0 0 -4 4 -4 0 1 2 4 4 5 2 1 -1 -1 1 -2 1 -4 -1 -5 -4 -3 -4 -1 0 -1 0 0 1 -1 3 -1 6 -2 3 -6 2 1 3 2 4 -2 1 0 3 3 5 0 -1 -2 -3 -4 1 -8 1 -5 3 -1 3 3 1 -2 4 -4 3 -2 1 1 5 2 6 0 2 -6 3 -4 0 0 4 2 4 4 4 3 7 3 7 -1 5 -1 2 -6 -2 -8 3 -7 2 -5 4 -4 4 -2 4 -4 4 -3 3 -5 5 -3 0 -1 3 1 2 -2 4 -1 5 3 4 1 6 1 1 -7 3 -4 2 0 4 2 6 5 7 -1 4 -6 4 -1 3 2 4 0 5 0 1 1 1 -1 3 2 3 0 3 -5 7 1 3 2 5 4 6 3 5 0 -1 0 0 -1 0 -3 0 -3 3 -4 3 -4 5 -2 5 -4 1 -1 1 1 1 -1 1 1 0 0 0 0 0 0 1 0 0 -1 1 2 1 4 2 5 6 7 -1 3 0 1 0 1 -1 2 1 3 0 4 0 1 0 1 -1 1 1 1 0 0 0 1 1 5 0 6 1 5 -1 -1 0 4 4 7 2 3 -1 0 1 1 1 4 3 7 0 9 0 6 -2 5 -1 -2 -1 1 -3 5 -2 6 0 7 4 8 1 5 0 2 0 0 1 2 -1 2 0 1 0 0 0 0 0 0 -1 3 0 7 -2 8 -3 6 -2 3 -1 6 -1 7 0 7 1 8 -1 4 0 -1 1 4 2 3 1 5 1 5 6 3 0 0 0 3 -4 4 -4 3 -1 0 -2 4 6 2 z M 600 230 l 2 1 1 0 -1 3 0 6 1 2 -3 2 -3 3 -6 0 -4 -2 -3 -5 1 -5 6 -2 4 -2 0 0 2 0 z M 625 240 l 2 2 2 2 0 2 0 2 -2 0 -2 0 -2 -2 -2 -2 0 -2 3 -3 z "
          />
          <path
            id="GyeongNam"
            className={generateClassName(tripsOfBeforeToday, 'GyeongNam')}
            d=" M 307 751 l 4 2 0 5 -1 4 0 0 -1 0 -1 4 1 4 1 0 -1 1 3 3 3 4 3 0 -1 -1 0 0 4 -2 7 -1 4 1 0 0 1 1 0 5 0 7 -1 4 -1 4 1 2 0 0 0 0 0 0 1 0 -1 1 0 0 0 0 -1 1 -2 -1 -1 1 -2 -3 -4 1 -6 -3 -2 -8 -6 2 -2 6 -6 -1 -2 -6 1 -4 -1 1 -1 -4 -2 -3 -2 -4 0 -7 2 -3 0 -1 0 0 0 -2 0 0 0 -1 0 -1 3 -1 2 -5 z M 441 731 l 3 1 1 2 -2 3 0 1 0 0 0 1 -1 0 0 4 3 3 1 5 0 4 0 0 -1 2 -2 3 -1 3 2 0 -1 1 2 -1 3 -2 3 -1 -1 1 -2 5 -1 4 -2 -1 -1 1 -1 1 3 2 0 7 -2 -3 -1 0 0 0 0 0 -1 1 -3 -1 -2 3 -3 4 -1 3 4 4 3 0 -1 1 -1 1 0 -1 -1 0 -1 0 -1 0 -4 2 -6 1 -1 -3 0 0 -1 0 -1 0 2 -5 -1 -3 -2 1 -2 0 -1 -3 5 -3 0 -6 0 -4 0 1 -1 -2 -2 1 0 1 0 0 -3 2 -4 2 -1 3 0 0 -1 0 -2 -4 -3 -3 -1 -4 0 -4 1 -1 0 0 3 -3 4 -4 1 0 0 0 0 0 3 3 4 1 0 -1 4 1 4 0 -1 -2 1 -1 -1 0 0 0 0 0 -3 -4 2 -5 5 -1 3 -5 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 -1 -1 1 0 1 1 0 -4 z M 429 693 l -4 1 -3 2 -2 4 1 3 0 0 0 1 2 3 0 3 0 0 0 1 -1 -1 -1 0 -1 1 4 2 3 6 2 2 -2 1 3 2 -2 1 0 0 0 0 -3 1 -4 1 1 -2 1 -1 -4 -1 3 -3 -4 -1 -3 -4 -3 1 -1 2 0 0 -1 0 0 0 -1 0 -1 -1 -2 -1 -1 2 0 0 -1 0 -3 -1 0 5 -3 2 -3 2 -7 4 0 4 2 -3 5 -2 4 -2 0 -1 0 -1 1 -1 1 1 1 0 0 0 1 -1 2 1 0 0 -1 4 1 4 0 0 0 0 1 -1 0 1 0 0 0 1 2 1 -4 3 -2 2 -1 0 0 0 -1 0 0 0 0 0 0 0 0 0 -4 -1 -1 2 4 2 -2 3 -1 5 -1 7 1 6 1 -2 0 0 1 0 1 -1 0 0 0 0 -1 -1 1 0 0 0 0 -2 -1 -1 4 2 1 5 -1 -2 -1 4 -2 4 -4 2 -6 0 0 -4 5 -1 -5 -3 -1 -3 -1 2 0 -1 -1 2 -2 -1 -1 -1 -2 1 -2 -1 -1 1 -1 -1 -1 0 1 0 -1 -3 4 -1 4 -1 0 -1 -3 -5 -1 -4 -1 1 0 -1 -1 0 0 0 -1 2 -2 3 0 3 0 0 0 0 0 0 0 0 0 0 -4 2 -2 -1 0 0 0 -1 -1 -1 1 -1 0 -1 0 0 0 0 0 0 0 -1 0 0 0 0 0 0 -4 0 -6 0 -2 7 -6 1 -4 2 0 1 -3 -4 -3 -2 3 -1 -2 0 -2 0 0 -1 -1 0 1 0 -1 1 0 0 -4 -1 -5 -4 -1 -3 0 1 2 -2 1 -2 -1 -2 0 -4 1 -2 0 0 0 0 -2 -2 0 -5 1 -4 2 -3 -3 2 -2 5 -1 4 0 0 0 0 0 0 0 0 -2 0 0 0 1 -3 -2 0 1 0 -3 1 2 2 2 4 0 3 -1 0 0 1 -1 1 1 0 0 0 0 -1 -1 0 -1 -1 -2 2 -3 -2 0 0 -1 0 0 0 0 1 0 0 -3 1 -1 -2 0 0 0 -2 -4 -3 1 3 -1 2 1 0 0 0 -1 1 1 0 0 1 0 0 0 0 0 0 0 0 0 1 -2 1 -4 5 -5 0 -2 -2 0 0 0 0 -1 1 -5 2 -4 1 0 0 -1 -1 -2 -5 3 -6 0 -3 -1 -2 -3 -5 -4 -3 -3 -4 -4 -4 0 -4 -4 -6 -5 -3 -4 -6 0 -8 -1 -4 -2 -3 -3 -8 4 -4 2 -3 -1 -4 0 0 0 0 0 -1 2 -3 3 -5 3 -3 1 -5 -4 -3 0 -5 -2 -8 -6 -6 2 -8 1 -3 2 -4 1 -8 2 -7 3 -3 0 -5 2 -8 5 -3 3 -4 3 -6 5 -2 6 -2 3 -2 4 -3 3 -5 3 -2 4 5 4 3 1 4 3 -1 1 0 5 3 7 2 8 0 5 2 1 0 1 0 1 4 2 4 5 4 3 3 2 4 1 7 -2 4 -1 0 0 0 -2 3 5 3 3 2 2 0 3 -2 8 -1 7 1 3 3 5 3 7 -1 7 -3 5 0 2 -3 3 -7 0 5 1 7 3 3 3 3 6 3 7 -2 8 1 7 2 8 0 6 -3 5 -1 4 -5 4 -3 3 -1 3 0 5 4 7 0 0 8 -5 5 4 4 3 2 2 0 0 0 1 0 3 -1 1 3 5 3 4 3 2 3 4 5 6 2 4 1 1 7 -2 3 0 0 0 3 -3 2 -7 0 -3 6 -1 5 -4 1 -6 3 -1 3 -3 -1 -2 0 -1 4 -4 6 -7 1 -6 2 -5 1 -1 6 0 5 -9 0 -4 1 2 2 5 4 1 3 -2 2 -3 2 -4 1 2 -2 0 -1 -4 -1 -2 6 -3 -2 -1 -3 -3 1 -2 -1 -2 0 -1 1 0 -3 -2 -6 -2 3 -1 1 0 -1 -1 -1 0 -1 -1 1 -3 -3 -3 2 1 0 -1 0 1 1 -1 0 -2 -5 -2 -6 4 -6 z "
          />
          <path
            id="JeJu"
            className={generateClassName(tripsOfBeforeToday, 'JeJu')}
            d=" M 115 930 l 5 2 3 2 5 3 6 2 3 5 -1 4 0 0 1 0 0 0 1 1 2 1 -2 1 3 0 -1 7 -2 1 -3 7 -4 4 -3 5 -3 5 -5 4 -5 0 -3 1 0 0 0 0 0 0 -1 1 -2 1 0 1 -3 1 -8 2 -4 0 0 0 -2 0 -3 2 -6 3 -7 0 -8 1 -7 1 -7 -1 -8 0 -7 0 -6 1 -3 5 -6 -1 -3 -4 -4 -3 -5 -2 -2 -4 -2 -8 2 -7 3 -4 1 0 1 0 3 -3 4 -3 3 -5 3 -4 4 -2 6 -4 4 -2 5 -1 6 -1 7 -3 4 -2 4 -1 5 -1 -1 1 4 -1 7 -1 6 -2 3 -3 1 1 0 0 1 0 0 1 0 0 1 0 2 -1 2 0 1 0 0 0 1 0 6 -1 z "
          />
        </g>
      </svg>
      <div className="achievementMsg">
        {isTripKing ? (
          <>
            <p>트로피를 획득했어요.</p>
            <p>
              당신은~ 여행 왕!!
              <CrownTwoTone className="crown" twoToneColor="#7309ec" />
            </p>
          </>
        ) : (
          <>
            <p>지도를 모두 물들여</p>
            <p>트로피를 획득하세요!</p>
          </>
        )}
      </div>
      <div className="achievement">
        <ProgressBar className="progress">
          {isTripKing ? <ProgressBar variant="success" now={visitRate} /> : <ProgressBar animated now={visitRate} />}
        </ProgressBar>
        <TrophyFilled className={`trophy ${isTripKing && 'tripKing'}`} />
      </div>
    </Korea>
  );
}

export default TripMap;
