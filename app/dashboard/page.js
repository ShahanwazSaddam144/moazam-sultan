"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, User, Calendar, Clock, Trash2, Eye, Phone, MailCheck } from "lucide-react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "" });

  // Booked Sessions
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [errorSessions, setErrorSessions] = useState("");

  // Contacts
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [errorContacts, setErrorContacts] = useState("");

  const [confirmDelete, setConfirmDelete] = useState({ show: false, sessionId: null, sessionName: "", type: "" });

  // Login
  const handleLogin = () => {
    if (
      login.username === process.env.NEXT_PUBLIC_DASHBOARD_USER &&
      login.password === process.env.NEXT_PUBLIC_DASHBOARD_PASS
    ) {
      setLoggedIn(true);
      fetchSessions();
      fetchContacts(); 
    } else {
      setPopup({ show: true, message: "Incorrect username or password" });
    }
  };

  // Fetch Booked Sessions
  const fetchSessions = async () => {
    setLoadingSessions(true);
    setErrorSessions("");
    try {
      const res = await fetch("/api/bookSession");
      const data = await res.json();

      if (data.success) {
        setSessions(data.sessions);
      } else {
        setErrorSessions(data.message || "Failed to load sessions");
      }
    } catch (err) {
      console.error(err);
      setErrorSessions("Server error. Please try again later.");
    } finally {
      setLoadingSessions(false);
    }
  };

  // Fetch Contacts
  const fetchContacts = async () => {
    setLoadingContacts(true);
    setErrorContacts("");
    try {
      const res = await fetch("/api/Contact");
      const data = await res.json();

      if (data.success) {
        setContacts(data.contacts);
      } else {
        setErrorContacts(data.message || "Failed to load contacts");
      }
    } catch (err) {
      console.error(err);
      setErrorContacts("Server error. Please try again later.");
    } finally {
      setLoadingContacts(false);
    }
  };

  // Delete Session or Contact
  const handleDelete = async () => {
    const { sessionId, type } = confirmDelete;
    const endpoint = type === "session" ? `/api/bookSession?id=${sessionId}` : `/api/Contact?id=${sessionId}`;

    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        if (type === "session") {
          setSessions(sessions.filter((s) => s._id !== sessionId));
        } else {
          setContacts(contacts.filter((c) => c._id !== sessionId));
        }
        setConfirmDelete({ show: false, sessionId: null, sessionName: "", type: "" });
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex flex-col items-center py-20 px-4">

        {!loggedIn ? (
          // LOGIN FORM
          <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-300 rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-orange-300 rounded-full opacity-30 animate-pulse"></div>

            <h2 className="text-4xl font-extrabold text-amber-800 text-center mb-2">Login</h2>
            <p className="text-gray-600 text-center mb-8">Enter credentials to access booked sessions and contacts</p>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Username"
                value={login.username}
                onChange={(e) => setLogin({ ...login, username: e.target.value })}
                className="w-full rounded-xl border border-amber-200 px-5 py-3 focus:ring-2 focus:ring-amber-400 outline-none transition shadow-sm"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                  className="w-full rounded-xl border border-amber-200 px-5 py-3 focus:ring-2 focus:ring-amber-400 outline-none pr-12 shadow-sm transition"
                />
                <span
                  className="absolute right-4 top-3 cursor-pointer text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <button
                onClick={handleLogin}
                className="w-full rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 transition text-lg shadow-md hover:shadow-lg"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          // DASHBOARD
          <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-16">

            {/* Booked Sessions */}
            <div>
              <h2 className="text-4xl font-extrabold text-amber-800 mb-2 text-center">Booked Sessions</h2>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-8"></div>

              {loadingSessions ? (
                <p className="text-center text-gray-600 text-lg">Loading sessions...</p>
              ) : errorSessions ? (
                <p className="text-center text-red-600 text-lg">{errorSessions}</p>
              ) : sessions.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No sessions booked yet.</p>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {sessions.map((s) => (
                    <div key={s._id} className="relative rounded-3xl bg-white shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-400"></div>
                      <button
                        onClick={() => setConfirmDelete({ show: true, sessionId: s._id, sessionName: s.name, type: "session" })}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 rounded-full p-2 shadow-md hover:shadow-lg transition"
                        title="Delete Session"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="p-6 pt-4 flex flex-col gap-3">
                        <h3 className="text-2xl font-bold text-amber-800 mb-2">{s.name}</h3>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-5 h-5 text-amber-600" /> <span className="font-medium">Email:</span> {s.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <User className="w-5 h-5 text-amber-600" /> <span className="font-medium">Grade:</span> {s.grade}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-5 h-5 text-amber-600" /> <span className="font-medium">Day:</span> {s.day}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-5 h-5 text-amber-600" /> <span className="font-medium">Time:</span> {s.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contacts Section */}
            <div>
              <h2 className="text-4xl font-extrabold text-amber-800 mb-2 text-center">Contacts</h2>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-8"></div>

              {loadingContacts ? (
                <p className="text-center text-gray-600 text-lg">Loading contacts...</p>
              ) : errorContacts ? (
                <p className="text-center text-red-600 text-lg">{errorContacts}</p>
              ) : contacts.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No contacts yet.</p>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {contacts.map((c) => (
                    <div key={c._id} className="relative rounded-3xl bg-white shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-400"></div>
                      <button
                        onClick={() => setConfirmDelete({ show: true, sessionId: c._id, sessionName: c.name, type: "contact" })}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 rounded-full p-2 shadow-md hover:shadow-lg transition"
                        title="Delete Contact"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="p-6 pt-4 flex flex-col gap-3">
                        <h3 className="text-2xl font-bold text-amber-800 mb-2">{c.name}</h3>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-5 h-5 text-amber-600" /> <span className="font-medium">Email:</span> {c.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-5 h-5 text-amber-600" /> <span className="font-medium">Phone:</span> {c.phone}
                        </div>
                          <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-5 h-5 text-amber-600" /> <span className="font-medium">Inquiry:</span> {c.phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Popup */}
        {popup.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
              <button onClick={() => setPopup({ show: false, message: "" })} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition">
                <X />
              </button>
              <h4 className="text-lg font-semibold text-amber-700">Notification</h4>
              <p className="mt-3 text-gray-600">{popup.message}</p>
              <button onClick={() => setPopup({ show: false, message: "" })} className="mt-5 w-full rounded-xl bg-amber-600 py-2 font-medium text-white hover:bg-amber-700 transition">
                Okay
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {confirmDelete.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
              <button
                onClick={() => setConfirmDelete({ show: false, sessionId: null, sessionName: "", type: "" })}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X />
              </button>
              <h4 className="text-lg font-semibold text-red-600">
                Delete {confirmDelete.type === "session" ? "Session" : "Contact"}
              </h4>
              <p className="mt-3 text-gray-600">
                Are you sure you want to delete <span className="font-bold">{confirmDelete.sessionName}</span>?
              </p>
              <div className="flex justify-center gap-4 mt-5">
                <button onClick={handleDelete} className="px-6 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition">
                  Yes, Delete
                </button>
                <button
                  onClick={() => setConfirmDelete({ show: false, sessionId: null, sessionName: "", type: "" })}
                  className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
