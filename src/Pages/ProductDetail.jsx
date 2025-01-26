import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../Services/apiService";
import { cartContext } from "../Context/CartContextProvider";
import styles from "../Styles/ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();

  // Using cartContext for adding, removing, updating cartItems
  const { cartList, addToCart, removeFromCart, updateItemInCart } =
    useContext(cartContext);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  //To toggle Add/RemoveBtn
  const [itemAdded, setItemAdded] = useState(false);
  const [productQty, setProductQty] = useState(0);

  useEffect(() => {
    const fetchProductDetailData = async (id) => {
      try {
        const result = await getProduct(id);
        setProduct(result);
        setIsLoading(false);
      } catch (error) {
        setErrorMsg(error);
        setIsLoading(false);
      }
    };

    fetchProductDetailData(id);
  }, [id]);

  const addItem = (product) => {
    //Add cart Logic
    addToCart(product);
    setItemAdded(true);
    console.log("Successfully added to cart");
  };

  const removeItem = (productId) => {
    //Remove cart Logic
    removeFromCart(productId);
    setItemAdded(false);
    console.log("Removing item from cart with id: " + productId);
    
  };

  const incrItem = () => {
    updateItemInCart(product.id, productQty+1);
  }

  const decrItem = () => {
    if (productQty > 1) {
      updateItemInCart(product.id, productQty - 1);
    } else {
      removeFromCart(product.id);
      setItemAdded(false);
    }
  }

  useEffect(() => {
    const ProductInCart = cartList.find(item => item.item.id === product.id);
    if (ProductInCart){
      setProductQty(ProductInCart.qty);
      setItemAdded(true);
    }
    else{
      setItemAdded(false);
      setProductQty(0);
    }
  },[cartList,product.id]);


  if (isLoading) {
    return <p>Loading......</p>;
  }
  if (errorMsg) {
    return (
      <div>
        <p>{errorMsg}</p>
      </div>
    );
  }

  if (product) {
    return (
      <>
        {
          <div className={styles.productDetailCenter}>
            <div className={styles.productDetailContainer}>
              <div className={styles.productDetailHeader}>
                <div className={styles.productInfo}>
                  <h1>{product.title}</h1>

                  <p>{product.description}</p>
                  
                  <div className={styles.priceCart}>
                    <div className={styles.price}>
                      <p>Price</p>
                      <p>
                        <span className={styles.discountPrice}>
                          $
                          {(
                            product.price -
                            product.price * (product.discountPercentage / 100)
                          ).toFixed(2) + "  "}
                        </span>
                        <span className={styles.originalPrice}>
                          ${product.price}
                        </span>
                        <span className={styles.discount}>
                          {product.discountPercentage}% off
                        </span>
                      </p>
                      {/* <p>{product.availabilityStatus}</p> */}
                    </div>

                    <div className={styles.btnDiv}>
                      {!itemAdded ? (
                        <div>
                          <button
                            className={styles.btn}
                            onClick={() => addItem(product)}
                          >
                            {" "}
                            Add to cart
                          </button>
                        </div>
                      ) : (
                        <>
                          
                          <button
                            className={styles.rmvBtn}
                            onClick={() => removeItem(product.id)}
                          >
                            Remove
                          </button>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <button className={styles.mathBtn} onClick={incrItem}>+</button>
                            <p style={{width:'30px', textAlign:'center', padding:'8px', margin:'0px 5px', borderBottom:'1px solid gray'}}>{productQty}</p>
                            <button className={styles.mathBtn} onClick={decrItem}>-</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.productThumbnail}
                />
              </div>
              <hr />
              <div className={styles.productAdditionalInfo}>
                <div className={styles.productDetails}>
                  <h3>Details</h3>
                  <ul>
                    <li>
                      <b>Brand: </b>
                      {product.brand}
                    </li>
                    <li>
                      <b>Category: </b>
                      {product.category}
                    </li>
                    <li>
                      <b>SKU: </b>
                      {product.sku}
                    </li>
                    <li>
                      <b>Weight: </b>
                      {product.weight} kg
                    </li>
                    <li>
                      <b>Dimensions: </b>
                      {product.dimensions.width} x {product.dimensions.height} x{" "}
                      {product.dimensions.depth}
                      cm
                    </li>
                    <li>
                      <b>Warranty: </b>
                      {product.warrantyInformation}
                    </li>
                    <li>
                      <b>Shipping: </b>
                      {product.shippingInformation}
                    </li>
                    <li>
                      <b>Return Policy: </b>
                      {product.returnPolicy}
                    </li>
                    <li>
                      <b>Minimum Order Quantity: </b>
                      {product.minimumOrderQuantity}
                    </li>
                  </ul>
                </div>
                <div className="productQr">
                  <h3>Product QR Code</h3>
                  <img src={product.meta.qrCode} alt="QR Code" />
                </div>
              </div>

              <div className={styles.productReviews}>
                <h3>Reviews</h3>
                {product.reviews.map((review, index) => (
                  <div key={index} className={styles.reviewItem}>
                    <div className={styles.reviwerContainer}>
                      <div className={styles.reviewerProfile}>
                        <div className={styles.reviwerImg}></div>
                        <h4>{review.reviewerName}</h4>
                      </div>
                      <p>
                        Rating:
                        {Array.from({ length: review.rating }).map(
                          (_, index) => (
                            <span key={index}>⭐</span>
                          )
                        )}
                      </p>
                    </div>
                    <p>
                      <b>Comments: </b>
                      <span>{review.comment}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </>
    );
  }
};

export default ProductDetail;
