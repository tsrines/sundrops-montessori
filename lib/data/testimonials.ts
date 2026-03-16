export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
  videoId?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'nana-yeboah',
    name: 'Nana Yeboah',
    role: 'Sundrops Alumni (2019-2022), College of Charleston',
    quote:
      'This program is amazing. They got this super scared, shy girl to this confident, outgoing person. I feel like that\u2019s who I was on the inside, I just needed help getting there, and that\u2019s definitely going to affect the rest of my life, forever.',
    image: '/images/nana-overlay.jpg',
    videoId: '1159695499',
  },
];
