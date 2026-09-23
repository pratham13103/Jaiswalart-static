import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";

const categories = [
  "Mandala Art",
  "Warli Art",
  "Sketch",
  "Painting",
  "Paule",
  "Other",
];

const CustomOrders: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await emailjs.sendForm(
        "service_um8l68r",
        "template_ryvnlzt",
        event.target as HTMLFormElement,
        "MvHgvOeR1YjbkI3N2"
      );

      setSubmitted(true);
      setName("");
      setEmail("");
      setSelectedCategory("");
      setDescription("");
      setFile(null);

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert("Error sending message. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Custom Art Orders | Jaiswal Arts</title>

        <meta
          name="description"
          content="Request customized artwork from Jaiswal Arts. Share your idea, choose an art category, and upload a reference image for your personalized creation."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://jaiswalart-static-git-main-prathameshs-projects-003b6a5b.vercel.app/custom-orders"
        />

        <meta
          property="og:title"
          content="Custom Art Orders | Jaiswal Arts"
        />

        <meta
          property="og:description"
          content="Bring your creative ideas to life with customized artwork from Jaiswal Arts. Submit your custom art request today."
        />

        <meta
          property="og:url"
          content="https://jaiswalart-static-git-main-prathameshs-projects-003b6a5b.vercel.app/custom-orders"
        />

        <meta property="og:type" content="website" />

        <meta
          name="twitter:card"
          content="summary"
        />

        <meta
          name="twitter:title"
          content="Custom Art Orders | Jaiswal Arts"
        />

        <meta
          name="twitter:description"
          content="Request personalized Mandala Art, Warli Art, sketches, paintings, and more from Jaiswal Arts."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto p-8 mt-24 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">
          Help Us Reach You with Customized Art
        </h2>

        <p className="text-lg text-gray-600 text-center mb-6">
          Describe your idea, select the art type, and upload a reference
          image if needed.
        </p>

        {submitted && (
          <p className="text-green-600 text-center mb-6 font-semibold">
            🎉 Your custom order request has been sent successfully!
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg"
        >
          <input type="hidden" name="user_name" value={name} />
          <input type="hidden" name="user_email" value={email} />
          <input type="hidden" name="category" value={selectedCategory} />
          <input type="hidden" name="description" value={description} />

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">
              Your Name
            </label>

            <input
              type="text"
              name="user_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md text-base"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">
              Your Email
            </label>

            <input
              type="email"
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md text-base"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">
              Art Category
            </label>

            <select
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-base"
            >
              <option value="">Select a category</option>

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-semibold mb-1">
              Upload Reference (Optional)
            </label>

            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-md text-base"
            />

            {file && (
              <p className="text-sm text-gray-500 mt-1">
                {file.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">
              Describe Your Art Idea
            </label>

            <textarea
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Provide details about the custom art you want..."
              className="w-full px-4 py-2 border rounded-md text-base"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-orange-500 transition-all text-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomOrders;