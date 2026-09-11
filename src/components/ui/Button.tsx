import React from 'react';
import Link from 'next/link';

type Variant = 'solid' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'block';

const base =
  'inline-flex items-center justify-center font-display font-semibold uppercase tracking-wide rounded-md transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark';

const variants: Record<Variant, string> = {
  solid: 'bg-brand text-white hover:bg-brand-dark',
  outline: 'border border-brand text-ink hover:bg-brand-soft',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-[15px]',
  block: 'h-11 w-full px-4 text-sm',
};

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: 'button' | 'submit';
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'solid',
  size = 'md',
  className = '',
  type = 'button',
  external = false,
}) => {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (!href) {
    return (
      <button type={type} className={classes}>
        {children}
      </button>
    );
  }

  if (external || /^https?:|^mailto:/.test(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};
