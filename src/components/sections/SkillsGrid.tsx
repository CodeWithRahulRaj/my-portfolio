import React from 'react';
import { SkillCategory } from '@/types/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechIcon } from '@/components/ui/TechIcon';

interface SkillsGridProps {
  categories: SkillCategory[];
  title: string;
}

/** Skills screen: one mint card per category, four logo tiles per card. */
export const SkillsGrid: React.FC<SkillsGridProps> = ({ categories, title }) => (
  <section className="py-12 sm:py-16">
    <Container size="narrow">
      <SectionHeading as="h1" size="lg">
        {title}
      </SectionHeading>

      <div className="mt-8 space-y-6">
        {categories.map((category) => (
          <div
            key={category.category}
            className="rounded-2xl bg-gradient-to-br from-mint to-brand-soft p-6 sm:p-8"
          >
            <h2 className="heading text-[19px]">{category.category}</h2>

            <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {category.skills.map((skill) => (
                <li key={skill.name} className="flex flex-col items-center gap-3 text-center">
                  <TechIcon icon={skill.icon} className="h-10 w-10 sm:h-11 sm:w-11" />
                  <span className="text-[14px] leading-5 text-ink">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
