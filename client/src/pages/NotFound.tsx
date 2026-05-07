/**
 * 404 Not Found Page
 * Modern Minimalist Design: Friendly error page with recovery options
 */

import { Button } from "../components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-accent" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">404</h1>

        {/* Error Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          Page Not Found
        </h2>

        {/* Error Description */}
        <p className="text-foreground/70 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 group"
            onClick={() => setLocation("/")}
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-foreground/60 mb-4">Quick links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/" className="text-accent hover:text-accent/80 transition-colors text-sm">
              Home
            </a>
            <a href="/about" className="text-accent hover:text-accent/80 transition-colors text-sm">
              About
            </a>
            <a href="/projects" className="text-accent hover:text-accent/80 transition-colors text-sm">
              Projects
            </a>
            <a href="/contact" className="text-accent hover:text-accent/80 transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
