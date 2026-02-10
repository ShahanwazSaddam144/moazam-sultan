"use client";

import React from "react";
import Navbar from "./Navbar";
import { Star, Quote } from "lucide-react";

const testimonialsData = [
  {
    name: "Ahmed Khan",
    class: "Class 9",
    review:
      "Sir explains mathematics concepts very clearly. My confidence and exam results improved a lot.",
    rating: 5,
  },
  {
    name: "Ayesha Malik",
    class: "O Levels",
    review:
      "Best math teacher! Every topic becomes easy and understandable with proper examples.",
    rating: 5,
  },
  {
    name: "Ali Raza",
    class: "Class 10",
    review:
      "Highly recommended for board exams. Practice sessions helped me score better marks.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <>
      <Navbar />

      <section
        id="Testimonials"
        className="bg-orange-50/40 py-24"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-orange-600">
              Student Testimonials
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              What my students say about my teaching style and learning experience.
            </p>
          </div>

          {/* TESTIMONIAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((item, index) => (
              <div
                key={index}
                className="
                  relative bg-white rounded-2xl p-8
                  shadow-lg hover:shadow-xl
                  transition border-2 border-gray-300 hover:border-orange-300
                  active:border-orange-300 cursor-pointer
                "
              >
                {/* Quote Icon */}
                <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md">
                  <Quote size={20} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-orange-500 fill-orange-500"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-700 leading-relaxed mb-6">
                  “{item.review}”
                </p>

                {/* Student Info */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.class}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Testimonials;
