// import loadable from '@loadable/component';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import MyTripsPage from './pages/MyTripsPage';
import ReviewsPage from './pages/ReviewsPage';
import StoryPage from './pages/StoryPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setPublicReviewCount, setTrophyInfo, setUser } from './redux/actions/user_action';
import { countPublicReview, createScheduleInfo, createTrophyInfoObj, getPlanData } from './components/Schedule/utils';
import { Background } from './components/MainTemplate/styles';
import { LoadingOutlined } from '@ant-design/icons';
import { setScheduleInfo } from './redux/actions/scheduleInfo_action';

// const LogInPage = loadable(() => import('./pages/LogInPage'));
// const SignUpPage = loadable(() => import('./pages/SignUpPage'));

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setScheduleAndTrophyInfo = async (uid) => {
    try {
      const planArray = await getPlanData(uid);
      const scheduleInfo = createScheduleInfo(planArray);
      const trophyInfo = createTrophyInfoObj(scheduleInfo.schedulesByRegion.beforeToday);
      const publicReviewCount = countPublicReview(scheduleInfo.overallRegionalSchedule.beforeToday);
      dispatch(setScheduleInfo(scheduleInfo));
      dispatch(setTrophyInfo(trophyInfo));
      dispatch(setPublicReviewCount(publicReviewCount));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userInfo = {
        displayName: user?.displayName,
        uid: user?.uid,
        photoURL: user?.photoURL,
      };
      if (user && user.displayName) {
        dispatch(setUser(userInfo));
        setScheduleAndTrophyInfo(user.uid);
        navigate('/');
      } else if (!user) {
        navigate('/login');
        dispatch(clearUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isLoading ? (
    <Background>
      <div className="loading">
        loading.. <LoadingOutlined />
      </div>
    </Background>
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
