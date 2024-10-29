import React, { useState } from "react";
import styles from "./Home.module.css";
import { GiThreeLeaves } from "react-icons/gi";

const Home = () => {
  return (
    <>
      <div className={styles.user__carousel}>
        <img
          src="src/assets/R.jpeg"
          alt=""
          className={styles.farmer__carousel__img}
        />
        <div className={styles.user__navbar}>
          <div className={styles.user__navbar_inner}>
            <div className={styles.logo}>
              <GiThreeLeaves />
            </div>
            <div className={styles.usernav__contents}>
              <div className={styles.usernav__items}>HOME</div>
              <div className={styles.usernav__items}>SELL</div>
              <div className={styles.usernav__items}>FUTURE PRICE</div>
              <div className={styles.usernav__items}>ABOUT</div>
              <div className={styles.usernav__items}>CONTACT</div>
            </div>
          </div>
        </div>
        <div className={styles.user__title}>
          <h1>FIELD 2 FARM</h1>
          <p>AGRO COMPANY</p>
          <button className={styles.button}>DISCOVER</button>
        </div>
      </div>
    </>
  );
};

export default Home;
