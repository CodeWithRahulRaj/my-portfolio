import React from 'react';
import Image from 'next/image';
import { Project } from '@/types/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

interface ProjectShowcaseProps {
  projects: Project[];
  title: string;
}

const Detail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <h4 className="heading text-[15px]">{label}</h4>
    <p className="mt-1.5 text-[14px] leading-6 text-muted">{value}</p>
  </div>
);

/** Projects screen: "Featured Works" with the full problem/solution cards. */
export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, title }) => (
  <section className="py-12 sm:py-16">
    <Container>
      <SectionHeading as="h1" size="lg">
        {title}
      </SectionHeading>

      <div className="mt-8 space-y-8">
        {projects.map((project, index) => (
          <article
            key={project.id}
            id={project.id}
            className="scroll-mt-24 rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-7"
          >
            <h2 className="heading text-[19px] sm:text-[22px]">{project.title}</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Image
                src={project.screenshots.dark}
                alt={`${project.title} application view`}
                width={450}
                height={300}
                priority={index === 0}
                sizes="(max-width: 640px) 90vw, 520px"
                className="aspect-[3/2] w-full rounded-lg border border-line bg-[#0f1b23] object-cover"
              />
              <Image
                src={project.screenshots.light}
                alt={`${project.title} dashboard view`}
                width={450}
                height={300}
                priority={index === 0}
                sizes="(max-width: 640px) 90vw, 520px"
                className="aspect-[3/2] w-full rounded-lg border border-line bg-white object-cover"
              />
            </div>

            <div className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              <Detail label="Problem" value={project.problem} />
              <Detail label="Solution" value={project.solution} />
              <Detail label="Tech Stack" value={project.techStack} />
              <Detail label="Impact" value={project.impact} />
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Button href={project.liveUrl} size="block">
                Live Demo
              </Button>
              <Button href={project.repoUrl} size="block" variant="outline">
                GitHub Repo
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Container>
  </section>
);
