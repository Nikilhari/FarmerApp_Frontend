import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from "./Cart.module.css";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe("pk_test_your_publishable_key");

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("userEmail");
  const Nav = useNavigate();
  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:6996/cart/${email}`)
        .then((response) => {
          setCartItems(response.data);
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

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItem = cartItems.find((item) => item.id === id);
      axios
        .post("http://localhost:6996/cart/add", {
          ...updatedItem,
          quantity: newQuantity,
        })
        .then((response) => {
          setCartItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? response.data : item))
          );
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          alert("Failed to update item quantity.");
        });
    }
  };

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

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      // const stripe = await stripePromise;

      // Create a payment session
      const result = await axios.post("http://localhost:6996/payment/process", {
        email,
        amount: totalPrice,
      });
      if (result.data == "paymentStatus") {
        Nav("/success");
      } else {
        console.log(result.data);
        Nav("/cancel");
      }
      // Redirect to Stripe Checkout
      // const result = await stripe.redirectToCheckout({
      //   sessionId: data.sessionId,
      // });

      // if (result.error) {
      //   console.error(result.error.message);
      //   alert("Checkout failed. Please try again.");
      // }
    } catch (error) {
      console.error("An error occurred during checkout:", error);
      alert("Failed to initiate payment.");
    }
  };

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
        <div className={styles.box__item}>Products</div>
        <div className={styles.box__item}>Price</div>
        <div className={styles.box__item}>Quantity</div>
        <div className={styles.box__item}>Subtotal</div>
        <div className={styles.box__item}>Remove</div>
      </div>
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <>
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
          </div>
          <div className={styles.cart__total}>
            <h2>Total Price: ₹ {totalPrice.toFixed(2)}</h2>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Checkout with Stripe
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
