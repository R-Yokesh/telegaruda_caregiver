import React, { Suspense, useEffect, useReducer, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import DefaultLayout from './Components/Layout/DefaultLayout';
import LoginPage from './Pages/Login/LoginPage';

function App() {
  return (
    <div className="App">
     <Router basename='/telegaruda'>
        <Suspense >
          <Routes>
            {/* <Route path='/' name='Login' element={<Login />} /> */}
            <Route path='/*' name='Home' element={<DefaultLayout/>} />
            <Route path='/login' name='Home' element={<LoginPage/>} />
          </Routes>
        </Suspense>
        {/* <DefaultLayout /> */}
      </Router>
    </div>
  );
}

export default App;
