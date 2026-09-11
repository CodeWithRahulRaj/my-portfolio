import React from 'react';
import { SocialLink } from '@/types/portfolio';
import { Container } from '@/components/ui/Container';
import { SocialIcons } from '@/components/ui/SocialIcons';

interface FooterProps {
  socials: SocialLink[];
  copyright: string;
}

/** Light band with social glyphs and the copyright line (Hero screen footer). */
export const Footer: React.FC<FooterProps> = ({ socials, copyright }) => (
  <footer className="border-t border-line bg-nav">
    <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
      <SocialIcons socials={socials} size="md" />
      <p className="text-[13px] text-muted">{copyright}</p>
    </Container>
  </footer>
);
