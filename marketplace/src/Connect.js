import React from 'react';

function Connect({ user, user2, product, setShowComponentConnect }) {
  const close = () =>{
    setShowComponentConnect(false);
  };
  return (
    <div style={{ backgroundColor:"gray"}}>
<button class="btn btn-info close" onClick={close}>X</button>
    
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh", flexDirection: "column" }}>
    
  <h2> {user.username} Welcome to Connect about {product.name}</h2>
  <div style={{ width: "50%", textAlign: "center" }}>
    <h3>Send message to {user2.username} about {product.name}</h3>
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

export default Connect; 
