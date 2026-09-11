import React from 'react';
import {
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiRedux,
  SiNodedotjs,
  SiGo,
  SiPython,
  SiDjango,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiJira,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { TbBrandAzure, TbRefresh } from 'react-icons/tb';
import { FigmaMark } from './FigmaMark';

type IconEntry = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
};

const registry: Record<string, IconEntry> = {
  react: { Icon: SiReact, color: '#61DAFB' },
  vue: { Icon: SiVuedotjs, color: '#41B883' },
  nextjs: { Icon: SiNextdotjs, color: '#0B1215' },
  redux: { Icon: SiRedux, color: '#764ABC' },
  nodejs: { Icon: SiNodedotjs, color: '#539E43' },
  go: { Icon: SiGo, color: '#00ADD8' },
  python: { Icon: SiPython, color: '#3776AB' },
  django: { Icon: SiDjango, color: '#B8860B' },
  aws: { Icon: FaAws, color: '#FF9900' },
  azure: { Icon: TbBrandAzure, color: '#0089D6' },
  docker: { Icon: SiDocker, color: '#2496ED' },
  kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
  git: { Icon: SiGit, color: '#0B1215' },
  jira: { Icon: SiJira, color: '#2684FF' },
  agile: { Icon: TbRefresh, color: '#0B1215' },
};

interface TechIconProps {
  icon: string;
  className?: string;
}

/** Brand logos for the Skills screen tiles. */
export const TechIcon: React.FC<TechIconProps> = ({ icon, className = 'h-9 w-9' }) => {
  if (icon === 'figma') {
    return <FigmaMark className={className} />;
  }

  const entry = registry[icon];
  if (!entry) {
    return <span className={`${className} block rounded-full bg-brand/20`} aria-hidden />;
  }

  const { Icon, color } = entry;
  return <Icon className={className} style={{ color }} />;
};
