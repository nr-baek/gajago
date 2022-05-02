import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import StoriesContainer from './StoriesContainer';
import Travelers from './Travelers';
import { StoryCompWrapper } from './styles';
import { useDispatch } from 'react-redux';
import { setUsersInfo } from '../../redux/actions/usersInfo_action';
import { clearStorySearchId } from '../../redux/actions/story_action';
import { getUsersInfo } from './utils';

function StoryComp() {
  const dispatch = useDispatch();
  const scrollbarRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const scrollToTop = useCallback(() => {
    if (scrollbarRef.current.getScrollTop() > 194) {
      scrollbarRef.current?.scrollTop(194);
    }
  }, []);

  useEffect(() => {
    let isComponentMounted = true;
    setLoading(true);

    getUsersInfo()
      .then((res) => {
        if (isComponentMounted) {
          dispatch(setUsersInfo(res));
          setLoading(false);
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
      dispatch(clearStorySearchId());
    };
  }, [dispatch]);
  return (
    <StoryCompWrapper>
      <Scrollbars autoHide ref={scrollbarRef}>
        <Travelers loading={loading} />
        <StoriesContainer scrollToTop={scrollToTop} />
      </Scrollbars>
    </StoryCompWrapper>
  );
}

export default StoryComp;
