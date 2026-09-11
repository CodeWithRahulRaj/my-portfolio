import React from 'react';
import { SkillsStripColumn } from '@/types/portfolio';
import { Container } from '@/components/ui/Container';

interface SkillsStripProps {
  columns: SkillsStripColumn[];
}

/** The three-column tech band that closes the Home screen. */
export const SkillsStrip: React.FC<SkillsStripProps> = ({ columns }) => (
  <section className="bg-brand-soft py-12 sm:py-14">
    <Container>
      <div className="grid gap-8 sm:grid-cols-3">
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="heading text-[16px]">{column.title}</h3>
            <p className="mt-3 max-w-[220px] text-[15px] leading-7 text-muted">{column.items}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
