import React from 'react';

/**
 * The multi-colour mark used in the top-left of every Figma screen.
 * Swap this single component out to brand the site with your own logo.
 */
export const FigmaMark: React.FC<{ className?: string }> = ({ className = 'h-7 w-auto' }) => (
  <svg viewBox="0 0 48 72" className={className} role="img" aria-label="Logo">
    <path d="M24 24H12a12 12 0 0 1 0-24h12v24Z" fill="#F24E1E" />
    <path d="M24 0h12a12 12 0 0 1 0 24H24V0Z" fill="#A259FF" />
    <path d="M24 24H12a12 12 0 0 0 0 24h12V24Z" fill="#FF7262" />
    <circle cx="36" cy="36" r="12" fill="#1ABCFE" />
    <path d="M24 48v12a12 12 0 1 1-12-12h12Z" fill="#0ACF83" />
  </svg>
);
