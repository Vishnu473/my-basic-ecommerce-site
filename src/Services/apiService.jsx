import React from "react";
import axios from "axios";

const url1 = "https://api.escuelajs.co/api/v1/products";
const url = "https://dummyjson.com/products";
const url2 = "https://basicApis.onrender.com/products";
export const getProductList = async () => {
  try {
    const response = await axios.get(url);
    // if(url){
    //   return response.data.products;
    // }
    // else{
       return response.data.products;
      //return response.data;
    // }
    
  } catch (error) {
    throw error;
  }
};

export const getProductList2 = async () => {
  try {
    const response = await axios.get(url2);
    // if(url){
    //   return response.data.products;
    // }
    // else{
       return response.data;
       console.log(response.data);
      //return response.data;
    // }
    
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
