"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, 
  BookOpen, 
  Gamepad2, 
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
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = PLAYLIST[currentTrack];

  // FIXED: Explicitly handle audio state
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error("Playback failed:", err);
          setIsPlaying(false);
        });
      }
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    // Auto-play next track
    setIsPlaying(true); 
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setDuration(total || 0);
      setProgress(total ? (current / total) * 100 : 0);
    }
  };

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

  const handleEnded = () => nextTrack();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      // Only play if the state says we are playing
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Auto-play failed:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

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
      className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-4 transition-colors duration-500"
    >
      {/* 1. Music Player */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-neutral-900 dark:to-black rounded-3xl relative overflow-hidden group shadow-2xl border border-white/5 dark:border-neutral-800"
      >
        <div 
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30 pointer-events-none"
          style={{
            background: isPlaying 
              ? 'radial-gradient(circle at 50% 50%, #1D56CF 0%, transparent 60%)' 
              : 'radial-gradient(circle at 50% 50%, #334155 0%, transparent 60%)',
            transition: 'background 1s ease',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to from-slate-950/90 via-slate-900/50 to-transparent dark:from-black/90 dark:via-black/50 pointer-events-none" />

        <audio 
          ref={audioRef} 
          src={track.audioSrc} 
          onTimeUpdate={handleTimeUpdate} 
          onEnded={handleEnded}
          preload="auto" 
        />

        <div className="relative z-10 p-6 flex flex-col sm:flex-row items-center gap-6 h-full">
          <div className="relative group/art">
            <AnimatePresence mode="wait">
              <motion.div 
                key={track.cover}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 bg-slate-800"
              >
                <Image src={track.cover} alt={track.title} fill className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className={cn(
              "absolute inset-0 rounded-2xl bg-[#1D56CF] blur-[40px] transition-opacity duration-1000 -z-10",
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
              <motion.h3 className="text-2xl font-bold text-white leading-tight truncate">
                {track.title}
              </motion.h3>
              <motion.p className="text-slate-400 text-sm font-medium truncate">
                {track.artist}
              </motion.p>
            </div>

            <div className="w-full group/bar cursor-pointer" onClick={handleSeek}>
              <div className="w-full h-1.5 bg-slate-800 dark:bg-neutral-800 rounded-full overflow-hidden relative">
                <motion.div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                 <span>{formatTime(currentTime)}</span>
                 <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-2">
              <button onClick={prevTrack} className="text-slate-400 hover:text-white p-2 rounded-full transition-colors active:scale-90">
                <Rewind size={20} fill="currentColor" />
              </button>
              
              {/* FIXED: Toggle between Play and Pause based on state */}
              <button 
                onClick={togglePlay} 
                className="w-14 h-14 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg transition-transform active:scale-95 hover:scale-105"
              >
                {isPlaying ? (
                   <Pause size={22} fill="currentColor" />
                ) : (
                   <Play size={22} fill="currentColor" className="ml-1" />
                )}
              </button>

              <button onClick={nextTrack} className="text-slate-400 hover:text-white p-2 rounded-full transition-colors active:scale-90">
                <FastForward size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ... (Rest of your component: Building Now, Gaming, Offline Life) */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm flex flex-col transition-colors"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
              <Hammer className="text-amber-600 dark:text-amber-400" size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white leading-tight">Building<br/><span className="text-slate-400 dark:text-neutral-500 font-normal text-sm">right now</span></h4>
          </div>
          <div className="flex items-center gap-1 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg text-xs font-bold animate-pulse">
            Active
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <FocusItem text="Startup MVP" color="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/50" />
          <FocusItem text="Projects" color="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50" />
          <FocusItem text="Content" color="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50" />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="col-span-1 bg-black border border-neutral-800 rounded-3xl p-5 shadow-lg flex flex-col relative overflow-hidden group"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Gamepad2 className="text-purple-400" size={20} />
          </div>
          <h4 className="font-bold text-white leading-tight">Gaming<br/><span className="text-neutral-500 font-normal text-sm">station</span></h4>
        </div>
        <div className="grid grid-cols-2 gap-2 relative z-10">
          <GameBadge name="Valorant" icon={Swords} color="bg-red-500/10 text-red-400 border-red-500/20" />
          <GameBadge name="Minecraft" icon={Box} color="bg-green-500/10 text-green-400 border-green-500/20" />
          <GameBadge name="Rocket L." icon={Rocket} color="bg-blue-500/10 text-blue-400 border-blue-500/20" />
          <GameBadge name="Roblox" icon={Ghost} color="bg-zinc-500/10 text-zinc-400 border-neutral-800" />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="col-span-1 md:col-span-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors"
      >
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 justify-center sm:justify-start">
            <BookOpen size={18} className="text-slate-500" /> Offline Mode
          </h4>
          <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-sm">Recharging away from the screen.</p>
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

const GameBadge = ({ name, icon: Icon, color }: { name: string; icon: LucideIcon; color: string }) => (
  <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-default", color)}>
    <Icon size={14} /> <span className="text-xs font-bold">{name}</span>
  </div>
);

const FocusItem = ({ text, color }: { text: string; color: string }) => (
  <div className={cn("flex items-center justify-between px-3 py-2 rounded-lg border", color)}>
    <span className="text-xs font-semibold">{text}</span>
    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
  </div>
);

const HobbyIcon = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => (
  <div className="flex flex-col items-center gap-2 group cursor-default">
    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 shadow-sm flex items-center justify-center group-hover:-translate-y-1 transition-transform">
      <Icon size={20} className="text-slate-600 dark:text-neutral-400 group-hover:text-[#1D56CF] transition-colors" />
    </div>
    <span className="text-xs font-medium text-slate-500 dark:text-neutral-500">{label}</span>
  </div>
);