import { CloseCircleOutlined, SwapRightOutlined } from '@ant-design/icons';
import React, { useState, useCallback } from 'react';
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useInput from '../../hooks/useInput';
import { DatePickerForm, FormFooter, PlansBox, SelectForm } from './styles';
import dayjs from 'dayjs';

import { getDatabase, ref, set, child, get } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { setPlanData } from '../../redux/actions/user_action';

function AddPlanForm({ handleClose }) {
  const [title, onChangeTitle] = useInput('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tripType, onChangeTripType] = useState('alone');
  const [region, onChangeRegion] = useInput('Seoul');
  const [detailAddress, onChangeDetailAddress] = useInput('');
  const [planInput, onChangePlanInput, setPlanInput] = useInput('');
  const [plans, setPlans] = useState([]);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const dbRef = ref(getDatabase());

  const getPlansData = async (user) => {
    try {
      await get(child(dbRef, `users/${user.uid}/plans`)).then((snapshot) => {
        if (snapshot.exists()) {
          const planArray = Object.entries(snapshot.val());
          dispatch(setPlanData(planArray));
        } else {
          console.log('No data available');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createPlan = () => {
    const plan = {
      title,
      startDate,
      endDate,
      tripType,
      days: dayjs(endDate).diff(startDate, 'day', true) + 1,
      region,
      detailAddress,
      planList: plans,
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

  const onClickDelBtn = (e) => {
    const target = e.target;
    const editPlans = plans.filter((plan) => target.parentNode.parentNode.id !== plan.id + '');
    setPlans(editPlans);
  };

  const db = getDatabase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startDateStr = dayjs(startDate).format('YYYY-MM-DD');
    const days = dayjs(endDate).diff(startDate, 'day', true) + 1;

    try {
      await set(ref(db, `users/${user.uid}/plans/${startDateStr + '_' + days + '_' + region}`), createPlan());
      getPlansData(user);
      setLoading(false);
      handleClose();
    } catch (error) {
      setSubmitError(error.message);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="tripTitle">
        <Form.Label column sm={2}>
          여행명
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={title} required onKeyDown={preventEnterSubmit} onChange={onChangeTitle} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="tripDate">
        <Form.Label column sm={2}>
          여행 기간
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
            여행 타입
          </Form.Label>
          <Col
            sm={10}
            className="mt-1"
            onChange={(e) => {
              onChangeTripType(e.target.id);
            }}
          >
            <Form.Check type="radio" inline="true" label="나홀로" name="tripTypes" id="alone" />
            <Form.Check type="radio" inline="true" label="가족" name="tripTypes" id="family" />
            <Form.Check type="radio" inline="true" label="우정" name="tripTypes" id="friends" />
            <Form.Check type="radio" inline="true" label="커플" name="tripTypes" id="couple" />
          </Col>
        </Form.Group>
      </fieldset>

      <Form.Group as={Row} className="mb-3" controlId="tripRegion">
        <Form.Label column sm={2}>
          여행 지역
        </Form.Label>
        <Col sm={10}>
          <SelectForm>
            <Form.Select defaultValue="Seoul" onChange={onChangeRegion}>
              <option>지역을 선택하세요</option>
              <option value="Seoul">서울특별시</option>
              <option value="Busan">부산광역시</option>
              <option value="DaeGu">대구광역시</option>
              <option value="InCheon">인천광역시</option>
              <option value="DaeJeon">대전광역시</option>
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
              <option value="Ulleung">울릉도</option>
              <option value="Dokdo">독도</option>
            </Form.Select>
          </SelectForm>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="detailAddress">
        <Form.Label column sm={2}>
          상세주소
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            value={detailAddress}
            onKeyDown={preventEnterSubmit}
            onChange={onChangeDetailAddress}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="tripPlan">
        <Form.Label column sm={2}>
          계획일정
        </Form.Label>
        <Col sm={10}>
          <InputGroup className="mb-3">
            <FormControl value={planInput} onChange={onChangePlanInput} onKeyPress={onkeyDownPlanInput} />
            <Button variant="outline-secondary">추가</Button>
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
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" type="submit" onSubmit={handleSubmit}>
            Add Plan
          </Button>
        </div>
      </FormFooter>
    </Form>
  );
}

export default AddPlanForm;
