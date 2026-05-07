/**
 * Navbar Component - Enhanced with Glassmorphism & Scroll Effects
 * Transparent initially, turns glassy with backdrop blur on scroll
 * Features smooth scroll navigation and active section indicator
 */

import { Button } from ".//ui/button";
import { DarkModeToggle } from ".//DarkModeToggle";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  // Update active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past hero
      setIsScrolled(window.scrollY > 100);

      const sections = ["home", "about", "projects", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-heavy shadow-xl" : "bg-background/50 backdrop-blur-none"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300"
              whileHover={{ rotate: 5 }}
            >
              <span className="text-white font-bold text-lg">A</span>
            </motion.div>
            <span className="hidden sm:inline font-bold text-lg text-primary">
              {PORTFOLIO_CONFIG.name.split(" ")[0]}
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                    layoutId="navbar-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 40 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            {/* Desktop Let's Talk Button - Fixed nested button issue */}
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:block px-6 py-2 bg-accent hover:bg-accent/90 text-background font-semibold rounded-lg transition-all duration-300 glow-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pb-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-secondary"
                }`}
                whileHover={{ x: 5 }}
              >
                {item.label}
              </motion.button>
            ))}
            {/* Mobile Let's Talk Button */}
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="w-full px-4 py-2 bg-accent hover:bg-accent/90 text-background font-semibold rounded-lg transition-all duration-300 mt-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Talk
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
