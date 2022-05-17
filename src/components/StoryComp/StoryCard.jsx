import { HeartFilled, HeartOutlined, SmileTwoTone, MehTwoTone, FrownTwoTone } from '@ant-design/icons';

import { Modal } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from './styles';
import ModalContent from './ModalContent';

function StoryCard({ postInfo, myCheckedLikesObj, isLastCard, setLoading }) {
  dayjs.extend(relativeTime);

  const usersInfo = useSelector((state) => state.usersInfo);
  const [show, setShow] = useState(false);
  const [tempLikes, setTempLikes] = useState(postInfo.likes);
  const [sizes, setSizes] = useState([0, 0]);

  const { photoDesc, reviewTitle, timeStamp, imgUrl, expression, key, uid: postUid } = postInfo;

  const editTempLikes = useCallback((isChecked) => {
    if (isChecked) {
      setTempLikes((prevLikes) => prevLikes - 1);
    } else {
      setTempLikes((prevLikes) => prevLikes + 1);
    }
  }, []);

  const color = useMemo(() => {
    return `hsla(${~~(360 * Math.random())},30%,30%,0.25)`;
  }, []);

  useEffect(() => {
    const $img = new Image();
    $img.src = imgUrl;

    $img.onload = function () {
      setSizes([$img.width, $img.height]);
    };

    return () => {
      $img.onload = null;
    };
  }, [imgUrl]);

  useLayoutEffect(() => {
    if (isLastCard) {
      setLoading(false);
    }
  }, [isLastCard, setLoading]);

  return usersInfo ? (
    <>
      <Card onClick={() => setShow(true)} colorCode={color} sizes={sizes}>
        <img className="photo" src={imgUrl} alt={photoDesc} />
        <div className="cardBottom">
          <div className="userInfo">
            <img src={usersInfo[postUid].image} alt={usersInfo[postUid].nickname} />
            <span>{usersInfo[postUid].nickname}</span>
          </div>
          <span className="time">{dayjs().to(dayjs(timeStamp))}</span>
          <div className="likes">
            {myCheckedLikesObj[key] ? <HeartFilled className="heart" /> : <HeartOutlined className="heart" />}
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
            myCheckedLikesObj={myCheckedLikesObj}
            tempLikes={tempLikes}
            editTempLikes={editTempLikes}
          />
        </Modal.Body>
      </Modal>
    </>
  ) : null;
}

export default React.memo(StoryCard);
