import type { Metadata } from 'next';
import Image from 'next/image';
import { PizzaOrderForm } from '@/components/forms/pizza-order-form';
import { PIZZA_FRIDAYS_CONTENT } from '@/lib/data/pizza-fridays-content';

export const metadata: Metadata = {
  title: 'Pizza Fridays | Sundrops Montessori',
  description:
    'Order pizza for your child every Friday at Sundrops Montessori. A fundraiser by Upper Elementary students.',
};

export default function PizzaFridaysPage() {
  const { hero, details, pizzaImage } = PIZZA_FRIDAYS_CONTENT;

  return (
    <>
      {/* Hero -- image with purple-to-transparent gradient overlay */}
      <section className="relative flex min-h-[400px] w-full items-end overflow-hidden md:min-h-[500px]">
        <Image
          src={hero.image}
          alt="Children playing outdoors at Sundrops Montessori"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8300E9] to-transparent" />
        <div className="relative z-10 container mx-auto max-w-5xl px-4 py-16 md:py-20">
          <p className="font-script text-lg tracking-wider text-white md:text-xl">{hero.eyebrow}</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
        </div>
      </section>

      {/* Two-column content: pizza image + details */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid items-start gap-12 md:grid-cols-2">
            {/* Left -- pizza image */}
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={pizzaImage}
                alt="D'Allesandro's cheese pizza"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right -- text content */}
            <div className="space-y-4">
              <h2 className="font-serif text-3xl font-bold text-foreground">{details.heading}</h2>
              <p className="text-2xl font-semibold text-foreground">{details.pricing.oneSlice}</p>
              <p className="text-2xl font-semibold text-foreground">{details.pricing.twoSlices}</p>

              <p className="text-muted-foreground">{details.description}</p>
              <p className="text-muted-foreground">{details.donationPolicy}</p>
              <p className="text-muted-foreground">{details.multiChildNote}</p>
              <p className="text-muted-foreground">
                {details.contact.text}{' '}
                <a href={`mailto:${details.contact.email}`} className="text-primary hover:underline">
                  {details.contact.email}
                </a>{' '}
                {details.contact.suffix}
              </p>
              <p className="text-lg font-bold text-foreground">{details.thankYou}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto max-w-5xl px-4">
          <PizzaOrderForm />
        </div>
      </section>
    </>
  );
}
