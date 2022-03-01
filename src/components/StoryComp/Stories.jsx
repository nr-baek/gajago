import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import StoryCard from './StoryCard';
import { ColumnsWrapper } from './styles';
import { getFirstBatch, getNextBatch } from './utils';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { useSelector } from 'react-redux';

function Stories({ sortBy, searchUid }) {
  const user = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [nextPosts_loading, setNextPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastPoint, setLastPoint] = useState({ lastKey: '', lastSortedValue: '' });
  const [checkedLikesObj, setCheckedLikesObj] = useState({});

  const db = getDatabase();

  const fetchMorePosts = useCallback(
    (sortBy, lastSortedValue, lastKey) => {
      console.log('fetchMorePosts', lastKey.length);
      if (lastKey.length > 0) {
        setNextPostsLoading(true);
        console.log('fetchMorePosts~~~HTTP');
        getNextBatch(sortBy, searchUid, lastSortedValue, lastKey)
          .then((res) => {
            setLastPoint({ lastKey: res.nextLastKey, lastSortedValue: res.nextLastSortedValue });
            if (res.posts.length > 0) {
              setPosts((prevPosts) => [...prevPosts, ...res.posts]);
            }
            setNextPostsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setNextPostsLoading(false);
          });
      }
    },
    [searchUid],
  );

  const seperatePosts = useCallback((posts) => {
    const fstColumnPost = [];
    const sndColumnPost = [];
    const trdColumnPost = [];

    posts.forEach((post, idx) => {
      if (idx === 0 || idx % 3 === 0) {
        fstColumnPost.push(post);
      } else if (idx % 3 === 1) {
        sndColumnPost.push(post);
      } else if (idx % 3 === 2) {
        trdColumnPost.push(post);
      }
    });

    return [fstColumnPost, sndColumnPost, trdColumnPost];
  }, []);

  const onClick = useCallback(() => {
    fetchMorePosts(sortBy, lastPoint.lastSortedValue, lastPoint.lastKey);
  }, [sortBy, lastPoint, fetchMorePosts]);

  useEffect(() => {
    const checkedLikesRef = ref(db, `users/${user.uid}/checkedLikes`);
    setLoading(true);
    onValue(checkedLikesRef, (snapshot) => {
      if (snapshot.exists()) {
        const checkedLikes = snapshot.val();
        setCheckedLikesObj(checkedLikes);
      }
    });

    getFirstBatch(sortBy, searchUid)
      .then((res) => {
        setPosts(res.posts);
        setLastPoint({ lastKey: res.lastKey, lastSortedValue: res.lastSortedValue });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });

    return () => {
      off(checkedLikesRef);
    };
  }, [searchUid, sortBy, db, user.uid]);
  return (
    <div>
      {/* {loading ? '로딩중...' : <button onClick={onClick}>데이터 추가버튼</button>}
      <p>{lastPoint.lastKey.length > 0 ? 'fetchMore' : 'no more data'}</p> */}
      <div onClick={onClick}>
        <button>클릭!</button>
      </div>
      <ColumnsWrapper>
        {seperatePosts(posts).map((column, idx) => (
          <div className="storiesColumn" key={idx}>
            {column.map((post) => (
              <StoryCard postInfo={post} key={post.key} checkedLikesObj={checkedLikesObj} />
            ))}
          </div>
        ))}
      </ColumnsWrapper>
    </div>
  );
}

export default Stories;
