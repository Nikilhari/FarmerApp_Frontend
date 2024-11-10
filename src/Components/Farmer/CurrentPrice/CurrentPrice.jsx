import React, { useState } from "react";
import rawData from "../../../../product_data.json";
import styles from "./CurrentPrice.module.css";

const cleanData = (data) => {
  return Object.entries(data).map(([name, price]) => {
    const formattedPrice = parseFloat(price.replace(/,/g, "")).toFixed(2);
    return { name, price: formattedPrice };
  });
};

const cleanedData = cleanData(rawData);

const CurrentPrice = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term and skip the first two rows
  const filteredData = cleanedData
    .slice(2)
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={styles.section}>
      <p className={styles.section__title}>Fruit Price List</p>
      <div className={styles.section__search}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.section__searchBox}
        />
      </div>
      <div className={styles.table__wrapper}>
        <table className={styles.CurrentPrice__table}>
          <thead>
            <tr className={styles.table__heading}>
              <th className={styles.table__subheading}>Particulars</th>
              <th className={styles.table__subheading}>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className={styles.table__item}>
                  <td className={styles.table__item}>{item.name}</td>
                  <td className={styles.table__item}>{item.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className={styles.noMatch}>
                  No match found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentPrice;
