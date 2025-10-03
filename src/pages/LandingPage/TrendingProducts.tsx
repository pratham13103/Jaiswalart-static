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
    shape: "Square",
  },
  21: {
    id: 21,
    name: "Set of Two Green Black Mandala Mirror Art",
    artist: "Pratibha Jaiswal",
    description:
      "Set of Two Green Black Mandala Mirror Art with White Border and Black Frame",
    original_price: 2500,
    current_price: 2400,
    category: "Mandala Art",
    image_url: "/products/Green Black Mandala.jpeg",
    rating: 0,
    stock: 10,
    slug: "set-of-two-green-black-mandala-mirror-art",
    shape: "Square",
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? videoSources.length - 1 : selectedIndex - 1
      );
    } else {
      setCurrentIndex(
        currentIndex === 0 ? videoSources.length - 1 : currentIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === videoSources.length - 1 ? 0 : selectedIndex + 1
      );
    } else {
      setCurrentIndex(
        currentIndex === videoSources.length - 1 ? 0 : currentIndex + 1
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
      <h2 className="text-5xl font-bold text-center mb-10">
        Trending Products
      </h2>

      {/* Desktop layout */}
      <div className="hidden md:flex justify-center gap-6">
        {videoSources.map((item, index) => (
          <div
            key={item.video}
            className="relative w-[280px] h-[480px] rounded-2xl shadow-xl flex-shrink-0 group"
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
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2.5 text-base font-semibold bg-red-600 hover:bg-orange-500 text-white rounded-full transition-all flex items-center justify-center gap-2 shadow-lg whitespace-nowrap"
            >
              View Details <MoveRight size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Mobile layout */}
      <div className="relative md:hidden flex justify-center items-center">
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 opacity-80 hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="w-[280px] h-[480px] rounded-2xl shadow-xl overflow-hidden">
          <video
            src={`/videos/${videoSources[currentIndex].video}.mp4`}
            className="w-full h-full object-cover cursor-pointer"
            autoPlay
            loop
            muted
            playsInline
            onClick={() => setSelectedIndex(currentIndex)}
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 opacity-80 hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
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
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative flex flex-col items-center w-full max-w-[1000px]">
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setSelectedIndex(null)}
                className="text-white hover:text-gray-300"
              >
                <X size={32} />
              </button>
            </div>

            {/* Videos + Order Button */}
            <div className="flex items-center gap-6">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="bg-white text-black rounded-full p-3 hover:bg-gray-200"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Center Video */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <video
                  src={`/videos/${videoSources[selectedIndex].video}.mp4`}
                  className="w-full max-w-[90vw] md:max-w-[380px] aspect-[9/16] rounded-xl border-4 border-white"
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

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="bg-white text-black rounded-full p-3 hover:bg-gray-200"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
