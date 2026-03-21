"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { experienceData, educationData } from "@/lib/data";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience & Education"
      subtitle="My professional journey and academic background"
      className="bg-muted/30"
    >
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Experience Timeline */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-primary/20 text-primary rounded-2xl">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold font-heading">Experience</h3>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full border-4 border-muted bg-primary text-primary-foreground shadow-sm">
                  <Briefcase className="w-4 h-4" />
                </div>
                
                <div className="p-6 sm:p-8 rounded-3xl bg-background border border-border/50 shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h4 className="font-bold text-xl">{exp.role}</h4>
                    <span className="text-xs font-medium px-3 py-1.5 bg-primary/10 text-primary rounded-full flex items-center gap-1.5 w-fit shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium mb-4">
                    <span>{exp.company}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-secondary text-secondary-foreground rounded-2xl">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold font-heading">Education</h3>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border">
            {educationData.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full border-4 border-muted bg-secondary text-secondary-foreground shadow-sm">
                  <GraduationCap className="w-4 h-4" />
                </div>
                
                <div className="p-6 sm:p-8 rounded-3xl bg-background border border-border/50 shadow-sm hover:border-secondary/50 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h4 className="font-bold text-xl leading-tight">{edu.degree}</h4>
                    <span className="text-xs font-medium px-3 py-1.5 bg-secondary/20 text-secondary-foreground rounded-full flex items-center gap-1.5 w-fit shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.duration}
                    </span>
                  </div>
                  <div className="text-base font-medium text-muted-foreground">
                    {edu.institution}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
