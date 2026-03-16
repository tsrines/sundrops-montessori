import { PRESCHOOL_BEYOND_BOOKS } from '@/lib/data/preschool-content';

export function PreschoolBeyondBooks() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
          {PRESCHOOL_BEYOND_BOOKS.heading}
        </h2>
        <p className="text-lg leading-relaxed text-gray-600">{PRESCHOOL_BEYOND_BOOKS.body}</p>
      </div>
    </section>
  );
}
