"use client";

import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [sessions, setSessions] = useState([]);

  const handleLogin = () => {
    if (
      login.username === process.env.NEXT_PUBLIC_DASHBOARD_USER &&
      login.password === process.env.NEXT_PUBLIC_DASHBOARD_PASS
    ) {
      setLoggedIn(true);
      fetchSessions();
    } else {
      setPopup({ show: true, message: "Incorrect username or password" });
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/bookSession");
      const data = await res.json();
      if (data.success) setSessions(data.sessions);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-50 flex items-center justify-center py-20">
        {!loggedIn ? (
          // Login Form
          <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl relative">
            <h2 className="text-4xl font-extrabold text-amber-800 text-center">
              Client Login
            </h2>
            <p className="mt-2 text-gray-600 text-center">
              Enter credentials to access booked sessions
            </p>

            <div className="mt-8 space-y-6">
              <input
                type="text"
                placeholder="Username"
                value={login.username}
                onChange={(e) => setLogin({ ...login, username: e.target.value })}
                className="w-full rounded-xl border border-amber-200 px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none transition"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                  className="w-full rounded-xl border border-amber-200 px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none transition pr-12"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <button
                onClick={handleLogin}
                className="w-full rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 transition text-lg"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          // Dashboard
          <div className="w-full max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-amber-800 mb-8 text-center">
              Booked Sessions
            </h2>
            {sessions.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">No sessions booked yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {sessions.map((s) => (
                  <div
                    key={s._id}
                    className="rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition"
                  >
                    <p className="text-gray-800"><strong>Name:</strong> {s.name}</p>
                    <p className="text-gray-800"><strong>Email:</strong> {s.email}</p>
                    <p className="text-gray-800"><strong>Grade:</strong> {s.grade}</p>
                    <p className="text-gray-800"><strong>Day:</strong> {s.day}</p>
                    <p className="text-gray-800"><strong>Time:</strong> {s.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Popup */}
        {popup.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
              <button
                onClick={() => setPopup({ show: false, message: "" })}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <X />
              </button>
              <h4 className="text-lg font-semibold text-amber-700">Notification</h4>
              <p className="mt-3 text-gray-600">{popup.message}</p>
              <button
                onClick={() => setPopup({ show: false, message: "" })}
                className="mt-5 w-full rounded-xl bg-amber-600 py-2 font-medium text-white hover:bg-amber-700"
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
