import React, { useState,useEffect } from 'react';
import {getProductList} from '../Services/apiService';
import ProductItem from '../Components/ProductItem';
import styles from "../Styles/productCard.module.css";

const ProductList = () => {
  
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const result = await getProductList();
        setProductData(result);
        setIsLoading(false);
        console.log(result);
      } catch (error) {
        setIsLoading(false);
        setErrorMsg(error);
      }
    };

    fetchData();
  }, []);
  
  if(isLoading){
    return <p>Loading......</p>
  }
  if(errorMsg){
    return <div>
      <p>{setErrorMsg}</p>
    </div>
  }

  return (
    <div className={styles.productList}>
    {productData && productData.length > 0 ? (
        productData.map((product) => (
          <ProductItem className={styles.productItem} key={product.id} item={product} />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
}

export default ProductList