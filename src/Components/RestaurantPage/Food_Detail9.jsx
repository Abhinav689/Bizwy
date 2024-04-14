import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from './navbar';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Food_Detail8.css';

// Import product images
import m1 from '../Assets/burger chicken/bc1.jpeg';
import m2 from '../Assets/burger chicken/bc2.jpeg';
import m3 from '../Assets/burger chicken/bc3.jpeg';
import m4 from '../Assets/burger chicken/bc4.jpeg';

const Food_Detail2 = () => {
  const products = [
    { id: 1, name: 'Chicken Spl Burger', description: 'A chicken burger is a delicious sandwich featuring a seasoned chicken patty served between two buns. The chicken patty can be made from ground chicken meat mixed with various herbs  , spices, and binders like breadcrumbs or eggs. These patties are often grilled, baked, or fried until cooked through and golden brown.Chicken burgers offer a versatile canvas for creativity, allowing for a wide range of flavor profiles and toppings. Common toppings include lettuce, tomato, onion, pickles, cheese, and various sauces such as mayonnaise, mustard, ketchup, barbecue sauce, or aioli. Some variations may also include avocado, bacon, caramelized onions, or jalapeños for an extra kick.The buns used for chicken burgers can vary from traditional sesame seed buns to whole grain or artisanal options, depending on personal preference and dietary considerations.           '
    , price: 699.05, image: m1},
  ];

  // State for cart count and cart visibility
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [mdata, setMdata] = useState({});
  const navigate = useNavigate();

  // Function to handle opening the modal and updating the cart
  const handleOpen = (data) => {
    let array = JSON.parse(localStorage.getItem("Cart")) || [];
    let isFound = false;

    for (let i = 0; i < array.length; i++) {
      if (array[i].id === data.id) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      data["q"] = 1;
      array.push(data);
      setCartCount(cartCount + 1); // Update cart count
    }

    localStorage.setItem("Cart", JSON.stringify(array));
  };

  // Function to toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Function to handle click on product image
  const handleClick = (product) => {
    setMdata(product); // Update mdata state with the clicked product
  };

  // Slider component for image slideshow
  const Slider = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Function to navigate to the next slide
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    // Function to navigate to the previous slide
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    return (
      <div className="slider-container">
        <button className="slider-button prev" onClick={prevSlide}><ArrowBackIosIcon /></button>
        <img className="slider-image" src={images[currentSlide]} alt={`Slide ${currentSlide}`} />
        <button className="slider-button next" onClick={nextSlide}><ArrowForwardIosIcon /></button>
      </div>
    );
  };

  const images = [m1,m2,m3,m4];

  return (
    <div>
      <Navbar />
      <Slider images={images} /> {/* Display the slider with all images */}
 
      <div className="product-cards">
        {products.map((product, index) => (
          <div key={index}>
            <Link to={`/product/${product.id}`} className='productss'>
              <div className="product-card" onClick={() => handleClick(product)}> {/* Add onClick handler */}
                <h3>{product.name}</h3>
                <h5>&#8377;{product.price}</h5> {/* Display price */}
                <h4>[SERVES 2] </h4>
                <p>{product.description}</p>
                <button className="addcart" onClick={() => handleOpen(product)}>Add to Cart</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food_Detail2;
