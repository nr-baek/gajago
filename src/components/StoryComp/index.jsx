import React, { useEffect, useCallback, useRef, useState } from 'react';
import { getDatabase, get, ref } from 'firebase/database';
import { Scrollbars } from 'react-custom-scrollbars-2';
import StoriesContainer from './StoriesContainer';
import Travelers from './Travelers';
import { StoryCompWrapper } from './styles';
import { useDispatch } from 'react-redux';
import { setUsersInfo } from '../../redux/actions/usersInfo_action';
import { clearStorySearchId } from '../../redux/actions/story_action';

function StoryComp() {
  const db = getDatabase();
  const dispatch = useDispatch();
  const scrollbarRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const getUsersInfo = useCallback(async () => {
    try {
      setLoading(true);
      await get(ref(db, `userList`)).then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(setUsersInfo(snapshot.val()));
        } else {
          console.log('No userList data.');
        }

        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [db, dispatch]);

  const scrollToTop = useCallback(() => {
    if (scrollbarRef.current.getScrollTop() > 194) {
      scrollbarRef.current?.scrollTop(194);
      console.log('scrollToTop!!!');
    } else {
      console.log('실행x');
    }
  }, []);

  useEffect(() => {
    getUsersInfo();

    return () => {
      dispatch(clearStorySearchId());
    };
  }, [getUsersInfo, dispatch]);
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
