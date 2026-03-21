"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { personalInfo } from "@/lib/data";
import type { GitHubUser } from "@/lib/github";
import { Code2, MapPin, Users, Star } from "lucide-react";

interface AboutProps {
  githubUser: GitHubUser | null;
}

export function About({ githubUser }: AboutProps) {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Get to know me better"
      className="bg-muted/30 relative"
    >
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="order-2 md:order-1 space-y-6"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-heading">
            A passionate Developer based in {personalInfo.location} 🌍
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {githubUser?.bio || personalInfo.about}
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50 hover:border-primary/50 transition-colors">
              <Code2 className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold text-3xl font-heading mb-1">{githubUser?.public_repos || 20}+</h4>
              <p className="text-sm text-muted-foreground font-medium">Repositories</p>
            </div>
            <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50 hover:border-primary/50 transition-colors">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold text-3xl font-heading mb-1">{githubUser?.followers || 0}</h4>
              <p className="text-sm text-muted-foreground font-medium">GitHub Followers</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="order-1 md:order-2 relative"
        >
          <div className="aspect-[4/5] md:aspect-square max-w-md mx-auto relative rounded-3xl overflow-hidden shadow-2xl border-8 border-background">
            {githubUser?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={githubUser.avatar_url}
                alt={personalInfo.name}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex flex-col items-center justify-center p-8 text-center border-2 border-primary border-dashed rounded-2xl">
                <MapPin className="w-12 h-12 text-primary mb-4" />
                <p className="text-lg font-medium text-foreground">
                  Located in {personalInfo.location}
                </p>
                <p className="text-muted-foreground text-sm mt-2">Ready to contribute</p>
              </div>
            )}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary rounded-full blur-[80px] -z-10 opacity-50" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary rounded-full blur-[80px] -z-10 opacity-50" />
        </motion.div>
      </div>
    </Section>
  );
}
