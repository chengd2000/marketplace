import React, { useState, Suspense, useEffect } from 'react';
import './App.css';
import { findUsers, findMessagesByUser } from './FirebaseServer';

const Chat = React.lazy(() => import('./Chat'));

function Inbox({ user }) {
  const [showComponentChat, setShowComponentChat] = useState(false);
  const [responseChat, setResponseChat] = useState(null);
  const [responseUser2, setResponseUser2] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedMessages = await findMessagesByUser(user);
      fetchedMessages.sort((a, b) => a.date.seconds - b.date.seconds);
  
      const userPromises = fetchedMessages.flatMap(message => [
        findUsers({ username: message.sender }),
        findUsers({ username: message.receiver }),
      ]);
  
      const otherUsers = (await Promise.all(userPromises)).filter(user => user != null);
      const uniqueOtherUsers = Array.from(new Set(otherUsers.map(user => JSON.stringify(user)))).map(user => JSON.parse(user));
      
      setUsers(uniqueOtherUsers);
    };
  
    fetchUsers();
  }, [user]);


  const openChat = (user2) => {
    setResponseChat(user);
    setShowComponentChat(true);
    setResponseUser2(user2);

  };
  
  return (

    <div>
      <h1>Welcome to your inbox, {user.username}!</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ marginRight: '20px' }}>
        {users.map(u => (
          <h1 class="btn btn-secondary" onClick={() => openChat(u)}>{u.username}</h1>
        ))}
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
