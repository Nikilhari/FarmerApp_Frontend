import React, { useState } from "react";
import styles from "./Home.module.css";
import { BsCart3 } from "react-icons/bs";
import { GiThreeLeaves } from "react-icons/gi";
import Cart from "../Cart/Cart";

const Home = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

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
              <div className={styles.usernav__items}>PRODUCT</div>
              <div className={styles.usernav__items}>ABOUT</div>
              <div className={styles.usernav__items}>CONTACT</div>
            </div>
          </div>
          <div className={styles.user__cart} onClick={toggleCart}>
            <BsCart3 />
          </div>
        </div>
        <div className={styles.user__title}>
          <h1>FIELD 2 FARM</h1>
          <p>AGRO COMPANY</p>
          <button className={styles.button}>DISCOVER</button>
        </div>
      </div>

      <div
        className={`${styles.cartSidebar} ${
          isCartOpen ? styles.cartSidebarOpen : ""
        }`}
      >
        <Cart />
      </div>

      {isCartOpen && (
        <div className={styles.overlay} onClick={toggleCart}></div>
      )}
    </>
  );
};

export default Home;
