/**
 * BackToTop Component
 * Floating button that appears when user scrolls down
 * Respects prefers-reduced-motion for accessibility
 */

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? "visible" : ""}`}
      aria-label="Back to top"
      title="Back to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}
