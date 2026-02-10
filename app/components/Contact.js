"use client";

import React, { useState } from "react";
import { Mail, Phone, Instagram, X } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/Contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      setPopup({ show: true, message: data.message, success: data.success });

      if (data.success) {
        setFormData({ name: "", email: "", phone: "", inquiry: "" }); 
      }
    } catch (err) {
      console.error(err);
      setPopup({ show: true, message: "Server error. Please try again.", success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-orange-50/30 py-24 px-6" id="contact">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-10">
          <h2 className="text-5xl font-bold text-gray-900">
            Ready to Master <br /> <span className="text-orange-600">Mathematics?</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Reach out to me and start your journey toward excellence in Math.
          </p>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border-2 border-gray-300 hover:border-orange-300">
              <Phone className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-gray-700 font-semibold">Phone</p>
                <p className="text-gray-500">+92 309 7016696</p>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border-2 border-gray-300 hover:border-orange-300">
              <Instagram className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-gray-700 font-semibold">Instagram</p>
                <p className="text-gray-500">@iammoazzamsultan</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border-2 border-gray-300 hover:border-orange-300">
              <Mail className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-gray-700 font-semibold">Email</p>
                <p className="text-gray-500">sultanmoazam3@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition border-2 border-gray-300 hover:border-orange-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-semibold text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-orange-400 outline-none transition shadow-sm"
                required
              />
            </div>

            <div className="flex-col flex sm:flex-row gap-5">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-semibold text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-orange-400 outline-none transition shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-1 font-semibold text-gray-700">Phone</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-orange-400 outline-none transition shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="inquiry" className="mb-1 font-semibold text-gray-700">Inquiry</label>
              <textarea
                id="inquiry"
                name="inquiry"
                placeholder="Your Inquiry"
                value={formData.inquiry}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-orange-400 outline-none transition shadow-sm resize-none"
                rows={4}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-orange-600 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-orange-700"}`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>

      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <button
              onClick={() => setPopup({ show: false, message: "", success: false })}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X />
            </button>
            <h4 className={`text-lg font-semibold ${popup.success ? "text-green-600" : "text-red-600"}`}>
              {popup.success ? "Success" : "Error"}
            </h4>
            <p className="mt-3 text-gray-600">{popup.message}</p>
            <button
              onClick={() => setPopup({ show: false, message: "", success: false })}
              className="mt-5 w-full rounded-xl bg-orange-600 py-2 font-medium text-white hover:bg-orange-700 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
