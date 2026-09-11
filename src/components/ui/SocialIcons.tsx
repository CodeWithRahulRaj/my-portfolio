import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';
import { SocialLink, SocialPlatform } from '@/types/portfolio';

const icons: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  email: FiMail,
};

interface SocialIconsProps {
  socials: SocialLink[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
} as const;

/** Plain black social glyphs, spaced as in the Hero and Contact screens. */
export const SocialIcons: React.FC<SocialIconsProps> = ({ socials, size = 'md', className = '' }) => (
  <ul className={`flex items-center gap-6 ${className}`}>
    {socials.map((social) => {
      const Icon = icons[social.platform];
      return (
        <li key={social.platform}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="block text-ink transition-colors hover:text-brand"
          >
            <Icon className={sizeMap[size]} />
          </a>
        </li>
      );
    })}
  </ul>
);
