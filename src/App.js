import React, { useState, useEffect } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import { auth } from './firebase';

function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    // Firebase listener to check if a user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe; // Clean up the listener when the component unmounts
  }, []);

  return (
    <div className="App">
      <h1>Helloo</h1>
      {!user ? (
        <>
          <Signup />
          <Login />
        </>
      ) : (
        <>
          <h2>Welcome, {user.email}</h2>
          <Logout />
        </>
      )}
    </div>
  );
}

export default App;
