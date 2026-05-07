/**
 * Footer Component - Enhanced with Glassmorphism
 * Glassmorphism background strip with smooth transitions
 */

import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Github, href: PORTFOLIO_CONFIG.social.github, label: "GitHub" },
  { icon: Linkedin, href: PORTFOLIO_CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: PORTFOLIO_CONFIG.social.twitter, label: "Twitter" },
  { icon: Mail, href: PORTFOLIO_CONFIG.social.email, label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="relative bg-background border-t border-border/20 overflow-hidden">
      {/* Glassmorphism background strip */}
      <div className="absolute inset-0 glass-light pointer-events-none" />
      
      {/* Decorative blur elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2" />

      <div className="container py-12 md:py-16 relative z-10">
        <motion.div
          className="grid md:grid-cols-3 gap-12 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg text-white">A</span>
              </div>
              <span className="font-bold text-lg text-primary">{PORTFOLIO_CONFIG.name.split(" ")[0]}</span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {PORTFOLIO_CONFIG.about.bio}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              {PORTFOLIO_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <motion.a
                    href={item.href}
                    className="hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-primary mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg glass-medium flex items-center justify-center transition-all duration-300 group hover:bg-accent hover:text-background"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-border/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
            <p>&copy; {currentYear} {PORTFOLIO_CONFIG.footer.copyrightText}. All rights reserved.</p>
            <div className="flex gap-6">
              <motion.a
                href={PORTFOLIO_CONFIG.footer.privacyLink}
                className="hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href={PORTFOLIO_CONFIG.footer.termsLink}
                className="hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
