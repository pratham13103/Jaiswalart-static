import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  artist: string;
  description: string;
  image_url: string;
  category: string;
  original_price: number;
  current_price: number;
  slug?: string;
  rating?: number;
  stock?: number;
  shape?: string;
};

const productMap: { [key: number]: Product } = {
  17: {
    id: 17,
    name: "Floral Mandala",
    artist: "Pratibha Jaiswal",
    description: "A traditional mandala pattern on canvas",
    image_url: "/products/mandala17.jpg",
    category: "Mandala Art",
    original_price: 1500,
    current_price: 1200,
    slug: "floral-mandala",
    rating: 0,
    stock: 10,
    shape: "Square",
  },
  20: {
    id: 20,
    name: "Coulourful Mandala Art Photo Frame",
    artist: "Pratibha Jaiswal",
    description: "Colourful Mandala Art Photo Frames Available, Order Now",
    image_url: "/products/Coulourful Mandala Art Photo Frame.jpeg",
    category: "Mandala Art",
    original_price: 1600,
    current_price: 1500,
    slug: "coulourful-mandala-art-photo-frame",
    rating: 4.8,
    stock: 10,
    shape: "Square",
  },
  22: {
    id: 22,
    name: "Electric Lime Black Mirror Mandala",
    artist: "Pratibha Jaiswal",
    description: "Electric Lime Black Mirror Mandala",
    original_price: 800,
    current_price: 699,
    category: "Mandala Art",
    image_url: "/products/Electric Lime Black Mirror Mandala.jpeg",
    rating: 0,
    stock: 10,
    slug: "electric-lime-black-mirror-mandala",
    shape: "Circle",
  },
  23: {
    id: 23,
    name: "Black n White Mandalas Art",
    artist: "Prarthana Jaiswal",
    description: "Black n White Mandalas Art Black Frame",
    original_price: 1200,
    current_price: 1099,
    category: "Mandala Art",
    image_url: "/products/Black n White Mandalas Art.jpeg",
    rating: 0,
    stock: 10,
    slug: "black-n-white-mandalas-art",
    shape: "Square"
  },
  21:{
    id: 21,
    name: "Set of Two Green Black Mandala Mirror Art",
    artist: "Pratibha Jaiswal",
    description: "Set of Two Green Black Mandala Mirror Art with White Border and Black Frame",
    original_price: 2500,
    current_price: 2400,
    category: "Mandala Art",
    image_url: "/products/Green Black Mandala.jpeg",
    rating: 0,
    stock: 10,
    slug: "set-of-two-green-black-mandala-mirror-art",
    shape: "Square"
  },
};

const videoSources = [
  { video: 1, productId: 17 },
  { video: 2, productId: 20 },
  { video: 3, productId: 22 },
  { video: 4, productId: 23 },
  { video: 5, productId: 21 },
];

const TrendingProducts: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? videoSources.length - 1 : selectedIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === videoSources.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  const getIndex = (offset: number) => {
    if (selectedIndex === null) return 0;
    const length = videoSources.length;
    return (selectedIndex + offset + length) % length;
  };

  return (
    <div className="mt-24 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        Trending Products
      </h2>

      {/* Horizontal Reel Display */}
      <div className="flex justify-center">
        <div className="flex gap-6 overflow-x-auto pb-6">
          {videoSources.map((item, index) => (
            <div
              key={item.video}
              className="relative w-[350px] h-[600px] rounded-2xl shadow-xl flex-shrink-0 group"
            >
              <video
                src={`/videos/${item.video}.mp4`}
                className="w-full h-full rounded-2xl object-cover cursor-pointer"
                autoPlay
                loop
                muted
                playsInline
                onClick={() => setSelectedIndex(index)}
              />
              <button
                onClick={() => setSelectedIndex(index)}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2 bg-orange-600 text-white font-medium rounded-md shadow hover:bg-orange-500 transition-all flex items-center gap-2"
              >
                View Details <MoveRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Explore All Products */}
      <div className="flex justify-center mt-10">
        <a
          href="/all-products"
          className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-110 rounded-full shadow-md transition-all"
        >
          Explore All Products
        </a>
      </div>

      {/* Overlay Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#2a2a2a] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute top-6 right-6 z-[9999]">
            <button
              onClick={() => setSelectedIndex(null)}
              className="text-white hover:text-gray-300 z-[9999]"
              style={{ pointerEvents: "auto" }}
            >
              <X size={32} />
            </button>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-6 bg-white text-black rounded-full p-3 hover:bg-gray-200 z-20"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 bg-white text-black rounded-full p-3 hover:bg-gray-200 z-20"
          >
            <ChevronRight size={28} />
          </button>

          <div className="flex flex-col items-center z-10 w-full">
            <div className="flex flex-wrap justify-center items-center gap-4 w-full">
              {[getIndex(-2), getIndex(-1)].map((idx) => (
                <video
                  key={`left-${idx}`}
                  src={`/videos/${videoSources[idx].video}.mp4`}
                  className="w-24 md:w-[300px] aspect-[9/16] rounded-xl blur-2xl opacity-25 pointer-events-none object-cover"
                  muted
                  playsInline
                />
              ))}

              <div className="flex flex-col md:flex-row items-center gap-6">
                <video
                  src={`/videos/${videoSources[selectedIndex].video}.mp4`}
                  className="w-full max-w-[90vw] md:max-w-[460px] aspect-[9/16] rounded-xl border-4 border-white"
                  autoPlay
                  loop
                  controls
                  playsInline
                />
                <button
                  onClick={() => {
                    const productId = videoSources[selectedIndex].productId;
                    const product = productMap[productId];
                    if (product?.slug) {
                      navigate(`/order/${product.slug}`);
                    } else {
                      alert("Product not found.");
                    }
                  }}
                  className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition"
                >
                  Order Now (COD)
                </button>
              </div>

              {[getIndex(1), getIndex(2)].map((idx) => (
                <video
                  key={`right-${idx}`}
                  src={`/videos/${videoSources[idx].video}.mp4`}
                  className="w-24 md:w-[300px] aspect-[9/16] rounded-xl blur-2xl opacity-25 pointer-events-none object-cover"
                  muted
                  playsInline
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
