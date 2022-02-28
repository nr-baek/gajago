import React, { useEffect, useCallback } from 'react';
import { getDatabase, child, get, ref } from 'firebase/database';
import StoriesContainer from './StoriesContainer';
import Travelers from './Travelers';
import { StoryCompWrapper } from './styles';
import { useDispatch } from 'react-redux';
import { setUsersInfo } from '../../redux/actions/usersInfo_action';

function StoryComp() {
  const dbRef = ref(getDatabase());
  const dispatch = useDispatch();

  const getUsersInfo = useCallback(async () => {
    try {
      await get(child(dbRef, `userList`)).then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(setUsersInfo(snapshot.val()));
        } else {
          console.log('No one has a trophy.');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [dbRef, dispatch]);

  useEffect(() => {
    getUsersInfo();
  }, [getUsersInfo]);
  return (
    <StoryCompWrapper>
      <Travelers />
      <StoriesContainer />
    </StoryCompWrapper>
  );
}

export default StoryComp;
