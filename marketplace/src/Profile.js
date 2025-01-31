import React, { useState } from 'react';
import './App.css';
import { findUsers,updateUser } from './FirebaseServer';

function Profile({ user }) {
       const [password, setPassword] = useState('');
       const [oldPass, setOldPass] = useState('');
       const [email, setEmail] = useState(user.email);
       const [phone, setPhone] = useState(user.phone);
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
      const editUser = async () => {
        if (!validateInputs()) return;
    
        setLoading(true);
        const updatedUser = {
            password: password.trim(),
            email: email.trim(),
            phone: phone.trim(),
          };
        console.log(updatedUser);
        if(await checkPass()){
          await handleSubmit(user.username,updatedUser);
          setLoading(false);
        }
    
        
      };
      const checkPass=async()=>{
        const userToCheck = await findUsers({ username: user.username });
        if (oldPass === userToCheck.password) {
          return true;
        } else {
          alert("Wrong password");
          return false;
        }
        
      };
      const handleSubmit = async (username,updatedUser) => {
                          try {
                            await updateUser({ username: username},updatedUser);
                            alert("User updated successfully!");
                          } catch (error) {
                            console.error("Error editing user: ", error.message);
                            alert("Failed to edit product. Please try again.");
                          }
                        };
   const logout = () =>{
    window.location.reload();

   }

  return (
    <div>
            
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            
          <div style={{ textAlign: "center" }}>
          <div className="container">

            <h3>enter your old password:</h3>
          <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                  />
                  <br/>
                  <br/>
                  </div>
          <div className="container">
          <h2> Enter your details you want to change</h2>

                  <input
                    className="form-control"
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  <br/>
                  <button type="button" onClick={editUser} className="btn btn-secondary" disabled={loading}>
                    {loading ? "Editing..." : "Edit User"}
                  </button>
                </div>
        </div>
        </div>
        <br/>
        <br/>
        <button class="btn btn-danger" onClick={logout}>Logout</button>

        </div>
    );
}

export default Profile;
