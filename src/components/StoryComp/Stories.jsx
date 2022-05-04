import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import StoryCard from './StoryCard';
import { ColumnsWrapper, NoPosts } from './styles';
import { getFirstBatch, getNextBatch, separatePostsByColumn } from './utils';
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

  const fetchMorePosts = useCallback(() => {
    console.log('fetchMore');
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

  useEffect(() => {
    const db = getDatabase();
    const checkedLikesRef = ref(db, `users/${user.uid}/checkedLikes`);

    let isComponentMounted = true;

    setLoading(true);

    onValue(checkedLikesRef, (snapshot) => {
      if (snapshot.exists()) {
        const checkedLikes = snapshot.val();
        if (isComponentMounted) {
          setCheckedLikesObj(checkedLikes);
        }
      }
    });

    getFirstBatch(sortBy, searchUid)
      .then((res) => {
        if (isComponentMounted) {
          setPosts(() => {
            const posts = res.posts;
            setLastCardNum(posts.length - 1);
            return posts;
          });
          setLastPoint({ lastKey: res.lastKey, lastSortedValue: res.lastSortedValue });
        }
      })
      .catch((e) => {
        console.log(e);
        if (isComponentMounted) {
          setLoading(false);
        }
      });

    return () => {
      isComponentMounted = false;
      off(checkedLikesRef);
    };
  }, [searchUid, sortBy, user.uid]);

  return (
    <>
      <div>
        {posts?.length > 0 ? (
          <ColumnsWrapper>
            {separatePostsByColumn(posts).map((column, idx) => (
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
