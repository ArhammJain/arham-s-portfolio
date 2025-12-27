"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, 
  BookOpen, 
  Gamepad2, 
  Cpu, 
  Coffee, 
  Dumbbell, 
  Play, 
  Pause,
  FastForward, 
  Rewind,
  Rocket,   
  Swords,   
  Box,      
  Ghost,    
  Flame,    
  GitPullRequest, 
  Hammer,
  type LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Playlist Data (Local Images) ---
const PLAYLIST = [
  {
    title: "Superman",
    artist: "Eminem",
    cover: "/music/images/Superman.png", 
    audioSrc: "/music/superman.mp3" 
  },
  {
    title: "I'm Back",
    artist: "Eminem",
    cover: "/music/images/im_back.jpg",
    audioSrc: "/music/im_back.mp3"
  },
  {
    title: "Timeless",
    artist: "The Weeknd",
    cover: "/music/images/timeless.jpg",
    audioSrc: "/music/timeless.mp3"
  },
  {
    title: "Iris",
    artist: "Goo Goo Dolls",
    cover: "/music/images/iris.jpg",
    audioSrc: "/music/iris.mp3"
  },
  {
    title: "TV Off",
    artist: "Kendrick Lamar",
    cover: "/music/images/tvoff.jpg",
    audioSrc: "/music/tv_off.mp3"
  },
  {
    title: "Peekaboo",
    artist: "Kendrick Lamar",
    cover: "/music/images/tvoff.jpg",
    audioSrc: "/music/peekaboo.mp3"
  }
];

export default function InterestsBento() {
  // --- Player State ---
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = PLAYLIST[currentTrack];

  // Play/Pause Toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error("Playback failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Next Track
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true); 
  };

  // Prev Track
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  // Update Progress Bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      
      setCurrentTime(current);
      setDuration(total || 0);
      setProgress(total ? (current / total) * 100 : 0);
    }
  };

  // Seek Functionality
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (x / width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress((x / width) * 100);
    }
  };

  // Handle Auto-Next
  const handleEnded = () => {
    nextTrack();
  };

  // Effect: Handle Track Switching
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Auto-play failed:", err));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  // Formatting Time
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-4"
    >
      {/* 1. Music Player */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl relative overflow-hidden group shadow-2xl border border-white/5"
      >
        <div 
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30 pointer-events-none"
          style={{
            background: isPlaying 
              ? 'radial-gradient(circle at 50% 50%, #1D56CF 0%, transparent 60%)' 
              : 'radial-gradient(circle at 50% 50%, #334155 0%, transparent 60%)',
            transition: 'background 1s ease',
            animation: isPlaying ? 'pulse-slow 4s infinite alternate' : 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to from-slate-950/90 via-slate-900/50 to-transparent pointer-events-none" />

        <audio 
          ref={audioRef} 
          src={track.audioSrc} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        <div className="relative z-10 p-6 flex flex-col sm:flex-row items-center gap-6 h-full">
          <div className="relative group/art">
            <AnimatePresence mode="wait">
              <motion.div 
                key={track.cover}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 bg-slate-800"
              >
                <Image 
                  src={track.cover} 
                  alt={track.title} 
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className={cn(
              "absolute inset-0 rounded-2xl bg-[#1D56CF] blur-40px transition-opacity duration-1000 -z-10",
              isPlaying ? "opacity-40" : "opacity-0"
            )} />
          </div>

          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full gap-1">
            <div className="flex items-center justify-between w-full mb-1">
              <div className="flex items-center gap-2">
                <span className={cn("w-1.5 h-1.5 rounded-full", isPlaying ? "bg-green-500 animate-pulse" : "bg-slate-600")} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {isPlaying ? "Now Playing" : "Paused"}
                </span>
              </div>
              <Music size={14} className="text-slate-500" />
            </div>

            <div className="w-full overflow-hidden mb-4">
              <motion.h3 
                key={track.title + "title"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl font-bold text-white leading-tight truncate"
              >
                {track.title}
              </motion.h3>
              <motion.p 
                key={track.title + "artist"}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-sm font-medium truncate"
              >
                {track.artist}
              </motion.p>
            </div>

            <div className="w-full group/bar cursor-pointer" onClick={handleSeek}>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] scale-0 group-hover/bar:scale-100 transition-transform duration-200" />
                </motion.div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                 <span>{formatTime(currentTime)}</span>
                 <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-2">
              <button onClick={prevTrack} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <Rewind size={20} fill="currentColor" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-white text-slate-950 flex items-center justify-center hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95 shadow-lg"
              >
                {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
              </button>
              
              <button onClick={nextTrack} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <FastForward size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Building Now (Formerly Current Focus) */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col hover:border-[#1D56CF]/40 transition-colors"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <Hammer className="text-amber-600" size={20} />
            </div>
            <h4 className="font-bold text-slate-900 leading-tight">Building<br/><span className="text-slate-400 font-normal text-sm">right now</span></h4>
          </div>
          <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-lg text-xs font-bold border border-green-100 animate-pulse">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Active
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <FocusItem text="Startup MVP" color="bg-blue-50 text-blue-700 border-blue-100" />
          <FocusItem text="Projects" color="bg-indigo-50 text-indigo-700 border-indigo-100" />
          <FocusItem text="Content" color="bg-indigo-50 text-indigo-700 border-indigo-100" />
        </div>
      </motion.div>

      {/* 3. Gaming (Redesigned) */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 bg-[#111] border border-slate-800 rounded-3xl p-5 shadow-lg flex flex-col relative overflow-hidden group"
      >
        {/* Neon Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/30 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Gamepad2 className="text-purple-400" size={20} />
          </div>
          <h4 className="font-bold text-white leading-tight">Gaming<br/><span className="text-slate-400 font-normal text-sm">station</span></h4>
        </div>
        
        <div className="grid grid-cols-2 gap-2 relative z-10">
          <GameBadge name="Valorant" icon={Swords} color="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20" />
          <GameBadge name="Minecraft" icon={Box} color="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20" />
          <GameBadge name="Rocket L." icon={Rocket} color="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20" />
          <GameBadge name="Roblox" icon={Ghost} color="bg-zinc-500/10 text-zinc-400 border-zinc-500/20 hover:bg-zinc-500/20" />
        </div>
      </motion.div>

      {/* 4. Offline Life */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 md:col-span-2 bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h4 className="font-bold text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
            <BookOpen size={18} className="text-slate-500" />
            Offline Mode
          </h4>
          <p className="text-sm text-slate-500 max-w-sm">
            Recharging my batteries away from the screen.
          </p>
        </div>
        
        <div className="flex gap-4">
          <HobbyIcon icon={Dumbbell} label="Gym" />
          <HobbyIcon icon={Gamepad2} label="Gaming" />
          <HobbyIcon icon={Coffee} label="Coffee" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Sub-Components ---

const GameBadge = ({ name, icon: Icon, color }: { name: string; icon: LucideIcon; color: string }) => (
  <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-105 cursor-default hover:shadow-lg hover:shadow-purple-500/10", color)}>
    <Icon size={14} />
    <span className="text-xs font-bold">{name}</span>
  </div>
);

const FocusItem = ({ text, color, icon: Icon }: { text: string; color: string; icon?: LucideIcon }) => (
  <div className={cn("flex items-center justify-between px-3 py-2 rounded-lg border", color)}>
    <span className="text-xs font-semibold">{text}</span>
    {Icon ? <Icon size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />}
  </div>
);

const HobbyIcon = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => (
  <div className="flex flex-col items-center gap-2 group cursor-default">
    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
      <Icon size={20} className="text-slate-600 group-hover:text-[#1D56CF] transition-colors" />
    </div>
    <span className="text-xs font-medium text-slate-500">{label}</span>
  </div>
);