import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [itemsInCartCount, setItemsInCartCount] = useState(0);
  //cartList = [{cartItem:product, cartItemQty:1},......]

  const addToCart = (product) => {
    setCartList((prevCartList) => {
      // Check if the item already exists in the cart
      const existingItem = prevCartList.find(
        (item) => item.item.id === product.id
      );

      if (existingItem) {
        // If it exists, update the quantity
        return prevCartList.map((item) =>
          item.item.id === product.id
            ? { ...item, qty: item.qty + 1 } // Increment the quantity
            : item
        );
      } else {
        // If it doesn't exist, add the new item with qty = 1
        return [...prevCartList, { qty: 1, item: product }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartList((prevCartList) =>
      prevCartList.filter((item) => item.item.id !== itemId)
    );
  };

  const updateItemInCart = (itemId, updatedQty) => {
    setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item.item.id === itemId
          ? { ...item, qty: updatedQty } // Update the quantity
          : item
      )
    );
  };

  const getTotalCartItems = () => {
    // const count = cartList.reduce((total, { qty }) => total + qty, 0);
    const count= cartList.length;
    setItemsInCartCount(count);
  };
  

  useEffect(() => {
    getTotalCartItems();
    console.log("Detected change in ContextProvider for totalCartitems"+itemsInCartCount)
  }, [cartList]);

  return (
    <cartContext.Provider
      value={{
        cartList,
        itemsInCartCount,
        setCartList,
        addToCart,
        removeFromCart,
        updateItemInCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
