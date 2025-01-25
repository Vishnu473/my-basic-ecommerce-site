import React from "react";
import styles from "../Styles/productCard.module.css";
import { Link, useNavigate } from "react-router-dom";

const ProductItem = ({ item }) => {

  const navigator = useNavigate();

  const ShowDetailProduct = (productId) => {
    navigator(`/my-basic-ecommerce-site/products/${productId}`);
  }


  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.imgBg}>
          <img src={item.images[0]} loading="lazy" width={150} height={150} />
        </div>
        <div className={styles.productDesc}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.desc}>{item.description}</p>
          <div className={styles.priceRating}>
            <h5 className={styles.price}>${item.price}</h5>
            {item.rating ? (
              <p>Rating: {item.rating}</p>
            ) : (
              <p>Category: {item.category.name}</p>
            )}
          </div>
        </div>
        
        <div className={styles.btnDiv}>
          <button className={styles.btn} onClick={() =>ShowDetailProduct(item.id)}>View</button>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
