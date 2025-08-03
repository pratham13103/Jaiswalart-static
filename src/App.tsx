import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./pages/LandingPage/Hero";
import Products from "./pages/LandingPage/Products";
import ProductDetail from "./pages/ProductDetail";
import ProductSearch from "./pages/ProductSearch";
import AddProduct from "./pages/AddProduct";
import Vision from "./pages/vision"; // Import Vision page
import CustomOrder from "./pages/CustomOrders"; // ✅ Import Custom Order component
import About from "./pages/About"; // Import About page
import Contact from "./pages/Contact"; // Import Contact page
import TermsAndConditions from "./pages/Legal/TermsAndConditions";
import RefundPolicy from "./pages/Legal/RefundPolicy";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import ShippingPolicy from "./pages/Legal/ShippingPolicy";
import { CartProvider } from "./context/CartContext"; // ✅ Import Cart Context
import AllProducts from "./pages/AllProducts";
import EditProduct from "./pages/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ use this
import UnderDevelopment from "./pages/UnderDevelopment"; 
import OrderForm from "./pages/OrderForm"; 

const App: React.FC = () => {
  return (
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} /> {/* Add About Route */}
              <Route path="/contact" element={<Contact />} /> {/* Add Contact Route */}
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product-search" element={<ProductSearch />} />
              <Route path="/products/:slug" element={<ProductDetail />} /> {/* Product Details Route */}
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/custom-orders" element={<CustomOrder />} /> {/* ✅ Add Custom Order Route */}
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>}/>
              <Route path="/vision" element={<Vision />} />
              <Route path="/prints" element={<UnderDevelopment />} /> 
              <Route path="/digital-art" element={<UnderDevelopment />} /> 
              <Route path="/order/:slug" element={<OrderForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
  );
};

export default App;
