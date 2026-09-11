import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { AboutSection, Profile } from '@/types/portfolio';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  profile: Profile;
  quickLink: AboutSection['quickLink'];
}

/**
 * Hero band from the Home screen: text left, portrait right, sitting on the
 * blue-to-mint gradient. On small screens it becomes the stacked Hero screen
 * (portrait on top, centred copy, then the "About me" quick link card).
 */
export const Hero: React.FC<HeroProps> = ({ profile, quickLink }) => (
  <section className="bg-gradient-to-r from-hero-from via-hero-mid to-hero-to">
    <Container>
      <div className="grid items-end gap-0 md:min-h-[560px] md:grid-cols-[1fr_auto]">
        {/* portrait: first on mobile, right column on desktop */}
        <div className="order-1 flex justify-center pt-8 md:order-2 md:justify-end md:pt-0">
          <Image
            src={profile.portraitUrl}
            alt={`${profile.name}, ${profile.role}`}
            width={645}
            height={825}
            priority
            sizes="(max-width: 768px) 60vw, 420px"
            className="h-[260px] w-auto object-contain object-bottom sm:h-[320px] md:h-[500px]"
          />
        </div>

        {/* copy block */}
        <div className="order-2 pb-10 text-center md:order-1 md:pb-16 md:text-left">
          <p className="font-display text-[13px] font-medium uppercase tracking-[0.12em] text-ink/80 sm:text-sm">
            {profile.eyebrow}
          </p>
          <h1 className="heading mx-auto mt-3 max-w-[380px] text-[30px] sm:max-w-[640px] sm:text-[40px] md:mx-0 md:text-[48px] lg:text-[54px]">
            {profile.headline}
          </h1>
          <Button href={profile.ctaHref} size="lg" className="mt-7">
            {profile.ctaLabel}
          </Button>
        </div>
      </div>
    </Container>

    {/* mobile-only quick link card from the Hero screen */}
    <div className="bg-page pb-2 pt-6 md:hidden">
      <Container>
        <Link
          href={quickLink.href}
          className="flex items-center justify-between rounded-xl bg-brand-soft px-5 py-4 transition-colors hover:bg-mint"
        >
          <span>
            <span className="heading block text-[17px]">{quickLink.title}</span>
            <span className="mt-0.5 block text-[13px] text-muted">{quickLink.subtitle}</span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-ink/70" />
        </Link>
      </Container>
    </div>
  </section>
);
