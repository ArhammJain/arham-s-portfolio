"use client";

import { motion, useInView, Variants } from "framer-motion";
import React, { useRef } from "react";

interface TimelineContentProps {
  children: React.ReactNode;
  as?: string;
  className?: string;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
}

export const TimelineContent = ({
  children,
  as: Tag = "div",
  className,
  animationNum = 0,
  timelineRef,
  customVariants,
}: TimelineContentProps) => {
  const localRef = useRef(null);
  const ref = timelineRef || localRef;
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Safe way to access motion components dynamically
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = (motion as any)[Tag] || motion.div;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={customVariants || defaultVariants}
    >
      {children}
    </MotionComponent>
  );
};