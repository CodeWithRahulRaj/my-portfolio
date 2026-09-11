import React from 'react';
import { ExperienceItem } from '@/types/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  title: string;
}

const logoTones: Record<ExperienceItem['logoTone'], string> = {
  gradient: 'bg-gradient-to-br from-[#F24E1E] via-[#A259FF] to-[#1ABCFE] text-white',
  light: 'bg-white text-brand border border-line',
  dark: 'bg-ink text-white',
};

/** Experience screen: logo tile, teal rail with dots, bullets, tech line. */
export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences, title }) => (
  <section className="py-12 sm:py-16">
    <Container size="narrow">
      <SectionHeading as="h1" size="lg">
        {title}
      </SectionHeading>

      <ol className="mt-8">
        {experiences.map((experience, index) => (
          <li key={experience.id} className="grid grid-cols-[44px_20px_1fr] gap-x-3 sm:grid-cols-[56px_24px_1fr] sm:gap-x-4">
            {/* company logo tile */}
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl font-display text-[15px] font-semibold sm:h-14 sm:w-14 sm:text-[17px] ${
                logoTones[experience.logoTone]
              }`}
            >
              {experience.logoInitials}
            </div>

            {/* rail + dot */}
            <div className="relative flex justify-center">
              <span
                className={`absolute top-2 w-px bg-brand/60 ${
                  index === experiences.length - 1 ? 'h-[calc(100%-0.5rem)]' : 'h-full'
                }`}
                aria-hidden
              />
              <span className="relative mt-1 h-2.5 w-2.5 rounded-full bg-brand" aria-hidden />
            </div>

            {/* content */}
            <div className={index === experiences.length - 1 ? 'pb-0' : 'pb-10'}>
              <h2 className="text-[17px] font-semibold leading-tight text-ink sm:text-[19px]">
                {experience.company}
              </h2>
              <p className="mt-1 text-[14px] text-muted">
                {experience.role} · {experience.period}
              </p>

              <ul className="mt-4 space-y-2">
                {experience.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-2.5 text-[14px] leading-6 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted/70" aria-hidden />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-[14px] leading-6">
                <span className="font-semibold text-ink">Technologies used: </span>
                <span className="text-muted">{experience.technologies}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  </section>
);
