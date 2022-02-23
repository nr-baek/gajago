import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { StoriesContainer } from './styles';

function Stories({ usersInfo }) {
  const [sortBy, setSortBy] = useState('latest');
  const [searchText, setSearchText] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [matchedNicknameList, setMatchedNicknameList] = useState([]);
  const [indexOfList, setIndexOfList] = useState(-1);

  const $input = useRef();
  const userInfoList = useMemo(() => Object.entries(usersInfo), [usersInfo]);

  const focusInput = useCallback(() => {
    $input.current.focus();
    setInputFocus(true);
  }, []);

  const onClickRemoveBtn = useCallback(() => {
    setSearchText('');
    setIndexOfList(-1);
    focusInput();
  }, [focusInput]);

  const updateMatchedNicknameList = useCallback(
    (text) => {
      const checkedList = [];

      userInfoList.forEach((user) => {
        if (user[1].nickname.includes(text)) {
          checkedList.push(user);
        }
      });

      setMatchedNicknameList(checkedList);
      setIndexOfList(-1);
    },
    [userInfoList],
  );

  const onKeyDownHandler = useCallback(
    (e) => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }

      if (matchedNicknameList.length) {
        if (e.key === 'ArrowDown' && indexOfList < matchedNicknameList.length - 1) {
          setIndexOfList((prev) => {
            setSearchText(matchedNicknameList[prev + 1][1].nickname);
            return prev + 1;
          });
        } else if (e.key === 'ArrowUp' && indexOfList > 0) {
          setIndexOfList((prev) => {
            setSearchText(matchedNicknameList[prev - 1][1].nickname);
            return prev - 1;
          });
        } else if (e.key === 'Enter' && indexOfList > -1) {
          $input.current.blur();
          updateMatchedNicknameList(searchText);
          // 여기서 searchText기반으로 get 요청 보내는 함수 호출~!
        }
      }
    },
    [matchedNicknameList, indexOfList, searchText, updateMatchedNicknameList],
  );

  const onChangeHandler = useCallback(
    (e) => {
      const text = e.target.value;
      setSearchText(text);
      updateMatchedNicknameList(text);
    },
    [updateMatchedNicknameList],
  );

  const onClickListHandler = useCallback(
    (e) => {
      const selectedNickname = usersInfo[e.currentTarget.id].nickname;
      setSearchText(selectedNickname);
      updateMatchedNicknameList(selectedNickname);
      setInputFocus(false);
      $input.current.blur();

      // 여기서 선택한 이름 인자로 받아 데이터 get하는 함수 호출~!
    },
    [usersInfo, updateMatchedNicknameList],
  );

  return (
    <StoriesContainer>
      <div className="top">
        <h2>Stories</h2>

        <div className={`searchBox ${inputFocus ? 'focused' : ''}`}>
          {!inputFocus && <SearchOutlined style={{ color: '#5c0bdf' }} onClick={focusInput} />}
          <input
            type="text"
            placeholder="닉네임 검색"
            value={searchText}
            onChange={onChangeHandler}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            onKeyDown={onKeyDownHandler}
            ref={$input}
          />
          {searchText.length > 0 && <CloseOutlined className="remove" onClick={onClickRemoveBtn} />}
          {inputFocus && searchText && (
            <div className="resultList">
              {matchedNicknameList.length ? (
                <ul aria-hidden="true" aria-label="submenu">
                  <p>닉네임을 선택해주세요.</p>
                  {matchedNicknameList.map((user, idx) => {
                    const uid = user[0];
                    const userInfo = user[1];

                    return (
                      <li
                        key={uid}
                        id={uid}
                        className={idx === indexOfList ? 'select' : ''}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={onClickListHandler}
                      >
                        <img src={userInfo.image} alt={userInfo.nickname} />
                        <span>{userInfo.nickname}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="noResultMsg">일치하는 닉네임이 없습니다.</p>
              )}
            </div>
          )}
        </div>
        <div className="sort">
          <span className={sortBy === 'latest' ? 'active' : ''} onClick={() => setSortBy('latest')}>
            최신순
          </span>
          <span className={sortBy === 'likes' ? 'active' : ''} onClick={() => setSortBy('likes')}>
            좋아요순
          </span>
        </div>
      </div>
      <div>story contents</div>
    </StoriesContainer>
  );
}

export default Stories;
