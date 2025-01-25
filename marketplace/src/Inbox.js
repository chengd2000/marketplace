import React from 'react';
import './App.css';

function Inbox({ user }) {
  return (
    <div>
      <h1>welcome to your inbox, {user.username}!</h1>
    </div>
  );
}

export default Inbox;
