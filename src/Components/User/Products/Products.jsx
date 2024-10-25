import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './Products.module.css';
const Products = () => {
  const [vegetables, setVegetables] = useState({}); // Holds the vegetable data
  const [loading, setLoading] = useState(true); // Manages loading state
  const [error, setError] = useState(null); // Handles any errors

  useEffect(() => {
    // Fetch the data from the backend when the component mounts
    axios
      .get("http://localhost:6996/vegetables/")
      .then((response) => {
        console.log(response);
        setVegetables(response.data); // Store the response data in state
        setLoading(false); // Disable loading once the data is fetched
      })
      .catch((error) => {
        console.log(error);
        setError(error.message); // Set the error message
        setLoading(false); // Disable loading in case of an error
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.section}>
      <h1 className={styles.section__title}>Vegetable Prices</h1>
      <div className={styles.products}>
        {Object.entries(vegetables).map(([name, data]) => (
          <div
            key={name}
            className={styles.product}
          >
            <img
              src={data.imageUrl}
              alt={name}
              className={styles.product__img}
            />
            <div className={styles.product__description}>
            <h2 className={styles.product__name}>{name}</h2>
            <p className={styles.product__price}>Average Price: {data.averagePrice}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
  );
};

export default Products;
