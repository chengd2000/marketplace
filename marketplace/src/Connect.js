import React from 'react';

function Connect({ user, user2, product }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", flexDirection: "column" }}>
  <h2> {user.username} Welcome to Connect</h2>
  <div style={{ width: "50%", textAlign: "center" }}>
    <h3>Send message to {user2.username} about {product.name}</h3>
    <textarea 
      className="form-control" 
      placeholder="Write here your message"
      style={{ width: "100%", height: "150px" }}
    ></textarea>
    <br />
    <button className="btn btn-secondary">Send</button>
  </div>
</div>

    
  );
}

export default Connect; 
