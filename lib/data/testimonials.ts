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
    role: 'Sundrops Alumni, College of Charleston',
    quote:
      'Sundrops gave me the confidence to think independently and pursue my passions. The Montessori approach taught me how to learn, not just what to learn. I carry those skills with me every day at the College of Charleston.',
    image: '/images/nana-overlay.jpg',
    videoId: '1159695499',
  },
  {
    id: 'martinez-family',
    name: 'The Martinez Family',
    role: 'Casa & Elementary Parents, Bridge Campus',
    quote:
      'We were initially unsure about mixed-age classrooms, but watching our daughter mentor younger students while being inspired by older ones has been incredible. She comes home excited about learning every single day. The guides truly see her as an individual.',
  },
  {
    id: 'thompson-family',
    name: 'Sarah Thompson',
    role: 'Toddler & Casa Parent, Daniel Island Campus',
    quote:
      'Both of our children started in the Nido program as infants. The continuity of care and the deep relationships they have built with their guides over the years is something you simply cannot find elsewhere. Sundrops feels like an extension of our family.',
  },
  {
    id: 'chen-family',
    name: 'David & Lin Chen',
    role: 'Elementary Parents, Bridge Campus',
    quote:
      'Our son struggled in a traditional school setting before we found Sundrops. Within months, his love of learning returned. The self-paced curriculum and hands-on materials transformed his confidence. He now leads research projects and speaks at student-led conferences with ease.',
  },
  {
    id: 'johnson-family',
    name: 'Keisha Johnson',
    role: 'Casa Parent, Palmetto Campus',
    quote:
      'What sets Sundrops apart is the respect they show each child. My daughter is not just a student in a classroom - she is known, valued, and gently challenged to grow. The practical life skills she has learned at four years old amaze our entire family.',
  },
];
