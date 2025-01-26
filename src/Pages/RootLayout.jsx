import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CartContextProvider from "../Context/CartContextProvider";

const RootLayout = () => {
  return (
    <>
      <CartContextProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartContextProvider>
    </>
  );
};

export default RootLayout;
