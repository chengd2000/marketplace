import React, { useState, useEffect } from 'react';
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
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2.5rem", color: "#333" }}>
        Welcome to your inbox, {user.username}!
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: '100%', maxWidth: '800px', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#555' }}>Contacts</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {users.map(u => (
              <div 
                key={u.username} 
                onClick={() => openChat(u)} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                }}
              >
                <img 
                  src={u.image} 
                  alt={`${u.username} profile`} 
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    marginRight: '15px',
                  }}
                />
                <div>
                  <h3 style={{ margin: '0', fontSize: '1.2rem', color: '#333' }}>{u.username}</h3>

                </div>
              </div>
            ))}
          </div>

          <React.Suspense fallback={<div>Loading...</div>}>
            {showComponentChat && (
              <Chat
                user={responseChat}
                user2={responseUser2}
                setShowComponentChat={setShowComponentChat}
              />
            )}
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}

export default Inbox;

