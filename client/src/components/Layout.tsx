/**
 * Layout Component
 * Modern Minimalist Design: Global layout wrapper with Navbar, main content, and Footer
 * Includes accessibility features like skip-to-content and back-to-top
 */

import { BackToTop } from "./BackToTop";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { SkipToContent } from "./SkipToContent";

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
