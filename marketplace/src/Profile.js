import React, { useState, Suspense } from 'react';
import './App.css';

const App = React.lazy(() => import('./App'));

function Profile({ user }) {
    const [showComponentApp, setShowComponentApp] = useState(false);
    const logout = () => {
        setShowComponentApp(true); 
      };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", flexDirection: "column" }}>
      <h3>Hello, {user.username}!</h3>

      <br/>

      <div style={{ width: "50%", textAlign: "center" }}>
      <h4>change password:</h4>
      <input className="form-control" type="password" placeholder='password'></input>
      <button class="btn btn-secondary">Submit</button>
      </div>

      <br/>
      <br/>

      <div style={{ width: "50%", textAlign: "center" }}>
      <h4>change email:</h4>
      <input className="form-control" type="email" placeholder='email'></input>
      <button class="btn btn-secondary">Submit</button>
      </div>

      <br/>
      <br/>

      <div style={{ width: "50%", textAlign: "center" }}>
      <h4>change phone:</h4>
      <input className="form-control" type="tel" 
              pattern="[0-9]{3}-[0-9]{7}" 
              placeholder="phone number"></input>
      <button class="btn btn-secondary">Submit</button>
      </div>

      <br/>
      <br/>
      <br/>
      <br/>

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
