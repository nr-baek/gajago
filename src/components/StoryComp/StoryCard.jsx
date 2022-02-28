import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from './styles';

function StoryCard({ postInfo }) {
  const usersInfo = useSelector((state) => state.usersInfo);
  return (
    usersInfo && (
      <Card>
        <img className="photo" src={postInfo.imgUrl} alt={postInfo.photoDesc} />
        <div className="cardBottom">
          <div className="userInfo">
            <img src={usersInfo[postInfo.uid].image} alt={usersInfo[postInfo.uid].nickname} />
            <span>{usersInfo[postInfo.uid].nickname}</span>
          </div>
          <div className="likes">
            <HeartOutlined className="heart" /> {postInfo.likes}
            {/* <HeartFilled /> */}
          </div>
        </div>
      </Card>
    )
  );
}

export default StoryCard;
