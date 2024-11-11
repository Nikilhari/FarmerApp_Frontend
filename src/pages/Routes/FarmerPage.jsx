import React from "react";
import Home from "../../Components/Farmer/Home/Home";
import Sell from "../../Components/Farmer/Sell/Sell";
import CurrentPrice from "../../Components/Farmer/CurrentPrice/CurrentPrice";
import Prediction from "../../Components/Farmer/Forecasting/Prediction";
const FarmerPage = () => {
  return (
    <>
      <Home />
      <Sell />
      <Prediction />
      <CurrentPrice />
    </>
  );
};

export default FarmerPage;
