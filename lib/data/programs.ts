export interface Program {
  name: string;
  montessoriName: string;
  slug: string;
  ageRange: string;
  description: string;
  features: string[];
  campuses: string[];
  image: string;
  color: string;
}

export const programs: Program[] = [
  {
    name: 'Infant Care',
    montessoriName: 'Nido',
    slug: 'infant-care',
    ageRange: '6 weeks - 14 months',
    description:
      "Our Nido program provides a warm, nurturing environment designed specifically for infants. Trained Montessori guides create a carefully prepared space that supports each baby's natural development, encouraging exploration and discovery from the very beginning.",
    features: [
      'Low child-to-teacher ratios',
      'Montessori-trained infant specialists',
      'Safe, stimulating prepared environment',
      'Individualized care routines',
      'Parent communication and daily reports',
      'Sensory-rich learning materials',
    ],
    campuses: ['Bridge Campus', 'Daniel Island Campus'],
    image: '/images/program-bg.png',
    color: 'bg-rose-100 dark:bg-rose-950',
  },
  {
    name: 'Toddler Programs',
    montessoriName: 'Pee Wee / Wee Casa',
    slug: 'toddler-programs',
    ageRange: '14 - 36 months',
    description:
      'The toddler years are a time of incredible growth and independence. Our Pee Wee and Wee Casa classrooms provide a Montessori environment where toddlers develop language, motor skills, and social awareness through purposeful activity and guided exploration.',
    features: [
      'Montessori-designed toddler classrooms',
      'Language development focus',
      'Practical life activities',
      'Outdoor exploration areas',
      'Toilet learning support',
      'Mixed-age community building',
    ],
    campuses: ['Bridge Campus', 'Daniel Island Campus', 'Palmetto Campus'],
    image: '/images/program-bg.png',
    color: 'bg-amber-100 dark:bg-amber-950',
  },
  {
    name: 'Preschool & Kindergarten',
    montessoriName: 'Casa',
    slug: 'preschool-and-kindergarten',
    ageRange: '3 - 6 years',
    description:
      'The Casa program is the heart of Montessori education. In our multi-age classrooms, children ages 3-6 learn at their own pace, developing a love of learning through hands-on materials in language, math, science, geography, and the arts.',
    features: [
      'Multi-age classrooms (3-6 years)',
      'Complete Montessori curriculum',
      'Hands-on learning materials',
      'Reading and writing readiness',
      'Mathematical foundations',
      'Cultural studies and science',
      'Peace education',
      'Spanish language introduction',
    ],
    campuses: ['Bridge Campus', 'Daniel Island Campus', 'Palmetto Campus'],
    image: '/images/program-bg.png',
    color: 'bg-sky-100 dark:bg-sky-950',
  },
  {
    name: 'Elementary School',
    montessoriName: 'Lower & Upper Elementary',
    slug: 'elementary-school',
    ageRange: '1st - 6th Grade',
    description:
      "Our elementary program builds on the Casa foundation with Montessori's Great Lessons framework. Students explore the interconnectedness of all knowledge through research, collaboration, and hands-on projects in lower (1st-3rd) and upper (4th-6th) elementary classrooms.",
    features: [
      'Great Lessons curriculum',
      'Research-based learning',
      'Collaborative project work',
      'Advanced mathematics',
      'Creative writing and literature',
      'Science experiments and field studies',
      'Community service projects',
      'Student-led conferences',
    ],
    campuses: ['Bridge Campus'],
    image: '/images/program-bg.png',
    color: 'bg-emerald-100 dark:bg-emerald-950',
  },
  {
    name: 'Middle School',
    montessoriName: 'Mezzo Farm Program',
    slug: 'middle-school',
    ageRange: '7th - 9th Grade',
    description:
      'Mezzo is our innovative farm-based middle school program in Huger, SC. Adolescents engage in real-world learning through sustainable agriculture, entrepreneurship, and community building while meeting rigorous academic standards in a unique outdoor setting.',
    features: [
      'Farm-based learning environment',
      'Sustainable agriculture curriculum',
      'Entrepreneurship projects',
      'Real-world math and science applications',
      'Community living and leadership',
      'Outdoor education',
      'College preparation',
      'Environmental stewardship',
    ],
    campuses: ['Farm Campus (Huger, SC)'],
    image: '/images/program-bg.png',
    color: 'bg-violet-100 dark:bg-violet-950',
  },
];
