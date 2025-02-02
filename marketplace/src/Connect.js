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
    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
  <button className="btn btn-danger close" onClick={close} style={{ position: "absolute", top: "20px", right: "20px", fontSize: "18px", backgroundColor: "#dc3545", border: "none", borderRadius: "50%" }}>
    X
  </button>

  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "40px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
    <h2 style={{ color: "#333", fontWeight: "600", marginBottom: "20px" }}>
      {user.username}, Welcome to Connect about {product.name}
    </h2>

    <div style={{ width: "80%", textAlign: "center", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ fontSize: "18px", marginBottom: "15px", color: "#444" }}>
        Send a message to {user2.username} about {product.name}
      </h3>

      <img src={user2.image} alt="" style={{ width: "60px", borderRadius: "50%", marginBottom: "15px" }} />

      <textarea
        className="form-control"
        placeholder="Write here your message"
        style={{
          width: "100%",
          height: "150px",
          padding: "10px",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          marginBottom: "15px",
          fontSize: "16px"
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button
        type="button"
        onClick={createMessage}
        className="btn btn-primary"
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "16px"
        }}
      >
        {loading ? "Submitting..." : "Submit New Message"}
      </button>

      <h4 style={{ marginTop: "20px", color: "#555", fontSize: "16px" }}>
        Or you can contact {user2.username} by email:{" "}
        <a href={`mailto:${user2.email}`} style={{ color: "#007bff", textDecoration: "none" }}>
          {user2.email}
        </a>{" "}
        or by phone:{" "}
        <a href={`tel:${user2.phone}`} style={{ color: "#007bff", textDecoration: "none" }}>
          {user2.phone}
        </a>
      </h4>
    </div>
  </div>
</div>

  );
}

export default Connect; 
