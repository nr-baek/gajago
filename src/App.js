// import loadable from '@loadable/component';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';

import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import MyTripsPage from './pages/MyTripsPage';
import ReviewsPage from './pages/ReviewsPage';
import StoryPage from './pages/StoryPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setPlanData, setUser } from './redux/actions/user_action';

// const LogInPage = loadable(() => import('./pages/LogInPage'));
// const SignUpPage = loadable(() => import('./pages/SignUpPage'));

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dbRef = ref(getDatabase());

  const getPlansData = async (user) => {
    try {
      await get(child(dbRef, `users/${user.uid}/plans`)).then((snapshot) => {
        if (snapshot.exists()) {
          const planArray = Object.values(snapshot.val());
          dispatch(setPlanData(planArray));
        } else {
          console.log('No data available');
          dispatch(setPlanData({}));
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
        getPlansData(user);
        navigate('/');
      } else if (!user) {
        navigate('/login');
        dispatch(clearUser());
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
