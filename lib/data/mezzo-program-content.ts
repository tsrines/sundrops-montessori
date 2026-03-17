export const MEZZO_PROGRAM_HERO = {
  title: 'MIDDLE SCHOOL',
  subtitle: 'THE SUNDROPS MEZZO PROGRAM',
  gradeRange: '7th - 9th Grade',
  cta: {
    contact: { label: 'CONTACT US', href: '/contact/' },
    learnMore: { label: 'MORE ABOUT THE MEZZO PROGRAM', href: '/middle-school/' },
  },
} as const;

export const MEZZO_PROGRAM_CONTENT = {
  adolescent: {
    heading: 'Adolescent',
    paragraphs: [
      'The Sundrops Adolescent Erdkinder Program addresses the unique needs of the middle-schooler.',
      'Adolescents are going through the most profound changes in their life since infancy. Many adults look back at adolescence as a time to survive or just "get through". It doesn\'t have to be that way. By knowing what they are going through, Montessori addresses the needs of the adolescent. It does this by working with the whole child and not just ramping up academics as can be the case in traditional middle school.',
      "The most important goal for each student is to reach valorization of their personality. This is Montessori's term for an adolescent gradually realizing she is capable and useful. Rising to meet expectations, having appropriate responsibilities and building character via learning from mistakes, all lead to a strong and worthy person. Middle school can be a turbulent time when children are so unsure of themselves and who they should be. Montessori's primary goal is to help them understand how amazing they are and guide them to finding how important and vital they are to the community.",
    ],
  },
  deepConnection: {
    heading: 'Deep Connection',
    paragraphs: [
      'All the design of the classroom and work is to help adolescents connect with seven vital drives of humans in this plane of development. Deep connection, need for solitude, meaning and purpose, joy and delight, creative outlets, urge for transcendence and a need for initiation; all are necessary gateways that assist the adolescent become comfortable in their role and how they fit in. By making a safe place for them to be themselves and try new things, the Montessori Adolescent classroom fosters their acceptance of who they are and minimizes the worry of who they are not.',
      'The Erdkinder (farm) program is a carefully constructed environment allowing for living on the land and learning self-sufficiency. The small community of the farm needs all students to play a role for it to be successful. Additionally, students will have to step out of their comfort zone to try tasks they may have never imagined before. Through the farm, a connection to the land develops as well as a responsibility to the environment. With the success and growth of the farm, a micro-economy develops. Students make decisions about what to do with resources and how altering choices alter profits. Collectively, they decide what their values and goals are, and then run the farm to meet those goals.',
      'Adolescents want to know how they fit in with those immediately around them and the greater world at large. These pressing concerns are foremost in their minds as academics become a secondary concern. It is the responsibility of the environment and guide to help the adolescents discover their answers in a safe and challenging manner. A student who completes their adolescent years at Sundrops will be secure in the knowledge of who they are and how they fit in the world. Then a whole, well rounded young man or woman will emerge, ready for the rigor of high school and vocational pursuits.',
    ],
  },
} as const;

export const MEZZO_PROGRAM_BEYOND_BOOKS = {
  heading: 'Beyond the Books',
  body: "At Sundrops we strive to educate by nurturing the social, emotional and cognitive developmental needs for each student, individually. Our mission is to awaken your child's natural desire to learn in an environment where trust, respect, responsibility, community and cooperation flourish. Our classrooms are specially prepared environments with materials that stimulate a student's sense of curiosity and offer dynamic learning at a student's own pace.",
  cta: { label: 'THE MEZZO PROGRAM CAMPUS', href: '/middle-school/' },
  image: {
    src: '/images/campuses/farm/garden-1.jpg',
    alt: 'Student gardening at the Mezzo Farm School',
  },
} as const;

export const MEZZO_PROGRAM_VIRTUAL_TOUR = {
  heading: 'TAKE A VIRTUAL TOUR OF THE MEZZO CAMPUS',
  cta: { label: 'Request More Info', href: '/contact/' },
  videoId: '731103388',
} as const;

export const MEZZO_PROGRAM_REGISTRATION = {
  subheading: 'MEZZO Registration',
  heading: 'How To Register Your Child for Middle School at Sundrops',
  description:
    "To start the Registration process, please check out our programs based on your child's age, select a campus, and schedule a tour.",
  steps: [
    {
      number: 1,
      title: 'Request Information',
      campusLinks: [
        { label: 'Bridge', href: '/contact-bridge' },
        { label: 'Daniel Island', href: '/contact-daniel-island' },
        { label: 'Palmetto', href: '/contact-palmetto' },
        { label: 'Farm School', href: '/contact-farm' },
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
