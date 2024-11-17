import React from "react";
import styles from "./successFailure.module.css"; // Importing the CSS module

const Failure = () => {
  return (
    <div className={`${styles.statusPage} ${styles.failure}`}>
      <h1>Failure</h1>
      <p>Something went wrong. Please try again.</p>
    </div>
  );
};

export default Failure;
