import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import "glider-js/glider.min.css";
import './slider.css';
import PhotosCarousel from "../../Pics";
import Tabs from '../Tabs';
import Rating from '@mui/material/Rating';
import { Navbar } from './navbar'; // Assuming Navbar is the correct import path
import './Food_Detail2.css';
import Box from '@mui/material/Box';
import Offer from '../Assets/discount.svg'
const products = [
  {
    id: 1,
    name: 'Veg Dum Biryani',
    price: 350.48,
  }
];

const photosToShow = [
  "https://res.cloudinary.com/dbbs8gav9/image/upload/v1711449684/360_F_439990588_ZLDFaiyB4Hsxn3UoIiEfnsGvlXuknD1C_d9v9aa.webp",
  "https://res.cloudinary.com/dbbs8gav9/image/upload/v1711371517/biryani1_xedjrw.jpg",
  "https://res.cloudinary.com/dbbs8gav9/image/upload/v1711449654/360_F_682360328_pVB6ViKUuWHPd8pOohnYUmbhKh7N5nbX_egztdy.webp",
  "https://res.cloudinary.com/dbbs8gav9/image/upload/v1711371518/biryani4_oseivf.jpg",
];

const thumbnailsCarouselConfig = {
  itemWidth: 110,
  slidesToShow: "auto",
  slidesToScroll: "auto"
};

export default function Food_Detail2() {
  const [cart, setCart] = useState([]); // State for cart items
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState([]);
  const [mdata, setMdata] = useState(null);

  useEffect(() => {
    let selectedFood = JSON.parse(localStorage.getItem("foodId"));
    setData(selectedFood);
    setShowData(selectedFood.items);
    let cartValue = JSON.parse(localStorage.getItem("Cart"));
    setCart([...cartValue]);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("Cart", JSON.stringify(newCart));
  };

  const handleOpen = (data) => {
    setMdata(data);
    let isFound = false;
    let newCart = [...cart];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === data.id) {
        isFound = true;
      }
    }
    data["q"] = 1;
    if (!isFound) {
      newCart.push(data);
    }
    updateCart(newCart);
  };

  const qHandler = (action, id) => {
    const tempCart = [...cart];
    const index = tempCart.findIndex((item) => item.id === id);
    if (index !== -1) {
      if (action === "increase") {
        tempCart[index].q++;
      } else if (action === "decrease" && tempCart[index].q > 1) {
        tempCart[index].q--;
      } else if (action === "decrease" && tempCart[index].q === 1) {
        tempCart.splice(index, 1); // Remove item from cart if quantity is 1 and decrease is clicked
      }
      updateCart(tempCart);
    }
  };

  const onClickPhotoHandler = (idx) => () => setCurrentPhotoIdx(idx);

  const photos = photosToShow.map((photoUrl, idx) => {
    const key = `${photoUrl}_${idx}`;
    let className = "slide__content";
    if (currentPhotoIdx === idx) {
      className += " --current-selected";
    }
    return (
      <div key={key} className={className} onClick={onClickPhotoHandler(idx)}>
        <img alt="Some sweet!" src={photoUrl} />
      </div>
    );
  });

  return (
    <div>
      <Navbar />
      <div className="App">
        <div className="photos-gallery">
          <PhotosCarousel
            className="photo-wrapper"
            currentSlideIdx={currentPhotoIdx}
          >
            {photos}
          </PhotosCarousel>
          <PhotosCarousel
            className="thumbnails-wrapper"
            config={thumbnailsCarouselConfig}
            currentSlideIdx={currentPhotoIdx}
          >
            {photos}
          </PhotosCarousel>
        </div>
      </div>

      <Tabs />
      <div className="contents">
        <h2 className='content'>{products[0].name}</h2>
        <Rating className="read-only" value={4} readOnly />
        <h3>[Serves 2-3]</h3>
        <p style={{marginLeft:"1rem" , fontSize:"1.5rem", marginTop:"1.5rem"}}> ₹ {products[0].price}/-</p>
         <Box sx={{ borderBottom: 2, borderColor: 'divider', width:'98%' ,marginTop:"7rem"}}></Box>
      <img src={Offer} alt="no" style={{width:"20px" , marginLeft:"0.5rem" ,marginTop:"1rem"}}/><h4>Offers</h4>
      <div className="boxes">
      <Box
      height={110}
      width={110}
      my={3}
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={4}
      p={2}
      marginRight="2.5rem"
      sx={{ border: '2px gba(0,0,0,0.5)', boxShadow:"0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)",borderRadius:"1.5rem" }}
     
    >
     Use code MDM150 & get ₹150 off on orders above ₹699
    </Box>
    <Box
      height={110}
      width={110}
      my={3}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px gba(0,0,0,0.5)', boxShadow:"0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)" ,borderRadius:"1.5rem" }}
      marginRight="2.5rem"
    >
      Use TRYNEW & get 60% off on orders above ₹199. Max discount: ₹120.
    </Box>
    <Box
      height={110}
      width={110}
      my={3}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px gba(0,0,0,0.5)', boxShadow:"0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)",borderRadius:"1.5rem" }}
      marginRight="2.5rem"
    >
     Use Code PARTY and get FLAT 10% off on order above Rs.1000.
    </Box>
    <Box
      height={110}
      width={110}
      my={3}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px gba(0,0,0,0.5)', boxShadow:"0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)",borderRadius:"1.5rem" }}
      marginRight="2.5rem"
    >
      Flat 15% discount upto ₹150 using HSBC Credit Cards on orders ₹499
    </Box>
    </div>
    </div>
        <div className='aadds'>
          {products.map((product, index) => (
            <div key={product.id}>
              {cart.findIndex(item => item.id === product.id) === -1 ? (
                <button className="adds" onClick={() => handleOpen(product)}>
                  Add Now
                </button>
              ) : (
                <div className="add-cart-buttonss">
                  <button  onClick={() => qHandler('decrease', product.id)}>
                    -
                  </button>
                  <button > {cart.find(item => item.id === product.id).q}</button>
                  <button  onClick={() => qHandler('increase', product.id)}>
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
   
  );
}
