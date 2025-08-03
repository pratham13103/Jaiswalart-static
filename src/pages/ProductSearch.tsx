import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import productData from "../data/products.json";

interface Product {
  id: number;
  image_url: string;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    setSearchQuery(query);

    try {
      setProducts(productData);
      setLoading(false);
    } catch (err: any) {
      setError("Failed to load products.");
      setLoading(false);
    }
  }, [location]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-5 py-10 mt-32">
      <h2 className="text-3xl font-bold text-center mb-6">
        Search Results for: {searchQuery}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="p-4 border rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/products/${product.slug}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-72 object-contain rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                </Link>
                <p className="text-gray-500">{product.artist}</p>
                <p className="text-sm mt-2">{product.description}</p>
                <p className="mt-2">
                  <span className="line-through text-gray-500">
                    ₹{product.original_price}
                  </span>{" "}
                  <span className="text-red-600 font-bold">
                    ₹{product.current_price}
                  </span>
                </p>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
