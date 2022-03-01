import { HeartFilled, HeartOutlined, SmileTwoTone, MehTwoTone, FrownTwoTone, CameraOutlined } from '@ant-design/icons';

import { Modal } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from './styles';
import ModalContent from './ModalContent';

function StoryCard({ postInfo }) {
  dayjs.extend(relativeTime);
  const usersInfo = useSelector((state) => state.usersInfo);
  const [show, setShow] = useState(false);

  return (
    usersInfo && (
      <>
        <Card onClick={() => setShow(true)}>
          <img className="photo" src={postInfo.imgUrl} alt={postInfo.photoDesc} />
          <div className="cardBottom">
            <div className="userInfo">
              <img src={usersInfo[postInfo.uid].image} alt={usersInfo[postInfo.uid].nickname} />
              <span>{usersInfo[postInfo.uid].nickname}</span>
            </div>
            <span className="time">{dayjs().to(dayjs(postInfo.timeStamp))}</span>
            <div className="likes">
              <HeartOutlined className="heart" /> {postInfo.likes}
              {/* <HeartFilled /> */}
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
                {postInfo.expression === 'good' && <SmileTwoTone className="expression" twoToneColor="#26b820" />}
                {postInfo.expression === 'soSo' && <MehTwoTone className="expression" twoToneColor="#e4af00" />}
                {postInfo.expression === 'bad' && <FrownTwoTone className="expression" twoToneColor="#e93600" />}
                <span style={{ marginLeft: '10px' }}>{postInfo.reviewTitle}</span>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalContent postInfo={postInfo} usersInfo={usersInfo} />
          </Modal.Body>
        </Modal>
      </>
    )
  );
}

export default StoryCard;
