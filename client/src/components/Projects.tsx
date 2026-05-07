/**
 * Projects Component - Enhanced with Glassmorphism & Scroll Animations
 * Staggered reveal animations with glassmorphism cards and smooth transitions
 */

import { LoadingSpinner } from ".//LoadingSpinner";
import { Badge } from ".//ui/badge";
import { Button } from ".//ui/button";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { AlertCircle, ExternalLink, ArrowUpRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        await new Promise((resolve) =>
          setTimeout(resolve, PORTFOLIO_CONFIG.timing.projectsLoadingDelay)
        );

        const response = await fetch("/projects.json");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
    <div className="bg-background py-20 md:py-32">
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Featured <span className="accent-underline">Projects</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-foreground/70 max-w-2xl">
            A selection of recent projects showcasing my skills in full-stack development, UI/UX design, and problem-solving.
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LoadingSpinner />
            <p className="mt-4 text-foreground/60 font-medium">Loading projects...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            className="flex items-center gap-4 p-6 bg-destructive/10 border border-destructive/20 rounded-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
            <div>
              <p className="font-semibold text-destructive">Error loading projects</p>
              <p className="text-destructive/80 text-sm">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group glass-medium rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 bg-gradient-to-br from-primary/10 to-accent/10">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* View Details Button */}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                  >
                    View Details
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-foreground/60 text-lg">No projects found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
