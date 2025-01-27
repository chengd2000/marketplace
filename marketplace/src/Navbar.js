import React, { useState, Suspense } from 'react';
import './App.css';
const Market = React.lazy(() => import('./Market'));

const Profile = React.lazy(() => import('./Profile'));
const Inbox = React.lazy(() => import('./Inbox'));
function Navbar({ user, setShowComponentNavbar}) {
  const [showComponentProfile, setShowComponentProfile] = useState(false);
  const [responseProfile, setResponseProfile] = useState(null);
  const [showComponentMarket, setShowComponentMarket] = useState(true);
  const [responseMarket, setResponseMarket] = useState(user);
  const [showComponentInbox, setShowComponentInbox] = useState(false);
  const [responseInbox, setResponseInbox] = useState(null);
  
  const goMarket = () => {
    setResponseMarket(user);
    setShowComponentMarket(true);
    setShowComponentProfile(false);
    setShowComponentInbox(false);

  };
  const goProfile = () => {
    setResponseProfile(user);
    setShowComponentProfile(true);
    setShowComponentMarket(false);
    setShowComponentInbox(false);
  };
  const goInbox = () => {
    setResponseInbox(user);
    setShowComponentProfile(false);
    setShowComponentMarket(false);
    setShowComponentInbox(true);
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <button type="button" onClick={goMarket} className="navbar-brand" aria-current="page">
                  Market
                </button>
              </li>
              <li className="nav-item">
                <button type="button" onClick={goProfile} className="navbar-brand" aria-current="page">
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button type="button" onClick={goInbox} className="navbar-brand" aria-current="page">
                  Inbox
                </button>
              </li>
    
            </ul>
          </div>
        </div>
      </nav>
      {showComponentMarket && responseMarket && (
        <Suspense fallback={<div>Loading...</div>}>
          <Market user={responseMarket} setShowComponentMarket={setShowComponentMarket}/>
        </Suspense>
      )}
      {showComponentProfile && responseProfile && (
        <Suspense fallback={<div>Loading...</div>}>
          <Profile user={responseProfile} setShowComponentProfile={setShowComponentProfile}/>
        </Suspense>
      )}
      {showComponentInbox && responseInbox && (
        <Suspense fallback={<div>Loading...</div>}>
          <Inbox user={responseInbox} />
        </Suspense>
      )}
    </div>
  );
}

export default Navbar;
