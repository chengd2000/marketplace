import React from 'react';

function Chat({ user, user2, setShowComponentChat }) {
  const close = () =>{
    setShowComponentChat(false);
  };
  return (
    <div style={{ backgroundColor:"lightgray"}}>
<button class="btn btn-info close" onClick={close}>X</button>
    
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh", flexDirection: "column" }}>
    
  <h2> {user.username}, your chat with {user2.username}</h2>
  <div style={{ width: "50%", textAlign: "center" }}>
    <p>your previous messages...</p>
    <textarea 
      className="form-control" 
      placeholder="Write here your message"
      style={{ width: "100%", height: "150px" }}
    ></textarea>
    <button className="btn btn-primary">Send</button>
  </div>
</div>
</div>
    
  );
}

export default Chat; 
