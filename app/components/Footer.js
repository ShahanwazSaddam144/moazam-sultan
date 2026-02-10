import React from 'react';
import { Mail, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-50 border-t border-amber-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Name */}
        <div className="flex items-center gap-2 text-amber-800 font-bold text-xl">
          <User className="w-6 h-6" />
          <span>Moazam Sultan</span>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="w-5 h-5 text-amber-600" />
          <a href="mailto:example@example.com" className="hover:text-amber-800 transition">
            sultanmoazam3@gmail.com
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} Moazam Sultan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
