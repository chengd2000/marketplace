import React, { useState, Suspense } from 'react';
import './App.css';
const Navbar = React.lazy(() => import('./Navbar'));

function SignIn() {
  const [showComponentNavbar, setShowComponentNavbar] = useState(false);
  const [responseNavbar, setResponseNavbar] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const user = {
      username: username,
      password: password,
      email: "aa@gmail.com",
      phone: "0974445876"
    };
    setResponseNavbar(user);
    setShowComponentNavbar(true);
  };

  return (
    <div>
      {!showComponentNavbar ? (
        <>
          <h1>Sign In Page</h1>
          <div className="container">
            <input 
              className="form-control" 
              type="text" 
              placeholder="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input className="form-control" type="email" placeholder="email" />
            <input 
              className="form-control" 
              type="tel" 
              pattern="[0-9]{3}-[0-9]{7}" 
              placeholder="phone number" 
            />
            <input 
              className="form-control" 
              type="password" 
              placeholder="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="button" onClick={login} className="btn btn-secondary">
              Submit Sign In
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

export default SignIn;
