import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DogFeed = ({ selectedBreeds }) => {
    console.log('eaohjoha')
    console.log(selectedBreeds)
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

  return (
    <div>
      <h2>Your Dog Feed</h2>
      <div>
        {dogImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Random dog of ${selectedBreeds[index]}`} width="300px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogFeed;
