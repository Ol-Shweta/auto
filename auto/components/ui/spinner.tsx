import React from "react";

export type SpinnerProps = {
  /** size in px (width & height). Default: 20 */
  size?: number;
  /** additional class names to apply to the wrapper */
  className?: string;
  /** border thickness in px (visual). Default: 2 */
  thickness?: number;
};

/**
 * Simple, reusable spinner component using Tailwind CSS classes.
 * - Exports both a named and default export so `import { Spinner }` and `import Spinner` both work.
 */
export function Spinner({ size = 20, className = "", thickness = 2 }: SpinnerProps) {
  const borderStyle = `${thickness}px`;
  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="animate-spin"
        style={{ width: size, height: size }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={borderStyle}
          opacity="0.25"
          fill="none"
        />
        <path
          d="M22 12a10 10 0 00-10-10"
          stroke="currentColor"
          strokeWidth={borderStyle}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
