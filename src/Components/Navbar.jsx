import React, {useState} from "react";
import logo from "../assets/logo.svg";
import { NavLink, Link } from "react-router-dom";
import styles from '../Styles/Navbar.module.css'

const Navbar = () => {

  
  return (
    <>
      <div className={styles.header}>
        <div  className={styles.linkContainer}>
        <NavLink to="/my-basic-ecommerce-site/" className={({ isActive }) => 
          isActive ? styles.activeLink : styles.navLink}><img src={logo} alt="logo" style={{ height: 40 }} /></NavLink>
          <h2>Shoppy</h2>
        </div>
        
        <div className={styles.linkContainer}>
          <div className={styles.link}><NavLink to="/my-basic-ecommerce-site/about" className={({ isActive }) => 
          isActive ? styles.activeLink : styles.navLink}>About</NavLink></div>
          <div className={styles.link}><NavLink to="/my-basic-ecommerce-site/cart" className={({ isActive }) => 
          isActive ? styles.activeLink : styles.navLink}>Cart</NavLink></div>
          <div className={styles.link}><NavLink to="/my-basic-ecommerce-site/auth/login" className={({ isActive }) => 
          isActive ? styles.activeLink : styles.navLink}>Login</NavLink></div>
          <div className={styles.link}><NavLink to="/my-basic-ecommerce-site/auth/signUp" className={({ isActive }) => 
          isActive ? styles.activeLink : styles.navLink}>SignUp</NavLink></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
