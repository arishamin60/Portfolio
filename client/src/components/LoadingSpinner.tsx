/**
 * LoadingSpinner Component
 * Modern Minimalist Design: Subtle, centered spinner with smooth rotation
 * Used for async operations like data fetching
 */

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full border-4 border-accent/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    </div>
  );
}
