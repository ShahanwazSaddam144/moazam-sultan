"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Youtube,
  X,
  ExternalLink,
  Tag,
  Clock,
  ArrowRight,
  Star,
  User2,
  Video,
  Play,
} from "lucide-react";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    type: "intro",
    title: "Meet Your Instructor: Moazzam Sultan",
    category: "Introduction",
    videoUrl: "https://youtu.be/2oPoVJV4APY",
    duration: "0:59",
    tags: ["Philosophy", "Methodology", "Experience"],
    description:
      "A brief look into my background, teaching style, and how I use digital tools to make complex mathematics easy to understand.",
  },
  {
    id: 2,
    type: "video",
    title: "IGCSE Math: 2025 Paper 2 Walkthrough",
    category: "Cambridge IGCSE",
    videoUrl: "https://youtu.be/tsCgH-Pqdl8",
    duration: "1:51:21",
    tags: ["IGCSE", "Past Papers", "Exam Prep"],
    description:
      "A comprehensive, step-by-step solution of the latest IGCSE Extended Paper, focusing on exam techniques and time management.",
  },
  {
    id: 3,
    type: "video",
    title: "The Art of Rationalizing Surds",
    category: "Matric (Class 9)",
    videoUrl: "https://youtu.be/8VyvRs1yBuc",
    duration: "2:11:55",
    tags: ["Algebra", "Radicals", "Rationalization"],
    description:
      "Mastering the concept of surds and binomial denominators. I explain the logic behind rationalizing to simplify complex fractions.",
  },
  {
    id: 4,
    type: "video",
    title: "Understanding Angles & Geometry Basics",
    category: "Matric (Class 9)",
    videoUrl: "https://www.youtube.com/watch?v=AOkiRMqhDDw",
    duration: "1:04:09",
    tags: ["Geometry", "Quadrants", "Trigonometry"],
    description:
      "Exploring the fundamentals of angles, including quadrants and coterminal concepts, along with practical geometric applications.",
  },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Accessibility: Close on Escape key
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      setMounted(false);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getThumbnail = (item) => {
    const id = getYouTubeId(item.videoUrl);
    return id
      ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      : "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800";
  };

  const filteredItems =
    filter === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.type === filter);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "unset";
  }, [selectedItem]);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-orange-600 tracking-[0.2em] uppercase mb-4">
              Learning Library
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Interactive <span className="text-orange-600">Tutorials</span>
            </h3>
          </motion.div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://www.youtube.com/@iammoazzamsultan"
            target="_blank"
            className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-bold shadow-xl hover:bg-red-700 transition-all"
          >
            <Youtube size={24} />
            Visit My Channel
          </motion.a>
        </div>

        {/* Filter Navigation */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {["all", "intro", "video"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border whitespace-nowrap ${
                filter === type
                  ? "bg-amber-600 text-white border-amber-900 shadow-lg"
                  : "bg-amber-50 text-gray-500 border-orange-100 hover:border-orange-200"
              }`}
            >
              {type === "all"
                ? "Everything"
                : type === "intro"
                  ? "About Me"
                  : "Full Lessons"}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={getThumbnail(item)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="flex items-center gap-1 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/10">
                      <Clock size={12} /> {item.duration}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-3 block">
                    {item.category}
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {filter === "all" && (
              <motion.a
                layout
                href="https://www.youtube.com/@iammoazzamsultan"
                target="_blank"
                className="group flex flex-col items-center justify-center p-8 bg-ornage-50 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-orange-300 over:bg-orange-50/30 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                  <Youtube className="text-red-600" size={32} />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-2">
                  Explore More
                </h4>
                <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                  Visit Channel <ArrowRight size={16} />
                </div>
              </motion.a>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* PORTAL MODAL VIEW */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-orange-900/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-8"
                onClick={() => setSelectedItem(null)}
              >
                {/* IMPROVED CLOSE BUTTON: Outside container, high z-index */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(null);
                  }}
                  className="fixed top-6 right-6 z-[10005] p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20 shadow-2xl group"
                  aria-label="Close modal"
                >
                  <X
                    size={28}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                </button>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 40 }}
                  className="bg-white w-full max-w-6xl h-full md:h-auto md:max-h-[85vh] md:rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] relative flex flex-col lg:flex-row"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                  {/* Video Section */}
                  <div className="w-full lg:w-[65%] bg-black flex items-center">
                    <div className="w-full aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(selectedItem.videoUrl)}?autoplay=1`}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="w-full lg:w-[35%] p-8 md:p-12 overflow-y-auto flex flex-col bg-white">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-6">
                        <span className="px-3 py-1 bg-amber-50 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                          {selectedItem.category}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 leading-[1.1]">
                        {selectedItem.title}
                      </h3>

                      <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                        {selectedItem.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-10">
                        {selectedItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl"
                          >
                            <Tag size={12} /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100">
                      <a
                        href={selectedItem.videoUrl}
                        target="_blank"
                        className="flex items-center justify-center gap-3 w-full py-5 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-xl group"
                      >
                        Watch on YouTube
                        <ExternalLink
                          size={18}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {/* Metric Containers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-15">
        {[
          {
            title: "Subscribe",
            value: "2.84K+",
            icon: <User2 size={24} />,
            bg: "bg-orange-50",
            iconBg: "bg-orange-600 text-white",
            progress: "bg-gradient-to-r from-orange-400 to-orange-600",
            progressValue: "85%", 
          },
          {
            title: "Videos",
            value: "22+",
            icon: <Video size={24} />,
            bg: "bg-orange-50",
            iconBg: "bg-orange-600 text-white",
            progress: "bg-gradient-to-r from-yellow-400 to-amber-500",
            progressValue: "80%",
          },
          {
            title: "Years of Experience",
            value: "4+",
            icon: <Star size={24} />,
            bg: "bg-orange-50",
            iconBg: "bg-orange-600 text-white",
            progress: "bg-gradient-to-r from-green-400 to-teal-500",
            progressValue: "90%",
          },
          {
            title: "Views",
            value: "9.7K+",
            icon: <Play size={24} />,
            bg: "bg-orange-50",
            iconBg: "bg-orange-600 text-white",
            progress: "bg-gradient-to-r from-pink-400 to-purple-500",
            progressValue: "95%",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className={`border-2 border-gray-300 hover:border-orange-300 active:border-orange-300 flex flex-col items-center justify-center ${item.bg} rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer`}
          >
            <span
              className={`p-3 rounded-full mb-3 flex items-center justify-center ${item.iconBg}`}
            >
              {item.icon}
            </span>
            <h3 className="text-2xl font-bold text-gray-900">{item.value}</h3>
            <div className="w-full h-2 rounded-full bg-gray-200 mt-2 mb-2">
              <div
                className={`h-2 rounded-full ${item.progress}`}
                style={{ width: item.progressValue }}
              ></div>
            </div>
            <p className="text-gray-600 text-sm text-center">{item.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
