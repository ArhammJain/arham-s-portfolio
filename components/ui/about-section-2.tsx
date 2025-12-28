"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { Zap } from "lucide-react";
import { useRef } from "react";

export default function AboutSection2() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="w-full max-w-4xl mx-auto py-4 transition-colors duration-500">
      <div ref={heroRef} className="flex flex-col gap-6">
        
        {/* Main Headline */}
        <TimelineContent
          as="h1"
          animationNum={0}
          timelineRef={heroRef}
          className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight"
        >
          I’m Arham Jain, a{" "}
          <span className="text-[#1D56CF] dark:text-blue-400 border-b-4 border-[#1D56CF]/20 dark:border-blue-400/20 inline-block px-1">
            full-stack web developer
          </span>{" "}
          building real world applications.
        </TimelineContent>

        {/* Full Bio Text with Enhanced Highlights */}
        <div className="space-y-5 text-base md:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed">
          
          <TimelineContent as="p" animationNum={1} timelineRef={heroRef}>
            Currently pursuing a diploma in{" "}
            <span className="text-orange-600 dark:text-orange-400 font-semibold bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-md border border-orange-100 dark:border-orange-900/50">
              Artificial Intelligence
            </span>
            , I explore how logic and data create smarter products. My journey started in{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-md border border-green-100 dark:border-green-900/50">
              7th grade
            </span>
            , driven by pure curiosity about how systems are built from the ground up.
          </TimelineContent>

          <TimelineContent as="p" animationNum={2} timelineRef={heroRef}>
            Over time, I transitioned from casual experimentation to writing real code. I enjoy{" "}
            <span className="text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md border border-amber-100 dark:border-amber-900/50">
              solving practical problems
            </span>
             {" "}debugging broken flows and making products feel{" "}
            <span className="text-teal-600 dark:text-teal-400 font-semibold bg-teal-50 dark:bg-teal-950/30 px-2 py-0.5 rounded-md border border-teal-100 dark:border-teal-900/50">
              clean, fast, and intuitive.
            </span>
          </TimelineContent>

          <TimelineContent as="p" animationNum={3} timelineRef={heroRef}>
            I care deeply about{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
              structure & performance.
            </span>
            {" "}For me, good design isn’t just about how something looks, but how clearly it works. I’m constantly refining my skills at the{" "}
            <span className="text-violet-600 dark:text-violet-400 font-semibold bg-violet-50 dark:bg-violet-950/30 px-2 py-0.5 rounded-md border border-violet-100 dark:border-violet-900/50">
              intersection of Web Dev & AI.
            </span>
          </TimelineContent>

          <TimelineContent as="p" animationNum={4} timelineRef={heroRef} className="italic font-medium text-slate-800 dark:text-neutral-200 border-l-4 border-[#1D56CF] dark:border-blue-500 pl-4 py-1 bg-gray-50/50 dark:bg-neutral-900/50 rounded-r-lg">
            I don’t just build websites. I build things that are meant to work in the real world.
          </TimelineContent>
        </div>

        {/* Bottom CTA Area */}
        <div className="flex flex-wrap items-center gap-4 mt-2 pt-6 border-t border-slate-100 dark:border-neutral-800">
          <TimelineContent
            as="div"
            animationNum={5}
            timelineRef={heroRef}
            className="flex-1 min-w-[200px]"
          >
            <div className="font-semibold text-slate-900 dark:text-white">Arham Jain</div>
            <div className="text-sm text-slate-500 dark:text-neutral-500 uppercase tracking-wider font-medium">
              Web Dev & AI Student
            </div>
          </TimelineContent>
        </div>

      </div>
    </section>
  );
}