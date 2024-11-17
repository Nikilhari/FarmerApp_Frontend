import React from "react";
import styles from "./successFailure.module.css"; // Importing the CSS module

const Success = () => {
  return (
    <div className={`${styles.statusPage} ${styles.success}`}>
      <h1>Success!</h1>
      <p>Your operation was completed successfully.</p>
    </div>
  );
};

export default Success;
