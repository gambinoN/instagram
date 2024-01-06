import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import * as ROUTES from './constants/routes';
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";

import ProtectedRoute from "./helpers/protected.route";

const Login = lazy(() => import('./pages/login'))
const SignUp = lazy(() => import('./pages/sign-up'))
const NotFound = lazy(() => import('./pages/not-found'))
const Profile = lazy(() => import('./pages/profile'))
const Dashboard = lazy(() => import('./pages/dashboard'))

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value = {{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route
            exact
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
                <Route element={<NotFound />} />
          </Routes>
        </Suspense> 
      </Router>
    </UserContext.Provider>
  );
}

export default App;
