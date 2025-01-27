import React, { useState, Suspense } from 'react';
import './App.css';

const Chat = React.lazy(() => import('./Chat'));

function Inbox({ user }) {
  const [showComponentChat, setShowComponentChat] = useState(false);
  const [responseChat, setResponseChat] = useState(null);
  const [responseUser2, setResponseUser2] = useState(null);

  const openChat = (id) => {
    setResponseChat(user);
    setShowComponentChat(true);

    const user2 = {
      username: 'user2',
      password: 'otheruserpassword',
      email: 'aa@gmail.com',
      phone: '0974445876',
    };
    const newuser = {
      username: 'newuser',
      password: 'otheruserpassword',
      email: 'sdfsd@gmail.com',
      phone: '045656757',
    };
    const otheru = {
      username: 'otheru',
      password: 'otheruserpassword',
      email: 'sdfsd@gmail.com',
      phone: '045656757',
    };
    const moreuser = {
      username: 'moreuser',
      password: 'otheruserpassword',
      email: 'sdfsd@gmail.com',
      phone: '045656757',
    };
    const andthis = {
      username: 'andthis',
      password: 'otheruserpassword',
      email: 'sdfsd@gmail.com',
      phone: '045656757',
    };

    if (id === 1) {
      setResponseUser2(user2);
    }
    if (id === 2) {
      setResponseUser2(newuser);
    }
    if (id === 3) {
      setResponseUser2(otheru);
    }
    if (id === 4) {
      setResponseUser2(moreuser);
    }
    if (id === 5) {
      setResponseUser2(andthis);
    }
  };

  return (

    <div>
      <h1>Welcome to your inbox, {user.username}!</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ marginRight: '20px' }}>
          <button class="btn btn-secondary" onClick={() => openChat(1)}>user2</button>
          <br/>
          <button class="btn btn-secondary" onClick={() => openChat(2)}>newuser</button>
          <br/>
          <button class="btn btn-secondary" onClick={() => openChat(3)}>otheru</button>
          <br/>
         <button class="btn btn-secondary" onClick={() => openChat(4)}>moreuser</button>
         <br/>
         <button class="btn btn-secondary" onClick={() => openChat(5)}>andthis</button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {showComponentChat && (
            <Chat
              user={responseChat}
              user2={responseUser2}
              setShowComponentChat={setShowComponentChat}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default Inbox;
