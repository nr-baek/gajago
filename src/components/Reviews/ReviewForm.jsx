import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { getStorage, ref as strRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, get, update, query, orderByChild } from 'firebase/database';
import { FrownTwoTone, MehTwoTone, SmileTwoTone } from '@ant-design/icons';
import { FormFooter } from '../Schedule/styles';
import { setPlanData } from '../../redux/actions/user_action';
import { EditPhotoButton } from './styles';

function ReviewForm({ tripInfo, resetTripInfo, closeModal, handleClose }) {
  const user = useSelector((state) => state.user.currentUser);

  const [validated, setValidated] = useState(false);
  const [reviewTitle, onChangeTitle] = useInput(tripInfo?.reviewTitle || '');
  const [expression, setExpression] = useState(tripInfo?.expression || '');
  const [imgFile, setImgFile] = useState(null);
  const [photoDesc, onChangePhotoDesc, setPhotoDesc] = useInput(tripInfo?.photoDesc || '');
  const [submitError, setSubmitError] = useState('');
  const [reviewText, onChangeReviewText] = useInput(tripInfo?.reviewText || '');
  const [openReview, setOpenReview] = useState(tripInfo?.openReview || false);
  const [loading, setLoading] = useState(false);
  const [reviewImage, setReviewImage] = useState(tripInfo?.imgUrl);

  const dispatch = useDispatch();

  const db = getDatabase();
  const storage = getStorage();
  const storageAddr = `review_image/${user.uid}/${tripInfo.key}`;
  const storageRef = strRef(storage, storageAddr);

  const getPlanData = async (user) => {
    try {
      await get(query(dbRef(db, `users/${user.uid}/plans`), orderByChild('startDate'))).then((snapshot) => {
        if (snapshot.exists()) {
          let planArray = [];

          snapshot.forEach((child) => {
            planArray.push({
              key: child.key,
              ...child.val(),
            });
            return false;
          });
          dispatch(setPlanData(planArray));
        } else {
          console.log('No data available');
          dispatch(setPlanData([]));
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createReviewData = (reviewImgURL = '') => {
    const reviewData = {
      reviewTitle,
      days: tripInfo.days,
      tripTitle: tripInfo.title,
      tripType: tripInfo.tripType,
      planKey: tripInfo.key,
      expression,
      imgUrl: reviewImgURL,
      reviewText,
      openReview,
      photoDesc,
      likes: 0,
      uid: user.uid,
      region: tripInfo.region,
      detailAddress: tripInfo.detailAddress,
      startDate: tripInfo.startDate,
      endDate: tripInfo.endDate,
      timeStamp: new Date().toJSON(),
    };

    return reviewData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
      setLoading(true);
      try {
        let downloadURL;
        if (imgFile) {
          const metadata = { contentType: imgFile.type };
          await uploadBytes(storageRef, imgFile, metadata);
          downloadURL = await getDownloadURL(strRef(storage, storageAddr));
        }

        const reviewData = createReviewData(downloadURL);
        const updates = {};
        if (imgFile) updates[`users/${user.uid}/plans/${tripInfo.key}/imageFileType`] = imgFile.type;
        updates[`users/${user.uid}/plans/${tripInfo.key}/review`] = true;
        updates[`users/${user.uid}/plans/${tripInfo.key}/openReview`] = openReview;
        if (openReview) {
          updates[`reviews/public/${tripInfo.key}`] = reviewData;
          updates[`reviews/user/${user.uid}/public/${tripInfo.key}`] = reviewData;
        } else {
          updates[`reviews/user/${user.uid}/private/${tripInfo.key}`] = reviewData;
        }

        await update(dbRef(db), updates);

        getPlanData(user);
        setLoading(false);
        handleClose();
      } catch (error) {
        setSubmitError(error.message);
        setLoading(false);
      }
    }

    setValidated(true);
  };

  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0];
    console.log(file);
    setImgFile(file);
  }, []);

  const handleCheck = useCallback((e) => {
    setOpenReview(e.target.checked);
  }, []);

  const clickEditBtn = useCallback(
    (e) => {
      e.preventDefault();
      setReviewImage(null);
      setPhotoDesc('');
      setOpenReview(false);
    },
    [setPhotoDesc],
  );

  useEffect(() => {
    return () => {
      resetTripInfo();
    };
  }, [resetTripInfo]);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="tripTitle">
        <Form.Label column sm={2}>
          후기 제목
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" required value={reviewTitle} onChange={onChangeTitle} />
          <Form.Control.Feedback type="invalid">여행 후기의 제목을 입력해주세요.</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            여행 표정
          </Form.Label>
          <Col sm={10} className="mt-1">
            <Form.Check
              type="radio"
              inline="true"
              defaultChecked={expression === 'good'}
              required
              label={
                <SmileTwoTone
                  style={{
                    fontSize: '30px',
                  }}
                  twoToneColor="#26b820"
                />
              }
              name="expression"
              id="good"
              onClick={(e) => setExpression(e.currentTarget.id)}
            />
            <Form.Check
              type="radio"
              inline="true"
              defaultChecked={expression === 'soSo'}
              label={
                <MehTwoTone
                  style={{
                    fontSize: '30px',
                  }}
                  twoToneColor="#e4af00"
                />
              }
              name="expression"
              id="soSo"
              onClick={(e) => setExpression(e.currentTarget.id)}
            />
            <Form.Check
              type="radio"
              inline="true"
              defaultChecked={expression === 'bad'}
              label={
                <FrownTwoTone
                  style={{
                    fontSize: '30px',
                  }}
                  twoToneColor="#e93600"
                />
              }
              name="expression"
              id="bad"
              onClick={(e) => setExpression(e.currentTarget.id)}
            />
            <span>여행 표정을 선택하세요.</span>
          </Col>
        </Form.Group>
      </fieldset>

      <Form.Group as={Row} className="mb-3" controlId="picture">
        <Form.Label column sm={2}>
          사진 첨부 (선택)
        </Form.Label>
        <Col sm={10}>
          {reviewImage ? (
            <p htmlFor="picture" style={{ lineHeight: '38px' }}>
              이미 등록된 사진이 있습니다.
              <EditPhotoButton onClick={clickEditBtn}>변경하기</EditPhotoButton>
            </p>
          ) : (
            <Form.Control type="file" onChange={handleFileInput} />
          )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="tripTitle">
        <Form.Label column sm={2}>
          사진 설명
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            required
            placeholder="60자 이내로 입력해주세요."
            maxLength="60"
            disabled={!imgFile && !(tripInfo?.imgUrl && reviewImage)}
            value={photoDesc}
            onChange={onChangePhotoDesc}
          />
          <Form.Control.Feedback type="invalid">사진에 대한 설명을 입력해주세요.</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="review">
        <Form.Label column sm={2}>
          여행 후기
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            required
            style={{ height: '120px' }}
            value={reviewText}
            onChange={onChangeReviewText}
          />
          <Form.Control.Feedback type="invalid">후기를 입력해주세요.</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="review">
        <Form.Label column sm={2}>
          공개 여부 (선택)
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="checkbox"
            id="custom-switch"
            label="스토리 공개(사진 첨부시에만 공개 가능합니다)"
            style={{ marginTop: '8px' }}
            checked={openReview}
            disabled={!imgFile && !reviewImage}
            onChange={handleCheck}
          />
        </Col>
      </Form.Group>

      <FormFooter>
        <p>{submitError && submitError}</p>
        <div>
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            작성하기
          </Button>
        </div>
      </FormFooter>
    </Form>
  );
}

export default ReviewForm;
