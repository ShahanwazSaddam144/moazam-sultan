"use client";

import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Services = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { amount: 0.4 });

  useEffect(() => {
    if (!videoRef.current) return;
    isInView ? videoRef.current.play() : videoRef.current.pause();
  }, [isInView]);

  return (
    <>
      <Navbar />

      <section
        ref={sectionRef}
        className="max-w-6xl mx-auto px-6 py-20"
        id="services"
      >
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-14"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 🎥 Video */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-xl rounded-2xl p-[2px] bg-gradient-to-br from-orange-500 to-orange-600 shadow-xl">
              <div className="bg-white rounded-2xl overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                  src="/video/intro.mp4"
                />
              </div>
            </div>
          </motion.div>

          {/* 📘 Content */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              Mathematics Teaching Services
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              I provide structured, concept-focused mathematics lessons that
              help students build clarity, confidence, and long-term academic
              success.
            </p>

            <motion.ul
              className="space-y-4 flex flex-col items-center md:items-start"
              variants={containerVariants}
            >
              {[
                "Algebra & Equations",
                "Geometry & Mensuration",
                "Trigonometry",
                "Calculus Basics",
              ].map((service, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center text-lg text-gray-800"
                >
                  <span className="text-green-600 mr-3 text-xl"><Check size={20}/></span>
                  {service}
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md
               hover:bg-orange-700 transition cursor-pointer"
            >
              Contact for Classes
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Services;
