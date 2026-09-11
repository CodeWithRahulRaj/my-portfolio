import { portfolioData } from '@/lib/portfolio';
import { Hero } from '@/components/sections/Hero';
import { AboutMe } from '@/components/sections/AboutMe';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { SkillsStrip } from '@/components/sections/SkillsStrip';

/** Home screen (figmaDesign.png — "Home Screen" / "Hero Screen" frames). */
export default function HomePage() {
  return (
    <>
      <Hero profile={portfolioData.profile} quickLink={portfolioData.about.quickLink} />
      <AboutMe about={portfolioData.about} />
      <FeaturedProjects projects={portfolioData.featuredProjects} viewAllHref="/projects" />
      <SkillsStrip columns={portfolioData.skillsStrip} />
    </>
  );
}
