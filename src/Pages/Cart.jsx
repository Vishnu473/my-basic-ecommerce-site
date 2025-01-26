import React, { useContext } from "react";
import { cartContext } from "../Context/CartContextProvider";
import CartItem from "../Components/CartItem";
import styles from "../Styles/CartItem.module.css";

const Cart = () => {
  const { cartList, updateItemInCart } = useContext(cartContext);

  const totalPrice = cartList.reduce(
    (total, { item, qty }) => total + item.price * qty,
    0
  );


    if (cartList.length === 0) {
      return (
        <div className={styles.emptyCartMessage}>
          <h2>Your cart is empty</h2>
          <p>Start adding some products to your cart!</p>
        </div>
      );
    }

  return (
    <div className={styles.cart}>
      <div className={styles.cartList}>
        {cartList.map((cartItem) => (
          <CartItem
            key={cartItem.item.id}
            cartItem={cartItem}
            updateQty={updateItemInCart}
          />
        ))}

        <div className={styles.cartTotal}>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;
