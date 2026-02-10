"use client";

import React from "react";
import Navbar from "./Navbar";
import { Star, Quote, User2, CheckCircle, Award } from "lucide-react";
import { motion } from "framer-motion";

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
    name: "Shahnawaz Saddam Butt",
    class: "Class 10",
    review:
      "Highly recommended for board exams. Practice sessions helped me score better marks.",
    rating: 4,
  },
];

// Helper to get initials from full name
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .slice(0, 3)
    .join("");
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const metricsData = [
  {
    title: "Students Taught",
    value: "500+",
    icon: <User2 size={24} />,
    bg: "bg-orange-50",
    iconBg: "bg-orange-600 text-white",
  },
  {
    title: "Success Rate",
    value: "98%",
    icon: <CheckCircle size={24} />,
    bg: "bg-orange-50",
    iconBg: "bg-orange-600 text-white",
  },
  {
    title: "O/A Level Results",
    value: "A* Grades",
    icon: <Award size={24} />,
    bg: "bg-orange-50",
    iconBg: "bg-orange-600 text-white",
  },
];

const Testimonials = () => {
  return (
    <>
      <Navbar />

      <section id="Testimonials" className="bg-orange-50/40 py-24">
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
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
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
                <div className="border-t pt-4 flex items-center gap-3">
                  {/* Avatar with initials */}
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-600 text-white font-bold rounded-full text-sm">
                    {getInitials(item.name)}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.class}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

            {/* METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {metricsData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col items-center justify-center ${item.bg} rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer border-2 border-gray-300 hover:border-orange-300`}
              >
                <span className={`p-3 rounded-full mb-3 flex items-center justify-center ${item.iconBg}`}>
                  {item.icon}
                </span>
                <h3 className="text-2xl font-bold text-gray-900">{item.value}</h3>
                <p className="text-gray-600 text-sm text-center">{item.title}</p>
              </motion.div>
            ))}
          </div>
      </section>
    </>
  );
};

export default Testimonials;
