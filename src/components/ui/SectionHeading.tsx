import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2';
  size?: 'md' | 'lg';
  className?: string;
  id?: string;
}

/** The heavy condensed uppercase section titles from the design. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  as = 'h2',
  size = 'md',
  className = '',
  id,
}) => {
  const Tag = as;
  const sizes = {
    md: 'text-[26px] sm:text-[30px]',
    lg: 'text-[30px] sm:text-[38px]',
  } as const;

  return (
    <Tag id={id} className={`heading ${sizes[size]} ${className}`}>
      {children}
    </Tag>
  );
};
