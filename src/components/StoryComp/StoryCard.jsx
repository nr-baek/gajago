import { HeartFilled, HeartOutlined, SmileTwoTone, MehTwoTone, FrownTwoTone } from '@ant-design/icons';

import { Modal } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from './styles';
import ModalContent from './ModalContent';

function StoryCard({ postInfo, checkedLikesObj, isLastCard, setLoading }) {
  dayjs.extend(relativeTime);

  const usersInfo = useSelector((state) => state.usersInfo);
  const [show, setShow] = useState(false);
  const [tempLikes, setTempLikes] = useState(postInfo.likes);
  const [sizes, setSizes] = useState([]);

  const { photoDesc, reviewTitle, timeStamp, imgUrl, expression, key, uid } = postInfo;

  const editTempLikes = useCallback((isChecked) => {
    if (isChecked) {
      setTempLikes((prevLikes) => prevLikes - 1);
    } else {
      setTempLikes((prevLikes) => prevLikes + 1);
    }
  }, []);

  const color = useMemo(() => {
    return `hsla(${~~(360 * Math.random())},40%,70%,0.5)`;
  }, []);

  useEffect(() => {
    const $img = new Image();
    $img.src = imgUrl;

    const poll = setInterval(function () {
      if ($img.naturalWidth) {
        clearInterval(poll);
        setSizes([$img.naturalWidth, $img.naturalHeight]);
        if (isLastCard) {
          setLoading(false);
        }
      }
    }, 10);

    return () => {
      clearInterval(poll);
    };
  }, [imgUrl, isLastCard, setLoading]);

  return usersInfo && sizes[0] ? (
    <>
      <Card onClick={() => setShow(true)} colorCode={color}>
        <img className="photo" src={imgUrl} alt={photoDesc} />
        <div className="cardBottom">
          <div className="userInfo">
            <img src={usersInfo[uid].image} alt={usersInfo[uid].nickname} width={sizes[0]} height={sizes[1]} />
            <span>{usersInfo[uid].nickname}</span>
          </div>
          <span className="time">{dayjs().to(dayjs(timeStamp))}</span>
          <div className="likes">
            {checkedLikesObj[key] ? <HeartFilled className="heart" /> : <HeartOutlined className="heart" />}
            {tempLikes}
          </div>
        </div>
      </Card>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {expression === 'good' && <SmileTwoTone className="expression" twoToneColor="#26b820" />}
              {expression === 'soSo' && <MehTwoTone className="expression" twoToneColor="#e4af00" />}
              {expression === 'bad' && <FrownTwoTone className="expression" twoToneColor="#e93600" />}
              <span style={{ marginLeft: '10px' }}>{reviewTitle}</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContent
            postInfo={postInfo}
            usersInfo={usersInfo}
            checkedLikesObj={checkedLikesObj}
            tempLikes={tempLikes}
            editTempLikes={editTempLikes}
          />
        </Modal.Body>
      </Modal>
    </>
  ) : null;
}

export default StoryCard;
