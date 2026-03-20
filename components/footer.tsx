import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { footerNavigation } from '@/lib/data/navigation';
import { siteConfig } from '@/lib/data/site-config';

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-background/20">
      {children}
    </a>
  );
}

function FooterLinkList({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <div>
      <h3 className="mb-4 font-serif text-lg font-semibold">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm opacity-80 transition-opacity hover:opacity-100">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sundrops-charcoal text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Contact Info */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold uppercase">Main Office</h3>

            <div className="space-y-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm opacity-80 transition-opacity hover:opacity-100">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </span>
              </a>

              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`}
                className="flex items-center gap-2.5 text-sm opacity-80 transition-opacity hover:opacity-100">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{siteConfig.phone}</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-sm opacity-80 transition-opacity hover:opacity-100">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{siteConfig.email}</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
              <SocialLink href={siteConfig.social.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Column 2: Programs */}
          <FooterLinkList title="Programs" links={footerNavigation.programs} />

          {/* Column 3: Campuses & Resources */}
          <div className="space-y-8">
            <FooterLinkList title="Campuses" links={footerNavigation.campuses} />
            <FooterLinkList title="Resources" links={footerNavigation.resources} />
          </div>

          {/* Column 4: Sundrops CARES */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Sundrops CARES</h3>
            <div className="mb-4">
              <Image
                src="/images/cares-logo.png"
                alt="Sundrops CARES"
                width={160}
                height={80}
                className="h-auto w-32 rounded bg-background/10 p-2"
              />
            </div>
            <p className="mb-4 text-sm leading-relaxed opacity-80">
              The Sundrops CARES scholarship fund supports families who share our commitment to Montessori education but
              need financial assistance to make it possible.
            </p>
            <a
              href="https://sundropscares.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100">
              Learn more at sundropscares.org
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs opacity-60 sm:flex-row sm:px-6 lg:px-8">
          <span>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
