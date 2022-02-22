import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState, useCallback, useRef } from 'react';
import { StoriesContainer } from './styles';

function Stories({ usersInfo }) {
  const [sort, setSort] = useState('latest');
  const [searchText, setSearchText] = useState('');
  const [listDisplay, setListDisplay] = useState(false);
  const [matchList, setMatchList] = useState([]);
  const [searchIndex, setSearchIndex] = useState(-1);
  const usersList = Object.entries(usersInfo);
  const inputDom = useRef();

  const onClickXBtn = useCallback(() => {
    setSearchText('');
    setSearchIndex(-1);
    inputDom.current.focus();
  }, []);

  const updateMatchList = useCallback(
    (text) => {
      const checkedMatchArr = [];
      usersList.forEach((user) => {
        if (user[1].nickname.includes(text)) {
          checkedMatchArr.push(user);
        }
      });
      setMatchList(checkedMatchArr);
    },
    [usersList],
  );

  const arrowKeyHandler = useCallback(
    (e) => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }
      if (matchList.length) {
        if (e.key === 'ArrowDown' && searchIndex < matchList.length - 1) {
          setSearchIndex((prev) => {
            setSearchText(matchList[prev + 1][1].nickname);
            return prev + 1;
          });
        } else if (e.key === 'ArrowUp' && searchIndex > 0) {
          setSearchIndex((prev) => {
            setSearchText(matchList[prev - 1][1].nickname);
            return prev - 1;
          });
        } else if (e.key === 'Enter' && searchIndex > -1) {
          inputDom.current.blur();
          updateMatchList(searchText);
          console.log(matchList[searchIndex][1].nickname);
        }
      }
    },
    [matchList, searchIndex, searchText, updateMatchList],
  );

  const onChangeHandler = useCallback(
    (e) => {
      const text = e.target.value;
      setSearchText(text);
      updateMatchList(text);
      setListDisplay(true);
      setSearchIndex(-1);
    },
    [updateMatchList],
  );

  const onFocusHandler = useCallback(() => {
    setListDisplay(true);
  }, []);

  const onBlurHandler = useCallback((e) => {
    setListDisplay(false);
  }, []);

  const onClickListHandler = useCallback(
    (e) => {
      e.preventDefault();
      console.log(e.currentTarget.id);
      setSearchText(usersInfo[e.currentTarget.id].nickname);
      setListDisplay(false);
      inputDom.current.blur();
    },
    [usersInfo],
  );

  return (
    <StoriesContainer>
      <div className="top">
        <h2> Stories</h2>

        <div className={`searchBox ${listDisplay ? 'focused' : ''}`}>
          {!listDisplay && <SearchOutlined style={{ color: '#5c0bdf' }} />}
          <input
            type="text"
            placeholder="닉네임 검색"
            value={searchText}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            onKeyDown={arrowKeyHandler}
            ref={inputDom}
          />
          {searchText.length > 0 && <CloseOutlined style={{ color: '#666' }} onClick={onClickXBtn} />}
          {listDisplay && searchText && (
            <div className="resultList">
              {matchList.length ? (
                <ul aria-hidden="true" aria-label="submenu">
                  <p>님네임을 선택해주세요.</p>
                  {matchList.map((user, idx) => {
                    return (
                      <li
                        key={user[0]}
                        id={user[0]}
                        className={idx === searchIndex ? 'select' : ''}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={onClickListHandler}
                      >
                        <img src={user[1].image} alt={user[1].nickname} />
                        <span>{user[1].nickname}</span>
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
          <span className={sort === 'latest' ? 'active' : ''} onClick={() => setSort('latest')}>
            최신순
          </span>
          <span className={sort === 'likes' ? 'active' : ''} onClick={() => setSort('likes')}>
            좋아요순
          </span>
        </div>
      </div>
      <div className="stories">게시된 글이 없습니다.</div>
    </StoriesContainer>
  );
}

export default Stories;
