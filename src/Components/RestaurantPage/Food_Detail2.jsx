import React, { useState } from 'react';
import { Navbar } from "./navbar";
import Button from '@mui/material/Button';

import './Food_Detail2.css'; // Assuming the CSS file exists and is correctly linked
import biryani1 from '../Assets/biryani1.jpg';
import biryani2 from '../Assets/biryani2.jpg';
import biryani3 from '../Assets/biryani3.jpg';
import biryani4 from '../Assets/biryani4.jpg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Food_Detail2 = () => {
  

  const images = [biryani1, biryani2, biryani3, biryani4];
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const removeFromCart = () => {
    if (cartCount > 0) {
      setCartCount(cartCount - 1);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };
  
  
  const Slider = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };
  
    return (
      <>
        
      <div className="slider-container">
  
        <button className="slider-button prev" onClick={prevSlide}><ArrowBackIosIcon /></button>
        <img className="slider-image" src={images[currentSlide]} alt={`Slide ${currentSlide}`} />
        <button className="slider-button next" onClick={nextSlide}><ArrowForwardIosIcon /></button>
       
    
      </div>
      <h4 className='para'>BIRYANI</h4>
      </>
    
    );
  };
  return (
    <div>
      <Navbar />
    
      <Slider images={images} />
      <div className="cartss" onClick={toggleCart}>
        <span>{cartCount}</span>
      </div>
      <div className="buttons-container">
        <Button variant="contained" onClick={addToCart}>+</Button>
        <Button  variant="contained" onClick={addToCart}>ADD</Button>
        <Button variant="contained" onClick={removeFromCart}>-</Button>
      </div>
    </div>
  );
};

export default Food_Detail2;
