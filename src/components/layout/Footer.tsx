import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter mb-2">
            Shiva Kumar Alwala<span className="text-primary">.</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            Building digital products, brands, and experience.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/AlwalaShivakumar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/shivakumaralwala/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="mailto:alwalashiva2@gmail.com"
            className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Shivakumar Alwala. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Designed & Built with Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
