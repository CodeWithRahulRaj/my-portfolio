import React from 'react';
import { SocialLink } from '@/types/portfolio';
import { SocialIcons } from '@/components/ui/SocialIcons';

interface CollaborateCtaProps {
  socials: SocialLink[];
  headline: string;
}

/** Social row plus the oversized closing line on the Contact screen. */
export const CollaborateCta: React.FC<CollaborateCtaProps> = ({ socials, headline }) => (
  <div className="mt-12 flex flex-col items-center">
    <SocialIcons socials={socials} size="lg" className="gap-10" />
    <h2 className="heading mt-12 max-w-[520px] text-center text-[30px] sm:text-[40px]">{headline}</h2>
  </div>
);
