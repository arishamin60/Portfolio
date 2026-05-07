/**
 * Portfolio Configuration
 * Centralized configuration for easy personalization and maintenance
 */

export const PORTFOLIO_CONFIG = {
  // Personal Information
  name: "Arish Amin",
  title: "Full Stack Developer & UI/UX Designer",
  tagline: "Building beautiful, functional digital experiences with React and modern web technologies.",
  description: "Full Stack Developer & Designer | React • TypeScript • Tailwind CSS",

  // Contact Information - Update with your details
  contact: {
    email: "hello@arish.dev",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },

  // Social Links - Update with your profiles
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:hello@arish.dev",
  },

  // About Section - Customize with your story
  about: {
    bio: "I'm Arish Amin, a full-stack developer and designer passionate about creating beautiful, functional digital experiences. With expertise in React, TypeScript, and modern web technologies, I build solutions that solve real problems.",
    bio2: "My approach combines technical excellence with user-centered design thinking. I believe in writing clean, maintainable code and crafting interfaces that delight users. Every project is an opportunity to create something meaningful and push my skills further.",
    bio3: "When I'm not building web applications, I'm exploring new design trends, contributing to open-source projects, and sharing knowledge with the developer community.",
    stats: {
      projects: 50,
      yearsExperience: 5,
      clients: 30,
      dedication: 100,
    },
  },

  // Skills - Customize with your actual tech stack
  skills: [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    },
    {
      category: "Tools & Version Control",
      items: ["Git", "GitHub", "VS Code", "Figma"],
    },
    {
      category: "Design & UX",
      items: ["UI/UX Design", "Wireframing", "Prototyping", "Design Systems"],
    },
  ],

  // Loading & Timing Constants
  timing: {
    projectsLoadingDelay: 2000, // milliseconds - simulates API call
    contactFormSubmitDelay: 1000, // milliseconds - form submission delay
    successMessageDuration: 5000, // milliseconds - success message display time
  },

  // SEO - Update for better search visibility
  seo: {
    title: "Arish Amin - Full Stack Developer & Designer",
    description: "Portfolio of Arish Amin, a full-stack developer specializing in React, TypeScript, and modern web technologies. Building beautiful digital experiences.",
    keywords: "developer, designer, react, typescript, full-stack, portfolio, web development",
    author: "Arish Amin",
    ogImage: "/og-image.png",
  },

  // Navigation
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],

  // Footer
  footer: {
    copyrightText: "Arish Amin - Full Stack Developer",
    privacyLink: "/privacy",
    termsLink: "/terms",
  },
};
