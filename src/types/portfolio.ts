/* ------------------------------------------------------------------
   Types mirror the sections drawn in figmaDesign.png:
   Hero / Home / Projects / Skills / Experience / Contact screens.
   ------------------------------------------------------------------ */

export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'email';

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  /** eyebrow line above the headline: "SAMUEL CHEN | FULL-STACK ENGINEER" */
  eyebrow: string;
  /** two-line hero headline */
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  portraitUrl: string;
  email: string;
  location: string;
}

export interface AboutSection {
  title: string;
  /** rendered as the two text columns of the Home screen */
  columns: string[][];
  readMoreLabel: string;
  readMoreHref: string;
  /** mobile-only quick link card from the Hero screen */
  quickLink: {
    title: string;
    subtitle: string;
    href: string;
  };
}

export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  /** comma separated, exactly as printed under "TECH STACK" in the design */
  techStack: string;
  impact: string;
  /** dark + light dashboard shots shown side by side on the Projects screen */
  screenshots: {
    dark: string;
    light: string;
  };
  liveUrl: string;
  repoUrl: string;
}

export interface SkillItem {
  name: string;
  /** key resolved to a brand logo by components/ui/TechIcon.tsx */
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface SkillsStripColumn {
  title: string;
  items: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  logoInitials: string;
  logoTone: 'gradient' | 'light' | 'dark';
  achievements: string[];
  technologies: string;
}

export interface ContactField {
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'textarea';
  required: boolean;
}

export interface ContactSection {
  title: string;
  fields: ContactField[];
  submitLabel: string;
  ctaHeadline: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  ogImage: string;
  twitterHandle: string;
}

export interface NavActions {
  /** text link to the CV file in public/ */
  resume: NavItem;
  /** the teal pill in the top-right of every Figma screen */
  contact: NavItem;
}

export interface PortfolioData {
  seo: SeoMetadata;
  navLinks: NavItem[];
  navActions: NavActions;
  profile: Profile;
  socials: SocialLink[];
  about: AboutSection;
  featuredProjects: Project[];
  skillCategories: SkillCategory[];
  skillsStrip: SkillsStripColumn[];
  experiences: ExperienceItem[];
  contact: ContactSection;
  footer: { copyright: string };
}
