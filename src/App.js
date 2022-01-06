import loadable from '@loadable/component';
import { Route, Routes } from "react-router-dom";

const LogIn = loadable(() => import('./pages/LogInPage'));
const SignUp = loadable(() => import('./pages/SignUpPage'));


function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<LogIn />} />
      <Route exact path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
