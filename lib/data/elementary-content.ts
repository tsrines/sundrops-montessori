export const ELEMENTARY_HERO = {
  title: 'ELEMENTARY SCHOOL IN CHARLESTON, SC',
  subtitle: 'Authentic Montessori Elementary School Programs in Mount Pleasant',
  gradeRange: '1st - 6th Grade',
  cta: {
    contact: { label: 'CONTACT US', href: '/contact/' },
    learnMore: { label: 'LEARN MORE', href: '/bridge-campus/' },
  },
} as const;

export const ELEMENTARY_INTRO = {
  heading: 'Elementary School in Charleston, SC',
  paragraphs: [
    'At Sundrops Montessori, our elementary program provides an authentic Montessori education for children in first through sixth grade. Our Lower Elementary (1st-3rd grade) and Upper Elementary (4th-6th grade) classrooms offer a carefully prepared environment where children develop independence, critical thinking, and a lifelong love of learning.',
    'Our certified Montessori guides facilitate learning through hands-on materials, collaborative projects, and individualized instruction. Students work at their own pace, exploring subjects in depth and making meaningful connections across the curriculum.',
    'The elementary years are a time of great intellectual curiosity and social development. Our program honors this stage by providing rich academic content, opportunities for creative expression, and a supportive community where every child is valued.',
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
    'Montessori elementary education is built on the understanding that children ages 6-12 are reasoning, imaginative learners who need to explore the world beyond the classroom walls. Our experiential approach integrates outdoor education, field studies, and community engagement into the core curriculum.',
    'Students participate in hands-on science experiments, tend school gardens, collaborate on research projects, and present their findings to peers and community members. This approach develops not only academic skills but also confidence, communication, and a deep respect for the natural world.',
  ],
} as const;

export const ELEMENTARY_BEYOND_BOOKS = {
  heading: 'Beyond the Books',
  body: 'Our elementary program extends learning far beyond textbooks and worksheets. Students engage with the world through authentic experiences that bring academic concepts to life. From farm visits to nature walks, from art studios to science labs, every experience is designed to spark curiosity and deepen understanding.',
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
  heading: 'Elementary Registration',
  subheading: 'How To Register Your Child For The Elementary Program',
  description:
    'Enrolling your child in the Sundrops Elementary Program is a straightforward process. Follow the steps below to begin your journey toward an authentic Montessori elementary education.',
  steps: [
    {
      number: 1,
      title: 'Schedule A Tour',
      description: 'Visit our campus and see the elementary classrooms in action.',
      campusLinks: [{ label: 'Schedule a Tour', href: '/tours/' }],
    },
    {
      number: 2,
      title: 'Submit An Application',
      description: 'Complete the enrollment application for your child.',
      campusLinks: [{ label: 'Contact Us', href: '/contact/' }],
    },
    {
      number: 3,
      title: 'Placement Process',
      description: "We'll contact you as soon as placement is determined.",
    },
  ],
} as const;
