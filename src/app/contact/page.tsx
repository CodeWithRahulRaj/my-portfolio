import type { Metadata } from 'next';
import { portfolioData } from '@/lib/portfolio';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/sections/ContactForm';
import { CollaborateCta } from '@/components/sections/CollaborateCta';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send a message about full-stack engineering work, collaborations or contract projects.',
};

/** Contact screen (figmaDesign.png — "Contact Screen" frame). */
export default function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-9rem)] bg-gradient-to-b from-nav to-mint py-12 sm:py-16">
      <Container size="form">
        <ContactForm contact={portfolioData.contact} email={portfolioData.profile.email} />
        <CollaborateCta socials={portfolioData.socials} headline={portfolioData.contact.ctaHeadline} />
      </Container>
    </section>
  );
}
