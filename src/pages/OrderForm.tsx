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
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-6 text-center">Order Request</h2>

      <div className="mb-6 bg-gray-100 p-4 rounded">
        <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 mb-1">by {product.artist}</p>
        <p className="text-red-600 font-bold text-lg">₹{product.current_price}</p>
      </div>

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
  );
};

export default OrderForm;
