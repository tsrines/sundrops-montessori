import { ArrowRight } from 'lucide-react';
import { DI_INFO, DI_QUICK_LINKS } from '@/lib/data/daniel-island-content';

export function DiInfoGrid() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left: Campus Description */}
        <div className="bg-[#EFEFEF] p-10 md:p-12">
          <h2 className="font-serif text-4xl font-bold text-gray-900 md:text-5xl">{DI_INFO.heading}</h2>
          <div className="mt-6 space-y-4">
            {DI_INFO.description.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Center: Contact Details */}
        <div className="bg-[#0C80D3] p-10 text-white md:p-12">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">School Hours</p>
              <p className="mt-1 text-sm">{DI_INFO.hours}</p>
              <p className="text-sm">{DI_INFO.closedDays}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Address</p>
              {DI_INFO.address.map((line) => (
                <p key={line} className="mt-1 text-sm">
                  {line}
                </p>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Email</p>
              <a href={DI_INFO.emailHref} className="mt-1 inline-block text-sm underline hover:no-underline">
                {DI_INFO.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Phone</p>
              <p className="mt-1 text-sm">{DI_INFO.phone}</p>
            </div>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="bg-[#D15C1D] p-10 text-white md:p-12">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="mt-6 space-y-3">
            {DI_QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm hover:underline">
                  <ArrowRight className="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
