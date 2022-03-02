import React, { useCallback, useState } from 'react';
import { StyledModalContent } from './styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CameraOutlined, EnvironmentOutlined, HeartOutlined, CalendarOutlined, HeartFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getDatabase, ref, update } from 'firebase/database';
import Scrollbars from 'react-custom-scrollbars-2';

function ModalContent({ postInfo, usersInfo, checkedLikesObj, tempLikes, editTempLikes }) {
  dayjs.extend(relativeTime);

  const { startDate, endDate, photoDesc, reviewText, timeStamp, imgUrl, detailAddress, region, key } = postInfo;
  const { nickname, image } = usersInfo[postInfo.uid];
  const [clicked, setClicked] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const db = getDatabase();

  const regionObj = {
    Seoul: '서울특별시',
    Busan: '부산광역시',
    DaeGu: '대구광역시',
    InCheon: '인천광역시',
    DaeJeon: '대전광역시',
    GwangJu: '광주광역시',
    UlSan: '울산광역시',
    SeJong: '세종시',
    GyeongGi: '경기도',
    GangWon: '강원도',
    ChungBuk: '충청북도',
    ChungNam: '충청남도',
    JeonBuk: '전라북도',
    JeonNam: '전라남도',
    GyeongBuk: '경상북도',
    GyeongNam: '경상남도',
    JeJu: '제주도',
    overseas: '해외',
  };

  const onClickLikesBtn = useCallback(
    async (isChecked, postInfo) => {
      try {
        const { key, uid } = postInfo;
        const updates = {};

        if (isChecked) {
          updates[`users/${user.uid}/checkedLikes/${key}`] = false;
          updates[`reviews/public/${key}/likes`] = tempLikes - 1;
          updates[`reviews/user/${uid}/public/${key}/likes`] = tempLikes - 1;
        } else {
          updates[`users/${user.uid}/checkedLikes/${postInfo.key}`] = true;
          updates[`reviews/public/${key}/likes`] = tempLikes + 1;
          updates[`reviews/user/${uid}/public/${key}/likes`] = tempLikes + 1;
        }
        await update(ref(db), updates);
        if (isChecked) {
          setClicked(false);
        } else {
          setClicked(true);
        }
        editTempLikes(isChecked);
      } catch (error) {
        console.log(error);
      }
    },
    [db, user.uid, editTempLikes, tempLikes],
  );

  return (
    <StyledModalContent>
      <Scrollbars autoHide>
        <div className="contentHeader">
          <div className="userInfo">
            <img src={image} alt={nickname} />
            <span>{nickname}</span>
            <span className="time">{dayjs().to(dayjs(timeStamp))}</span>
          </div>
          <div
            className="likes"
            onClick={() => {
              onClickLikesBtn(checkedLikesObj[key], postInfo);
            }}
          >
            {checkedLikesObj[key] ? (
              <HeartFilled className={`heart ${clicked ? 'effect' : ''}`} />
            ) : (
              <HeartOutlined className="heart" />
            )}
            {tempLikes}
          </div>
        </div>
        <div className="travelInfo">
          <p>
            <CalendarOutlined className="icon" style={{ fontSize: '20px', color: '#5d09bd', marginRight: '5px' }} />{' '}
            <span>
              {startDate === endDate
                ? dayjs(endDate).format('YYYY.MM.DD')
                : dayjs(startDate).format('YYYY.MM.DD') + ' ~ ' + dayjs(endDate).format('YYYY.MM.DD')}
            </span>
          </p>
          <p>
            <EnvironmentOutlined className="icon" style={{ fontSize: '20px', color: '#5d09bd', marginRight: '5px' }} />{' '}
            <span>{regionObj[region] + ' ' + detailAddress}</span>
          </p>
        </div>
        <div className="photoAndDesc">
          <img className="photo" src={imgUrl} alt={photoDesc} />
          <p>
            <CameraOutlined style={{ verticalAlign: 'middle', color: '#6f00ff', marginRight: '5px' }} />
            {photoDesc}
          </p>
        </div>

        <p className="review">{reviewText}</p>
      </Scrollbars>
    </StyledModalContent>
  );
}

export default ModalContent;
