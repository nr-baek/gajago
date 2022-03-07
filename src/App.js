// import loadable from '@loadable/component';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, orderByChild, query } from 'firebase/database';

import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import MyTripsPage from './pages/MyTripsPage';
import ReviewsPage from './pages/ReviewsPage';
import StoryPage from './pages/StoryPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setPlanData, setTrophyInfo, setUser } from './redux/actions/user_action';
import { checkTrophyInfo } from './components/Schedule/utils';
import { setPage } from './redux/actions/page_action';

// const LogInPage = loadable(() => import('./pages/LogInPage'));
// const SignUpPage = loadable(() => import('./pages/SignUpPage'));

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const db = getDatabase();

  const setPlanDataAndTrophy = async (user) => {
    try {
      await get(query(ref(db, `users/${user.uid}/plans`), orderByChild('startDate'))).then((snapshot) => {
        if (snapshot.exists()) {
          let planArray = [];

          snapshot.forEach((child) => {
            planArray.push({
              key: child.key,
              ...child.val(),
            });
            return false;
          });

          dispatch(setPlanData(planArray));

          const trophyInfo = checkTrophyInfo(planArray);
          dispatch(setTrophyInfo(trophyInfo));
        } else {
          dispatch(setPlanData([]));
          dispatch(
            setTrophyInfo({
              isOwner: false,
              tripCount: 0,
            }),
          );
          console.log('No data available');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      if (user && user.displayName) {
        dispatch(setUser(user));
        setPlanDataAndTrophy(user);
        navigate('/');
      } else if (!user) {
        navigate('/login');
        dispatch(clearUser());
        dispatch(setPage('schedule'));
      }
    });
  }, []);

  return isLoading ? (
    <div>loading..</div>
  ) : (
    <Routes>
      <Route path="/" element={<Navigate replace to="/schedule" />} />
      <Route path="/schedule" element={<MainPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/myTrips" element={<MyTripsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/story" element={<StoryPage />} />
    </Routes>
  );
}

export default App;
