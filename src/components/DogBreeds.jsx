import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const DogBreeds = ({ onSelectBreed }) => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        setBreeds(Object.keys(response.data.message));
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  const handleSelectBreed = (breed) => {
    if (selectedBreeds.length < 3) {
      setSelectedBreeds([...selectedBreeds, breed]);
      onSelectBreed([...selectedBreeds, breed]);
    } else {
      alert('You can only select up to 3 breeds');
    }
  };

  return (
    <div className='dogbreeds-wrapper'>
      <h2>Select up to 3 Favorite Breeds</h2>
      <div className="dog-grid-img-wrapper">
        <div className="dog-grid">
          {breeds.map((breed) => (
            <div key={breed} className="dog-card">
              {breed} <button onClick={() => handleSelectBreed(breed)}>Select</button>
            </div>
          ))}
        </div>
        <h3>Selected Breeds: {selectedBreeds.join(', ')}</h3>
      </div>
      
    </div>
  );
};

export default DogBreeds;
