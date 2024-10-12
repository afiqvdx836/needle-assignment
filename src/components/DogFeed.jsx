import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const DogFeed = ({ selectedBreeds, user }) => {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    const fetchDogImages = async () => {
      const imagePromises = selectedBreeds.map((breed) =>
        axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
      );
      const imageResponses = await Promise.all(imagePromises);
      setDogImages(imageResponses.map((res) => res.data.message));
    };

    if (selectedBreeds.length > 0) {
      fetchDogImages();
    }
  }, [selectedBreeds]);

  const handleLike = async (image) => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        likedImages: arrayUnion(image),
      });
      alert('You liked this image!');
    } else {
      alert('You must be logged in to like images.');
    }
  };

  return (
    <div>
      <h2>Your Dog Feed</h2>
      <div>
        {dogImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Random dog of ${selectedBreeds[index]}`} width="300px" />
            <button onClick={() => handleLike(image)}>Like</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogFeed;
