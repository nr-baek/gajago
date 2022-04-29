import { CloseCircleOutlined, SwapRightOutlined } from '@ant-design/icons';
import React, { useState, useCallback, useMemo } from 'react';
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useInput from '../../hooks/useInput';
import { DatePickerForm, FormFooter, LeftMarginSpan, PlansBox, SelectForm } from './styles';
import dayjs from 'dayjs';

import { getDatabase, ref, set, push, child } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { setPlanData, setTrophyInfo } from '../../redux/actions/user_action';
import { createTrophyInfoObj, getPlanData } from './utils';

function PlanForm({ closeForm, showEditForm, planData, setModalInfo }) {
  const db = getDatabase();
  const initialState = useMemo(() => {
    return {
      title: planData?.title ? planData.title : '',
      startDate: planData?.startDate ? new Date(planData.startDate) : new Date(),
      endDate: planData?.endDate ? new Date(planData.endDate) : new Date(),
      tripType: planData?.tripType ? planData.tripType : 'alone',
      region: planData?.region ? planData.region : 'Seoul',
      detailAddress: planData?.detailAddress ? planData.detailAddress : '',
      plans: planData?.planList ? planData.planList : [],
    };
  }, [planData]);

  const [title, onChangeTitle] = useInput(initialState.title);
  const [startDate, setStartDate] = useState(initialState.startDate);
  const [endDate, setEndDate] = useState(initialState.endDate);
  const [tripType, onChangeTripType] = useState(initialState.tripType);
  const [region, onChangeRegion] = useInput(initialState.region);
  const [detailAddress, onChangeDetailAddress] = useInput(initialState.detailAddress);
  const [planInput, onChangePlanInput, setPlanInput] = useInput('');
  const [plans, setPlans] = useState(initialState.plans);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const trophyInfo = useSelector((state) => state.user.trophyInfo);

  const dispatch = useDispatch();

  const checkAndSetStateOfTrophy = (planArray = [], uid) => {
    const { isOwner, tripCount } = createTrophyInfoObj(planArray);
    const infoObj = {
      isOwner,
      tripCount,
    };

    if (trophyInfo.tripCount !== tripCount) {
      dispatch(setTrophyInfo(infoObj));
      set(ref(db, `userList/${uid}/tripCount`), infoObj.tripCount);
    }
  };

  const setPlanDataAndUpdateTrophy = async (uid) => {
    const planArray = await getPlanData(uid);
    dispatch(setPlanData(planArray));
    checkAndSetStateOfTrophy(planArray, uid);
  };

  const createPlan = () => {
    const plan = {
      title,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
      tripType,
      days: Math.round(dayjs(endDate).diff(startDate, 'day', true)) + 1,
      region,
      detailAddress,
      planList: plans,
      review: false,
    };

    return plan;
  };

  const preventEnterSubmit = useCallback((e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  }, []);

  const onkeyDownPlanInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (planInput.trim() !== '') {
        setPlans((prev) => {
          const prevLength = prev.length;
          if (prevLength) {
            return [...prev, { id: prev[prevLength - 1].id + 1, content: planInput }];
          }
          return [{ id: 1, content: planInput }];
        });
        setPlanInput('');
      }
    }
  };

  const onClickAddPlanBtn = (e) => {
    e.preventDefault();
    if (planInput.trim() !== '') {
      setPlans((prev) => {
        const prevLength = prev.length;
        if (prevLength) {
          return [...prev, { id: prev[prevLength - 1].id + 1, content: planInput }];
        }
        return [{ id: 1, content: planInput }];
      });
      setPlanInput('');
    }
  };

  const onClickDelBtn = (e) => {
    const target = e.target;
    const editPlans = plans.filter((plan) => target.parentNode.parentNode.id !== plan.id + '');
    setPlans(editPlans);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const planKey = showEditForm ? planData.key : push(child(ref(db), `users/${user.uid}/plans`)).key;
      await set(ref(db, `users/${user.uid}/plans/` + planKey), createPlan());
      await setPlanDataAndUpdateTrophy(user.uid);
      if (showEditForm && startDate !== initialState.startDate) {
        setModalInfo((prev) => ({ ...prev, date: dayjs(startDate).format('YYYY-MM-DD') }));
      }
      setLoading(false);
      closeForm();
    } catch (error) {
      setSubmitError(error.message);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="tripTitle">
        <Form.Label column sm={2}>
          <LeftMarginSpan>여행명</LeftMarginSpan>
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={title} required onKeyDown={preventEnterSubmit} onChange={onChangeTitle} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="tripDate">
        <Form.Label column sm={2}>
          <LeftMarginSpan>여행 기간</LeftMarginSpan>
        </Form.Label>
        <Col>
          <DatePickerForm>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(date);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <SwapRightOutlined style={{ fontSize: '20px', color: '#6e6e6e', margin: '0 10px' }} />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </DatePickerForm>
        </Col>
      </Form.Group>

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            <LeftMarginSpan>여행 타입</LeftMarginSpan>
          </Form.Label>
          <Col
            sm={10}
            className="mt-1"
            onChange={(e) => {
              onChangeTripType(e.target.id);
            }}
            onKeyDown={preventEnterSubmit}
          >
            <Form.Check
              type="radio"
              defaultChecked={tripType === 'alone'}
              inline="true"
              label="나홀로"
              name="tripTypes"
              id="alone"
            />
            <Form.Check
              type="radio"
              defaultChecked={tripType === 'family'}
              inline="true"
              label="가족"
              name="tripTypes"
              id="family"
            />
            <Form.Check
              type="radio"
              defaultChecked={tripType === 'friends'}
              inline="true"
              label="우정"
              name="tripTypes"
              id="friends"
            />
            <Form.Check
              type="radio"
              defaultChecked={tripType === 'couple'}
              inline="true"
              label="커플"
              name="tripTypes"
              id="couple"
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Form.Group as={Row} className="mb-3" controlId="tripRegion">
        <Form.Label column sm={2}>
          <LeftMarginSpan>여행 지역</LeftMarginSpan>
        </Form.Label>
        <Col sm={10}>
          <SelectForm>
            <Form.Select defaultValue={region} onKeyDown={preventEnterSubmit} onChange={onChangeRegion}>
              <option>지역을 선택하세요</option>
              <option value="Seoul">서울특별시</option>
              <option value="Busan">부산광역시</option>
              <option value="DaeGu">대구광역시</option>
              <option value="InCheon">인천광역시</option>
              <option value="DaeJeon">대전광역시</option>
              <option value="GwangJu">광주광역시</option>
              <option value="UlSan">울산광역시</option>
              <option value="SeJong">세종특별자치시</option>
              <option value="GyeongGi">경기도</option>
              <option value="GangWon">강원도</option>
              <option value="ChungBuk">충청북도</option>
              <option value="ChungNam">충청남도</option>
              <option value="JeonBuk">전라북도</option>
              <option value="JeonNam">전라남도</option>
              <option value="GyeongBuk">경상북도</option>
              <option value="GyeongNam">경상남도</option>
              <option value="JeJu">제주특별자치도</option>
              <option value="overseas">해외</option>
            </Form.Select>
          </SelectForm>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="detailAddress">
        <Form.Label column sm={2}>
          <LeftMarginSpan>상세주소</LeftMarginSpan>
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            required
            value={detailAddress}
            onKeyDown={preventEnterSubmit}
            onChange={onChangeDetailAddress}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="tripPlan">
        <Form.Label column sm={2}>
          <LeftMarginSpan>계획일정</LeftMarginSpan>
        </Form.Label>
        <Col sm={10}>
          <InputGroup className="mb-3">
            <FormControl value={planInput} onChange={onChangePlanInput} onKeyPress={onkeyDownPlanInput} />
            <Button variant="outline-secondary" onClick={onClickAddPlanBtn}>
              추가
            </Button>
          </InputGroup>
        </Col>
      </Form.Group>
      {!!plans.length && (
        <PlansBox>
          {plans.map((plan) => (
            <li key={plan.id} id={plan.id}>
              {plan.content} <CloseCircleOutlined className="delBtn" onClick={onClickDelBtn} />
            </li>
          ))}
        </PlansBox>
      )}
      <FormFooter>
        <p>{submitError && submitError}</p>
        <div>
          <Button variant="secondary" onClick={closeForm} disabled={loading}>
            닫기
          </Button>
          <Button variant="primary" type="submit" onSubmit={handleSubmit}>
            {showEditForm ? '수정하기' : '추가하기'}
          </Button>
        </div>
      </FormFooter>
    </Form>
  );
}

export default PlanForm;
