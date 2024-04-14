import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from './navbar';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Food_Detail8.css';

// Import product images
import m1 from '../Assets/panner butter masala/pbm1.jpeg';
import m2 from '../Assets/panner butter masala/pbm2.jpeg';
import m3 from '../Assets/panner butter masala/pbm1.jpeg';
import m4 from '../Assets/panner butter masala/pbm1.jpeg';

const Food_Detail2 = () => {
  const products = [
    { id: 1, name: 'Panner Butter Masala', description: 'Paneer butter masala is a rich and creamy Indian dish consisting of paneer (Indian cottage cheese) cooked in a flavorful tomato-based gravy. To prepare this dish, paneer cubes are first lightly fried until golden brown, then simmered in a luscious sauce made from tomatoes, onions, garlic, ginger, and a blend of aromatic spices such as garam masala, cumin, and coriander. The key ingredient, butter, adds richness and enhances the dishs flavor profile. Additionally, cream or cashew paste is often added to give the gravy its creamy texture. Paneer butter masala is typically garnished with fresh coriander leaves and served hot with naan, roti, or rice, making it a popular choice in Indian restaurants and households alike. Its creamy texture, combined with the subtle blend of spices, makes it a delightful and comforting dish enjoyed by many across the globe.To further enrich the sauce, cream or cashew paste is often stirred in, contributing to its velvety texture and mellowing the spice levels. This creamy gravy envelops the fried paneer cubes, ensuring each morsel is coated in its luscious goodness.Garnished with fresh coriander leaves for a burst of freshness and vibrant color, paneer butter masala is typically served piping hot alongside fluffy naan bread, fragrant basmati rice, or buttery roti. Its creamy texture, balanced spice profile, capturing the essence of comfort and indulgence in every bite.', price: 325.53, image: m1},
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

export default Food_Detail2;
