import React, { useEffect, useCallback, useRef } from 'react';
import { getDatabase, get, ref } from 'firebase/database';
import { Scrollbars } from 'react-custom-scrollbars-2';
import StoriesContainer from './StoriesContainer';
import Travelers from './Travelers';
import { StoryCompWrapper } from './styles';
import { useDispatch } from 'react-redux';
import { setUsersInfo } from '../../redux/actions/usersInfo_action';

function StoryComp() {
  const db = getDatabase();
  const dispatch = useDispatch();
  const scrollbarRef = useRef(null);

  const getUsersInfo = useCallback(async () => {
    try {
      await get(ref(db, `userList`)).then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(setUsersInfo(snapshot.val()));
        } else {
          console.log('No userList data.');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [db, dispatch]);

  const scrollToTop = useCallback(() => {
    scrollbarRef.current?.scrollTop(194);
  }, []);

  useEffect(() => {
    getUsersInfo();
  }, [getUsersInfo]);
  return (
    <StoryCompWrapper>
      <Scrollbars autoHide ref={scrollbarRef}>
        <Travelers />
        <StoriesContainer scrollToTop={scrollToTop} />
      </Scrollbars>
    </StoryCompWrapper>
  );
}

export default StoryComp;
