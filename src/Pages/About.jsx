import React, { useEffect, useState } from 'react'
import { getProductList2 } from '../Services/apiService'
import ProductCard from '../Components/ProductCard';
import styles from "../Styles/ProductCard.module.css"

const About = () => {
  const [products,setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProductList2();
      console.log(result);
      setProducts(result);
    }

    fetchProducts();
  },[])
  return (
    <>
    <div className={styles.productList}>
  {products.length > 0 ? (
    products.map((product, index) => (
      <div key={index} className="w-full sm:w-64 md:w-80 lg:w-96">
        <ProductCard product={product} />
      </div>
    ))
  ) : (
    <p>No products available.</p>
  )}
</div>
    </>
  )
}

export default About