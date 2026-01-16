"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { BackgroundLines } from "@/components/ui/background-lines"; 
import AboutSection2 from "@/components/ui/about-section-2";
import { ProjectCard } from "@/components/ui/project-card"; 
import { ExpandableSkillTags, SkillItem } from "@/components/ui/expandable-skill-tags";
import InterestsBento from "@/components/ui/interests-bento";
import SocialLinks from "@/components/ui/social-links";
import ContactForm from "@/components/ui/contact-form"; 
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { 
  User, Briefcase, Zap, Sparkles, Mail, ArrowRight, Share2,
  Code2, Terminal, Database, Globe, Layers, Layout, Server, 
  Box, Cloud, Bug, type LucideIcon, Bot
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
const MENU_ITEMS = [
  { id: "me", label: "About Me", icon: User },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "interests", label: "Interests", icon: Sparkles },
  { id: "socials", label: "Socials", icon: Share2 },
  { id: "contact", label: "Contact", icon: Mail },
];

// --- Types ---
type MessageType = 'text' | 'projects' | 'skills' | 'socials' | 'about' | 'interests' | 'contact' | 'fallback';

type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  type?: MessageType;
  suggestions?: { id: string; label: string; icon: LucideIcon }[];
};

type SkillCategory = {
  category: string;
  items: SkillItem[];
};

// --- Data: AI Responses ---
const AI_RESPONSES: Record<string, string> = {
  "me": "I build scalable web apps with clean UI.",
  "portfolio": "Check out my recent high performance projects.",
  "skills": "My technical stack for speed and reliability.",
  "interests": "What keeps my creativity flowing beyond code.",
  "socials": "Let's connect on these platforms.",
  "contact": "Send me a message directly below.",
  "fallback": "Try using the buttons or ask about my work."
};

// --- Data: Projects ---
const PROJECTS = [
  { 
    title: "Hospital Finder", 
    description: "A real world hospital finder built with Next.js and OpenStreetMap fast, map driven, and designed for practical, city wide healthcare discovery.", 
    videoSrc: "/project-1.mp4", 
    link: "https://hospitalfinderbyarham.vercel.app/"
  },
  { 
    title: "Real Time Chat", 
    description: "Production ready messaging system with real architecture, real data models, and real time messaging built with Next.js and Supabase.", 
    videoSrc: "/project-2.mp4", 
    link: "https://realtimechatbyarham.vercel.app/signup"
  },
    { 
    title: "Rishabh's Portfolio", 
    description: "A creative model bringing emotion, precision, and style to every frame.", 
    videoSrc: "/pj.mp4", 
    link: "https://rmaniac.vercel.app/"
  },
];

// --- Data: Skills Categories ---
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Stack",
    items: [
      { name: "React", icon: Code2, color: "bg-blue-50 border-blue-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-blue-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-blue-700 dark:text-blue-400" },
      { name: "Next.js", icon: Globe, color: "bg-slate-50 border-slate-300 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-slate-900 dark:text-slate-200" },
      { name: "Tailwind", icon: Layout, color: "bg-cyan-50 border-cyan-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-cyan-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-cyan-600 dark:text-cyan-400" },
      { name: "Framer", icon: Layers, color: "bg-pink-50 border-pink-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-pink-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-pink-600 dark:text-pink-400" },
      { name: "TypeScript", icon: Code2, color: "bg-blue-50 border-blue-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-blue-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-blue-600 dark:text-blue-400" },
    ]
  },
  {
    category: "Backend & Database",
    items: [
      { name: "Node.js", icon: Server, color: "bg-green-50 border-green-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-green-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-green-700 dark:text-green-400" },
      { name: "PostgreSQL", icon: Database, color: "bg-indigo-50 border-indigo-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-indigo-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-indigo-700 dark:text-indigo-400" },
      { name: "Supabase", icon: Zap, color: "bg-emerald-50 border-emerald-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-emerald-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-emerald-600 dark:text-emerald-400" },
      { name: "Prisma", icon: Box, color: "bg-slate-50 border-slate-300 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-slate-700 dark:text-slate-300" },
    ]
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", icon: Box, color: "bg-blue-50 border-blue-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-blue-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-blue-600 dark:text-blue-400" },
      { name: "Git", icon: Terminal, color: "bg-orange-50 border-orange-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-orange-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-orange-700 dark:text-orange-400" },
      { name: "Vercel", icon: Cloud, color: "bg-black/5 border-black/10 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-black/10 dark:hover:bg-neutral-800 transition-colors", textColor: "text-black dark:text-white" },
    ]
  },
  {
    category: "Mobile & Testing",
    items: [
      { name: "React Native", icon: Code2, color: "bg-purple-50 border-purple-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-purple-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-purple-700 dark:text-purple-400" },
      { name: "Jest", icon: Bug, color: "bg-red-50 border-red-200 dark:bg-neutral-900 dark:border-neutral-800 hover:bg-red-100 dark:hover:bg-neutral-800 transition-colors", textColor: "text-red-700 dark:text-red-400" },
    ]
  }
];

// --- Sub-Components ---

const ProjectGrid = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
  >
    {PROJECTS.map((project, i) => (
      <ProjectCard
        key={i}
        title={project.title}
        description={project.description}
        videoSrc={project.videoSrc}
        link={project.link}
      />
    ))}
  </motion.div>
);

const SkillsList = () => (
  <div className="flex flex-col gap-6 w-full">
    {SKILL_CATEGORIES.map((cat, i) => (
      <ExpandableSkillTags 
        key={i} 
        title={cat.category} 
        skills={cat.items} 
        initialCount={10} 
      />
    ))}
  </div>
);

// --- Chat Bubble Component ---
const ChatBubble = ({ message, onActionClick }: { message: Message, onActionClick: (label: string) => void }) => {
  const isUser = message.role === 'user';
  const hasPayload = message.type && message.type !== 'text' && message.type !== 'fallback';
  const isFallback = message.type === 'fallback';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full mb-8",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex flex-col gap-3",
        isUser ? "items-end max-w-[85%]" : "items-start w-full max-w-4xl"
      )}>
        
        {/* The Text Bubble */}
        <div className="flex gap-3 max-w-[95%] md:max-w-[75%] overflow-hidden">
          {!isUser && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D56CF] to-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-blue-500/20 dark:shadow-blue-500/10">
              <Bot size={16} className="text-white" />
            </div>
          )}
          
          <div className="flex flex-col gap-3 w-full min-w-0">
            <div className={cn(
              "px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm transition-colors duration-300",
              isUser 
                ? "bg-[#1D56CF] dark:bg-neutral-900 dark:border dark:border-neutral-800 text-white rounded-tr-none shadow-blue-500/10" 
                : "bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 rounded-tl-none"
            )}>
              {message.text}
            </div>

            {/* Fallback Buttons */}
            {isFallback && message.suggestions && (
              <div className="flex gap-2 mt-1 overflow-x-auto no-scrollbar mask-fade-sides pb-1 w-full">
                {message.suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onActionClick(item.label)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-full text-sm font-medium text-slate-600 dark:text-neutral-400 hover:border-[#1D56CF] dark:hover:border-neutral-600 hover:text-[#1D56CF] dark:hover:text-neutral-200 transition-colors shadow-sm active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <item.icon size={14} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Payloads */}
        {hasPayload && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="w-full pl-0 md:pl-11 mt-2"
          >
            {message.type === 'projects' && <ProjectGrid />}
            {message.type === 'skills' && <SkillsList />}
            {message.type === 'socials' && <SocialLinks />}
            {message.type === 'contact' && <ContactForm />}
            {message.type === 'about' && <AboutSection2 />}
            {message.type === 'interests' && <InterestsBento />}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// --- Action Chip ---
const ActionChip = ({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: LucideIcon; 
  label: string; 
  onClick: () => void; 
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-0 md:gap-2 p-3 md:px-4 md:py-2 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm hover:border-[#1D56CF]/50 dark:hover:border-neutral-600 hover:text-[#1D56CF] dark:hover:text-white hover:shadow-md transition-all duration-300 text-sm font-medium text-slate-600 dark:text-neutral-300 active:scale-95"
    >
      <Icon size={18} className="md:w-[15px] md:h-[15px]" />
      <span className="hidden md:inline">{label}</span>
    </button>
  );
};

// --- Main Page Component ---
export default function PortfolioHome() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const msgIdCounter = useRef(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Sync isDarkMode state with document class
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleSendMessage = async (text: string, category?: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const newId = (msgIdCounter.current++).toString();
    const userMsg: Message = { id: newId, role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // 2. Simulate AI Response
    setTimeout(() => {
      let responseText = "";
      let messageType: MessageType = 'text';
      let suggestions = undefined;

      const lowerText = category ? category.toLowerCase() : text.toLowerCase();

      // Check keywords
      if (lowerText.includes("portfolio") || lowerText.includes("project")) {
        responseText = AI_RESPONSES["portfolio"];
        messageType = 'projects';
      } 
      else if (lowerText.includes("skill") || lowerText.includes("stack")) {
        responseText = AI_RESPONSES["skills"];
        messageType = 'skills';
      }
      else if (lowerText.includes("social") || lowerText.includes("connect")) {
        responseText = AI_RESPONSES["socials"];
        messageType = 'socials';
      }
      else if (lowerText.includes("about") || lowerText.includes("me")) {
        responseText = AI_RESPONSES["me"]; 
        messageType = 'about';
      }
      else if (lowerText.includes("interest") || lowerText.includes("hobby")) {
        responseText = AI_RESPONSES["interests"]; 
        messageType = 'interests';
      }
      else if (lowerText.includes("contact") || lowerText.includes("email") || lowerText.includes("touch")) {
        responseText = AI_RESPONSES["contact"]; 
        messageType = 'contact';
      }
      else {
        // --- RANDOM FALLBACK LOGIC ---
        messageType = 'fallback';
        
        const fallbackScenarios = [
          {
            text: "404: Answer not found. But my projects are fully online:",
            buttons: [MENU_ITEMS[1], MENU_ITEMS[2], MENU_ITEMS[0]] 
          },
          {
            text: "My AI brain just blinked. Let's connect human-to-human?",
            buttons: [MENU_ITEMS[4], MENU_ITEMS[5], MENU_ITEMS[0]] 
          },
          {
            text: "Syntax Error in my brain. Send me a real message instead:",
            buttons: [MENU_ITEMS[5], MENU_ITEMS[1], MENU_ITEMS[4]] 
          }
        ];

        const randomScenario = fallbackScenarios[Math.floor(Math.random() * fallbackScenarios.length)];
        responseText = randomScenario.text;
        suggestions = randomScenario.buttons;
      }

      const aiId = (msgIdCounter.current++).toString();
      const aiMsg: Message = { 
        id: aiId, 
        role: 'ai', 
        text: responseText, 
        type: messageType,
        suggestions: suggestions
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200); 
  };

  const handleMenuClick = (label: string) => {
    const question = `Tell me about your ${label}`;
    setInputValue(question);
    setTimeout(() => {
        handleSendMessage(question, label);
    }, 200);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className={cn("relative min-h-[100dvh] w-full font-sans transition-colors duration-500 overflow-hidden selection:bg-[#1D56CF]/20", isDarkMode ? "bg-black text-neutral-200" : "bg-slate-50/50 text-slate-800")}>
      
      {/* Theme Switcher */}
      <AnimatedThemeToggler 
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-300 shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
        duration={600}
      />

      {/* Wrapper Component */}
      <BackgroundLines className={cn("h-full w-full transition-colors duration-500", isDarkMode ? "bg-black" : "bg-slate-50/50")}>
        
        <div className="relative z-10 flex flex-col h-[100dvh] max-w-5xl mx-auto">
          
          {/* Header */}
          <motion.div
            layout
            className={cn(
              "flex flex-col items-center justify-center text-center shrink-0 px-4 transition-colors duration-300",
              hasMessages 
                ? "py-4 border-b bg-white/50 dark:bg-black/50 backdrop-blur-md z-20 border-slate-200/60 dark:border-neutral-800/60" 
                : "flex-1 pb-10"
            )}
          >
            <div className="flex flex-col items-center">
              <motion.div 
                layout
                className={cn(
                  "relative rounded-full overflow-hidden transition-all duration-500 shadow-xl",
                  hasMessages 
                    ? "w-10 h-10 border border-white dark:border-neutral-800" 
                    : "w-32 h-32 md:w-40 md:h-40 border-4 border-white dark:border-neutral-800 mb-6"
                )}
              >
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img 
                  src="/avatar.jpeg" 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div layout className={cn("space-y-2", hasMessages && "hidden")}>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Arham&apos;s <span className="text-[#1D56CF]">Work</span>
                </h2>
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-lg md:text-xl text-slate-500 dark:text-neutral-400 font-medium max-w-lg mx-auto"
                >
                 From idea to <span className="text-[#1D56CF]">production</span> I build it <span className="text-green-600">end to end.</span>
                </motion.p>
              </motion.div>
              
              {hasMessages && (
                 <motion.h3 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="text-sm font-bold text-slate-800 dark:text-neutral-200 mt-1"
                 >
                   Arham&apos;s Work
                 </motion.h3>
              )}
            </div>
          </motion.div>

          {/* Chat Stream */}
          {hasMessages && (
            <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth w-full">
              <div className="max-w-4xl mx-auto">
                {messages.map((msg) => (
                  <ChatBubble 
                    key={msg.id} 
                    message={msg} 
                    onActionClick={handleMenuClick} 
                  />
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mb-8"
                  >
                    <div className="bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-neutral-600 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-neutral-600 rounded-full animate-bounce delay-75" />
                      <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-neutral-600 rounded-full animate-bounce delay-150" />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} className="h-4" />
              </div>
            </div>
          )}

          {/* Footer Input Area */}
          <div className="shrink-0 w-full px-4 pb-4 md:pb-6 z-30">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
              
              {/* Input Box (Rounded Pill Style) */}
              <div className="w-full bg-white dark:bg-black rounded-full border border-slate-200 dark:border-neutral-800 shadow-sm px-2 py-2 flex items-center transition-all focus-within:shadow-md focus-within:border-blue-300 dark:focus-within:border-blue-700">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border-none outline-none px-6 py-2 text-base text-slate-800 dark:text-neutral-200 placeholder:text-slate-400 dark:placeholder:text-neutral-600 font-medium min-w-0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                />
                <button 
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
                    inputValue.trim() 
                      ? "bg-[#3B82F6] text-white shadow-md hover:scale-105 active:scale-95" 
                      : "bg-slate-100 dark:bg-neutral-900 text-slate-300 dark:text-neutral-700 cursor-not-allowed"
                  )}
                >
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Quick Actions (Icon only on mobile, full on desktop) */}
              <div className="flex gap-2 pb-4 pt-0 justify-center px-0">
                {MENU_ITEMS.map((item) => (
                  <ActionChip 
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => handleMenuClick(item.label)}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </BackgroundLines>
    </div>
  );
}