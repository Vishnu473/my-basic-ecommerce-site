import React from 'react'

const ProductCard = ({ product }) => {
    return (
      <div className="hover:shadow-lg hover:shadow-gray-500 transition-all duration-300 bg-white border-2 flex flex-col items-center content-center p-4 rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.title}
        width={220}
        height={220}
        className=" object-cover rounded-md mb-4"
      />
      <h4>{product.title}</h4>
      <p className="text-sm my-4 text-gray-500">{product.description}</p>
      <p className="text-xl font-bold mt-2">Price: {product.price} USD</p>
    </div>
    );
  };
  

export default ProductCard