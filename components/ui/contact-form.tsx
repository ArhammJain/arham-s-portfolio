"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { User, Mail, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- EmailJS Configuration ---
const SERVICE_ID = "service_1jsape8"; 
const TEMPLATE_ID = "template_2a6ube5";
const PUBLIC_KEY = "Bh1KS-x9N7LZLVfiF";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    if (!formRef.current) return;

    // Simulation for demo (Remove this block when using real keys)
    if (SERVICE_ID === "YOUR_SERVICE_ID") {
      setTimeout(() => {
        setLoading(false);
        setStatus("success");
        formRef.current?.reset();
      }, 1500);
      return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setLoading(false);
        setStatus("success");
        formRef.current?.reset();
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setStatus("error");
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1D56CF]/10 text-[#1D56CF]">
                <MessageSquare size={16} />
              </span>
              <span className="text-[#1D56CF] text-xs font-bold tracking-wide uppercase">
                Get in Touch
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Let&apos;s start a project.</h2>
          </div>
          <div className="text-left md:text-right">
             <p className="text-slate-500 text-sm">
                Prefer email? <a href="mailto:freelance.arhamm@gmail.com" className="text-[#1D56CF] font-medium hover:underline">freelance.arhamm@gmail.com</a>
             </p>
          </div>
        </div>

        <form ref={formRef} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Name Input */}
          <div className="space-y-1.5">
            <label htmlFor="user_name" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1D56CF] transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                name="user_name"
                id="user_name"
                required
                placeholder="Arham Chhajed"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#1D56CF]/20 focus:border-[#1D56CF] transition-all text-slate-800 placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label htmlFor="user_email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1D56CF] transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="user_email"
                id="user_email"
                required
                placeholder="arham@example.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#1D56CF]/20 focus:border-[#1D56CF] transition-all text-slate-800 placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          {/* Message Input (Full Width) */}
          <div className="space-y-1.5 md:col-span-2">
            <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={4}
              placeholder="Tell me about your project goals, timeline, and budget..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#1D56CF]/20 focus:border-[#1D56CF] transition-all text-slate-800 placeholder:text-slate-400 font-medium resize-none"
            />
          </div>

          {/* Submit Button (Full Width) */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={loading || status === 'success'}
              className={cn(
                "w-full py-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.99]",
                status === 'success' 
                  ? "bg-green-500 hover:bg-green-600" 
                  : "bg-[#1D56CF] hover:bg-blue-700"
              )}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 size={18} />
                  Message Sent Successfully
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle size={18} />
                  Something went wrong. Try again.
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} className="ml-1" />
                </>
              )}
            </button>
          </div>

          {/* Success Message Animation */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:col-span-2 overflow-hidden"
              >
                <p className="text-center text-green-600 text-sm font-medium bg-green-50 py-2 rounded-lg border border-green-100">
                  Thanks for reaching out! I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}