import React, { useState, Suspense } from 'react';
import './App.css';
import { findUsers } from './FirebaseServer';

const Navbar = React.lazy(() => import('./Navbar'));

function Login() {
  const [showComponentNavbar, setShowComponentNavbar] = useState(false);
  const [responseNavbar, setResponseNavbar] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    // אם שם המשתמש ריק
    if (username === "") {
      alert("Wrong username/password");
      return;
    }
  
    // חיפוש המשתמש ב-Firebase
    const userToCheck = await findUsers({ username: username });
  
    // אם לא נמצא משתמש
    if (Object.keys(userToCheck).length === 0) {
      alert("Wrong username/password");
      return;
    }
  
    console.log("user", userToCheck);
    console.log("password", password);
    console.log("check pass", userToCheck.password);
  
    // אם סיסמאות תואמות
    if (password === userToCheck.password) {
      setResponseNavbar(userToCheck);
      setShowComponentNavbar(true);
    } else {
      alert("Wrong username/password");
    }
  };
  

  return (
    <div>
      {!showComponentNavbar ? (
        <>
          <h1>Login Page</h1>
          <div className="container">
            <input
              className="form-control"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="form-control"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={login} className="btn btn-secondary">
              Submit Login
            </button>
          </div>
        </>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar user={responseNavbar} />
        </Suspense>
      )}
    </div>
  );
}

export default Login;