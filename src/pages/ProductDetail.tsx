import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import productData from "../data/products.json";

interface Product {
  id: number;
  slug: string;
  image_url: string;
  name: string;
  artist: string;
  description: string;
  original_price: number;
  current_price: number;
  category: string;
  rating: number;
  stock: number;
  specifications?: string[];
}

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const matchedProduct = productData.find((item) => item.slug === slug);
      if (!matchedProduct) throw new Error("Product not found");
      setProduct(matchedProduct);

      // Similar products
      const similar = productData
        .filter(
          (item) =>
            item.category === matchedProduct.category && item.id !== matchedProduct.id
        )
        .slice(0, 3);
      setSimilarProducts(similar);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center text-gray-500">Product not found.</p>;

  return (
    <div className="p-4 mt-12">
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 h-[500px] md:col-span-2">
          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center items-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-80 object-contain rounded-lg"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between w-full overflow-y-auto">
            <div>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="text-gray-500 mt-1">{product.artist}</p>
              <p className="text-lg mt-3">{product.description}</p>
              <p className="mt-2 text-gray-600">
                <strong>Category:</strong> {product.category}
              </p>

              {/* Rating */}
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-lg">
                  {"★".repeat(Math.round(product.rating)).padEnd(5, "☆")}
                </span>
                <span className="text-gray-500 ml-2 text-sm">
                  ({product.rating} out of 5)
                </span>
              </div>

              {/* Price */}
              <p className="mt-4">
                <span className="line-through text-gray-500 text-xl">
                  ₹{product.original_price}
                </span>{" "}
                <span className="text-red-600 text-2xl font-bold">
                  ₹{product.current_price}
                </span>
              </p>

              {/* Stock */}
              {product.stock > 0 ? (
                <p className="mt-2 text-green-600 font-semibold">
                  In Stock: {product.stock}
                </p>
              ) : (
                <p className="mt-2 text-red-600 font-semibold">Out of Stock</p>
              )}
            </div>

            {/* Quantity + Order Button */}
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-200 rounded text-lg"
                >
                  −
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>

              <Link
                to={`/order/${product.slug}`}
                className={`py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700 inline-block ${
                  product.stock === 0 ? "pointer-events-none opacity-50" : ""
                }`}
              >
                {product.stock > 0 ? "Order Now (COD)" : "Out of Stock"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold">Similar Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer p-2 border rounded-lg hover:shadow-md transition"
                onClick={() => navigate(`/products/${item.slug}`)}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-32 object-contain rounded"
                />
                <p className="text-center mt-2 font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
