import { TrophyTwoTone } from '@ant-design/icons/lib/icons';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { TravelerList } from './styles';
import { useSelector } from 'react-redux';

function Travelers() {
  const usersInfo = useSelector((state) => state.usersInfo);
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    if (usersInfo) {
      const userList = Object.entries(usersInfo);
      userList.sort((prev, next) => {
        if (prev[1].tripCount < next[1].tripCount) return 1;
        if (prev[1].tripCount > next[1].tripCount) return -1;
        return 0;
      });
      console.log(userList);
      setSortedUsers(userList);
    }
  }, [usersInfo]);

  return (
    <TravelerList>
      <h2>
        Travel Ranking
        <TrophyTwoTone className="trophy" twoToneColor="#6f00ff" />
      </h2>
      <section>
        <Scrollbars autoHide>
          <ul>
            {sortedUsers.map((user, idx) => {
              return (
                <li key={user[0]}>
                  <img src={user[1].image} alt={user[1].nickname} />
                  <div>
                    <span className="nickname">
                      {idx === 0 && '🥇'}
                      {idx === 1 && '🥈'}
                      {idx === 2 && '🥉'}
                      {user[1].nickname}
                    </span>
                    <span className="tripCount">({user[1].tripCount}회)</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Scrollbars>
      </section>
    </TravelerList>
  );
}

export default React.memo(Travelers);
