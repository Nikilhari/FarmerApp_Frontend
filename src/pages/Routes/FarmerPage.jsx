import React from "react";
import Home from "../../Components/Farmer/Home/Home";
import Sell from "../../Components/Farmer/Sell/Sell";
import CurrentPrice from "../../Components/Farmer/CurrentPrice/CurrentPrice";
const FarmerPage = () => {
  return (
    <>
      <Home />
      <Sell />
      <CurrentPrice />
    </>
  );
};

export default FarmerPage;
