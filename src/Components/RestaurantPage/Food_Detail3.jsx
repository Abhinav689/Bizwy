import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from './navbar';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Food_Detail6.css';

// Import product images
import cb1 from '../Assets/chicken biryani/cb1.jpeg';
import cb2 from '../Assets/chicken biryani/cb2.jpeg';
import cb3 from '../Assets/chicken biryani/cb3.jpeg';
import cb4 from '../Assets/chicken biryani/cb4.jpeg';


const Food_Detail3 = () => {
  const products = [
    { id: 1, name: 'Chicken Dum Biryani', description: 'These vibrant and flavorful condiments, serve as the ideal accompaniment to the exquisite Chicken Biryani, enriching its taste and elevating the dining experience to new heights. Picture a spread of assorted chutneys, each boasting its own unique blend of ingredients and flavors, lined up beside a steaming pot of fragrant biryani. Tangy mango chutney tantalizes the taste buds with its sweet and sour notes, while refreshing mint chutney provides a cool contrast to the warm spices of the biryani. Spicy tomato chutney adds a fiery kick, enhancing the richness of the chicken and rice with its bold flavors.With a dollop of chutney on the side, every forkful of Chicken Biryani becomes a symphony of tastes, a harmonious fusion of tender meat, aromatic spices, and vibrant condiments. The marriage of textures and flavors creates a culinary experience that delights and satisfies with each mouthful, leaving diners craving for more. Whether its the sweet, tangy, or spicy varieties, chutneys add depth and complexity to the biryani, turning a simple meal into a feast for the senses. So, as you savor each bite of Chicken Biryani, dont forget to indulge in the delightful accompaniments of chutneys, enhancing the culinary journey and ensuring a truly memorable dining experience.'
    
    , price: 350.48, image: cb1},
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

  const images = [cb1,cb2,cb3,cb4];

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

export default Food_Detail3;
