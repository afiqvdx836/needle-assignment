import React, { useState, useEffect } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import DogFeed from './components/DogFeed';
import { auth, db } from './firebase';
import DogBreeds from './components/DogBreeds';
import { doc, updateDoc } from "firebase/firestore";
import MainContent from './components/MainContent';
import Header from './components/Header';

function App() {

  const [user, setUser] = useState(null);
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  useEffect(() => {
    // Firebase listener to check if a user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe; // Clean up the listener when the component unmounts
  }, []);

  const handleSelectBreed = async (breeds) => {
    setSelectedBreeds(breeds);
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        favoriteBreeds: breeds
      });
      console.log('Favorite breeds saved!');
    }
  };

  return (
    <div className="App">
      
      <Header />
      {!user ? (
        <>
          <MainContent />
          {/* <Signup />
          <Login /> */}
        </>
      ) : (
        <>
          <div className='top-wrapper'>
            <h2>Welcome, {user.email}</h2>
            <Logout />
          </div>
          <DogBreeds onSelectBreed={handleSelectBreed} />
          {selectedBreeds.length > 0 && <DogFeed selectedBreeds={selectedBreeds} user={user} />}
        </>
      )}
    </div>
  );
}

export default App;
