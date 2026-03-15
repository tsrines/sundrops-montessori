'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { faqs, type FaqItem } from '@/lib/data/faqs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const FAQ_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'general', label: 'General' },
  { value: 'enrollment', label: 'Enrollment' },
  { value: 'curriculum', label: 'Curriculum' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'financial', label: 'Financial' },
] as const;

type CategoryFilter = (typeof FAQ_CATEGORIES)[number]['value'];

export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return faqs.filter((faq: FaqItem) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch =
        normalizedSearch === '' ||
        faq.question.toLowerCase().includes(normalizedSearch) ||
        faq.answer.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Find answers to common questions about Sundrops Montessori, our programs, enrollment process, and more.
          </p>
        </div>
      </section>

      {/* Filters and FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <div className="mb-10 flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeCategory === category.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                )}>
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq: FaqItem) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No questions match your search. Try a different term.</p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-16 rounded-xl border bg-muted/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">Still have questions?</h2>
            <p className="mt-2 text-muted-foreground">
              We are happy to help. Reach out to our admissions team or schedule a campus tour.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
                Contact Us
              </a>
              <a
                href="/calendar-embed"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                View Tour Dates
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
