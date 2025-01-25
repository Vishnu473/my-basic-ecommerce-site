import React from "react";
import axios from "axios";

const url1 = "https://api.escuelajs.co/api/v1/products";
const url = "https://dummyjson.com/products";
export const getProductList = async () => {
  try {
    const response = await axios.get(url1);
    // if(url){
    //   return response.data.products;
    // }
    // else{
      return response.data;
    // }
    
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${url1}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
