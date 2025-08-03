import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    artist: "",
    description: "",
    original_price: "",
    current_price: "",
    category: "",
    shape: "",
    stock: "",
    image: null as File | null,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const categories = ["Mandala Art", "Warli Art", "Sketches", "Paintings"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    let base64Image = "";
    if (product.image) {
      try {
        base64Image = await convertImageToBase64(product.image);
      } catch (err) {
        setMessage("Failed to process image.");
        return;
      }
    }

    const newProduct = {
      id: Date.now(),
      name: product.name,
      artist: product.artist,
      description: product.description,
      original_price: Number(product.original_price),
      current_price: Number(product.current_price),
      category: product.category,
      shape: product.shape,
      stock: Number(product.stock),
      image_url: base64Image,
      slug: generateSlug(product.name),
      rating: 4,
    };

    const existing = localStorage.getItem("products");
    const productList = existing ? JSON.parse(existing) : [];
    productList.push(newProduct);
    localStorage.setItem("products", JSON.stringify(productList));

    setMessage("Product added locally!");
    setProduct({
      name: "",
      artist: "",
      description: "",
      original_price: "",
      current_price: "",
      category: "",
      shape: "",
      stock: "",
      image: null,
    });

    setTimeout(() => navigate("/admin"), 1000);
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <input
            type="text"
            name="artist"
            value={product.artist}
            onChange={handleChange}
            placeholder="Artist Name"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 text-lg border rounded h-32"
            required
          />
          <input
            type="number"
            name="original_price"
            value={product.original_price}
            onChange={handleChange}
            placeholder="Original Price"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <input
            type="number"
            name="current_price"
            value={product.current_price}
            onChange={handleChange}
            placeholder="Current Price"
            className="w-full p-3 text-lg border rounded"
            required
          />
        </div>

        <div className="space-y-4">
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-3 text-lg border rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="shape"
            value={product.shape}
            onChange={handleChange}
            placeholder="Shape (e.g., Square, Round)"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="w-full p-3 text-lg border rounded"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-3 text-lg border rounded"
            accept="image/*"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-lg font-semibold rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
