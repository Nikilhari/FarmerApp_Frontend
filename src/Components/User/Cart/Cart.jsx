import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from "./Cart.module.css";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Holds the cart items data
  const [loading, setLoading] = useState(true); // Manages loading state
  const [error, setError] = useState(null); // Handles any errors
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    // Fetch the cart items from the backend for the logged-in user
    if (email) {
      axios
        .get(`http://localhost:6996/cart/${email}`)
        .then((response) => {
          setCartItems(response.data); // Store the fetched cart items in state
          setLoading(false);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          setError(error.message);
          setLoading(false);
        });
    } else {
      alert("Please log in to view your cart.");
      setLoading(false);
    }
  }, [email]);

  // Update the quantity of a cart item with debouncing
  const debouncedUpdateQuantity = useCallback(
    (id, newQuantity) => {
      if (newQuantity > 0) {
        const item = cartItems.find((item) => item.id === id);
        if (item) {
          const updatedItem = { ...item, quantity: newQuantity };
          axios
            .post("http://localhost:6996/cart/add", updatedItem)
            .then((response) => {
              setCartItems((prevItems) =>
                prevItems.map((i) => (i.id === id ? response.data : i))
              );
            })
            .catch((error) => {
              console.error("An error occurred:", error);
              alert("Failed to update item quantity.");
            });
        }
      }
    },
    [cartItems]
  );

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    // Debounce the API call by delaying it by 300ms
    clearTimeout(window.quantityUpdateTimeout);
    window.quantityUpdateTimeout = setTimeout(() => {
      debouncedUpdateQuantity(id, newQuantity);
    }, 300);
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    axios
      .delete(`http://localhost:6996/cart/remove/${id}`)
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        alert("Failed to remove item.");
      });
  };

  // Calculate total price of cart items
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.cart}>
      <h1 className={styles.cart__title}>Your Cart</h1>
      <div className={styles.cart__box}>
        <div className={styles.box__item}>products</div>
        <div className={styles.box__item}>price</div>
        <div className={styles.box__item}>quantity</div>
        <div className={styles.box__item}>subtotal</div>
        <div className={styles.box__item}>Remove</div>
      </div>
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <div className={styles.cart__items}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cart__item}>
              <h2 className={styles.cart__itemName}>{item.vegetableName}</h2>
              <p>Price: ₹ {item.price}</p>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className={styles.quantityButton}
                >
                  <IoMdRemove />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className={styles.cart__quantityInput}
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className={styles.quantityButton}
                >
                  <IoMdAdd />
                </button>
              </div>
              <p>Total: ₹ {(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className={styles.cart__removeButton}
              >
                Remove
              </button>
            </div>
          ))}
          <div className={styles.cart__total}>
            <h2>Total Price: ₹ {totalPrice.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
