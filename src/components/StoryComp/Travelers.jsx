import { TrophyTwoTone } from '@ant-design/icons/lib/icons';
import React, { useCallback, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { TravelerList } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setStorySearchId } from '../../redux/actions/story_action';
import TravelersSkeleton from './TravelersSkeleton';

function Travelers({ loading }) {
  const usersInfo = useSelector((state) => state.usersInfo);
  const dispatch = useDispatch();

  const onClickUser = useCallback(
    (e) => {
      const $li = e.target.closest('li');
      if ($li) {
        const { uid } = $li.dataset;

        if (uid) {
          dispatch(setStorySearchId(uid));
        }
      }
    },
    [dispatch],
  );

  const sortUsers = useCallback((usersInfo) => {
    if (usersInfo) {
      const userList = Object.entries(usersInfo);
      userList.sort((prev, next) => {
        if (prev[1].publicReviewCount < next[1].publicReviewCount) return 1;
        if (prev[1].publicReviewCount > next[1].publicReviewCount) return -1;
        return 0;
      });

      return userList;
    }
  }, []);

  const sortedUsers = useMemo(() => sortUsers(usersInfo), [sortUsers, usersInfo]);

  return (
    <TravelerList>
      <h2>
        Travel Ranking
        <TrophyTwoTone className="trophy" twoToneColor="#6f00ff" />
      </h2>
      <section>
        <Scrollbars autoHide>
          <ul onClick={onClickUser}>
            {loading && <TravelersSkeleton />}
            {!loading &&
              sortedUsers?.length > 0 &&
              sortedUsers.map((user, idx) => {
                return (
                  <li key={user[0]} data-uid={user[0]}>
                    <div>
                      <img src={user[1].image} alt={user[1].nickname} />
                      <div>
                        <span className="nickname">
                          {idx === 0 && '🥇'}
                          {idx === 1 && '🥈'}
                          {idx === 2 && '🥉'}
                          {user[1].nickname}
                        </span>
                        <span className="publicReviewCount">({user[1].publicReviewCount}회)</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            {!loading && sortedUsers?.length === 0 && ' 이용자 정보 없음...'}
          </ul>
        </Scrollbars>
      </section>
    </TravelerList>
  );
}

export default React.memo(Travelers);
