import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabase, child, get, ref } from 'firebase/database';
import StoriesContainer from './StoriesContainer';
import { StoryCompWrapper } from './styles';
import Travelers from './Travelers';
import { useCallback } from 'react';

function StoryComp() {
  const [usersInfo, setUsersInfo] = useState(null);
  const dbRef = ref(getDatabase());

  const getUsersInfo = useCallback(async () => {
    try {
      await get(child(dbRef, `userList`)).then((snapshot) => {
        if (snapshot.exists()) {
          setUsersInfo(snapshot.val());
        } else {
          console.log('No one has a trophy.');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [dbRef]);

  useEffect(() => {
    getUsersInfo();
  }, [getUsersInfo]);
  return (
    <StoryCompWrapper>
      <Travelers usersInfo={usersInfo} />
      {usersInfo && <StoriesContainer usersInfo={usersInfo} />}
    </StoryCompWrapper>
  );
}

export default StoryComp;
