import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success('You liked this image!', { position: 'top-right', autoClose: 2000 });
      console.log('You liked this image!');
    } else {
      alert('You must be logged in to like images.');
    }
  };

  return (
    <div>
      <h2>Your Dog Feed</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
      >
        {dogImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='dogcard'>
              <img src={image} alt={`Random dog of ${selectedBreeds[index]}`} width="300px" />
              <button onClick={() => handleLike(image)}>Like</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <ToastContainer />
    </div>
  );
};

export default DogFeed;
