import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.css";
const Products = () => {
  const [vegetables, setVegetables] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:6996/vegetables/")
      .then((response) => {
        setVegetables(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const addToCart = (productName, productData) => {
    const email = localStorage.getItem("userEmail"); // Retrieve user email from local storage

    if (!email) {
      alert("Please log in to add items to the cart.");
      return;
    }

    const cartItem = {
      email: email,
      vegetableName: productName,
      price: productData.averagePrice,
      quantity: 1,
    };

    axios
      .post("http://localhost:6996/cart/add", cartItem)
      .then((response) => {
        alert("Item added to cart!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        alert("Failed to add item to cart.");
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={styles.section}>
        <h1 className={styles.section__title}>Vegetables</h1>
        <div className={styles.products}>
          {Object.entries(vegetables).map(([name, data]) => (
            <div key={name} className={styles.product}>
              <img
                src={data.imageUrl}
                alt={name}
                className={styles.product__img}
              />
              <div className={styles.product__description}>
                <h2 className={styles.product__name}>{name}</h2>
                <p className={styles.product__price}>
                  Price: ₹ {data.averagePrice}
                </p>
              </div>
              <button
                className={`${styles.add__cart} ${styles.make__retro}`}
                onClick={() => addToCart(name, data)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
