"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";

const titles = [
  "Frontend Developer",
  "UI/UX Enthusiast",
  "React & Next.js Expert",
];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      const nextText = isDeleting
        ? currentTitle.substring(0, displayText.length - 1)
        : currentTitle.substring(0, displayText.length + 1);

      timeout = setTimeout(() => setDisplayText(nextText), isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[#30rem] h-[#30rem] bg-secondary/20 rounded-full blur-3xl -z-10 animate-[pulse_3s_ease-in-out_infinite]" />

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary p-1 mb-8 overflow-hidden bg-muted shadow-2xl shadow-primary/20"
        >
          <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
             <span className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center h-full">SKA</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-4 tracking-tight"
        >
          Hi, I am <span className="text-primary">{personalInfo.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-12 md:h-16 text-xl md:text-3xl text-muted-foreground font-medium mb-8"
        >
          <span className="border-r-2 border-primary pr-1 animate-[pulse_1s_infinite]">
            {displayText}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl text-base md:text-lg text-muted-foreground mb-10 leading-relaxed"
        >
          {personalInfo.about}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full px-4"
        >
          <Button asChild size="lg" className="w-full sm:w-auto gap-2 group h-14 rounded-full px-8 text-base shadow-lg shadow-primary/20">
            <a href="#projects">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2 h-14 rounded-full px-8 text-base">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto gap-2 h-14 rounded-full px-8 text-base">
            <a href="#contact">
              Contact Me
            </a>
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block z-10">
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors block">
          <div className="w-8 h-14 border-2 border-current rounded-full flex justify-center pt-2">
             <div className="w-1 h-3 bg-current rounded-full" />
          </div>
        </a>
      </div>
    </section>
  );
}
