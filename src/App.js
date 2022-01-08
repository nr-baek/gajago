import loadable from '@loadable/component';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import MainPage from './pages/MainPage';
import { useEffect } from 'react';
// import LogInPage from './pages/LogInPage';
// import SignUpPage from './pages/SignUpPage';

const LogInPage = loadable(() => import('./pages/LogInPage'));
const SignUpPage = loadable(() => import('./pages/SignUpPage'));

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
