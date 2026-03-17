export const TODDLER_HERO = {
  title: 'TODDLERS',
  subtitle: 'PEE WEE & WEE CASA PROGRAMS',
  ageRange: '14 - 36 months',
  cta: { label: 'CONTACT US', href: '/contact/' },
} as const;

export const TODDLER_CONTENT_BLOCKS = {
  left: [
    {
      heading: 'Wee Casa Classroom',
      paragraphs: [
        'Our Pee Wee (14-24 months) and Wee Casa (24-36 months) classrooms are designed for children ages 14 to 36 months. It is an environment that is set up to entice our little ones to explore in a classroom where everything they need is at their level.',
        'Here your child paints, waters the plants, sweeps with miniature brooms, cleans up spills, and works with materials that develop fine and gross motor coordination and focus and concentration.',
      ],
    },
    {
      heading: 'Fostering Independence',
      paragraphs: [
        '"Help me to do it by myself." Very young children working toward independence in eating, dressing and toileting are really working toward what they want to do. We take each child as an individual, allowing them to go at his or her own pace, to achieve their independence.',
        'Snack is set out for children to serve themselves when they are hungry and tiny pitchers of water with cups so they can pour themselves water when they are thirsty. Everything your child does in his or her environment encourages and fosters independence.',
      ],
    },
    {
      heading: 'Respect for the Child',
      paragraphs: [
        'Our program is prominent by the way we approach your child with respect. We believe in assisting your child in becoming a self-sufficient member of our community where they have ownership of their environment.',
      ],
    },
  ],
  right: [
    {
      heading: 'Language Development',
      paragraphs: [
        "At this stage in a child's life language development is on the cusp of explosion. It is vital that your child is surrounded by rich and stimulating conversation.",
        'A 20 month old child, trying to put his shoe on, might be encouraged with "pull, use your muscles and push your foot in while you pull the tabs up." The toddler\'s mind absorbs the new vocabulary, which plants the seeds for reading, writing and self-expression later in life.',
      ],
    },
    {
      heading: 'Outdoor Play',
      paragraphs: [
        'Children at this age need to have a lot of outside time. Our playground is equipped with climbing structures that are developmentally appropriate and offer many gross motor opportunities as well as beautiful trees to shade the play area on our sunny days.',
      ],
    },
  ],
} as const;

export const TODDLER_BEYOND_BOOKS = {
  heading: 'Beyond the Books',
  body: "At Sundrops we strive to educate by nurturing the social, emotional and cognitive developmental needs for each student, individually. Our mission is to awaken your child's natural desire to learn in an environment where trust, respect, responsibility, community and cooperation flourish. Our classrooms are specially prepared environments with materials that stimulate a student's sense of curiosity and offer dynamic learning at a student's own pace.",
} as const;

export const TODDLER_REGISTRATION = {
  heading: 'Toddler School Registration',
  subheading: 'How To Register Your Child for Toddler School at Sundrops',
  description:
    "To start the Registration process, please check out our programs based on your child's age, select a campus, request more information, and complete the provided application.",
  steps: [
    {
      number: 1,
      title: 'Request Information',
      description: 'Reach out to learn more about the Toddler Programs and schedule a campus visit.',
      campusLinks: [{ label: 'Bridge Campus (Mt Pleasant)', href: '/contact/' }],
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
