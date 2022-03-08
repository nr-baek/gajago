import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import StoryCard from './StoryCard';
import { ColumnsWrapper, NoPosts } from './styles';
import { getFirstBatch, getNextBatch } from './utils';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { useSelector } from 'react-redux';
import FetchMore from './FetchMore';

function Stories({ sortBy, searchUid }) {
  const user = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [nextPosts_loading, setNextPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastPoint, setLastPoint] = useState({ lastKey: '', lastSortedValue: '' });
  const [checkedLikesObj, setCheckedLikesObj] = useState({});

  const db = getDatabase();

  const fetchMorePosts = useCallback(() => {
    if (lastPoint.lastKey.length > 0) {
      setNextPostsLoading(true);
      getNextBatch(sortBy, searchUid, lastPoint.lastSortedValue, lastPoint.lastKey)
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
  }, [sortBy, searchUid, lastPoint]);

  const separatePosts = useCallback((posts) => {
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
    <>
      <div>
        {posts?.length > 0 ? (
          <ColumnsWrapper>
            {separatePosts(posts).map((column, idx) => (
              <div className="storiesColumn" key={idx}>
                {column.map((post) => (
                  <StoryCard postInfo={post} key={post.key} checkedLikesObj={checkedLikesObj} />
                ))}
              </div>
            ))}
          </ColumnsWrapper>
        ) : (
          <NoPosts>표시할 리뷰가 없습니다...</NoPosts>
        )}
      </div>
      <FetchMore loading={loading || nextPosts_loading} fetchMorePosts={fetchMorePosts} />
    </>
  );
}

export default Stories;
