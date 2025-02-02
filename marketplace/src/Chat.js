import React, { useState, useEffect } from 'react';
import { addMessage, findMessagesByUsers } from './FirebaseServer';
import { Timestamp } from 'firebase/firestore';

function Chat({ user, user2, setShowComponentChat }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const close = () => {
    setShowComponentChat(false);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await findMessagesByUsers(user, user2);
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, [user, user2]);

  const validateInputs = () => {
    if (!content) {
      alert("Field is required.");
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
      receiver: user2.username,
    };
    await handleSubmit(message);

    setLoading(false);
  };

  const handleSubmit = async (message) => {
    try {
      await addMessage(message);
      alert("Message sent successfully!");
      setContent(''); // Clear the content
      // Refetch messages to display the new one
      const fetchedMessages = await findMessagesByUsers(user, user2);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error sending message: ", error.message);
      alert("Failed to send message. Please try again.");
    }
  };

  const formatDate = (date) => {
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleString();
    }
    return new Date(date).toLocaleString();
  };

  return (
    <div style={{ backgroundColor: "#f7f7f7", padding: "20px" }}>
  <button className="btn btn-danger close" onClick={close} style={{ position: "absolute", top: "20px", right: "20px" }}>
    X
  </button>

  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "20px" }}>
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
      {user.username}, your chat with {user2.username}
    </h2>

    <div style={{ width: "80%", textAlign: "center" }}>
      <h3 style={{ marginBottom: "20px" }}>Messages between {user.username} and {user2.username}</h3>

      <div className="row" style={{ marginBottom: "10px" }}>
        <div className="col" style={{ textAlign: "center" }}>
          <img src={user.image} alt="" style={{ width: "50px", borderRadius: "50%" }} />
        </div>
        <div className="col" style={{ textAlign: "center" }}>
          <img src={user2.image} alt="" style={{ width: "50px", borderRadius: "50%" }} />
        </div>
      </div>

      <div style={{ width: "100%", height: "300px", overflowY: "auto", marginBottom: "20px" }}>
        <ul style={{ paddingLeft: "0", listStyle: "none" }}>
          {messages.map((message) => (
            <li key={message.id} style={{ marginBottom: "15px" }}>
              <div
                style={{
                  backgroundColor: message.sender === user.username ? "#dcf8c6" : "#fff",
                  borderRadius: "10px",
                  padding: "10px",
                  maxWidth: "75%",
                  alignSelf: message.sender === user.username ? "flex-end" : "flex-start",
                  display: "inline-block",
                  marginBottom: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <strong>{message.sender}:</strong> {message.content}
                <br />
                <small style={{ fontStyle: "italic", color: "#999" }}>{formatDate(message.date)}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <textarea
        className="form-control"
        placeholder="Write your message here..."
        style={{
          width: "100%",
          height: "100px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        id="content"
      ></textarea>

      <button
        type="button"
        onClick={createMessage}
        className="btn btn-primary"
        style={{ width: "100%", padding: "10px", borderRadius: "10px" }}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Send Message"}
      </button>
    </div>
  </div>
</div>

  );
}

export default Chat;
