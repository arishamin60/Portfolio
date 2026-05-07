/**
 * About Page
 * Modern Minimalist Design: Two-column layout (text + skills grid/list toggle)
 * Features useState for layout toggle between grid and list views
 */

import { Button } from "../components/ui/button";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

export default function About() {
  const [isGridLayout, setIsGridLayout] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* About Section */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Text Content */}
            <div className="fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                About <span className="accent-underline">Me</span>
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>{PORTFOLIO_CONFIG.about.bio}</p>
                <p>{PORTFOLIO_CONFIG.about.bio2}</p>
                <p>{PORTFOLIO_CONFIG.about.bio3}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 fade-in" style={{ animationDelay: "100ms" }}>
              <div className="bg-card border border-border rounded-lg p-6 card-hover">
                <p className="text-4xl font-bold text-accent mb-2">
                  {PORTFOLIO_CONFIG.about.stats.projects}+
                </p>
                <p className="text-foreground/70 font-medium">Projects Completed</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 card-hover">
                <p className="text-4xl font-bold text-accent mb-2">
                  {PORTFOLIO_CONFIG.about.stats.yearsExperience}+
                </p>
                <p className="text-foreground/70 font-medium">Years Experience</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 card-hover">
                <p className="text-4xl font-bold text-accent mb-2">
                  {PORTFOLIO_CONFIG.about.stats.clients}+
                </p>
                <p className="text-foreground/70 font-medium">Happy Clients</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 card-hover">
                <p className="text-4xl font-bold text-accent mb-2">
                  {PORTFOLIO_CONFIG.about.stats.dedication}%
                </p>
                <p className="text-foreground/70 font-medium">Dedication</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                <span className="accent-underline">Skills</span>
              </h2>
              <div className="flex gap-2">
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
              </div>
            </div>

            {/* Grid Layout */}
            {isGridLayout && (
              <div className="grid md:grid-cols-2 gap-8 fade-in">
                {PORTFOLIO_CONFIG.skills.map((skillGroup) => (
                  <div
                    key={skillGroup.category}
                    className="bg-card border border-border rounded-lg p-6 card-hover"
                  >
                    <h3 className="text-xl font-bold text-primary mb-4">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20 transition-all hover:bg-accent/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List Layout */}
            {!isGridLayout && (
              <div className="space-y-4 fade-in">
                {PORTFOLIO_CONFIG.skills.map((skillGroup) => (
                  <div
                    key={skillGroup.category}
                    className="bg-card border border-border rounded-lg p-6 card-hover"
                  >
                    <h3 className="text-lg font-bold text-primary mb-3">
                      {skillGroup.category}
                    </h3>
                    <p className="text-foreground/80">{skillGroup.items.join(" • ")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
