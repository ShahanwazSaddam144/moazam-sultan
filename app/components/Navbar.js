"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Calculator, BookOpen, MessageSquareQuote, Mail, User2, Home } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-amber-600 to-orange-500 shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Math Tutor Logo"
              width={46}
              height={46}
              className="rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <h1 className="text-lg font-bold text-white leading-none">
                Moazam Sultan
              </h1>
              <p className="text-xs text-amber-100 tracking-wide">
                Mathematics Tutor
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 text-white">
            <NavItem href="#hero" icon={<Home size={18} />} label="Hero" />
            <NavItem href="#services" icon={<Calculator size={18} />} label="Services" />
            <NavItem href="#Testimonials" icon={<MessageSquareQuote size={18} />} label="Testimonials" />
            <NavItem href="#portfolio" icon={<User2 size={18} />} label="Portfolio" />
            <NavItem href="#contact" icon={<Mail size={18} />} label="Contact" />
          </div>

              <Link
              href="#bookSession"
              className="hidden lg:flex ml-4 rounded-lg bg-white text-amber-600 font-semibold px-4 py-2 shadow hover:bg-amber-50 transition"
            >
              Book a Session
            </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white"
            aria-label="Toggle Menu"
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden mt-3 rounded-2xl bg-gradient-to-r from-amber-300 to-orange-100 p-5 space-y-4 shadow-xl">
            <MobileNavItem href="#hero" icon={<Home size={18} />} label="Hero" />
            <MobileNavItem href="#testimonials" icon={<BookOpen size={18} />} label="Testimonials" />
            <MobileNavItem href="#services" icon={<Calculator size={18} />} label="Services" />
            <MobileNavItem href="#portfolio" icon={<User2 size={18} />} label="Portfolio" />
            <MobileNavItem href="#contact" icon={<Mail size={18} />} label="Contact" />
            <Link
              href="#bookSession"
              className="block mt-2 w-full text-center rounded-lg bg-amber-600 text-white font-semibold px-4 py-2 shadow hover:bg-amber-700 transition"
            >
              Book a Session
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, label }) => (
  <Link
    href={href}
    className="group relative flex items-center gap-2 cursor-pointer font-medium transition"
  >
    {icon}
    <span>{label}</span>
    <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
  </Link>
);

const MobileNavItem = ({ href, icon, label }) => (
  <Link
    href={href}
    className="flex items-center gap-3 rounded-lg px-3 py-2 text-amber-700 font-medium hover:bg-amber-100 transition cursor-pointer"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
