import React, { useState } from 'react';
import './App.css';
import { findUsers, updateUser } from './FirebaseServer';
const bcrypt = require('bcryptjs');

function Profile({ user }) {
  const [password, setPassword] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!oldPass || !email || !phone) {
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
    if (oldPass.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Convert image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageUrl(base64String);
      };
    }
  };

  const editUser = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    
    // הצפנת הסיסמה החדשה
    const hashedPassword = password ? await bcrypt.hash(password.trim(), 10) : null;

    let updatedUser = {
      password: hashedPassword,
      email: email.trim(),
      phone: phone.trim(),
    };

    if (imageUrl) {
      updatedUser = {
        ...updatedUser,
        image: imageUrl,
      };
    }

    if (await checkPass()) {
      await handleSubmit(user.username, updatedUser);
      setLoading(false);
    }
  };

  const checkPass = async () => {
    const userToCheck = await findUsers({ username: user.username });

    // השוואת הסיסמה הישנה עם הסיסמה שנמצאת ב-Firebase
    const isPasswordValid = await bcrypt.compare(oldPass, userToCheck.password);

    if (isPasswordValid) {
      return true;
    } else {
      alert("Wrong password");
      return false;
    }
  };

  const handleSubmit = async (username, updatedUser) => {
    try {
      await updateUser({ username: username }, updatedUser);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error editing user: ", error.message);
      alert("Failed to edit product. Please try again.");
    }
  };

  const logout = () => {
    window.location.reload();
  };

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
  <div style={{ textAlign: "center", marginBottom: "30px" }}>
    <img src={user.image} alt="User Avatar" style={{ width: '150px', borderRadius: '50%', border: '3px solid #ddd' }} />
    <h2 style={{ marginTop: "10px" }}>Update Your Profile</h2>
  </div>

  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
    
    <div className="form-group" style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
      <h3>Enter your old password:</h3>
      <input
        className="form-control"
        type="password"
        placeholder="Old Password"
        value={oldPass}
        onChange={(e) => setOldPass(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
    </div>

    <div className="form-group" style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
      <h3>Update your details:</h3>
      <input 
        className="form-control" 
        type="file" 
        onChange={handleImageUpload} 
        style={{ marginBottom: "10px" }} 
      />
      <input
        className="form-control"
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <input
        className="form-control"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <input
        className="form-control"
        type="tel"
        pattern="\d{3}-\d{7}"
        placeholder="Phone Number (XXX-XXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <button 
        type="button" 
        onClick={editUser} 
        className="btn btn-primary" 
        disabled={loading}
        style={{ width: "30%", padding: "10px", borderRadius: "5px" }}
      >
        {loading ? "Editing..." : "Save Changes"}
      </button>
    </div>
  </div>

  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <button 
      className="btn btn-danger" 
      onClick={logout} 
      style={{ width: "30%", padding: "10px", borderRadius: "5px" }}
    >
      Logout
    </button>
  </div>
</div>

  );
}

export default Profile;
