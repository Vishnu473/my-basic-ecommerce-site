import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getProduct} from "../Services/apiService";
import styles from "../Styles/productCard.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [productItem, setProductItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchProductDetailData = async (id) => {
      try {
        const result = await getProduct(id);
        setProductItem(result);
        setIsLoading(false);
      } catch (error) {
        setErrorMsg(error);
        setIsLoading(false);
      }
    };

    fetchProductDetailData(id);
  }, []);

  const addToCart = (productItem) => {
    //Add cart Logic
    alert('Add to cart logic is not implemented yet.')
  }


  if(isLoading){
    return <p>Loading......</p>
  }
  if(errorMsg){
    return <div>
      <p>{setErrorMsg}</p>
    </div>
  }

  return (
    <>
    <div>{productItem.title}
        <button className={styles.btn} onClick={() => addToCart()}>Add to cart</button>
    </div>
    </>
  );
};

export default ProductDetail;
