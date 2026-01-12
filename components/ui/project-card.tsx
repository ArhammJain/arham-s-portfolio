"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  imgSrc?: string;
  videoSrc?: string;
  link: string;
}

export function ProjectCard({ title, description, imgSrc, videoSrc, link }: ProjectCardProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className="group block w-full h-full bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-3xl overflow-hidden hover:border-[#1D56CF]/50 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Media Section */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-neutral-900">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : imgSrc ? (
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#1D56CF] dark:group-hover:text-blue-500 transition-colors">
            {title}
          </h3>
          <ArrowUpRight size={20} className="text-slate-400 dark:text-neutral-600 group-hover:text-[#1D56CF] dark:group-hover:text-blue-500 transition-colors" />
        </div>
        <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </Link>
  );
}