"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-32 scroll-mt-20", className)}
    >
      <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
        {(title || subtitle) && (
          <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold font-heading tracking-tight mb-4"
              >
                {title}
                <span className="text-primary">.</span>
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground max-w-2xl text-lg"
              >
                {subtitle}
              </motion.p>
            )}
            {title && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-20 bg-primary rounded-full mt-6"
              />
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
