"use client";

import { motion, type Variants } from "framer-motion";
import { Section } from "@/components/ui/section";
import { skillsInfo } from "@/lib/data";

export function Skills() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <Section
      id="skills"
      title="My Skills"
      subtitle="Technologies and tools I work with"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {Object.entries(skillsInfo).map(([category, skills], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                0{idx + 1}
              </span>
              {category}
            </h3>
            
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={item}
                  className="px-4 py-2 rounded-full bg-muted/50 border border-transparent text-sm font-medium hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
