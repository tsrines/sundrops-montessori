export const MEZZO_HERO = {
  title: 'MIDDLE SCHOOL',
  subtitle: 'THE SUNDROPS MEZZO PROGRAM',
  gradeRange: '7th - 9th Grade',
  cta: {
    contact: { label: 'CONTACT US', href: '/contact/' },
    learnMore: { label: 'MORE ABOUT THE MEZZO PROGRAM', href: '/farm-campus/' },
  },
} as const;

export const MEZZO_PHILOSOPHY = {
  adolescent: {
    heading: 'Adolescent',
    paragraphs: [
      'The Sundrops Adolescent Erdkinder Program addresses the unique needs of the middle schooler. Adolescents have an inner need to discover who they are as an individual in the context of the larger community. The Sundrops Farm Campus gives adolescents the right environment that allows for authentic experiences that further their self-confidence.',
      'In a Montessori program for the adolescent the focus is on valorization of the personality; the students learn skills that allow them to be contributing members of a larger society.',
      'There are seven vital drives present during the adolescent period that are addressed: self-expression, belonging, freedom, fun, economic independence, power, and establishing personal convictions. In addition, to guide Sundrops Mezzo students on their journey, the program focuses on three pillars: academic rigor, social and emotional development, and building an ethical framework.',
    ],
  },
  deepConnection: {
    heading: 'Deep Connection',
    paragraphs: [
      'At the heart of the Sundrops Mezzo Program is a deep connection to the land and real-world work. Students participate in the daily operations of a working farm, gaining hands-on experience in agriculture, animal husbandry, and environmental stewardship.',
      'Through a micro-economy model, students learn financial literacy, entrepreneurship, and the value of meaningful labor. These authentic experiences provide the foundation for academic exploration and personal growth during this critical developmental stage.',
    ],
  },
} as const;

export const MEZZO_BEYOND_BOOKS = {
  heading: 'Beyond the Books',
  body: 'The Sundrops Mezzo Program goes beyond traditional academics to nurture the whole adolescent. By addressing the developmental needs unique to this age group, we create an environment where students develop independence, resilience, and a strong sense of self. The farm setting provides the perfect backdrop for experiential learning that connects academic concepts to real-world applications.',
  cta: { label: 'THE MEZZO PROGRAM CAMPUS', href: '/farm-campus/' },
} as const;

export const MEZZO_VIRTUAL_TOUR = {
  heading: 'Take a Virtual Tour of the Mezzo Program',
  videoId: '731103388',
  cta: { label: 'Request More Info', href: '/contact/' },
} as const;

export const MEZZO_REGISTRATION = {
  heading: 'MEZZO Registration',
  subheading: 'How To Register Your Child For The Mezzo Program',
  description:
    'Enrolling your child in the Sundrops Mezzo Program is a straightforward process. Follow the steps below to begin your journey toward a transformative adolescent education.',
  steps: [
    {
      number: 1,
      title: 'Request Information',
      description: 'Reach out to learn more about the Mezzo Program and schedule a visit to the Farm Campus.',
      campusLinks: [{ label: 'Farm Campus (Huger, SC)', href: '/contact/' }],
    },
    {
      number: 2,
      title: 'Complete Provided Application',
      description:
        'Fill out the enrollment application for your child. Our admissions team will review and follow up promptly.',
    },
    {
      number: 3,
      title: 'Enrollment Process',
      description: "We'll contact you as soon as enrollment is determined.",
    },
  ],
} as const;
