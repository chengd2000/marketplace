import React, { useState } from 'react';
import './App.css';
import { addMessage } from './FirebaseServer';

function Connect({ user, user2, product, setShowComponentConnect }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

  const close = () =>{
    setShowComponentConnect(false);
  };

  const validateInputs = () => {
          if (!content) {
            alert("field is required.");
            return false;
          }
          return true;
        };
  
      const createMessage = async () => {
          if (!validateInputs()) return;
      
          setLoading(true);
          const message = {
            content: content.trim(),
            date: new Date(),
            sender: user.username,
            receiver: user2.username
          };
      
          
          await handleSubmit(message);
      
          setLoading(false);
          
        };
  
        const handleSubmit = async (message) => {
            try {
              await addMessage(message);
              alert("Message send successfully!");
              setShowComponentConnect(false);
            } catch (error) {
              console.error("Error sending message: ", error.message);
              alert("Failed to send message. Please try again.");
            }
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
      value={content}
              onChange={(e) => setContent(e.target.value)}
    ></textarea>
    <button type="button" onClick={createMessage} className="btn btn-secondary" disabled={loading}>
              {loading ? "Submitting..." : "Submit New Message"}
            </button>
  </div>
</div>
</div>
    
  );
}

export default Connect; 
