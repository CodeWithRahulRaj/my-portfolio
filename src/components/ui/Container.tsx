import React from 'react';

type Size = 'default' | 'narrow' | 'form';

interface ContainerProps {
  children: React.ReactNode;
  size?: Size;
  className?: string;
}

/**
 * Content column. `default` is the 1180px page width, `narrow` mirrors the
 * tighter single-column frames (Skills / Experience) and `form` the Contact
 * frame. Widths live here so callers never fight two competing max-w classes.
 */
const widths: Record<Size, string> = {
  default: 'max-w-[1180px]',
  narrow: 'max-w-[920px]',
  form: 'max-w-[760px]',
};

export const Container: React.FC<ContainerProps> = ({ children, size = 'default', className = '' }) => (
  <div className={`mx-auto w-full ${widths[size]} px-5 sm:px-8 ${className}`}>{children}</div>
);
