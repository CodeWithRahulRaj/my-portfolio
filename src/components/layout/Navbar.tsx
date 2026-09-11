'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NavActions, NavItem } from '@/types/portfolio';
import { Container } from '@/components/ui/Container';
import { FigmaMark } from '@/components/ui/FigmaMark';

interface NavbarProps {
  navLinks: NavItem[];
  navActions: NavActions;
}

export const Navbar: React.FC<NavbarProps> = ({ navLinks, navActions }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // The panel is only `md:hidden`, so widening past the breakpoint hides it
  // while `open` stays true — coming back to a small screen would then show an
  // already-open menu whose first tap reads as "the button did nothing".
  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia('(min-width: 768px)');
    const closeIfDesktop = () => desktop.matches && setOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);

    desktop.addEventListener('change', closeIfDesktop);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      desktop.removeEventListener('change', closeIfDesktop);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-nav/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Home" className="flex items-center">
          <FigmaMark className="h-7 w-auto" />
        </Link>

        {/* desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] transition-colors hover:text-brand ${
                isActive(link.href) ? 'font-semibold text-brand' : 'text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CV file lives in public/, so plain anchor + new tab */}
          <a
            href={navActions.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-ink transition-colors hover:text-brand"
          >
            {navActions.resume.label}
          </a>

          {/* the teal pill from the design, now the primary call to action */}
          <Link
            href={navActions.contact.href}
            className="rounded-md bg-brand px-5 py-2 text-[15px] text-white transition-colors hover:bg-brand-dark"
          >
            {navActions.contact.label}
          </Link>
        </nav>

        {/* Mobile trigger (hamburger from the Hero screen). The 28px icon is far
            below the 44px minimum touch target and sits right against the
            screen edge, so the box is padded out to 44px and pulled back by the
            same amount — the icon does not move, the tappable area triples.
            `touch-manipulation` drops the mobile double-tap-zoom delay that
            makes a quick tap feel like it was ignored. */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 flex h-11 w-11 touch-manipulation items-center justify-center text-ink md:hidden"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" className="absolute left-0 right-0 top-full border-b border-t border-line bg-nav shadow-lg md:hidden">
          <Container className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-line/70 py-3 text-[15px] ${
                  isActive(link.href) ? 'font-semibold text-brand' : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={navActions.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="border-b border-line/70 py-3 text-[15px] text-ink"
            >
              {navActions.resume.label}
            </a>
            <Link
              href={navActions.contact.href}
              onClick={() => setOpen(false)}
              className="my-3 rounded-md bg-brand px-5 py-2.5 text-center text-[15px] text-white"
            >
              {navActions.contact.label}
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
};
