import React, { useState, Suspense } from 'react';
import './App.css';

const App = React.lazy(() => import('./App'));

function Profile({ user }) {
    const [showComponentApp, setShowComponentApp] = useState(false);
    const logout = () => {
        setShowComponentApp(true); 
      };
  return (
    <div>
      <h3>Hello, {user.username}!</h3>




      <button onClick={logout} className="btn btn-info">Logout</button>
         <div>
                {showComponentApp && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <App/>
                  </Suspense>
                )}
              </div>
    </div>
  );
}

export default Profile;
