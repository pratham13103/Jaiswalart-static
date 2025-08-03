import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import productData from "../data/products.json";
import emailjs from "@emailjs/browser";
import UnderDevelopment from "../pages/UnderDevelopment";

const OrderForm: React.FC = () => {
  const { slug } = useParams();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const underDevSlugs = ["floral-mandala"];
  if (slug && underDevSlugs.includes(slug)) {
    return <UnderDevelopment />;
  }

  const product = productData.find((item) => item.slug === slug);

  if (!product) {
    return <p className="text-center mt-24 text-red-500">Product not found.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs
        .sendForm(
          "service_um8l68r",
          "template_nx5jxnh", // order_template
          formRef.current,
          "MvHgvOeR1YjbkI3N2"
        )
        .then(() => {
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
          formRef.current?.reset();
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          alert("Failed to send order. Please try again.");
        });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 p-6 bg-white shadow rounded grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="flex justify-center items-center">
        <img
          src={product.image_url}
          alt={product.name}
          className="rounded-lg shadow-lg max-h-[420px] w-full object-contain"
        />
      </div>

      {/* Product Info + Form */}
      <div>
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-1 text-sm">By {product.artist}</p>
        <p className="text-sm text-gray-500 mb-2">ID: {product.id}</p>
        <p className="text-gray-500 text-sm mb-4">{product.description}</p>
        <div className="mb-5">
          <span className="text-xl font-semibold text-red-600">
            ₹{product.current_price}
          </span>
          {product.original_price > product.current_price && (
            <span className="ml-3 text-gray-400 line-through">
              ₹{product.original_price}
            </span>
          )}
        </div>

        {submitted ? (
          <p className="text-green-600 font-semibold mt-4">
            Your order has been submitted! We'll contact you soon.
          </p>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Hidden Fields for EmailJS */}
            <input type="hidden" name="product_id" value={product.id} />
            <input type="hidden" name="product_name" value={product.name} />
            <input type="hidden" name="product_price" value={product.current_price} />

            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
            <input
              type="tel"
              name="user_phone"
              placeholder="Phone Number"
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
            <input
              type="text"
              name="user_address"
              placeholder="Delivery Address"
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
            <textarea
              name="custom_message"
              placeholder="Any custom request (optional)"
              className="w-full border border-gray-300 p-3 rounded"
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Submit Order (COD)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
