import React, { useRef, useEffect } from 'react';
import { useMemo } from 'react';

const FetchMore = ({ loading, fetchMorePosts }) => {
  const fetchMoreTrigger = useRef(null);
  const fetchMoreObserver = useMemo(
    () =>
      new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          if (!loading) {
            fetchMorePosts();
          }
        }
      }),
    [fetchMorePosts, loading],
  );

  useEffect(() => {
    const $fetchMoreTrigger = fetchMoreTrigger.current;
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      fetchMoreObserver.unobserve($fetchMoreTrigger);
    };
  }, [fetchMoreObserver]);

  return <div id="fetchMore" className={loading ? 'loading' : ''} ref={fetchMoreTrigger} />;
};

export default FetchMore;
