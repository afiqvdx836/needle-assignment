// src/components/Login.js
import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Store user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        favoriteBreeds: []
      });
  
      alert("User signed up successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully!");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      {/* <h2>Login</h2> */}
      <div className="input-wrapper">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="button-wrapper">
        <button className="login-btn" onClick={handleLogin}>Login</button>
        <button className="login-btn"  onClick={handleSignup}>Sign Up</button>
      </div>
      
    </div>
  );
};

export default Login;
