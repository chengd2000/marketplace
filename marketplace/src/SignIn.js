import React, { useState, Suspense } from 'react';
import { addUser, findUsers } from './FirebaseServer';
import './App.css';
import defaultImageUrl from './guest-user.png'; 

const Navbar = React.lazy(() => import('./Navbar'));

const bcrypt = require('bcryptjs');

function SignIn() {
  const [showComponentNavbar, setShowComponentNavbar] = useState(false);
  const [responseNavbar, setResponseNavbar] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // setImageUrl(defaultImageUrl);
    if (file) {
      // Convert image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageUrl(base64String);
      };
    // } else {
    //   // Set default image if no file is selected
    //   // const defaultImageUrl = './guest-user.png';
    //   setImageUrl(defaultImageUrl);
    }
  };
  

  const Sign_in = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    // הצפנת הסיסמה לפני שמירת המידע
    const hashedPassword = await hashPassword(password.trim());

    const user = {
      username: username.trim(),
      password: hashedPassword,  
      email: email.trim(),
      phone: phone.trim(),
      image: imageUrl,
    };

    const userToCheck = await findUsers({ username: username });
    if (Object.keys(userToCheck).length === 0) {
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

  const hashPassword = async (password) => {
    const saltRounds = 10; // מספר הסיבובים לחיזוק ההצפנה
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  return (
    <div>
      {!showComponentNavbar ? (
        <>
          <h1>Sign In Page</h1>
          <div className="container">
            <input className="form-control" type="file" onChange={handleImageUpload} />
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
