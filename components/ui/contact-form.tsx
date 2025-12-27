"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 🔴 Replace these with your actual EmailJS keys if you haven't already
const SERVICE_ID = "service_1jsape8"; 
const TEMPLATE_ID = "template_id";    // Replace with your Template ID
const PUBLIC_KEY = "public_key";      // Replace with your Public Key

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    if (!form.current) return;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setStatus("success");
          if (form.current) form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
          setStatus("error");
        }
      );
  };

  return (
    <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Get in touch</h3>
        <p className="text-sm text-slate-500 mt-1">
          Have a project in mind? Let&apos;s build something together.
        </p>
      </div>

      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
        
        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Name</label>
          <input
            type="text"
            name="user_name"
            required
            placeholder="Arham Chhajed"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D56CF]/20 focus:border-[#1D56CF] transition-all"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email</label>
          <input
            type="email"
            name="user_email"
            required
            placeholder="arham@example.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D56CF]/20 focus:border-[#1D56CF] transition-all"
          />
        </div>

        {/* Message Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Message</label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell me about your project..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D56CF]/20 focus:border-[#1D56CF] transition-all resize-none"
          />
        </div>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Message sent successfully!
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <AlertCircle size={16} />
              Something went wrong. Please try again.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1D56CF] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}