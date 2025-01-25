import React, { useState, Suspense } from 'react';
import './App.css';

const Login = React.lazy(() => import('./Login'));
const SignIn = React.lazy(() => import('./SignIn'));

function App() {
  const [showComponentLogin, setShowComponentLogin] = useState(false);
  const [showComponentSignIn, setShowComponentSignIn] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const openLogin = () => {
    setShowComponentLogin(true);
    setShowComponentSignIn(false);
    setShowButtons(false); 
  };

  const openSignIn = () => {
    setShowComponentSignIn(true);
    setShowComponentLogin(false);
    setShowButtons(false); 
  };

  return (
    <div className="App">
      {showButtons && (
        <>
          <button onClick={openLogin} className="btn btn-info">Login</button>
          <button onClick={openSignIn} className="btn btn-info">SignIn</button>
        </>
      )}
      <div>
        {showComponentLogin && (
          <Suspense fallback={<div>Loading...</div>}>
            <Login setShowComponentLogin={setShowComponentLogin} />
          </Suspense>
        )}
      </div>
      <div>
        {showComponentSignIn && (
          <Suspense fallback={<div>Loading...</div>}>
            <SignIn setShowComponentSignIn={setShowComponentSignIn}/>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;
