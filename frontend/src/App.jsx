import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "protected-route-react";
import CreateTasks from "./components/Task/CreateTasks.jsx";
import FetchTask from "./components/Task/FetchTasks.jsx";
import HomePage from "./components/Home/Home.jsx";
import Layout from "./components/layout/Layout.jsx";
import PrivateRoute from "./components/Auth/PrivateRoute.jsx";
import Login from "./components/Auth/Login.jsx";
import PublicRoute, { getTokenFromCookies } from "./components/Auth/PublicRoute.jsx";

function App() {
  const gettoken = getTokenFromCookies();
  const isAuthenticated = Boolean(gettoken); 
  return (
    <Layout isLoggedIn={isAuthenticated}>
      <Routes>
        <Route path="/login" element={ <PublicRoute>
              <Login />
            </PublicRoute>} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/createtask"
          element={
            <PrivateRoute>
              <CreateTasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/fetchtask"
          element={
            <PrivateRoute>
              <FetchTask />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
