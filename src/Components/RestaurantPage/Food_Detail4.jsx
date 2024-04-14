import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from './navbar';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Food_Detail6.css';

// Import product images
import k1 from '../Assets/kfc wings/k1.jpeg';
import k2 from '../Assets/kfc wings/k2.jpeg';
import k3 from '../Assets/kfc wings/k3.jpeg';
import k4 from '../Assets/kfc wings/k4.jpeg';


const Food_Detail4 = () => {
  const products = [
    { id: 1, name: 'KFC Wings', description: 'Kentucky Fried Chicken, is renowned for its iconic fried chicken, but one often overlooked gem on its menu is the KFC wings. These succulent, juicy wings are a testament to KFCs commitment to flavor and quality. Each bite into a KFC wing is a delightful experience, offering a perfect balance of crispy skin and tender meat. The wings are expertly seasoned with KFCs signature blend of herbs and spices, ensuring a burst of flavor with every bite. Whether you prefer classic flavors or crave a hint of heat, KFC has options to satisfy all taste buds.What sets KFC wings apart is their versatility. Whether you are enjoying them as a standalone snack, pairing them with your favorite side dishes, or including them as part of a meal, KFC wings never disappoint. Theyre perfect for sharing with friends and family or indulging in a satisfying solo treat.'
    
    , price: 350.48, image: k1},
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

  const images = [k1,k2,k3,k4];

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
                <h5 className="product_pric">&#8377;{product.price}</h5> {/* Display price */}
                <h4>[SERVES 2-3] </h4>
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

export default Food_Detail4;
