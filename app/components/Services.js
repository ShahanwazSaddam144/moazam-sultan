"use client";

import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { motion, useInView } from "framer-motion";
import { Check, GraduationCap, Layers } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

      {/* OUTER CONTAINER */}
      <section ref={sectionRef} id="services" className="bg-orange-50/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-orange-600"
            >
              Mathematics Teaching Services
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-gray-600 max-w-2xl mx-auto"
            >
              Concept-based, exam-focused mathematics teaching for school
              students with clear explanations and personal attention.
            </motion.p>
          </motion.div>

          {/* MAIN CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center"
          >
            {/* VIDEO CARD */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-xl rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-[2px] shadow-xl">
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

            {/* INFO CARD */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-orange-300 rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-orange-600 mb-4">
                What I Teach
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                I help students strengthen their fundamentals, improve problem-
                solving skills, and perform confidently in exams.
              </p>

              {/* SUBJECTS */}
              <ul className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Algebra & Linear Equations",
                  "Geometry & Mensuration",
                  "Trigonometry (Basics to Advanced)",
                  "Introduction to Calculus",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="
        flex items-center gap-3
        rounded-xl border border-orange-200
        bg-orange-50 px-4 py-3
        text-gray-800 font-medium
        shadow-sm hover:shadow-md
        transition
      "
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white">
                      <Check size={18} />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CLASSES CONTAINER */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="text-orange-600" />
                  <h4 className="text-lg font-semibold text-gray-800">
                    Classes I Teach
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  {[
                    "Class 1 – 3",
                    "Class 4 – 5",
                    "Class 6 – 8",
                    "Class 9",
                    "Class 10",
                    "O/A Levels "
                  ].map((cls, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2"
                    >
                      <Layers size={14} className="text-orange-600" />
                      {cls}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 w-full bg-orange-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-orange-700 transition"
              >
                Contact for Classes
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
