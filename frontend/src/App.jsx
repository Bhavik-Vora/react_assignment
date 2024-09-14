import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {ProtectedRoute} from "protected-route-react"
import CreateTasks from './components/Task/CreateTasks.jsx';
import FetchTask from './components/Task/FetchTasks.jsx';
import HomePage from './components/Home/Home.jsx';
import Layout from './components/Layout.jsx';

function App() {
  const isAuthenticated = true; 
  return (
    <Layout>


    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route
        path="/createtask"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CreateTasks />
          </ProtectedRoute>
        }
        />
      <Route
        path="/fetchtask"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <FetchTask />
          </ProtectedRoute>
        }
        />
    </Routes>
        </Layout>
  );
}

export default App;
