"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

// @ts-ignore
import { GitHubCalendar } from "react-github-calendar";

export function GithubStats() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simple observer to check if 'dark' class is on html element
    const checkTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const observer = new MutationObserver((mutations) => {
      checkTheme();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    setMounted(true);
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <Section id="stats" title="GitHub Contributions" subtitle="My open source activity and commit history">
         <div className="flex justify-center p-12 bg-background border border-border/50 rounded-3xl min-h-[200px]" />
      </Section>
    );
  }

  return (
    <Section
      id="stats"
      title="GitHub Contributions"
      subtitle="My open source activity and commit history"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center p-8 md:p-12 bg-background border border-border/50 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-x-auto w-full max-w-5xl mx-auto"
      >
        <div className="min-w-[700px] flex justify-center py-4">
          <GitHubCalendar 
            username="AlwalaShivakumar" 
            colorScheme={isDark ? "dark" : "light"}
            blockSize={14}
            blockMargin={5}
            fontSize={14}
          />
        </div>
      </motion.div>
    </Section>
  );
}
