import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from './navbar';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Food_Detail5.css';

// Import product images
import k1 from '../Assets/bucket nuggets/n1.jpeg';
import k2 from '../Assets/bucket nuggets/n2.jpeg';
import k3 from '../Assets/bucket nuggets/n3.jpeg';
import k4 from '../Assets/bucket nuggets/n4.jpeg';


const Food_Detail4 = () => {
  const products = [
    { id: 1, name: 'Wednesday Strips Bucket', description: 'The Wednesday Strips Bucket at Subway offers a delightful twist to the midweek meal. This enticing bucket is filled to the brim with Subways famous chicken strips, providing a satisfying and flavorful option for lunch or dinner. Each strip is tender, juicy, and seasoned to perfection, ensuring a burst of deliciousness with every bite.Perfect for sharing with friends, family, or colleagues, the Wednesday Strips Bucket is a convenient and crowd-pleasing choice for any occasion. Whether you are enjoying a casual meal at home, hosting a gathering, or looking for a quick and tasty option during a busy day, this bucket of chicken strips delivers on both taste and convenience.With its generous portion size and irresistible flavor, the Wednesday Strips Bucket from Subway is sure to become a favorite midweek treat for anyone craving a satisfying and delicious meal.'
    
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
                <h5>&#8377;{product.price}</h5> {/* Display price */}
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
