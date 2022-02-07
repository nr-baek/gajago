import { TrophyTwoTone, CrownTwoTone } from '@ant-design/icons/lib/icons';
import React, { useCallback, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { getDatabase, ref, child, get } from 'firebase/database';
import { TravelerList } from './styles';

function Travelers() {
  const [trophyOwners, setTrophyOwners] = useState([]);

  const dbRef = ref(getDatabase());

  const getTrophyOwners = useCallback(async () => {
    await get(child(dbRef, `trophyOwners`)).then((snapshot) => {
      if (snapshot.exists()) {
        const owners = snapshot.val();
        const ownersArray = Object.entries(owners);
        ownersArray.sort((a, b) => {
          if (a[1].tripCount > b[1].tripCount) return -1;
          if (a[1].tripCount === b[1].tripCount) return 0;
          return 1;
        });
        setTrophyOwners(ownersArray);
      }
    });
  }, [dbRef]);

  useEffect(() => {
    getTrophyOwners();
  }, [getTrophyOwners]);

  return (
    <TravelerList>
      <h2>
        Traveler Rank
        <TrophyTwoTone className="trophy" twoToneColor="#6f00ff" />
      </h2>
      <section>
        <Scrollbars autoHide>
          <ul>
            {trophyOwners.map((owner, idx) => (
              <li key={owner[0]}>
                {idx === 0 && <CrownTwoTone className="crown" twoToneColor="#ff9d00" />}
                <img src={owner[1].image} alt={owner[1].nickname} />
                <div>
                  <span className="nickname">
                    {idx < 3 && <span className="ranking">{idx + 1}.</span>} {owner[1].nickname}
                  </span>
                  <span className="tripCount">({owner[1].tripCount}회)</span>
                </div>
              </li>
            ))}
          </ul>
        </Scrollbars>
      </section>
    </TravelerList>
  );
}

export default Travelers;
