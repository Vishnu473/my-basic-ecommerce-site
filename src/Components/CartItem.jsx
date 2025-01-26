import React from "react";
import styles from "../Styles/CartItem.module.css";

const CartItem = ({ cartItem, updateQty, removeFromCart  }) => {
  const { item, qty } = cartItem;
  const totalItemPrice = item.price * qty;

  

  return (
    <div className={styles.CartItemContainer}>
    <div className={styles.cartItem}>
      <img src={item.thumbnail} alt={item.title} className={styles.cartItemImg} />
      <div className={styles.cartItemInfo}>
        <h3>{item.title}</h3>
        <div className={styles.cartItemQuantity}>
          {/* <button onClick={() => handleQuantityChange(item.id, qty - 1)}>-</button> */}
          {/* <span>Quantity: {qty}</span> */}
          {/* <button onClick={() => handleQuantityChange(item.id, qty + 1)}>+</button> */}
        </div>
        <div className={styles.cartItemPrice}>
          <p className={styles.line}>{qty} X ${item.price.toFixed(2) }</p>
          <p>Total: ${(totalItemPrice).toFixed(2)}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CartItem;
