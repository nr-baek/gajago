import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
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
      {loading ? '로딩중...' : <button onClick={onClick}>데이터 추가버튼</button>}
      <p>{lastPoint.lastKey.length > 0 ? 'fetchMore' : 'no more data'}</p>
    </div>
  );
}

export default Stories;
