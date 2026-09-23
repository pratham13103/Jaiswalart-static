
import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import productData from "../data/products.json";
import productData1 from "../data/products1.json";

interface Product {
  id: number;
  image_url: string;
  images?: string[];
  name: string;
  artist: string;
  description: string;
  original_price: number;
  current_price: number;
  category: string;
  slug: string;
}

const ProductSearch: React.FC = () => {
  const location = useLocation();

  // Read the latest query directly from the URL
  const searchQuery =
    new URLSearchParams(location.search).get("query")?.trim() || "";

  // Combine and normalize products
  const products = useMemo(() => {
    const combinedData = [...productData, ...productData1];

    return combinedData.map((p, index) => ({
      ...p,
      id: p.id ?? index + 1,
      image_url: p.image_url ?? p.images?.[0] ?? "",
    })) as Product[];
  }, []);

  // Filter products whenever the URL query changes
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();

    if (!query) return [];

    return products.filter(
      (product) =>
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return (
    <div className="px-5 py-10 mt-32">
      <h2 className="text-3xl font-bold text-center mb-6">
        Search Results for: {searchQuery}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product, index) => (
            <motion.div
              key={`${product.slug}-${index}`}
              className="p-4 border rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-transform"
              whileHover={{ scale: 1.03 }}
            >
              <Link to={`/products/${product.slug}`}>
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-72 object-contain rounded-lg"
                />

                <h3 className="text-lg font-semibold mt-2">
                  {product.name}
                </h3>
              </Link>

              <p className="text-gray-500">{product.artist}</p>

              <p className="text-sm mt-2">{product.description}</p>

              <p className="mt-2">
                <span className="line-through text-gray-500 mr-2">
                  ₹{product.original_price}
                </span>

                <span className="text-red-600 font-bold">
                  ₹{product.current_price}
                </span>
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductSearch;