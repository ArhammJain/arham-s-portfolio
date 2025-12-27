"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundLines } from "@/components/ui/background-lines"; 
import AboutSection2 from "@/components/ui/about-section-2";
import { ProjectCard } from "@/components/ui/project-card"; 
import { ExpandableSkillTags, SkillItem } from "@/components/ui/expandable-skill-tags";
import InterestsBento from "@/components/ui/interests-bento";
import SocialLinks from "@/components/ui/social-links";
import ContactForm from "@/components/ui/contact-form"; 
import { 
  User, Briefcase, Zap, Sparkles, Mail, ArrowRight, Search, Share2,
  Code2, Terminal, Database, Cpu, Globe, Layers, Layout, Server, 
  Box, BrainCircuit, Cloud, Bug, type LucideIcon, Bot
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

// --- Data: AI Responses (Strictly Short One-Liners) ---
const AI_RESPONSES: Record<string, string> = {
  "me": "I build scalable web apps with clean UI.",
  "portfolio": "Check out my recent high-performance projects.",
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
    description: "A comprehensive map-based application to find nearby hospitals using Next.js and Leaflet.", 
    videoSrc: "/project-1.mp4", 
    link: "https://hospitalfinderbyarham.vercel.app/"
  },
  { 
    title: "Real-Time Chat", 
    description: "Scalable chat infrastructure using WebSockets and Node.js. Supports private messaging and group channels.", 
    videoSrc: "/project-2.mp4", 
    link: "https://realtimechatbyarham.vercel.app/signup"
  },
];

// --- Data: Skills Categories ---
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Stack",
    items: [
      { name: "React", icon: Code2, color: "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors", textColor: "text-blue-700" },
      { name: "Next.js", icon: Globe, color: "bg-slate-50 border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-colors", textColor: "text-slate-900" },
      { name: "Tailwind", icon: Layout, color: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 transition-colors", textColor: "text-cyan-600" },
      { name: "Framer", icon: Layers, color: "bg-pink-50 border-pink-200 hover:bg-pink-100 hover:border-pink-300 transition-colors", textColor: "text-pink-600" },
      { name: "TypeScript", icon: Code2, color: "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors", textColor: "text-blue-600" },
    ]
  },
  {
    category: "Backend & Database",
    items: [
      { name: "Node.js", icon: Server, color: "bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300 transition-colors", textColor: "text-green-700" },
      { name: "PostgreSQL", icon: Database, color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-colors", textColor: "text-indigo-700" },
      { name: "Supabase", icon: Zap, color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-colors", textColor: "text-emerald-600" },
      { name: "Prisma", icon: Box, color: "bg-slate-50 border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-colors", textColor: "text-slate-700" },
    ]
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", icon: Box, color: "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors", textColor: "text-blue-600" },
      { name: "Git", icon: Terminal, color: "bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-300 transition-colors", textColor: "text-orange-700" },
      { name: "Vercel", icon: Cloud, color: "bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20 transition-colors", textColor: "text-black" },
    ]
  },
  {
    category: "Mobile & Testing",
    items: [
      { name: "React Native", icon: Code2, color: "bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-colors", textColor: "text-purple-700" },
      { name: "Jest", icon: Bug, color: "bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300 transition-colors", textColor: "text-red-700" },
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D56CF] to-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-blue-500/20">
              <Bot size={16} className="text-white" />
            </div>
          )}
          
          <div className="flex flex-col gap-3 w-full min-w-0">
            <div className={cn(
              "px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
              isUser 
                ? "bg-[#1D56CF] text-white rounded-tr-none shadow-blue-500/10" 
                : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
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
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-[#1D56CF] hover:text-[#1D56CF] transition-colors shadow-sm active:scale-95 whitespace-nowrap shrink-0"
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
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:border-[#1D56CF]/50 hover:text-[#1D56CF] hover:shadow-md transition-all duration-300 text-sm font-medium text-slate-600 whitespace-nowrap active:scale-95"
    >
      <Icon size={15} />
      {label}
    </button>
  );
};

// --- Main Page Component ---
export default function PortfolioHome() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const msgIdCounter = useRef(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
            text: "Check out my work below.",
            buttons: [MENU_ITEMS[1], MENU_ITEMS[2], MENU_ITEMS[0]] 
          },
          {
            text: "Let's connect on socials.",
            buttons: [MENU_ITEMS[4], MENU_ITEMS[5], MENU_ITEMS[0]] 
          },
          {
            text: "Send me a message below.",
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
    <div className="relative min-h-[100dvh] w-full bg-slate-50/50 font-sans text-slate-800 selection:bg-[#1D56CF]/20 overflow-hidden">
      
      {/* Wrapper Component (FIXED: Wraps content now) */}
      <BackgroundLines className="h-full w-full bg-slate-50/50">
        
        <div className="relative z-10 flex flex-col h-[100dvh] max-w-5xl mx-auto">
          
          {/* Header */}
          <motion.div
            layout
            className={cn(
              "flex flex-col items-center justify-center text-center shrink-0 px-4",
              hasMessages ? "py-4 border-b border-slate-200/60 bg-white/50 backdrop-blur-md z-20" : "flex-1 pb-10"
            )}
          >
            <div className="flex flex-col items-center">
              <motion.div 
                layout
                className={cn(
                  "relative rounded-full overflow-hidden transition-all duration-500 shadow-xl",
                  hasMessages 
                    ? "w-10 h-10 border border-white" 
                    : "w-32 h-32 md:w-40 md:h-40 border-4 border-white mb-6"
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
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                  Arham<span className="text-[#1D56CF]">.dev</span>
                </h2>
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-lg md:text-xl text-slate-500 font-medium max-w-lg mx-auto"
                >
                  Building digital experiences with <span className="text-[#1D56CF]">intelligence</span> and precision.
                </motion.p>
              </motion.div>
              
              {hasMessages && (
                 <motion.h3 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="text-sm font-bold text-slate-800 mt-1"
                 >
                   Arham.dev
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
                    <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150" />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} className="h-4" />
              </div>
            </div>
          )}

          {/* Footer Input Area */}
          <div className="shrink-0 w-full px-4 pb-4 md:pb-6 z-30">
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              
              {/* Input Box */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg shadow-slate-200/50 p-1.5 focus-within:ring-2 focus-within:ring-[#1D56CF]/20 transition-all">
                  <div className="pl-4 pr-3 text-slate-400">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Ask me anything about my work..."
                    className="flex-1 bg-transparent border-none outline-none py-3 text-base text-slate-800 placeholder:text-slate-400 font-medium min-w-0"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  />
                  <button 
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                    className={cn(
                      "p-3 rounded-xl transition-all duration-300 flex items-center justify-center shrink-0",
                      inputValue.trim() 
                        ? "bg-[#1D56CF] text-white shadow-md hover:bg-blue-700 hover:scale-105 active:scale-95" 
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                    )}
                  >
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mask-fade-sides justify-start md:justify-center">
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