import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import "./App.css";
import { Food_Main } from "./Components/RestaurantPage/Food_Main";
import { Food_Detail }  from "./Components/RestaurantPage/Food_Detail";
import  Food_Detail2  from "./Components/RestaurantPage/Food_Detail2"
import  Food_Detail3  from "./Components/RestaurantPage/Food_Detail3"
import  Food_Detail4  from "./Components/RestaurantPage/Food_Detail4"
import  Food_Detail6  from "./Components/RestaurantPage/Food_Detail6";
import  Food_Detail5  from "./Components/RestaurantPage/Food_Detail5";
import  Food_Detail7  from "./Components/RestaurantPage/Food_Detail7";
import  Food_Detail8  from "./Components/RestaurantPage/Food_Detail8";
import  Food_Detail9  from "./Components/RestaurantPage/Food_Detail9";
import { PaymentDetails } from "./Components/CheckoutPage/PaymentDetails";
import {ThankYou} from "./Components/Thankyou/Thankyou";
function App() {
  if (!localStorage.getItem("Cart")) {
    localStorage.setItem("Cart", JSON.stringify([]))
  }
  if (!localStorage.getItem("user_details")) {
    localStorage.setItem("user_details", JSON.stringify({"name": "", "email": "", "number": ""}))
  }
  if (!localStorage.getItem("verificationId")) {
    localStorage.setItem("verificationId", JSON.stringify({"verificationId":""}))
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurants" element={<Food_Main />} />
        
        <Route path="/:food/:id" element={<Food_Detail />} />
        <Route path="/:food/:id/Chicken Dum Biryani" element={<Food_Detail3 />} />
        <Route path="/:food/:id/KFC Wings" element={<Food_Detail4 />} />
        <Route path="/:food/:id/Chicken Burger" element={<Food_Detail9 />} />
        <Route path="/:food/:id/Panner Butter Masala" element={<Food_Detail8 />} />
        <Route path="/:food/:id/Chutneys spl Biryani" element={<Food_Detail6 />} />
        <Route path="/:food/:id/Veg Biryani" element={<Food_Detail2 />} />
        <Route path="/:food/:id/Mirinda Drink" element={<Food_Detail7 />} />
        <Route path="/:food/:id/Wednesday Strips Bucket" element={<Food_Detail5 />} />
        <Route path="/payment" element={<PaymentDetails />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </>
  );
}

export default App;
