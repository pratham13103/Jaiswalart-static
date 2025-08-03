import React from "react";
import { useParams } from "react-router-dom";
import productData from "../data/products.json";

const OrderForm: React.FC = () => {
  const { slug } = useParams();
  const product = productData.find((item) => item.slug === slug);

  if (!product) {
    return <p className="text-center mt-24 text-red-500">Product not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white shadow rounded grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Left Side: Product Image */}
      <div className="flex justify-center">
        <img
          src={product.image_url}
          alt={product.name}
          className="rounded-lg shadow-lg max-h-[400px] object-contain"
        />
      </div>

      {/* Right Side: Product Info + Form */}
      <div>
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-700 mb-1">by {product.artist}</p>
        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
        <div className="mb-4">
          <span className="text-lg font-bold text-red-600">₹{product.current_price}</span>
          {product.original_price > product.current_price && (
            <span className="ml-2 text-gray-500 line-through">₹{product.original_price}</span>
          )}
        </div>

        {/* Order Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full border p-3 rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            placeholder="Delivery Address"
            required
            className="w-full border p-3 rounded"
          />
          <textarea
            placeholder="Any custom request (optional)"
            className="w-full border p-3 rounded"
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              alert(`Your order for "${product.name}" has been submitted! We'll contact you soon.`);
            }}
            className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Order (COD)
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
