import React, { useState, useEffect } from 'react';
import Login from './Login';
import { auth, db } from '../firebase';

const MainContent = () => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        // Firebase listener to check if a user is logged in
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
        });
        return unsubscribe; // Clean up the listener when the component unmounts
    }, []);

  return (
    <div className="slider_area">
      <div className="single_slider slider_bg_1 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div className="slider_text">
                <h3>We Care <br /> <span>Your Pets</span></h3>
                <p>we shall never deny a guest even the most ridiculous request</p>
                <div className="form-wrapper">
                  <Login />
                </div>
                
                {/* <a href="/signup" className="boxed-btn4">Sign up</a>
                <a href="/login" className="boxed-btn4">Log In</a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="dog_thumb d-none d-lg-block">
          <img src="img/banner/dog.png" alt="Dog" />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
