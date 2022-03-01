import React from 'react';
import { StyledModalContent } from './styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CameraOutlined, EnvironmentOutlined, HeartOutlined, CalendarOutlined } from '@ant-design/icons';

function ModalContent({ postInfo, usersInfo }) {
  dayjs.extend(relativeTime);
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

  return (
    <StyledModalContent>
      <div className="contentHeader">
        <div className="userInfo">
          <img src={usersInfo[postInfo.uid].image} alt={usersInfo[postInfo.uid].nickname} />
          <span>{usersInfo[postInfo.uid].nickname}</span>
          <span className="time">{dayjs().to(dayjs(postInfo.timeStamp))}</span>
        </div>
        <div className="likes">
          <HeartOutlined className="heart" />
          {postInfo.likes}
        </div>
      </div>
      <div className="travelInfo">
        <p>
          <CalendarOutlined className="icon" style={{ fontSize: '20px', color: '#5d09bd', marginRight: '5px' }} />{' '}
          <span>
            {postInfo.startDate === postInfo.endDate
              ? dayjs(postInfo.endDate).format('YYYY.MM.DD')
              : dayjs(postInfo.startDate).format('YYYY.MM.DD') + '~' + dayjs(postInfo.endDate).format('YYYY.MM.DD')}
          </span>
        </p>
        <p>
          <EnvironmentOutlined className="icon" style={{ fontSize: '20px', color: '#5d09bd', marginRight: '5px' }} />{' '}
          <span>{regionObj[postInfo.region] + ' ' + postInfo.detailAddress}</span>
        </p>
      </div>
      <div className="photoAndDesc">
        <img className="photo" src={postInfo.imgUrl} alt={postInfo.photoDesc} />
        <p>
          <CameraOutlined style={{ verticalAlign: 'middle', color: '#6f00ff', marginRight: '5px' }} />
          {postInfo.photoDesc}
        </p>
      </div>

      <p className="review">{postInfo.reviewText}</p>
    </StyledModalContent>
  );
}

export default ModalContent;
