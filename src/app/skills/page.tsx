import type { Metadata } from 'next';
import { portfolioData } from '@/lib/portfolio';
import { SkillsGrid } from '@/components/sections/SkillsGrid';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Frontend, backend, cloud and tooling stack used to ship production web applications.',
};

/** Skills screen (figmaDesign.png — "Skills Screen" frame). */
export default function SkillsPage() {
  return <SkillsGrid categories={portfolioData.skillCategories} title="Skills" />;
}
