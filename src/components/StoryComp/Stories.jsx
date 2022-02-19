import React, { useState } from 'react';
import { StoriesContainer } from './styles';

function Stories({ usersInfo }) {
  const [sort, setSort] = useState('latest');

  console.log(usersInfo);

  return (
    <StoriesContainer>
      <div className="top">
        <h2> Stories</h2>
        <div className="sort">
          <span className={sort === 'latest' ? 'active' : ''} onClick={() => setSort('latest')}>
            최신순
          </span>
          <span className={sort === 'likes' ? 'active' : ''} onClick={() => setSort('likes')}>
            좋아요순
          </span>
        </div>
      </div>
      <div className="stories">
        <div></div>
      </div>
    </StoriesContainer>
  );
}

export default Stories;
