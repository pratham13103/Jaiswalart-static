import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, Grid } from "lucide-react";
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

const PRODUCTS_PER_PAGE = 8;

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gridType, setGridType] = useState<"grid4" | "grid9">("grid4");

  useEffect(() => {
    setProducts(productData); // Load from local JSON
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  const cardWidth =
    gridType === "grid4"
      ? "w-full sm:w-1/2 lg:w-1/4"
      : "w-full sm:w-1/2 md:w-1/3";

  return (
    <div className="pt-28 px-6 min-h-screen bg-white">
      {/* Header and Grid Switch */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">All Products</h1>
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={() => setGridType("grid4")}
            className={`p-3 rounded-lg ${
              gridType === "grid4"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            title="4 Grid View"
          >
            <LayoutGrid size={28} />
          </button>
          <button
            onClick={() => setGridType("grid9")}
            className={`p-3 rounded-lg ${
              gridType === "grid9"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            title="3 Grid View"
          >
            <Grid size={28} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex flex-wrap gap-6 justify-center">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className={`${cardWidth} p-5 border rounded-2xl shadow-md text-center bg-white hover:shadow-xl transition-transform hover:scale-105`}
          >
            <Link to={`/products/${product.slug}`}>
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-72 object-contain rounded-xl mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {product.name}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm">{product.artist}</p>
            <p className="text-sm mt-2 text-gray-600">{product.description}</p>
            <p className="mt-2 text-lg">
              <span className="line-through text-gray-400 text-sm">
                ₹{product.original_price}
              </span>{" "}
              <span className="text-red-600 font-bold">
                ₹{product.current_price}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
