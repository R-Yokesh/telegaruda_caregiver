import React, { Suspense, useEffect, useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import LogIn from "./Views/Login/LogIn";
import "./assets/Css/Subjective.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [loggedIn, setLoggedIn] = useState("");
  useEffect(() => {
    var login = sessionStorage.getItem("loggedIn");
    setLoggedIn(login);
  }, []);

  return (
    <div className="App">
      <Router basename="/telegaruda-caregiver">
        <Suspense>
          <AuthProvider>
            <Routes>
              {/* <Route path='/' name='Login' element={<Login />} /> */}
              {/* {loggedIn !== 'true' ? */}
              {/* ( */}
              <Route path="/" name="home" element={<LogIn />} />
              {/* ) : */}
              {/* ( */}
              <Route path="/*" name="Home" element={<DefaultLayout />} />
              {/* ) */}
              {/* } */}
            </Routes>
          </AuthProvider>
        </Suspense>
        {/* <DefaultLayout /> */}
      </Router>
    </div>
  );
}

export default App;
