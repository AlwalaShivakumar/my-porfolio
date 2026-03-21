"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Note: Integrate actual EmailJS Logic here
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Have a question or want to work together? Leave a message!"
      className="bg-muted/30"
    >
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="p-8 md:p-10 rounded-3xl bg-background border border-border shadow-sm">
            <h3 className="text-3xl font-bold font-heading mb-4">Let&apos;s talk</h3>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
              I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Email</h4>
                  <a href="mailto:alwalashiva2@gmail.com" className="text-lg font-medium hover:text-primary transition-colors">
                    alwalashiva2@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">Location</h4>
                  <p className="text-lg font-medium">India</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <form onSubmit={handleSubmit} className="p-8 md:p-12 rounded-3xl bg-background border border-border shadow-md">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full h-14 px-5 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Your Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full h-14 px-5 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full p-5 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                placeholder="How can I help you?"
              />
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 rounded-2xl text-lg font-semibold gap-2 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform duration-300"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : isSuccess ? (
                "Message Sent Successfully 🎉"
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>
        
      </div>
    </Section>
  );
}
