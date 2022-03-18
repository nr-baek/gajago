import React, { useCallback, useMemo, useState } from 'react';
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
  const [posts, setPosts] = useState([]);
  const [lastPoint, setLastPoint] = useState({ lastKey: '', lastSortedValue: '' });
  const [checkedLikesObj, setCheckedLikesObj] = useState({});
  const [lastCardNum, setLastCardNum] = useState(null);

  const db = useMemo(() => {
    return getDatabase();
  }, []);

  const fetchMorePosts = useCallback(() => {
    if (lastPoint.lastKey.length > 0) {
      setLoading(true);
      getNextBatch(sortBy, searchUid, lastPoint.lastSortedValue, lastPoint.lastKey)
        .then((res) => {
          setLastPoint({ lastKey: res.nextLastKey, lastSortedValue: res.nextLastSortedValue });
          if (res.posts.length > 0) {
            setPosts((prevPosts) => {
              const newPosts = [...prevPosts, ...res.posts];
              setLastCardNum(newPosts.length - 1);
              return newPosts;
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [sortBy, searchUid, lastPoint]);

  const separatePosts = useCallback((posts) => {
    const fstColumnPost = [];
    const sndColumnPost = [];
    const trdColumnPost = [];

    posts.forEach((post, idx) => {
      post.num = idx;
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
        setPosts(() => {
          const posts = res.posts;
          setLastCardNum(posts.length - 1);
          return posts;
        });
        setLastPoint({ lastKey: res.lastKey, lastSortedValue: res.lastSortedValue });
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
                {column.map((post) => {
                  return (
                    <StoryCard
                      isLastCard={post.num === lastCardNum}
                      postInfo={post}
                      key={post.key}
                      setLoading={setLoading}
                      checkedLikesObj={checkedLikesObj}
                    />
                  );
                })}
              </div>
            ))}
          </ColumnsWrapper>
        ) : (
          <NoPosts>{loading ? 'loading...' : '표시할 리뷰가 없습니다...'}</NoPosts>
        )}
      </div>
      <FetchMore loading={loading} fetchMorePosts={fetchMorePosts} />
    </>
  );
}

export default React.memo(Stories);
