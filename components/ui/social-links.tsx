"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Instagram, 
  ArrowUpRight, 
  Mail, 
  Copy, 
  Check 
} from "lucide-react";
import { useState } from "react";

export default function SocialLinks() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("freelance.arhamm@gmail.com"); // Replace with actual email
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mt-4"
    >
      {/* 1. LinkedIn - Professional */}
      <motion.a
        href="#" // Add your link
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        className="col-span-1 bg-[#0077B5] rounded-3xl p-6 text-white shadow-lg shadow-blue-900/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={24} />
        </div>
        <div className="absolute -bottom-4 -right-4 text-white/10">
          <Linkedin size={120} strokeWidth={1} />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-between min-h-140px">
          <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Linkedin size={24} fill="currentColor" className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">LinkedIn</h3>
            <p className="text-blue-100 text-sm font-medium mt-1">Let&apos;s connect professionally</p>
          </div>
        </div>
      </motion.a>

      {/* 2. GitHub - Developer */}
      <motion.a
        href="https://github.com/ArhammJain" // Add your link
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        className="col-span-1 bg-[#181717] rounded-3xl p-6 text-white shadow-lg shadow-gray-900/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={24} />
        </div>
        <div className="absolute -bottom-6 -right-6 text-white/5">
          <Github size={140} strokeWidth={1.5} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between min-h-[140px]">
          <div className="bg-white/15 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
            <Github size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">GitHub</h3>
            <p className="text-gray-400 text-sm font-medium mt-1">Check out my repositories</p>
          </div>
        </div>
      </motion.a>

      {/* 3. Instagram - Personal */}
      <motion.a
        href="https://www.instagram.com/arham.builds" // Add your link
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        className="col-span-1 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-3xl p-6 text-white shadow-lg shadow-orange-900/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={24} />
        </div>
        <div className="absolute -bottom-8 -right-8 text-white/10 rotate-12">
          <Instagram size={150} strokeWidth={1.5} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between min-h-[140px]">
          <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Instagram size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Instagram</h3>
            <p className="text-white/90 text-sm font-medium mt-1">Check out my content</p>
          </div>
        </div>
      </motion.a>

      {/* 4. Email / Contact - Utility (Spans full width on mobile) */}
      <motion.div
        variants={itemVariants}
        onClick={handleCopyEmail}
        className="col-span-1 sm:col-span-2 md:col-span-3 bg-white border border-slate-200 rounded-3xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#1D56CF] hover:shadow-md transition-all group active:scale-[0.99]"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <Mail size={20} className="text-slate-600 group-hover:text-[#1D56CF]" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">Drop me an email</h4>
            <p className="text-slate-500 text-xs sm:text-sm">freelance.arhamm@gmail.com</p>
          </div>
        </div>
        
        <div className="pr-4 text-slate-400 group-hover:text-[#1D56CF] transition-colors">
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </div>
      </motion.div>

    </motion.div>
  );
}