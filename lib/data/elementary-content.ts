export const ELEMENTARY_HERO = {
  title: 'ELEMENTARY SCHOOL IN CHARLESTON, SC',
  subtitle: 'Authentic Montessori Elementary School Programs in Mount Pleasant',
  gradeRange: '1st - 6th Grade',
  cta: { label: '1st - 6th Grade', href: '#registration' },
} as const;

export const ELEMENTARY_INTRO = {
  heading: 'Authentic Montessori Elementary School Programs',
  paragraphs: [
    'The Sundrops Elementary Programs offers a unique and intimate setting that fosters confidence and growth through an authentic Montessori education.',
    'During this stage of development children become conceptual rather than sensorial explorers. They develop a greater understanding of abstraction and imagination. At this time the style of learning moves into research-based work that often occurs in small groups.',
    'The teacher\'s role is to guide students in a way that enables them to utilize their intrinsic motivation to learn. Elementary teachers use the "Five Great Lessons" as a way to explain grand concepts and the integration of different subjects. The students are drawn to these lessons; sparking their interest in the various disciplines that stem from the specific story.',
  ],
  image: {
    src: '/images/elementary/elementary-3.jpg',
    alt: 'Elementary students at Sundrops Montessori',
    width: 600,
    height: 800,
  },
} as const;

export const ELEMENTARY_EXPERIENTIAL = {
  heading: 'An Experiential Approach',
  paragraphs: [
    'An experiential approach infuses the Montessori curriculum to provide concrete experiences, including frequent outings into the community. Near the end of the three-year cycle, lower elementary students will naturally move toward more abstract work, problem solving and real life application of their learning. This is the foundation of the upper elementary curriculum.',
    'The Sundrops elementary curriculum covers many disciplines, such as language, mathematics, science, and history. Studies are also enriched with Spanish, music, art and yoga that are integrated into the school day and through weekly special area classes. Practical life, gardening and handwork are an integral part of each work cycle and help the students learn to care for living things and hone their fine motor skills. The classroom space extends to an outdoor learning environment where students are free to do their work.',
  ],
} as const;

export const ELEMENTARY_BEYOND_BOOKS = {
  heading: 'Beyond the Books',
  body: "At Sundrops Montessori we strive to educate by nurturing the social, emotional, and cognitive developmental needs for each student, individually. Our mission is to awaken your child's natural desire to learn in an environment where trust, respect, responsibility, community and cooperation flourish. Our classrooms are specially prepared environments with materials that stimulate a student's sense of curiosity and offer dynamic learning at a student's own pace.",
  gallery: {
    rows: [
      [
        { src: '/images/elementary/farm7.jpg', alt: 'Students learning on the farm' },
        { src: '/images/elementary/farm8.jpg', alt: 'Hands-on farm experience' },
        { src: '/images/elementary/farm10.jpg', alt: 'Outdoor agricultural education' },
      ],
      [
        { src: '/images/elementary/farm-4.jpg', alt: 'Students working with animals' },
        { src: '/images/elementary/farm5.jpg', alt: 'Farm-based learning activities' },
      ],
      [
        { src: '/images/elementary/garden-1.jpg', alt: 'Students in the school garden' },
        { src: '/images/elementary/farm-school-2.jpg', alt: 'Farm school outdoor classroom' },
        { src: '/images/elementary/farm-school-3.jpg', alt: 'Farm school experiential learning' },
      ],
    ],
  },
} as const;

export const ELEMENTARY_REGISTRATION = {
  heading: 'Registration',
  subheading: 'How To Register Your Child for Sundrops',
  description:
    "Check out our programs based on your child's age, select a campus, and schedule a tour. You can then submit your application and application fee online, and we'll begin our placement process.",
  steps: [
    {
      number: 1,
      title: 'Schedule A Tour',
      description: 'Pick your program, time and campus.',
      campusLinks: [{ label: 'Schedule a Tour', href: '/contact/' }],
    },
    {
      number: 2,
      title: 'Submit An Application',
      description: 'Online Application',
      campusLinks: [
        { label: 'Online Application', href: '/application/' },
        { label: 'Download PDF', href: '/documents/application-form.pdf' },
      ],
    },
    {
      number: 3,
      title: 'Placement Process',
      description: "We'll contact you as soon as placement is determined.",
    },
  ],
} as const;
