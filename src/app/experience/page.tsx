import type { Metadata } from 'next';
import { portfolioData } from '@/lib/portfolio';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Engineering roles, responsibilities and measurable outcomes over the last eight years.',
};

/** Experience screen (figmaDesign.png — "Experience Screen" frame). */
export default function ExperiencePage() {
  return <ExperienceTimeline experiences={portfolioData.experiences} title="Experience" />;
}
