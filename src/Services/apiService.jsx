import React from 'react';
import axios from 'axios';

export const getProductList = async() => {
  try {
    const url='https://dummyjson.com/products';
    const response = await axios.get(url);
    return response.data.products;
  } catch (error) {
    throw error;
  }
}