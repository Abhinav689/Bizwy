import React, { useState, useEffect } from "react";
import Logo from "../Assets/logo.png";
import Arrow from "../Assets/arrow.svg";
import Cart from "../Assets/cart.png";
import Search from "../Assets/search.svg";
import Discount from "../Assets/discount.svg";
import Help from "../Assets/help.svg";
import User from "../Assets/user.png";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import Firebase from "../../Firebase";

export function Navbar() {
  // State variables for managing various functionalities
  const [isDraweropen, setisDraweropen] = useState(false); // State for drawer opening/closing
  const [user_signin, setUser_signin] = useState(false); // State for user sign-in status
  const [user_details, setUser_details] = useState(null); // State for user details
  const [login, setLogin] = useState(true); // State for managing login/signup forms
  const [signIn, setsignIn] = useState(false); // State for managing sign-in status
  const [number, setNumber] = useState(""); // State for user phone number
  const [name, setName] = useState(""); // State for user name
  const [email, setEmail] = useState(""); // State for user email
  const [password, setPassword] = useState(""); // State for user password
  const [len, setLen] = useState(0); // State for cart items length
  const [verificationId, setVerificationId] = useState(""); // State for verification ID
  const [otp, setOtp] = useState(false); // State for OTP verification
  const [otp_valid, setOtp_valid] = useState(""); // State for valid OTP

  const location = JSON.parse(localStorage.getItem("Location")); // Fetching location from local storage
  let cart = JSON.parse(localStorage.getItem("Cart")) || []; // Fetching cart items from local storage
  const navigate = useNavigate(); // Hook for navigation

  // useEffect to check if user is signed in and set user details
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_details"));
    if (user.name !== "") {
      setUser_details(user);
      setUser_signin(true);
      setsignIn(true);
    }
  }, []);

  // useEffect to update cart length when cart items change
  useEffect(() => {
    setLen(cart.length);
  }, [cart]);

  // useEffect to update local storage when user details change
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_details"));
    let id = JSON.parse(localStorage.getItem("verificationId"));
    if (user.name == "" || user.email == "" || user.number == "" || id.verificationId == "") {
      let temp = {
        name: name,
        email: email,
        number: number,
      };
      localStorage.setItem("user_details", JSON.stringify(temp));
    }
  }, [name, email, number]);

  // Function to handle OTP submission for sign-in
  function handleSubmit_Otp_sigin(e) {
    e.preventDefault();
    const code = otp_valid;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        setVerificationId(user.uid);
        localStorage.setItem("verificationId", JSON.stringify(user.uid));
        alert("Account created successfully");
        window.location.reload(true);
      })
      .catch((error) => {
        alert(error.message);
      });
    setOtp(false);
    setisDraweropen(false);
  }

  // Function to handle OTP submission for login
  function handleSubmit_Otp_login(e) {
    e.preventDefault();
    const code = otp_valid;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        let id = JSON.parse(localStorage.getItem("verificationId"));
        if (id !== user.uid) {
          alert("Verification failed ! To Place the Order account must be verified");
        } else {
          alert("User Verified Success!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    setOtp(false);
    setisDraweropen(false);
  }

  // Function to configure reCAPTCHA for sign-in
  const configureCaptcha_signIn = () => {
    window.recaptchaVerifier = new Firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: () => {
          onSigninSubmit();
          alert("Recaptcha verified");
        },
        defaultCountry: "IN",
      }
    );
  };

  // Function to configure reCAPTCHA for login
  const configureCaptcha_login = () => {
    window.recaptchaVerifier = new Firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: () => {
          onLogInSubmit();
          alert("Recaptcha verified");
        },
        defaultCountry: "IN",
      }
    );
  };

  // Function to handle sign-in form submission
  const onSigninSubmit = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user_details"));
    if (user.name !== "" || user.email !== "" || user.number !== "") {
      configureCaptcha_signIn();
      const phoneNumber = "+91" + number;
      const appVerifier = window.recaptchaVerifier;
      Firebase.auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          alert("OTP Sent Successfully !");
        })
        .catch((error) => {
          alert(error.message);
        });
      setOtp(true);
      setisDraweropen(true);
    }
  };

  // Function to handle login form submission
  const onLogInSubmit = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user_details"));
    if (user.number !== "") {
      configureCaptcha_login();
      const phoneNumber = "+91" + number;
      const appVerifier = window.recaptchaVerifier;
      Firebase.auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          alert("OTP Sent Successfully !");
        })
        .catch((error) => {
          alert(error.message);
        });
      setOtp(true);
      setisDraweropen(true);
    }
  };

  return (
    <>
      {/* Drawer for login/sign-up */}
      <Drawer
        anchor="right"
        open={isDraweropen}
        onClose={() => {
          setisDraweropen(false);
        }}
      >
        <Box role="presentation" p={4} width="500px">
          <CloseIcon
            className="close_icon"
            onClick={() => {
              setisDraweropen(false);
            }}
            style={{ cursor: "pointer" }}
          />
          {/* Login/Sign-up form */}
          {login ? (
            <div className="login_form">
              {/* Sign-in section */}
              <div className="left_div">
                <h2>Login</h2>
                <p className="link_register">
                  or{" "}
                  <a
                    onClick={() => setLogin(false)}
                    style={{ cursor
                      : "pointer" }}
                      >
                        create an account
                      </a>
                    </p>
                  </div>
                  <hr className="hr_line_drawer" />
                  <div className="right_div">
                    <img
                      src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                      alt=""
                      className="food_wrap"
                    />
                  </div>
                  <form>
                    <div id="sign-in-button"></div>
                    {/* Input field for phone number */}
                    <input
                      type="number"
                      name="Number"
                      placeholder="Phone Number"
                      className="Number_input"
                      autoFocus={true}
                      spellCheck="false"
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                    />
                    <br />
                    {/* Submit button for login */}
                    <input
                      type="submit"
                      value="CONTINUE"
                      className="login_btn"
                      onClick={onLogInSubmit}
                    />
                  </form>
                  <div className="foot_text">
                    <p>
                      By clicking on Login, I accept the terms & Conditions &
                      Privacy Policy
                    </p>
                  </div>
                </div>
              ) : (
                <div className="login_form">
                  {/* Sign-up section */}
                  <div className="left_div">
                    <h2>Sign up</h2>
                    <p className="link_register">
                      or{" "}
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => setLogin(true)}
                      >
                        login to your account
                      </a>
                    </p>
                  </div>
                  <hr className="hr_line_drawer" />
                  <div className="right_div">
                    <img
                      src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                      alt=""
                      className="food_wrap"
                    />
                  </div>
                  <form>
                    <div id="sign-in-button"></div>
                    {/* Input fields for sign-up */}
                    <input
                      type="number"
                      name="Number"
                      placeholder="Phone Number"
                      className="Number_input_1"
                      autoFocus={true}
                      spellCheck="false"
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Name"
                      className="Number_input_1"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="Number_input_1"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="Number_input"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <br />
                    {/* Submit button for sign-up */}
                    <input
                      type="submit"
                      value="CONTINUE"
                      className="login_btn"
                      onClick={onSigninSubmit}
                    />
                  </form>
                  <div className="foot_text">
                    <p>
                      By clicking on Login, I accept the terms & Conditions &
                      Privacy Policy
                    </p>
                  </div>
                </div>
              )}
            </Box>
          </Drawer>
    
          {/* Drawer for OTP verification */}
          {otp ? (
            <Drawer
              anchor="right"
              open={isDraweropen}
              onClose={() => {
                setisDraweropen(false);
              }}
            >
              <Box role="presentation" p={4} width="500px">
                <CloseIcon
                  className="close_icon"
                  onClick={() => {
                    setisDraweropen(false);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <div className="login_form">
                  <div className="left_div">
                    <h2>Enter OTP</h2>
                  </div>
                  <form>
                    {/* Input field for OTP */}
                    <input
                      type="number"
                      name="Number"
                      placeholder="Enter the OTP"
                      className="Number_input"
                      value={otp_valid}
                      onChange={(e) => {
                        setOtp_valid(e.target.value);
                      }}
                    />
                    <br />
                    {/* Submit button for OTP verification */}
                    <input
                      type="submit"
                      value="SUBMIT"
                      className="login_btn"
                      onClick={
                        login ? handleSubmit_Otp_login : handleSubmit_Otp_sigin
                      }
                    />
                  </form>
                  <div className="foot_text">
                    <p>
                      By clicking on Login, I accept the terms & Conditions &
                      Privacy Policy
                    </p>
                  </div>
                </div>
              </Box>
            </Drawer>
          ) : (
            ""
          )}
    
          {/* Navbar */}
          <nav className="navbar">
            {/* Swiggy logo */}
            <Link to="/restaurants">
              <img src={Logo} alt="" className="logo" />
            </Link>
            {/* Location */}
            <div className="div1_nav">
              <p className="other">Other</p>
              <div className="location">
                {location} &nbsp;
                <img src={Arrow} alt="" className="arrow"  />
              </div>
            </div>
            {/* Search */}
            <div className="div2_nav">
              <p className="search">
                <img src={Search} alt="" className="search_icon" />
                Search{" "}
              </p>
            </div>
            {/* Offers */}
            <div className="div3_nav">
              <p className="offers">
                <img src={Discount} alt="" className="discount_icon" />
                Offers <span className="new">NEW</span>{" "}
              </p>
            </div>
            {/* Help */}
            <div className="div4_nav">
              <p className="help">
                <img src={Help} alt="" className="help_icon" />
                Help
              </p>
            </div>
            {/* Sign-in */}
            <div className="div5_nav">
              <p
                className="sign_in"
                onClick={() => {
                  signIn
                    ? setisDraweropen(false)
                    : setisDraweropen(true) && setLogin(true);
                }}
              >
                <img src={User} alt="" className="user_icon" />
                {user_signin ? user_details.name : "Sign In"}
              </p>
            </div>
            {/* Cart */}
            <div className="div6_nav">
              {len !== 0 ? (
                <Link to="/payment" style={{ textDecoration: "none" }}>
                  <p className="cart">
                    <img src={Cart} alt="" className="cart_icon" />
                    Cart
                  </p>
                </Link>
              ) : (
                <p className="cart">
                  <img src={Cart} alt="" className="cart_icon" />
                  Cart
                </p>
              )}
              <span className="cart_num">{len}</span>
            </div>
          </nav>
          </>
  );
}
    