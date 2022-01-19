import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/actions/page_action';
import { useNavigate } from 'react-router-dom';

const usePageState = () => {
  const navigate = useNavigate();
  const currentPage = useSelector((state) => state.page.currentPage);
  const dispatch = useDispatch();

  const handler = useCallback(
    (e) => {
      dispatch(setPage(e.currentTarget.id));
      navigate(`/${e.currentTarget.id}`);
    },
    [dispatch, navigate],
  );
  return [currentPage, handler];
};

export default usePageState;
