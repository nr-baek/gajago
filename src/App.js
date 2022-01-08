// import loadable from '@loadable/component';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions/user_action';

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
      if (user) {
        navigate('/');
        dispatch(setUser(user));
      } else {
        navigate('/login');
      }
    });
  }, [navigate, dispatch]);

  return isLoading ? (
    <div>loading..</div>
  ) : (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
