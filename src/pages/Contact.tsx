import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_um8l68r",    
        "template_nx5jxnh",   
        formRef.current,
        "MvHgvOeR1YjbkI3N2"     
      )
      .then(
        () => {
          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });

          setTimeout(() => setSubmitted(false), 3000);
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-12">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
      <p className="text-center text-gray-600 mb-8">
        Have questions or inquiries? Feel free to reach out to us!
      </p>

      {/* Contact Info */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
        <p><strong>Email:</strong> support@jaiswalarts.com</p>
        <p><strong>Phone:</strong> +91 9356567724</p>
        <p><strong>Address:</strong> P.N.80, Paithan Road , Chhatrapati Sambhajinagar</p>
      </div>

      {/* Contact Form */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
        {submitted ? (
          <p className="text-green-600 font-medium">
            ✅ Thank you! Your message has been sent.
          </p>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              rows={4}
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
