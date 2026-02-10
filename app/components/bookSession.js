"use client";

import React, { useState } from "react";
import { Calendar, Clock, X } from "lucide-react";

const availability = [
  { day: "Monday", slots: ["4:00 PM", "6:00 PM", "8:00 PM"] },
  { day: "Wednesday", slots: ["5:00 PM", "7:00 PM"] },
  { day: "Friday", slots: ["4:00 PM", "6:00 PM"] },
  { day: "Saturday", slots: ["11:00 AM", "2:00 PM", "5:00 PM"] },
];

const BookSession = () => {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", grade: "" });
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(false); // new state

  const handleBooking = async () => {
    if (!form.name || !form.email || !form.grade || !selected) {
      setPopup({
        show: true,
        message: "Please fill all fields and select a session time.",
      });
      return;
    }

    setLoading(true); // disable button

    try {
      const res = await fetch("/api/bookSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          grade: form.grade,
          day: selected.day,
          time: selected.time,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setPopup({ show: true, message: "✅ Booking confirmed successfully!" });
        setForm({ name: "", email: "", grade: "" });
        setSelected(null);
      } else {
        setPopup({ show: true, message: `⚠️ ${data.message}` });
      }
    } catch (err) {
      console.error(err);
      setPopup({
        show: true,
        message: "⚠️ Server error. Please try again later.",
      });
    } finally {
      setLoading(false); // re-enable button after request completes
    }
  };

  return (
    <>
      <section className="bg-gradient-to-b from-orange-100 to-amber-50 py-20" id="bookSession">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-amber-800">
              Book a Session
            </h2>
            <p className="mt-3 text-gray-600 text-lg">
              Check availability and book your preferred session
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {/* Availability */}
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <div className="mb-6 flex items-center gap-3 text-amber-700">
                <Calendar />
                <h3 className="text-xl font-semibold">Available Days</h3>
              </div>
              <div className="space-y-4">
                {availability.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-amber-100 p-4"
                  >
                    <p className="font-semibold text-gray-800">{item.day}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.slots.map((slot, i) => (
                        <button
                          key={i}
                          onClick={() =>
                            setSelected({ day: item.day, time: slot })
                          }
                          className={`rounded-lg px-3 py-1 text-sm border transition ${
                            selected?.day === item.day &&
                            selected?.time === slot
                              ? "bg-amber-600 text-white border-amber-600"
                              : "border-amber-300 text-amber-700 hover:bg-amber-100"
                          }`}
                        >
                          <Clock className="inline-block mr-1 h-4 w-4" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h3 className="mb-6 text-xl font-semibold text-amber-700">
                Session Details
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-amber-200 px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-amber-200 px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Class / Grade"
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  className="w-full rounded-xl border border-amber-200 px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none"
                />

                <div className="rounded-xl bg-amber-50 p-4 text-sm text-gray-700">
                  {selected ? (
                    <>
                      <p>
                        <strong>Day:</strong> {selected.day}
                      </p>
                      <p>
                        <strong>Time:</strong> {selected.time}
                      </p>
                    </>
                  ) : (
                    <p>Please select a day and time.</p>
                  )}
                </div>

                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className={`w-full rounded-xl px-6 py-3 font-semibold text-white transition 
    ${
      loading
        ? "bg-amber-400 cursor-not-allowed pointer-events-none"
        : "bg-amber-600 hover:bg-amber-700"
    }`}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Popup */}
      {popup.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <button
              onClick={() => setPopup({ show: false, message: "" })}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X />
            </button>
            <h4 className="text-lg font-semibold text-amber-700">
              Notification
            </h4>
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
    </>
  );
};

export default BookSession;
