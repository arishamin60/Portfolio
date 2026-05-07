/**
 * Projects Page
 * Modern Minimalist Design: Masonry-inspired card grid with hover effects
 * Features useEffect for data fetching, loading/error states, and conditional rendering
 */

import { LoadingSpinner } from "../components/LoadingSpinner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { AlertCircle, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use config timing constant for loading delay
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

  return (
    <div className="min-h-screen bg-background py-20 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-16 fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Featured <span className="accent-underline">Projects</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            A selection of recent projects showcasing my skills in full-stack development, UI/UX design, and problem-solving.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner />
            <p className="mt-4 text-foreground/60 font-medium">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-destructive mb-1">Error Loading Projects</h3>
              <p className="text-destructive/80">{error}</p>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="bg-card border border-border rounded-lg overflow-hidden card-hover fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 group"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    View Details
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground/60 text-lg">No projects found.</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
              <h2 className="text-2xl font-bold text-primary">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">About this project</h3>
                <p className="text-foreground/80 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-accent/10 text-accent border-accent/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {selectedProject.link !== "#" && (
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg"
                    onClick={() => window.open(selectedProject.link, "_blank")}
                  >
                    View Live Project
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="flex-1 rounded-lg"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
