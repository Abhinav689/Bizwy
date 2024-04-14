import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from './navbar';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Food_Detail6.css';

// Import product images
import c1 from '../Assets/chutneys spl biryani/c1.jpeg';
import c2 from '../Assets/chutneys spl biryani/c2.jpeg';
import c3 from '../Assets/chutneys spl biryani/c3.jpeg';
import c4 from '../Assets/chutneys spl biryani/c4.jpeg';

const Food_Detail2 = () => {
  const [cart, setCart] = useState([]); // State for cart items
  const [data, setData] = useState({}); // State for storing selected food data
  const [showData, setShowData] = useState({}); // State for showing selected food data

  const products = [
    {
      id: 2,
      name: 'Chutneys Spl Biryani',
      description: 'These vibrant and flavorful condiments, serve as the ideal accompaniment to the exquisite Chicken Biryani, enriching its taste and elevating the dining experience to new heights. Picture a spread of assorted chutneys, each boasting its own unique blend of ingredients and flavors, lined up beside a steaming pot of fragrant biryani. Tangy mango chutney tantalizes the taste buds with its sweet and sour notes, while refreshing mint chutney provides a cool contrast to the warm spices of the biryani. Spicy tomato chutney adds a fiery kick, enhancing the richness of the chicken and rice with its bold flavors.',
      price: 699.05,
      image: c1
    }
  ];

  const navigate = useNavigate();

  // Function to handle opening the modal and updating the cart
  const handleOpen = (data) => {
    let tempCart = [...cart];
    const index = tempCart.findIndex((item) => item.id === data.id);

    if (index === -1) {
      data["q"] = 1;
      tempCart.push(data);
    } else {
      tempCart[index].q++;
    }

    setCart(tempCart);
    localStorage.setItem("Cart", JSON.stringify(tempCart));
  };

  // Function to increase or decrease quantity in the cart
  const qHandler = (action, id) => {
    let tempCart = [...cart];
    const index = tempCart.findIndex((item) => item.id === id);

    if (index !== -1) {
      if (action === "increase") {
        tempCart[index].q++;
      } else if (action === "decrease" && tempCart[index].q > 1) {
        tempCart[index].q--;
      } else if (action === "decrease" && tempCart[index].q === 1) {
        tempCart.splice(index, 1);
      }
      setCart(tempCart);
      localStorage.setItem("Cart", JSON.stringify(tempCart));
    }
  };

  useEffect(() => {
    let selectedFood = JSON.parse(localStorage.getItem("foodId"));
    setData(selectedFood);
    setShowData(selectedFood.items);
    let cart_value = JSON.parse(localStorage.getItem("Cart"));
    if (cart_value) {
      setCart([...cart_value]);
    }
  }, []);

  // Function to handle click on product image
  const handleClick = (product) => {
    // Handle the click event, if needed
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

  const images = [c1, c2, c3, c4];

  return (
    <div>
      <Navbar />
      <Slider images={images} />

      <div className="product-cards">
        {products.map((product, index) => (
          <div key={index}>
            <Container className="d-flex justify-content-center" style={{ display: 'flex' }}>
              <Card style={{
                width: '25rem',
                border: '15px ',
                marginLeft: '5rem',
                marginTop: '-1rem',
                height: '30rem',
                overflow: 'hidden',
                boxShadow: '0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)' // Modified box shadow
              }}>
                <Card.Body>
                  <Card.Title style={{ marginLeft: "30%" }}><h2>Chicken Biryani</h2></Card.Title>
                  <Card.Subtitle className="mb-2 text-muted" style={{ marginLeft: "45%", marginTop: "-0.75rem" }}><h3>{product.price}/-</h3></Card.Subtitle>
                  <Card.Text style={{ paddingLeft: '1rem', marginTop: "-0.1rem", marginRight: '1rem' }} >
                    {product.description}
                  </Card.Text>
                  <div className="product-card" onClick={() => handleClick(product)}>
                    {cart.findIndex(item => item.id === product.id) === -1 ? (
                      <button className="addcarts" onClick={() => handleOpen(product)}>Add Now</button>
                    ) : (
                      <div className="add-cart-buttonss">
                        <button className="decreaseee" onClick={() => qHandler('decrease', product.id)}>-</button>
                        <p className="valueeeee">{cart.find(item => item.id === product.id).q}</p>
                        <button className="increaseee" onClick={() => qHandler('increase', product.id)}>+</button>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
              <Card style={{
                width: '25rem',
                border: '5px ',
                marginLeft: '0.75rem',
                marginRight: '2rem',
                marginTop: '-1rem',
                height: '30rem',
                overflow: 'hidden',
                boxShadow: '0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)'  // Modified box shadow
              }}>
                <Card.Body>
                  <Card.Title style={{ marginLeft: "22%" }}><h2>Nutrition Information</h2></Card.Title>
                  <ul style={{ marginTop: '3rem' }}>
                    <li style={{ margin: '0.5rem' }}>292 calories</li>
                    <li style={{ margin: '0.5rem' }}>9.4 grams of total fat</li>
                    <li style={{ margin: '0.5rem' }}>1.7 grams of saturated fat</li>
                    <li style={{ margin: '0.5rem' }}>48 milligrams of cholesterol</li>
                    <li style={{ margin: '0.5rem' }}>419 milligrams of sodium</li>
                    <li style={{ margin: '0.5rem' }}>31 grams of total carbohydrates</li>
                    <li style={{ margin: '0.5rem' }}>1.4 grams of dietary fiber</li>
                    <li style={{ margin: '0.5rem' }}>3.2 grams of sugars</li>
                    <li style={{ margin: '0.5rem' }}>20 grams of protein</li>
                    <li style={{ margin: '0.5rem' }}>461.7 milligrams of potassium</li>
                  </ul>
                </Card.Body>
              </Card>
            </Container>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Food_Detail2;
