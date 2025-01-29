import React, { useState, Suspense } from 'react';
import { addUser, findUsers } from './FirebaseServer';
import './App.css';

const Navbar = React.lazy(() => import('./Navbar'));

function SignIn() {
  const [showComponentNavbar, setShowComponentNavbar] = useState(false);
  const [responseNavbar, setResponseNavbar] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const Sign_in = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    const user = {
      username: username.trim(),
      password: password.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    const userToCheck = await findUsers({ username: username });
    if (Object.keys(userToCheck).length === 0){
      await handleSubmit(user);

      setResponseNavbar(user);
      setShowComponentNavbar(true);
      setLoading(false);
    } else {
      alert("Username already exists");
    }

  };

  const validateInputs = () => {
    if (!username || !email || !password || !phone) {
      alert("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email address.");
      return false;
    }
    if (!/^\d{3}-\d{7}$/.test(phone)) {
      alert("Phone number must follow the format XXX-XXXXXXX.");
      return false;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (user) => {
    try {
      await addUser(user);
      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user: ", error.message);
      alert("Failed to add user. Please try again.");
    }
  };

  return (
    <div>
      {!showComponentNavbar ? (
        <>
          <h1>Sign In Page</h1>
          <div className="container">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control"
              type="tel"
              pattern="\d{3}-\d{7}"
              placeholder="Phone Number (XXX-XXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={Sign_in} className="btn btn-secondary" disabled={loading}>
              {loading ? "Submitting..." : "Submit Sign In"}
            </button>
          </div>
        </>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar user={responseNavbar} />
        </Suspense>
      )}
    </div>
  );
}

export default SignIn;
