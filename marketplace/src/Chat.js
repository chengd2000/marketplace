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
    <div style={{ backgroundColor: "lightgray" }}>
      <button className="btn btn-info close" onClick={close}>X</button>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh", flexDirection: "column" }}>
        <h2>{user.username}, your chat with {user2.username}</h2>
        <div style={{ width: "50%", textAlign: "center" }}>
          <h2>Messages between {user.username} and {user2.username}</h2>
          <ul>
            {messages.map(message => (
              <li key={message.id}>
                <strong>{message.sender}:</strong> {message.content}
                <br />
                <small>{formatDate(message.date)}</small>
              </li>
            ))}
          </ul>
          <textarea
            className="form-control"
            placeholder="Write here your message"
            style={{ width: "100%", height: "150px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="content"
          ></textarea>
          <button type="button" onClick={createMessage} className="btn btn-secondary" disabled={loading}>
            {loading ? "Submitting..." : "Submit New Message"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
