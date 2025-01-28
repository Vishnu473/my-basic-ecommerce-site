import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CartContextProvider from "../Context/CartContextProvider";
import UserContextProvider from "../Context/UserContextProvider";

const RootLayout = () => {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
};

export default RootLayout;
