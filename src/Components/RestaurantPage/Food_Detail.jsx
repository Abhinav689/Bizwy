import React, { useState, useEffect,useRef  } from "react";
import Veg from "../Assets/veg.jpg";
import NonVegan from "../Assets/NonVeg.jpg";
import "./Food_Detail.css";
import { Navbar } from "./navbar";
import ScrollToTop from "react-scroll-to-top";
import { Link } from "react-router-dom";
import { PreLoader } from "../PreLoader";
import { SimpleDialogDemo } from '../popup';
import Box from '@mui/material/Box';
import Vegz from "../Assets/Veg.png";
import Non from "../Assets/non veg.png";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Time from '../Assets/time.png'
import Food from '../Assets/food.png'







export const Food_Detail = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState([]);
  const [mdata, setMdata] = useState(null);
  const [isClick, setIsClick] = useState(false);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [scrolled, setScrolled] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showVegItems, setShowVegItems] = useState(true); // Toggle for showing vegetarian items
  const [showNonVegItems, setShowNonVegItems] = useState(true); // Toggle for showing non-vegetarian items
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);
  useEffect(() => {
    setLoading(true);
    fakePromise(3000).then(() => setLoading(false));
  }, []);

  function fakePromise(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const branches = [
    { email: 'Ameerpet', location: 'Hyderabad' ,distance:'1.7km', time:'27 min'},
    { email: 'Kukkatpally', location: 'Hyderabad' ,distance:'3.5 km', time:'30 min' },
    { email: 'Miyapur', location: 'Hyderabad',distance:'5.6 km', time:'35 min' },
    { email: 'Hitech City', location: 'Hyderabad' ,distance:'8.1 km', time:'45 min'},
    { email: 'Gacchibowli', location: 'Hyderabad',distance:'9.2 km', time:'55 min' },
    // Add more branches as needed
  ];

  const handlechange = (e) => {
    setQuery(e.target.value);
    let temp = [];
    data.items.forEach((o) => {
      if (o.name.toLowerCase().includes(query.toLowerCase())) {
        temp.push(o);
      }
    });
    setShowData(temp);
    if (temp.length === 0) {
      setShowData(data.items); // Show all items if no matches found
    }
  };

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

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 70,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(32px)',
        '& .MuiSwitch-thumb:before': {
          // Veg logo for checked state
          backgroundImage: `url(${Non})`,
          backgroundSize: '100%'
        },
        '& + .MuiSwitch-track': {
          opacity: 0.75,
          backgroundColor: 'rgb(139, 0, 0)'
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '' : '',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // Non-veg logo for unchecked state
        backgroundImage: `url(${Non})`,
        backgroundSize: '100%'
      }
    },
    '& .MuiSwitch-track': {
      opacity: 2,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  const MaterialUISwitch1 = styled(Switch)(({ theme }) => ({
    width: 70,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(32px)',
        '& .MuiSwitch-thumb:before': {
          // Veg logo for checked state
          backgroundImage: `url(${Vegz})`,
          backgroundSize: '80%'
        },
        '& + .MuiSwitch-track': {
          opacity: 0.75,
          backgroundColor: 'rgb(139, 0, 0)'
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '' : '',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // Non-veg logo for unchecked state
        backgroundImage: `url(${Vegz})`,
        backgroundSize: '80%'
      }
    },
    '& .MuiSwitch-track': {
      opacity: 2,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const header = headerRef.current;
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
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

  const filterData = (filterType) => {
    // Implement filtering logic based on filterType
    // For example, you can filter the showData state based on the filterType
  };

  return loading ? (
    <PreLoader />
  ) : (
    <>
      <div className="scroll-container">
        <div className="indicator" style={{ width: `${scrolled}%` }}></div>
      </div>
      <ScrollToTop smooth color="#fc8019" />

      <Navbar cart={cart} />
      
      <Box
      height={150}
      width={555}
      my={3}
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={4}
      p={2}
      marginLeft="31rem"
      marginTop={"8rem"}
      sx={{ border: '2px gba(0,0,0,0.5)', boxShadow:"0 4px 4px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.9)",borderRadius:"1.5rem" }} >
     
     <div className="topbar1">
        <div className="topbar_content">

          <div className="food_details_section">
          <header className="food_header" ref={headerRef}>
  <h2>{data ? data.name : ""}</h2>
</header>
       
            
            <p className="cuisines">{data ? data.cuisines.join(",") : ""}</p>
           
            <p className="hotel_location"> <img src={Food} style={{width:"20px",height:"20px" ,marginTop:"-3rem" , marginLeft:"-2rem"}} />
            
            </p><SimpleDialogDemo branches={branches} />
            
            <div className="food_overview">
              <p className="food_rating">
                <i className="fas fa-star "></i>
                <b>&nbsp;{data ? data.rating : ""}</b> <br />
                500+ Ratings
              </p>
              <p className="food_pricing">
                <b>&#8377;{data ? data.average_cost : ""}</b> <br />
                Cost for two
              </p>
            </div>
            <div className="querySearch_user">
              <div className="input_div">
                <input
                  type="text"
                  className="search_query"
                  placeholder="Search for dishes..."
                  autoFocus={true}
                  spellCheck="false"
                  value={query}
                  onChange={(e) => handlechange(e)}
                />
              </div>
             <MaterialUISwitch checked={showNonVegItems} onChange={() => setShowNonVegItems(!showNonVegItems)} />
             <MaterialUISwitch1 checked={showVegItems} onChange={() => setShowVegItems(!showVegItems)} />
            </div>
          </div>
      
        </div>
      </div>
    </Box>
      <div className="food_products">
       
        <h4 className="title">{isClick ? query : "All Food Items"}</h4>
        <p className="itemCount">
          {showData.filter(item => (showVegItems && item.veg) || (showNonVegItems && !item.veg)).length}
          &nbsp;ITEMS
        </p>

        {showData.filter(item => (showVegItems && item.veg) || (showNonVegItems && !item.veg)).map((ele, index) => (
          <div className="food_products_card" key={index}>
            <div className="card_left_div">
              <div className="veg_logo">
                <img src={ele.veg ? Veg : NonVegan} alt="" />
                {ele.best_seller && (
                  <p className="best_seller">
                    <i className="fas fa-star"></i>&nbsp;BEST SELLER
                  </p>
                )}
              </div>
              <h4 className="product_title">{ele.name}</h4>
              <p className="product_price">&#8377;{ele.price}</p>
              <p className="product_descrip">{ele.description}</p>

            </div>
            <div className="card_right_div">
              <div className="food_img">
                <Link to={ele.name}><img src={ele.img_url} alt="" /></Link>
              </div>
              {cart.findIndex(item => item.id === ele.id) === -1 ? (
                <button className="add_cart" onClick={() => handleOpen(ele)}>
                  ADD
                </button>
              ) : (
                <div className="add-cart-button">
                  {cart.find(item => item.id === ele.id).q > 0 ? (
                    <>
                      <button className="decrease" onClick={() => qHandler('decrease', ele.id)}>
                        -
                      </button>
                      <p className="value">{cart.find(item => item.id === ele.id).q}</p>
                      <button className="increase" onClick={() => qHandler('increase', ele.id)}>
                        +
                      </button>
                    </>
                  ) : (
                    <button className="add_cart" onClick={() => handleOpen(ele)}>
                      ADD
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {cart.length ? (
          <div className="item_added">
            <h2 className="header">Cart</h2>
            <p className="no_items">{cart.length}&nbsp;Items</p>
            <div className="items_div_parent">
              {cart.map((e) => (
                <div className="items_div" key={e.id}>
                  <img src={e.veg ? Veg : NonVegan} alt="" className="logo_veg_nonVeg" />
                  <p className="product">{e.name}</p>
                  <div className="quantity">
                    {e.q > 0 ? (
                      <>
                        <button className="decrease" onClick={() => qHandler('decrease', e.id)}>
                          -
                        </button>
                        <p className="value">{e.q}</p>
                        <button className="increase" onClick={() => qHandler('increase', e.id)}>
                          +
                        </button>
                      </>
                    ) : (
                      <button className="add_cart" onClick={() => handleOpen(e)}>
                        ADD
                      </button>
                    )}
                  </div>
                  <p className="price">&#8377;{(e.price * e.q).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="sub_total">
              <div className="header_1">
                <h2>
                  Subtotal <br />
                  <p>Extra charges may apply</p>
                </h2>
              </div>
              <div className="total_price_1">
                &#8377;
                {cart
                  .map((e) => e.price * e.q)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)}
              </div>
            </div>
            <Link className="link" to="/payment">
              <button className="checkout">
                CHECKOUT&nbsp;&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
              </button>
            </Link>
          </div>
        ) : (
          <div className="cart_empty_container">
            {/* Empty cart message or component */}
          </div>
        )}
      </div>
      <div className="food_detail_container">
        <div className="side_section_container">
          <div className="side_section">
            <p className="side_section_filters" onClick={() => filterData('Recommended')}>
              Recommended
            </p>
            <p className="side_section_filters" onClick={() => filterData('Wednesday Exclusives')}>
              Wednesday Exclusives
            </p>
            <p className="side_section_filters" onClick={() => filterData('Match Day Specials')}>
              Match Day Specials 
            </p>
            <p className="side_section_filters" onClick={() => filterData('Stay Home Specials')}>
              Stay Home Specials
            </p>
            <p className="side_section_filters" onClick={() => filterData('Big Save Combos')}>
              Big Save Combos
            </p>
            <p className="side_section_filters" onClick={() => filterData('Biryani Buckets (NEW)')}>
              Biryani Buckets (NEW)
            </p>
            <p className="side_section_filters" onClick={() => filterData('Burgers')}>
              Burgers
            </p>
            <p className="side_section_filters" onClick={() => filterData('Snacks')}>
              Snacks
            </p>
            <p className="side_section_filters" onClick={() => filterData('Sides & Bevarages')}>
              Sides & Bevarages
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Food_Detail;
