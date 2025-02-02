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
  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <button
              type="button"
              onClick={goMarket}
              className="nav-link btn btn-light px-4 py-2 rounded-pill"
              aria-current="page"
              style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#007bff',
                transition: 'background-color 0.3s, color 0.3s',
                marginLeft: '15px',
              }}
            >
              Market
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              onClick={goProfile}
              className="nav-link btn btn-light px-4 py-2 rounded-pill"
              aria-current="page"
              style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#007bff',
                transition: 'background-color 0.3s, color 0.3s',
                marginLeft: '15px',
              }}
            >
              Profile
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              onClick={goInbox}
              className="nav-link btn btn-light px-4 py-2 rounded-pill"
              aria-current="page"
              style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#007bff',
                transition: 'background-color 0.3s, color 0.3s',
                marginLeft: '15px',
              }}
            >
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
