import type { Metadata } from 'next';
import { portfolioData } from '@/lib/portfolio';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';

export const metadata: Metadata = {
  title: 'Featured Works',
  description: 'Selected full-stack projects with the problem, solution, tech stack and measured impact.',
};

/** Projects screen (figmaDesign.png — "Projects Screen" frame). */
export default function ProjectsPage() {
  return <ProjectShowcase projects={portfolioData.featuredProjects} title="Featured Works" />;
}
