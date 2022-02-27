import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import StoryCard from './StoryCard';
import { ColumnsWrapper } from './styles';
import { getFirstBatch, getNextBatch } from './utils';

function Stories({ sortBy, searchUid }) {
  const [loading, setLoading] = useState(false);
  const [nextPosts_loading, setNextPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastPoint, setLastPoint] = useState({ lastKey: '', lastSortedValue: '' });

  console.log('posts', posts);

  const fetchMorePosts = (sortBy, lastSortedValue, lastKey) => {
    console.log('fetchMorePosts', lastKey.length);
    if (lastKey.length > 0) {
      setNextPostsLoading(true);
      console.log('fetchMorePosts~~~HTTP');
      getNextBatch(sortBy, lastSortedValue, lastKey)
        .then((res) => {
          setLastPoint({ lastKey: res.nextLastKey, lastSortedValue: res.nextLastSortedValue });
          if (res.posts.length > 0) {
            console.log(res.posts.length);
            setPosts((prevPosts) => [...prevPosts, ...res.posts]);
          }
          setNextPostsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setNextPostsLoading(false);
        });
    }
  };

  const onClick = useCallback(() => {
    fetchMorePosts(sortBy, lastPoint.lastSortedValue, lastPoint.lastKey);
  }, [sortBy, lastPoint]);

  useEffect(() => {
    setLoading(true);
    getFirstBatch(sortBy)
      .then((res) => {
        setPosts(res.posts);
        setLastPoint({ lastKey: res.lastKey, lastSortedValue: res.lastSortedValue });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [searchUid, sortBy]);
  return (
    <div>
      {/* {loading ? '로딩중...' : <button onClick={onClick}>데이터 추가버튼</button>}
      <p>{lastPoint.lastKey.length > 0 ? 'fetchMore' : 'no more data'}</p> */}
      <ColumnsWrapper>
        <div className="storiesColumn">
          <StoryCard
            photoURL={
              'data:image/jpeg;base64,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'
            }
          />
        </div>
        <div className="storiesColumn">
          <StoryCard
            photoURL={
              'https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20190425170948/friends-on-road-trip.jpg'
            }
          />
        </div>
        <div className="storiesColumn">
          <StoryCard
            photoURL={
              'https://image.goodchoice.kr/resize_490x348/adimg_new/46291/0/864725d5388a3bfb5de08b0c352cf0c9.jpg'
            }
          />
        </div>
      </ColumnsWrapper>
    </div>
  );
}

export default Stories;
