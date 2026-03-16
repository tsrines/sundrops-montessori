export interface Program {
  name: string;
  montessoriName: string;
  slug: string;
  ageRange: string;
  description: string;
  extendedDescription?: string;
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
    extendedDescription:
      "In our Nido classrooms, every detail is thoughtfully considered to support the youngest learners. From the floor beds that allow freedom of movement to the low shelves stocked with sensory-rich materials, infants are empowered to explore at their own pace. Our Montessori-trained infant specialists maintain low child-to-teacher ratios, ensuring each baby receives individualized attention and care. Parents stay connected through daily reports that share feeding, sleeping, and milestone updates. The prepared environment honors Dr. Montessori's observation that learning begins from birth -- and that the first year of life lays the foundation for everything that follows.",
    features: [
      'Low child-to-teacher ratios',
      'Montessori-trained infant specialists',
      'Safe, stimulating prepared environment',
      'Individualized care routines',
      'Parent communication and daily reports',
      'Sensory-rich learning materials',
    ],
    campuses: ['Bridge Campus', 'Daniel Island Campus'],
    image: '/images/programs/infant-care-hero.jpg',
    color: 'bg-rose-100',
  },
  {
    name: 'Toddler Programs',
    montessoriName: 'Pee Wee / Wee Casa',
    slug: 'toddler-programs',
    ageRange: '14 - 36 months',
    description:
      'The toddler years are a time of incredible growth and independence. Our Pee Wee and Wee Casa classrooms provide a Montessori environment where toddlers develop language, motor skills, and social awareness through purposeful activity and guided exploration.',
    extendedDescription:
      "Toddlers are driven by an intense desire to do things for themselves. Our Pee Wee and Wee Casa programs honor this natural drive by providing child-sized tools, practical life activities, and the freedom to choose their own work. Children learn to pour their own water, prepare snacks, care for plants, and dress themselves -- building confidence and coordination with every activity. Language development is a central focus, with rich vocabulary introduced through songs, stories, and conversation. Our mixed-age toddler communities allow younger children to observe and learn from older peers, while older toddlers develop leadership and empathy. Toilet learning is supported with patience and respect, following each child's readiness cues.",
    features: [
      'Montessori-designed toddler classrooms',
      'Language development focus',
      'Practical life activities',
      'Outdoor exploration areas',
      'Toilet learning support',
      'Mixed-age community building',
    ],
    campuses: ['Bridge Campus', 'Daniel Island Campus', 'Palmetto Campus'],
    image: '/images/programs/toddler-programs-hero.jpg',
    color: 'bg-amber-100',
  },
  {
    name: 'Preschool & Kindergarten',
    montessoriName: 'Casa',
    slug: 'preschool-and-kindergarten',
    ageRange: '3 - 6 years',
    description:
      'The Casa program is the heart of Montessori education. In our multi-age classrooms, children ages 3-6 learn at their own pace, developing a love of learning through hands-on materials in language, math, science, geography, and the arts.',
    extendedDescription:
      'The Casa classroom is where the magic of Montessori truly shines. Children work with beautiful, self-correcting materials that make abstract concepts -- like the decimal system or sentence structure -- concrete and accessible. A three-year-old might watch in fascination as a five-year-old builds a thousand chain, planting the seed for their own future math exploration. Our Casa guides are trained observers who know when to step in with a lesson and when to step back and let the child lead. The result is a classroom where children are deeply engaged, intrinsically motivated, and genuinely excited about learning. Spanish, music, and art enrich the curriculum, while peace education helps children develop conflict resolution skills and respect for one another.',
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
    image: '/images/programs/preschool-hero.jpg',
    color: 'bg-sky-100',
  },
  {
    name: 'Elementary School',
    montessoriName: 'Lower & Upper Elementary',
    slug: 'elementary-school',
    ageRange: '1st - 6th Grade',
    description:
      "Our elementary program builds on the Casa foundation with Montessori's Great Lessons framework. Students explore the interconnectedness of all knowledge through research, collaboration, and hands-on projects in lower (1st-3rd) and upper (4th-6th) elementary classrooms.",
    extendedDescription:
      'Elementary is where Montessori students truly learn by doing. The curriculum begins with the five Great Lessons -- cosmic stories that introduce the universe, the timeline of life, the story of humans, the history of language, and the history of mathematics. From these stories, children branch out into self-directed research projects that span science, history, geography, literature, and the arts. A student studying ancient civilizations might build a model aqueduct, write a research paper, and present findings to the class -- all in a single unit of study. Our elementary guides facilitate this deep, interconnected learning while ensuring students meet and exceed academic standards. Student-led conferences replace traditional parent-teacher meetings, empowering children to take ownership of their educational journey.',
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
    image: '/images/programs/elementary-hero.jpg',
    color: 'bg-emerald-100',
  },
  {
    name: 'Middle School',
    montessoriName: 'Mezzo Farm Program',
    slug: 'middle-school',
    ageRange: '7th - 9th Grade',
    description:
      'Mezzo is our innovative farm-based middle school program in Huger, SC. Adolescents engage in real-world learning through sustainable agriculture, entrepreneurship, and community building while meeting rigorous academic standards in a unique outdoor setting.',
    extendedDescription:
      'Dr. Montessori called adolescence the "Erdkinder" period -- a time when young people need meaningful work, connection to the land, and a genuine community. The Mezzo Farm Program brings this vision to life on a working farm in the Lowcountry. Students raise animals, cultivate crops, build structures, and run a micro-economy -- applying math, science, and language arts to real challenges every day. The farm becomes a living laboratory where abstract concepts have concrete consequences: if you miscalculate feed ratios, the animals notice. Academic rigor is woven throughout, with students maintaining portfolios, engaging in Socratic seminars, and completing research projects that connect their farm work to global issues. The result is a program that develops not just academics, but character, resilience, and a deep sense of responsibility.',
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
    image: '/images/programs/middle-school-hero.jpg',
    color: 'bg-violet-100',
  },
];
