import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

interface FeaturedProjectsProps {
  projects: Project[];
  viewAllHref: string;
}

/** Home screen card rail: heading + "View All", then three preview cards. */
export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, viewAllHref }) => (
  <section id="projects" className="scroll-mt-20 bg-band py-14 sm:py-16">
    <Container>
      <div className="flex items-baseline justify-between gap-4">
        <SectionHeading>Featured Projects</SectionHeading>
        <Link href={viewAllHref} className="text-[15px] text-brand transition-colors hover:text-brand-dark">
          View All
        </Link>
      </div>

      <ul className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm md:w-auto"
          >
            <Image
              src={project.screenshots.dark}
              alt={`${project.title} preview`}
              width={450}
              height={300}
              sizes="(max-width: 768px) 280px, 340px"
              className="h-[150px] w-full bg-[#0f1b23] object-cover"
            />
            <div className="flex flex-1 flex-col gap-4 p-5">
              <h3 className="heading text-[17px] leading-[1.2]">{project.title}</h3>
              <Button href={project.liveUrl} size="block" className="mt-auto">
                Live Demo
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);
