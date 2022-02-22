import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabase, child, get, ref } from 'firebase/database';
import Stories from './Stories';
import { StoryContainer } from './styles';
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
    <StoryContainer>
      <Travelers usersInfo={usersInfo} />
      {usersInfo && <Stories usersInfo={usersInfo} />}
    </StoryContainer>
  );
}

export default StoryComp;
