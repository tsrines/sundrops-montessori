export const PRESCHOOL_HERO = {
  title: 'PRESCHOOL & KINDERGARTEN',
  subtitle: 'CASA PROGRAM',
  ageRange: '3 - 6 years',
  cta: { label: 'CONTACT US', href: '/contact/' },
} as const;

export const PRESCHOOL_CONTENT_BLOCKS = {
  left: {
    heading: '3 to 6 Years Old',
    paragraphs: [
      'At Sundrops preschool & kindergarten programs, also known as the CASA classrooms, children from 3 to 6 years old possess what Dr. Montessori called the absorbent mind. This gives them the ability to absorb all aspects of their culture and environment with very little effort.',
      'The environment has five distinct areas of study: practical life, sensorial materials, language, mathematics and cultural studies.',
      'Other subjects such as art, spanish, biology, botany, zoology and music are presented as extensions of the sensorial and language activities. Children learn about people and cultures, giving them a connection to the global human family.',
      'Our teachers follow the child through their experience of the classroom environment. Based on their observations they develop an individualized lesson plan that best suits the child\u2019s interests. This learning process allows the children to have choices regarding their education, fostering confidence and independence.',
    ],
  },
  right: {
    heading: 'The 3-Year Learning Cycle',
    intro:
      'We encourage parents to allow their children to complete the 3 years full cycle in the Montessori Classroom to see fruition of the Montessori Method.',
    yearCycle: [
      {
        label: 'First year',
        description:
          'child is adapting to the prepared environment. Lessons will be given to develop skills in concentration, sequencing, attention span, memory skills, auditory and visual discrimination, co-ordination, language and socialization.',
      },
      {
        label: 'Second Year',
        description:
          'child begins to do more in-depth work with letters, numbers and the writing process. The passageway to abstraction begins to unfold.',
      },
      {
        label: 'Third Year',
        description:
          'brings fruition from the 1st and 2nd year. Further development of reading and writing skills. The child becomes more confident and conscious of his knowledge and is ready to move on to primary school.',
      },
    ],
  },
} as const;

export const PRESCHOOL_BEYOND_BOOKS = {
  heading: 'Beyond the Books',
  body: "At Sundrops we strive to educate by nurturing the social, emotional and cognitive developmental needs for each student, individually. Our mission is to awaken your child's natural desire to learn in an environment where trust, respect, responsibility, community and cooperation flourish. Our classrooms are specially prepared environments with materials that stimulate a student's sense of curiosity and offer dynamic learning at a student's own pace.",
} as const;

export const PRESCHOOL_REGISTRATION = {
  heading: 'Preschool & Kindergarten Registration',
  subheading: 'How To Register Your Child for Preschool at Sundrops',
  description:
    "To start the Registration process, please check out our programs based on your child's age, select a campus, and schedule a tour.",
  steps: [
    {
      number: 1,
      title: 'Request Information',
      campusLinks: [
        { label: 'Bridge', href: '/contact/' },
        { label: 'Daniel Island', href: '/contact/' },
        { label: 'Palmetto', href: '/contact/' },
        { label: 'Farm School', href: '/contact/' },
      ],
    },
    {
      number: 2,
      title: 'Complete Provided Application',
    },
    {
      number: 3,
      title: 'Enrollment Process',
      description: "We'll contact you as soon as enrollment is determined.",
    },
  ],
} as const;
