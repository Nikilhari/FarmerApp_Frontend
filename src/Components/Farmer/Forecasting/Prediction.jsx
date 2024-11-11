import React, { useState } from "react";
import axios from "axios";
import styles from "./prediction.module.css";

function Prediction() {
  const [forecast, setForecast] = useState(null);
  const [columnName, setColumnName] = useState("");

  const getForecast = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8002/forecast", {
        column_name: columnName,
        forecast_periods: 10,
      });
      setForecast(response.data.forecast); // Extracting forecast array directly
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  return (
    <div className={styles.section}>
      <h1 className={styles.sectionTitle}>Future Price Prediction</h1>

      <input
        type="text"
        id="predict"
        list="Predict"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        placeholder="Enter product name"
        className={styles.inputField}
      />
      <datalist id="Predict">
        <option value="Beans">Beans</option>
        <option value="Bitter gourd">Bitter gourd</option>
        <option value="cauliflower">Cauliflower</option>
        <option value="cabbage">Cabbage</option>
        <option value="capsicum">Capsicum</option>
        <option value="Drumstick">Drumstick</option>
        <option value="bottle gourd">Bottle gourd</option>
        <option value="carrot">Carrot</option>
        <option value="garlic">Garlic</option>
        <option value="ginger">Ginger</option>
        <option value="ladies finger">Ladies finger</option>
        <option value="onion">Onion</option>
        <option value="peas">Peas</option>
        <option value="brinjal">Brinjal</option>
        <option value="potato">Potato</option>
        <option value="pumpkin">Pumpkin</option>
        <option value="radish">Radish</option>
        <option value="small onion">Small onion</option>
        <option value="coriander">Coriander</option>
        <option value="Sweet Potato">Sweet Potato</option>
        <option value="tomato">Tomato</option>
        <option value="spinach">Spinach</option>
      </datalist>

      <button onClick={getForecast} className={styles.predictButton}>
        Predict
      </button>

      {forecast && (
        <div className={styles.forecastSection}>
          <h2 className={styles.forecastTitle}>
            Price prediction for next 10 days:
          </h2>
          <div className={styles.forecastCards}>
            {forecast.map((price, index) => (
              <div key={index} className={styles.forecastCard}>
                <p>Day {index + 1}</p>
                <p>{price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Prediction;
