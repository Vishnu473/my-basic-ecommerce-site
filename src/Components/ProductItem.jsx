import React from "react";
import styles from "../Styles/productCard.module.css";

const ProductItem = ({ item }) => {
  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.imgBg}>
          <img src={item.images[0]} width={150} height={150}/>
        </div>
        <div className={styles.productDesc}>
          <p className={styles.title}>{item.title}hkjghbhlb jhygk</p>
          <p className={styles.desc}>{item.description}</p>
          <div className={styles.priceRating}>
            
              <h5 className={styles.price}>${item.price}</h5>
              <p>Rating: {item.rating}</p>
          </div>
        </div>
        <button className={styles.btn}>Add to cart</button>
      </div>
    </>
  );
};

export default ProductItem;
