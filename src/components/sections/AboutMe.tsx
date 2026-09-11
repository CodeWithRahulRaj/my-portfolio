import React from 'react';
import Link from 'next/link';
import { AboutSection } from '@/types/portfolio';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface AboutMeProps {
  about: AboutSection;
}

/** Two-column "About me" block with the underlined Read More link. */
export const AboutMe: React.FC<AboutMeProps> = ({ about }) => (
  <section id="about" className="scroll-mt-20 bg-white py-14 sm:py-16">
    <Container>
      <SectionHeading>{about.title}</SectionHeading>

      <div className="mt-7 grid gap-8 md:grid-cols-2 md:gap-12">
        {about.columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {column.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-7 text-muted">
                {paragraph}
              </p>
            ))}

            {columnIndex === about.columns.length - 1 && (
              <Link
                href={about.readMoreHref}
                className="inline-block font-semibold text-ink underline decoration-2 underline-offset-4 transition-colors hover:text-brand"
              >
                {about.readMoreLabel}
              </Link>
            )}
          </div>
        ))}
      </div>
    </Container>
  </section>
);
