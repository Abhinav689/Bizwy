import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import "glider-js/glider.min.css";
import './slider.css';
import PhotosCarousel from "../../Pics";
import Tabs from '../Tabs';
import Rating from '@mui/material/Rating';

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

export default function App() {
  const [cart, setCart] = useState([]); // State for cart items
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
    setOpen(true);
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
    <>
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
         
        <div>
          {products.map((ele, index) => (
            <div key={ele.id}>
              {cart.findIndex(item => item.id === ele.id) === -1 ? (
                <button className="Adds" onClick={() => handleOpen(ele)}>
                  ADD
                </button>
              ) : (
                <div className="add-cart-buttons">
                  <button className="decreasee" onClick={() => qHandler('decrease', ele.id)}>
                    -
                  </button>
                  <p className="valuee">{cart.find(item => item.id === ele.id).q}</p>
                  <button className="increasee" onClick={() => qHandler('increase', ele.id)}>
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
}
