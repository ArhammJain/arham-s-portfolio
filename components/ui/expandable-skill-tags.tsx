"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

export interface SkillItem {
  name: string;
  icon?: LucideIcon;
  color?: string;
  textColor?: string; 
}

interface ExpandableSkillTagsProps {
  title?: string;
  skills: SkillItem[];
  initialCount?: number;
  className?: string;
}

export const ExpandableSkillTags = ({
  title,
  skills,
  initialCount = 100, // Default to showing all if not specified
  className,
}: ExpandableSkillTagsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If initialCount is very high (like 100), we show all. Otherwise slice.
  const shouldTruncate = skills.length > initialCount;
  const visibleSkills = shouldTruncate && !isExpanded ? skills.slice(0, initialCount) : skills;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className={cn("w-full mb-6 last:mb-0 transition-colors duration-500", className)}>
      {title && (
        <h4 className="mb-3 text-sm font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider border-b border-slate-100 dark:border-neutral-800 pb-1">
          {title}
        </h4>
      )}
      
      <motion.div
        layout // Magic prop to animate layout changes smoothly
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {visibleSkills.map((skill, index) => (
            <SkillBadge key={`${skill.name}-${index}`} skill={skill} variants={itemVariants} />
          ))}
        </AnimatePresence>
      </motion.div>

      {shouldTruncate && (
        <Button
          variant="link"
          className="mt-2 px-0 text-xs text-[#1D56CF] dark:text-blue-400 h-auto font-semibold hover:no-underline opacity-80 hover:opacity-100"
          onClick={toggleExpansion}
        >
          {isExpanded ? "Show Less" : `+ ${skills.length - initialCount} More`}
        </Button>
      )}
    </div>
  );
};

const SkillBadge = ({ skill, variants }: { skill: SkillItem; variants?: Variants }) => {
  const Icon = skill.icon;
  
  return (
    <motion.div 
      layout
      variants={variants}
      whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Badge 
        className={cn(
          "px-3 py-1.5 text-sm font-medium border transition-colors cursor-default gap-1.5 whitespace-nowrap shadow-sm",
          // The colors are handled by the skill.color prop passed from page.tsx
          skill.color ? skill.color : "bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-neutral-800",
          skill.textColor
        )}
      >
        {Icon && <Icon size={14} className="opacity-70" />}
        {skill.name}
      </Badge>
    </motion.div>
  );
};