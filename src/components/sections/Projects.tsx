"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import type { GitHubRepo } from "@/lib/github";
import { FolderGit2, Star, GitFork, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectsProps {
  repos: GitHubRepo[];
}

export function Projects({ repos }: ProjectsProps) {
  // Use placeholder repos if none fetched
  const displayRepos = repos.length > 0 ? repos : [
    { id: 1, name: "portfolio-website", description: "Personal portfolio website built with Next.js and Tailwind CSS", html_url: "#", stargazers_count: 5, forks_count: 1, language: "TypeScript", topics: ["react", "nextjs", "tailwind"] },
    { id: 2, name: "e-commerce-dashboard", description: "Admin dashboard for e-commerce with real-time analytics", html_url: "#", stargazers_count: 12, forks_count: 3, language: "JavaScript", topics: ["dashboard", "admin"] },
  ] as unknown as GitHubRepo[];

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="Some of my recent work from GitHub"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {displayRepos.map((repo, idx) => (
          <motion.div
            key={repo.id}
            onClick={() => window.open(repo.html_url, "_blank")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col h-full bg-background rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <FolderGit2 className="w-8 h-8" />
                </div>
                <div className="flex gap-3 text-muted-foreground">
                  {repo.homepage && (
                    <a 
                      href={repo.homepage} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()} 
                      className="hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={(e) => e.stopPropagation()} 
                    className="hover:text-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <h4 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors line-clamp-1">
                {repo.name.replace(/-/g, " ")}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {repo.description || "No description provided."}
              </p>

              <div className="mt-auto">
                {/* Tech stack / topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {repo.language && (
                    <span className="text-xs font-medium px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 2).map((topic: string) => (
                    <span key={topic} className="text-xs font-medium px-2.5 py-1 bg-muted text-muted-foreground rounded-md">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <Star className="w-4 h-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-base">
          <a href="https://github.com/AlwalaShivakumar" target="_blank" rel="noreferrer">
            View More on GitHub
          </a>
        </Button>
      </div>
    </Section>
  );
}
