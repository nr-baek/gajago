import { HeartFilled, HeartOutlined, SmileTwoTone, MehTwoTone, FrownTwoTone } from '@ant-design/icons';

import { Modal } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from './styles';
import ModalContent from './ModalContent';

function StoryCard({ postInfo, checkedLikesObj }) {
  dayjs.extend(relativeTime);

  const usersInfo = useSelector((state) => state.usersInfo);
  const [show, setShow] = useState(false);
  const [tempLikes, setTempLikes] = useState(postInfo.likes);

  const { photoDesc, reviewTitle, timeStamp, imgUrl, expression, key, uid } = postInfo;

  const editTempLikes = useCallback((isChecked) => {
    if (isChecked) {
      setTempLikes((prevLikes) => prevLikes - 1);
    } else {
      setTempLikes((prevLikes) => prevLikes + 1);
    }
  }, []);

  return (
    usersInfo && (
      <>
        <Card onClick={() => setShow(true)}>
          <img className="photo" src={imgUrl} alt={photoDesc} />
          <div className="cardBottom">
            <div className="userInfo">
              <img src={usersInfo[uid].image} alt={usersInfo[uid].nickname} />
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
    )
  );
}

export default StoryCard;
