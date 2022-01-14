// import loadable from '@loadable/component';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import { clearUser, setUser } from './redux/actions/user_action';

// const LogInPage = loadable(() => import('./pages/LogInPage'));
// const SignUpPage = loadable(() => import('./pages/SignUpPage'));

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      if (user && user.displayName) {
        navigate('/');
        dispatch(setUser(user));
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
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/myTrips" element={<MyTripsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/story" element={<StoryPage />} />
    </Routes>
  );
}

export default App;
