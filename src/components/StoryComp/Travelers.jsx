import { TrophyTwoTone, CrownTwoTone } from '@ant-design/icons/lib/icons';
import React, { useCallback, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { getDatabase, ref, get, query, orderByChild } from 'firebase/database';
import { TravelerList } from './styles';
import { useSelector } from 'react-redux';

function Travelers() {
  const usersInfo = useSelector((state) => state.usersInfo);
  const [trophyOwners, setTrophyOwners] = useState([]);
  console.log(trophyOwners);

  const db = getDatabase();

  const setImageURL = useCallback(
    (ownersArr) => {
      const deepCopyOwners = JSON.parse(JSON.stringify(ownersArr));

      deepCopyOwners.forEach((owner) => {
        owner.nickname = usersInfo[owner.key].nickname;
        owner.image = usersInfo[owner.key].image;
      });

      return deepCopyOwners;
    },
    [usersInfo],
  );

  const getTrophyOwners = useCallback(async () => {
    try {
      await get(query(ref(db, `trophyOwners`), orderByChild('tripCount'))).then((snapshot) => {
        if (snapshot.exists()) {
          const sortedOwnersArr = [];

          snapshot.forEach((child) => {
            sortedOwnersArr.unshift({
              key: child.key,
              ...child.val(),
            });
          });

          const owners = setImageURL(sortedOwnersArr);
          setTrophyOwners(owners);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [db, setImageURL]);

  useEffect(() => {
    if (usersInfo) {
      getTrophyOwners();
    }
  }, [usersInfo, getTrophyOwners]);

  return (
    <TravelerList>
      <h2>
        Traveler Rank
        <TrophyTwoTone className="trophy" twoToneColor="#6f00ff" />
      </h2>
      <section>
        <Scrollbars autoHide>
          <ul>
            {trophyOwners.map((owner, idx) => {
              return (
                <li key={owner.key}>
                  {idx === 0 && <CrownTwoTone className="crown" twoToneColor="#ff9d00" />}
                  <img src={owner.image} alt={owner.nickname} />
                  <div>
                    <span className="nickname">
                      <span className="ranking">
                        {idx === 0 && '1st'}
                        {idx === 1 && '2nd'}
                        {idx === 2 && '3rd'}
                      </span>{' '}
                      {owner.nickname}
                    </span>
                    <span className="tripCount">({owner.tripCount}회)</span>
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

export default Travelers;
