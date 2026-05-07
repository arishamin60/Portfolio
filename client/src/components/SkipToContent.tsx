/**
 * SkipToContent Component
 * Keyboard accessibility feature that allows users to skip navigation
 * and jump directly to main content
 */

export function SkipToContent() {
  const handleSkip = () => {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={(e) => {
        e.preventDefault();
        handleSkip();
      }}
      className="skip-to-content"
    >
      Skip to main content
    </a>
  );
}
