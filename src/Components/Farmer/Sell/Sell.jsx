import React, { useState } from "react";
import axios from "axios";
import styles from "./Sell.module.css";

const vegetables = [
  {
    name: "Tomato",
    imageUrl:
      "https://th.bing.com/th/id/OIP.l79aHrfdag2l3nilD76QiQHaLH?rs=1&pid=ImgDetMain",
  },
  {
    name: "Onion",
    imageUrl:
      "https://th.bing.com/th/id/OIP.p1ypzNrrK0Xuh1fmQ7k8PgHaF-?rs=1&pid=ImgDetMain",
  },
  {
    name: "Cauliflower",
    imageUrl:
      "https://th.bing.com/th/id/OIP.p1ypzNrrK0Xuh1fmQ7k8PgHaF-?rs=1&pid=ImgDetMain",
  },
  {
    name: "Carrot",
    imageUrl:
      "https://th.bing.com/th/id/OIP.SMUqoTYb_lhK5WP_ytwKqQHaHa?rs=1&pid=ImgDetMain",
  },
  {
    name: "Coriander Leaves",
    imageUrl:
      "https://procaffenation.com/wp-content/uploads/2020/08/Benefits-Of-Coriander-For-A-Good-Health.jpeg",
  },
  {
    name: "Eggplant",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Solanum_melongena_24_08_2012_%281%29.JPG/1200px-Solanum_melongena_24_08_2012_%281%29.JPG",
  },
  {
    name: "Garlic",
    imageUrl:
      "https://th.bing.com/th/id/OIP.S_IPr534azsGNzQJvzjBoQAAAA?rs=1&pid=ImgDetMain",
  },
  {
    name: "Mushroom",
    imageUrl:
      "https://nypost.com/wp-content/uploads/sites/2/2017/01/shutterstock_253955395.jpg?quality=90&strip=all&w=1200",
  },
  {
    name: "Bitter Gourd",
    imageUrl:
      "https://storables.com/wp-content/uploads/2023/12/how-long-to-germinate-bitter-gourd-1701586708.jpg",
  },
  {
    name: "Radish",
    imageUrl:
      "https://th.bing.com/th/id/OIP.o-q8kRw_4WWyTqc4J7380QHaHa?rs=1&pid=ImgDetMain",
  },
];

const Sell = () => {
  const [selectedVegetable, setSelectedVegetable] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleVegetableChange = (e) => {
    const vegName = e.target.value;
    setSelectedVegetable(vegName);
    const vegetable = vegetables.find((veg) => veg.name === vegName);
    setImageUrl(vegetable ? vegetable.imageUrl : "");
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async () => {
    const farmercode = localStorage.getItem("farmerCode");
    if (!farmercode) {
      alert("Please log in to sell items");
      return;
    }
    if (selectedVegetable && price) {
      try {
        await axios.post("http://localhost:6996/vegetables/add-vegetables", {
          farmerCode: farmercode, // Ensure farmerCode is available
          vegetableName: selectedVegetable,
          vegetablePrice: parseFloat(price),
          imageUrl: imageUrl,
        });
        alert(`${selectedVegetable} price added successfully`);
        setSelectedVegetable("");
        setPrice("");
        setImageUrl("");
      } catch (error) {
        console.error("Error adding price:", error);
        alert("Failed to add price");
      }
    } else {
      alert("Please select a vegetable and enter a price");
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.section__title}>Sell Your Products</div>
      <div className={styles.form}>
        <label htmlFor="vegetable">Select Vegetable:</label>
        <input
          list="vegetable-list"
          id="vegetable"
          placeholder="Select a vegetable"
          value={selectedVegetable}
          onChange={handleVegetableChange}
          className={styles.input}
        />
        <datalist id="vegetable-list">
          {vegetables.map((veg) => (
            <option key={veg.name} value={veg.name} />
          ))}
        </datalist>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={selectedVegetable}
            className={styles.image}
          />
        )}
        <label htmlFor="price">Enter Price:</label>
        <input
          type="number"
          id="price"
          placeholder="Enter your price"
          value={price}
          onChange={handlePriceChange}
          className={styles.input}
          min={0}
        />
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit Price
        </button>
      </div>
    </div>
  );
};

export default Sell;
