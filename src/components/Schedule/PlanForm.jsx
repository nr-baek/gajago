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
import { setTrophyInfo } from '../../redux/actions/user_action';
import { createScheduleInfo, createTrophyInfoObj, getPlanData } from './utils';
import { setScheduleInfo } from '../../redux/actions/scheduleInfo_action';

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

  const uid = useSelector((state) => state.user.currentUser.uid);

  const dispatch = useDispatch();

  const setScheduleAndTrophyInfo = async (uid) => {
    const planArray = await getPlanData(uid);
    const scheduleInfo = createScheduleInfo(planArray);
    const trophyInfo = createTrophyInfoObj(scheduleInfo.schedulesByRegion.beforeToday);
    dispatch(setScheduleInfo(scheduleInfo));
    dispatch(setTrophyInfo(trophyInfo));
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
      const planKey = showEditForm ? planData.key : push(child(ref(db), `users/${uid}/plans`)).key;
      await set(ref(db, `users/${uid}/plans/` + planKey), createPlan());
      await setScheduleAndTrophyInfo(uid);
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
          <LeftMarginSpan>?????????</LeftMarginSpan>
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={title} required onKeyDown={preventEnterSubmit} onChange={onChangeTitle} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="tripDate">
        <Form.Label column sm={2}>
          <LeftMarginSpan>?????? ??????</LeftMarginSpan>
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
            <LeftMarginSpan>?????? ??????</LeftMarginSpan>
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
              label="?????????????"
              name="tripTypes"
              id="alone"
            />
            <Form.Check
              type="radio"
              defaultChecked={tripType === 'family'}
              inline="true"
              label="??????????"
              name="tripTypes"
              id="family"
            />
            <Form.Check
              type="radio"
              defaultChecked={tripType === 'friends'}
              inline="true"
              label="??????????"
              name="tripTypes"
              id="friends"
            />
            <Form.Check
              type="radio"
              defaultChecked={tripType === 'couple'}
              inline="true"
              label="??????????"
              name="tripTypes"
              id="couple"
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Form.Group as={Row} className="mb-3" controlId="tripRegion">
        <Form.Label column sm={2}>
          <LeftMarginSpan>?????? ??????</LeftMarginSpan>
        </Form.Label>
        <Col sm={10}>
          <SelectForm>
            <Form.Select defaultValue={region} onKeyDown={preventEnterSubmit} onChange={onChangeRegion}>
              <option>????????? ???????????????</option>
              <option value="Seoul">???????????????</option>
              <option value="Busan">???????????????</option>
              <option value="DaeGu">???????????????</option>
              <option value="InCheon">???????????????</option>
              <option value="DaeJeon">???????????????</option>
              <option value="GwangJu">???????????????</option>
              <option value="UlSan">???????????????</option>
              <option value="SeJong">?????????????????????</option>
              <option value="GyeongGi">?????????</option>
              <option value="GangWon">?????????</option>
              <option value="ChungBuk">????????????</option>
              <option value="ChungNam">????????????</option>
              <option value="JeonBuk">????????????</option>
              <option value="JeonNam">????????????</option>
              <option value="GyeongBuk">????????????</option>
              <option value="GyeongNam">????????????</option>
              <option value="JeJu">?????????????????????</option>
              <option value="overseas">??????</option>
            </Form.Select>
          </SelectForm>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="detailAddress">
        <Form.Label column sm={2}>
          <LeftMarginSpan>????????????</LeftMarginSpan>
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
          <LeftMarginSpan>????????????</LeftMarginSpan>
        </Form.Label>
        <Col sm={10}>
          <InputGroup className="mb-3">
            <FormControl value={planInput} onChange={onChangePlanInput} onKeyPress={onkeyDownPlanInput} />
            <Button variant="outline-secondary" onClick={onClickAddPlanBtn}>
              ??????
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
            ??????
          </Button>
          <Button variant="primary" type="submit" onSubmit={handleSubmit}>
            {showEditForm ? '????????????' : '????????????'}
          </Button>
        </div>
      </FormFooter>
    </Form>
  );
}

export default PlanForm;
