import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { NavLink, Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";
import { cartContext } from "../Context/CartContextProvider";
import { UserContext } from "../Context/UserContextProvider";

const Navbar = () => {
  const { cartList, itemsInCartCount } = useContext(cartContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("Detected a change in cartList from Navbar");
  }, [cartList]);
  //Updates count when added product to cart when the cartList changes
  return (
    <>
      <div className={styles.header}>
        <div className={styles.linkContainer}>
          <NavLink
            to="/my-basic-ecommerce-site/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            <img src={logo} alt="logo" style={{ height: 40 }} />
          </NavLink>
          <h2>Shoppy</h2>
        </div>

        <div className={styles.linkContainer}>
          <div className={styles.link}>
            <NavLink
              to="/my-basic-ecommerce-site/about"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              About
            </NavLink>
          </div>
          <div className={styles.link}>
            <NavLink
              to="/my-basic-ecommerce-site/cart"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              Cart{" "}
              {itemsInCartCount > 0 && (
                <span className={styles.cartCount}>{itemsInCartCount}</span>
              )}
            </NavLink>
          </div>
          {!user.isLoggedIn ? (
            <div className={styles.linkContainer}>
              <div className={styles.link}>
                <NavLink
                  to="/my-basic-ecommerce-site/auth/login"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.navLink
                  }
                >
                  Login
                </NavLink>
              </div>
            </div>
          ) : (
            <div className={styles.linkContainer}>
              <div className={styles.link}>
                <NavLink
                  to="/my-basic-ecommerce-site/user"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.navLink
                  }
                >
                  User
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
