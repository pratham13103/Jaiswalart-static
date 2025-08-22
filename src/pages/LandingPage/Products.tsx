import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import TrendingProducts from "./TrendingProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import productData from "../../data/products.json";

interface Product {
  id: number;
  image_url: string; // guaranteed after normalization
  images?: string[];
  name: string;
  artist: string;
  description: string;
  original_price: number;
  current_price: number;
  category: string;
  slug: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const PRODUCTS_PER_PAGE = 5;

  useEffect(() => {
    const formattedProducts: Product[] = productData.map((p) => ({
      ...p,
      image_url: p.image_url ?? p.images?.[0] ?? "", // fallback to first image or empty string
    }));
    setProducts(formattedProducts);
    setLoading(false);
  }, []);

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + PRODUCTS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(products.length - PRODUCTS_PER_PAGE, 0)
        : prev - PRODUCTS_PER_PAGE
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + PRODUCTS_PER_PAGE >= products.length ? 0 : prev + PRODUCTS_PER_PAGE
    );
  };

  const handleOrderNow = (slug: string) => {
    navigate(`/order/${slug}`);
  };

  return (
    <div className="px-4 md:px-14 py-14 bg-gradient-to-br from-[#fefefc] to-[#f2e9e4]">
      <h2 className="text-5xl font-bold text-center text-gray-800 mb-10">
        Featured Artworks
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <>
          <div className="flex justify-end mb-8">
            <button
              onClick={() => navigate("/all-products")}
              className="px-6 py-2 text-base font-semibold bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full hover:shadow-xl transition-all"
            >
              Explore All Products →
            </button>
          </div>

          {/* Mobile - 5 Products Horizontal Row with Arrow Navigation */}
          <div className="relative block lg:hidden">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Products Horizontal Row */}
            <div className="mx-8 overflow-hidden">
              <div className="grid grid-cols-5 gap-3">
                {visibleProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="p-3 rounded-xl bg-white/60 backdrop-blur-md border border-gray-200 shadow-md min-w-0"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, scaleX: 0 }} // start hidden & squished
                    whileInView={{ opacity: 1, scaleX: 1 }} // animate when in view
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }} // trigger when 30% visible
                  >
                    <Link to={`/products/${product.slug}`}>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-24 object-contain rounded-lg mb-2"
                      />
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {product.artist}
                    </p>
                    <p className="text-xs mt-1 text-gray-600 line-clamp-1">
                      {product.description}
                    </p>
                    <div className="mt-2 flex flex-col gap-1">
                      <p className="text-xs">
                        <span className="line-through text-gray-400 mr-1">
                          ₹{product.original_price}
                        </span>
                        <span className="text-red-600 font-bold">
                          ₹{product.current_price}
                        </span>
                      </p>
                      <button
                        onClick={() => handleOrderNow(product.slug)}
                        className="w-full py-1.5 bg-green-700 text-white rounded-lg text-xs hover:bg-green-800 transition font-medium"
                      >
                        Order Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Desktop - Grid View with Navigation */}
          <div className="relative hidden lg:block">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md border border-gray-300 p-3 rounded-full hover:bg-gray-100 z-10 shadow"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="grid grid-cols-5 gap-8 mx-12">
              {visibleProducts.map((product) => (
                <motion.div
                  key={`card-${product.id}`} // stable key, not tied to array slice index
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-64 object-contain rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm">{product.artist}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {product.description}
                  </p>
                  <p className="mt-3 text-lg">
                    <span className="line-through text-gray-400 mr-2">
                      ₹{product.original_price}
                    </span>
                    <span className="text-red-600 font-bold">
                      ₹{product.current_price}
                    </span>
                  </p>
                  <button
                    onClick={() => handleOrderNow(product.slug)}
                    className="mt-4 w-full py-2 bg-rose-500 text-white rounded-xl text-sm font-medium hover:bg-rose-600 transition-all"
                  >
                    Order Now (COD)
                  </button>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md border border-gray-300 p-3 rounded-full hover:bg-gray-100 z-10 shadow"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}

      <TrendingProducts />
    </div>
  );
};

export default Products;
