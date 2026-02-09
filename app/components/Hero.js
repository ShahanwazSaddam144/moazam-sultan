"use client";

import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="min-h-screen pt-24 bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-10 sm:mt-30 flex flex-col-reverse md:flex-row items-center justify-between gap-14">

          {/* Text Content */}
          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-amber-800 leading-tight">
              Master Mathematics <br />
              <span className="text-orange-500">With Confidence</span>
            </h1>

            <p className="mt-4 text-gray-700 text-lg">
              Personalized math tutoring for school, college, and competitive
              exams. Learn concepts clearly, solve faster, and score higher.
            </p>

            <div className="mt-6 flex flex-col mb-5 sm:flex-row gap-4 justify-center md:justify-start">
              <button className="rounded-xl cursor-pointer bg-amber-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-amber-700 transition">
                Book a Session
              </button>
              <button className="rounded-xl border-2 cursor-pointer border-amber-600 px-6 py-3 text-amber-700 font-semibold hover:bg-amber-100 transition">
                View Resources
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex justify-center md:justify-end w-full md:w-auto">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 blur-xl opacity-40"></div>
            <Image
              src="/logo.jpg"
              alt="Math Tutor"
              width={280}
              height={280}
              priority
              className="relative rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
