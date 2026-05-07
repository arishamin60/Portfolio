/**
 * Hero Component - Enhanced with Glassmorphism & Scroll Animations
 * Full-screen layout with large typography, glassmorphism CTA, parallax blob, and smooth animations
 */

import { Button } from ".//ui/button";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useScroll, useTransform, easeOut } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  onCtaClick?: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleExploreClick = () => {
    if (onCtaClick) onCtaClick();
    const element = document.getElementById("projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20"
    >
      {/* Animated background blobs with parallax */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />

      {/* Glassmorphism accent shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 glass-light rounded-full opacity-20 blur-2xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 glass-light rounded-full opacity-15 blur-2xl" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-accent font-semibold text-sm md:text-base tracking-widest uppercase mb-8 letter-spacing-wider"
          >
            Welcome to my portfolio
          </motion.p>

          {/* Main heading with accent underline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 leading-tight">
              Hi, I'm{" "}
              <span className="inline-block relative">
                {PORTFOLIO_CONFIG.name.split(" ")[0]}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/70 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            {PORTFOLIO_CONFIG.tagline}
          </motion.p>

          {/* CTA Buttons with glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg px-8 py-6 text-lg glow-button"
                onClick={handleExploreClick}
              >
                Explore My Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto glass-medium text-primary hover:bg-white/20 dark:hover:bg-white/10 font-semibold rounded-xl transition-all duration-300 px-8 py-6 text-lg"
                onClick={handleContactClick}
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with fade out */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-foreground/50 font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
