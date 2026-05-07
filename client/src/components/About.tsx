/**
 * About Component - Enhanced with Glassmorphism & Scroll Animations
 * Staggered reveal of stats cards with glass effect and smooth transitions
 */

import { Button } from ".//ui/button";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function About() {
  const [isGridLayout, setIsGridLayout] = useState(true);

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
    <div className="bg-background">
      {/* About Section */}
      <section className="py-20 md:py-32 border-b border-border/20">
        <div className="container">
          <motion.div
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* Text Content */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                About <span className="accent-underline">Me</span>
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>{PORTFOLIO_CONFIG.about.bio}</p>
                <p>{PORTFOLIO_CONFIG.about.bio2}</p>
                <p>{PORTFOLIO_CONFIG.about.bio3}</p>
              </div>
            </motion.div>

            {/* Personal Photo with Frosted Frame */}
            <motion.div
              variants={itemVariants}
              className="relative w-full aspect-square"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 glass-heavy rounded-3xl overflow-hidden backdrop-blur-xl">
                <img
                  src="/profile-photo.png"
                  alt="Arish Amin"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative blur elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Quick Stats with Glassmorphism */}
            <motion.div
              className="md:col-span-2 grid grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {[
                {
                  value: `${PORTFOLIO_CONFIG.about.stats.projects}+`,
                  label: "Projects Completed",
                },
                {
                  value: `${PORTFOLIO_CONFIG.about.stats.yearsExperience}+`,
                  label: "Years Experience",
                },
                {
                  value: `${PORTFOLIO_CONFIG.about.stats.clients}+`,
                  label: "Happy Clients",
                },
                {
                  value: `${PORTFOLIO_CONFIG.about.stats.dedication}%`,
                  label: "Dedication",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-medium rounded-2xl p-6 backdrop-blur-lg"
                >
                  <p className="text-4xl font-bold text-accent mb-2">{stat.value}</p>
                  <p className="text-foreground/70 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <motion.h2
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold text-primary"
                >
                  <span className="accent-underline">Skills</span>
                </motion.h2>
                <motion.div variants={itemVariants} className="flex gap-2">
                  <Button
                    variant={isGridLayout ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsGridLayout(true)}
                    className="rounded-lg"
                  >
                    <LayoutGrid className="w-4 h-4 mr-2" />
                    Grid
                  </Button>
                  <Button
                    variant={!isGridLayout ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsGridLayout(false)}
                    className="rounded-lg"
                  >
                    <List className="w-4 h-4 mr-2" />
                    List
                  </Button>
                </motion.div>
              </div>

              {/* Grid Layout */}
              {isGridLayout && (
                <motion.div
                  className="grid md:grid-cols-2 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {PORTFOLIO_CONFIG.skills.map((skillGroup, groupIndex) => (
                    <motion.div
                      key={skillGroup.category}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -8 }}
                      className="glass-heavy rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl"
                    >
                      <h3 className="text-xl font-bold text-primary mb-4">
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.08,
                              type: 'spring',
                              stiffness: 200,
                              damping: 15,
                            }}
                            whileHover={{ scale: 1.15, y: -2 }}
                            className="px-3 py-1 bg-accent/20 hover:bg-accent/40 text-accent rounded-full text-sm font-medium transition-colors duration-300 cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* List Layout */}
              {!isGridLayout && (
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {PORTFOLIO_CONFIG.skills.map((skillGroup) => (
                    <motion.div
                      key={skillGroup.category}
                      variants={itemVariants}
                      className="glass-medium rounded-2xl p-6 backdrop-blur-lg"
                    >
                      <h3 className="text-lg font-bold text-primary mb-3">
                        {skillGroup.category}
                      </h3>
                      <p className="text-foreground/80">{skillGroup.items.join(", ")}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
