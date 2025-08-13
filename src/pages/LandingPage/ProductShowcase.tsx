import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import productsData from "../../data/products1.json";

interface Product {
  id: number;
  image_url: string;
  slug: string;
}

const ProductShowcase: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const PRODUCTS_PER_PAGE = 8;
  const AUTO_SCROLL_INTERVAL = 4000;

  useEffect(() => {
    const formatted = productsData.map((p) => ({
      id: p.id,
      image_url: p.image_url ?? "",
      slug: p.slug,
    }));
    setProducts(formatted);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + PRODUCTS_PER_PAGE >= products.length ? 0 : prev + PRODUCTS_PER_PAGE
      );
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [products.length]);

  const visibleProducts = products.slice(currentIndex, currentIndex + PRODUCTS_PER_PAGE);

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="w-full px-0 lg:px-0 text-center mb-12">
        {/* Big bold heading */}
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          A Gallery of Timeless Creations
        </h2>

        {/* Longer description */}
        <p className="max-w-3xl mx-auto text-xl font-medium text-gray-700 mb-3">
          A timeless collection crafted with passion, precision, and purpose —  
          each piece waiting to find its place in your story.
        </p>

        {/* Subtle quote */}
        <p className="italic text-lg text-gray-500">
          “Art speaks where words are unable to explain.”
        </p>
      </div>

      {/* Desktop: 8 in one view (4x2 layout) */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 w-full">
        {visibleProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.04 }}
            className="bg-white p-0 flex items-center justify-center rounded-lg shadow-sm overflow-hidden"
          >
            <Link to={`/products/${product.slug}`} className="w-full">
              <img
                src={product.image_url}
                alt=""
                className="w-full h-73 object-cover"
              />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile: swipeable with flush edges */}
      <div className="flex md:hidden overflow-x-auto gap-3 no-scrollbar px-0">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.04 }}
            className="min-w-[80%] bg-white p-0 flex-shrink-0 rounded-lg shadow-sm overflow-hidden"
          >
            <Link to={`/products/${product.slug}`} className="w-full">
              <img
                src={product.image_url}
                alt=""
                className="w-full h-80 object-cover"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
