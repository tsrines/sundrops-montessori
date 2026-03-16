export const INFANT_HERO = {
  title: 'INFANTS',
  subtitle: 'NIDO PROGRAM',
  ageRange: '6 weeks - 14 months',
  cta: { label: 'CONTACT US', href: '/contact/' },
} as const;

export const INFANT_CONTENT_BLOCKS = {
  heading: 'LEARN BY DOING',
  left: [
    {
      prefix: 'The word ',
      bold: 'Nido',
      suffix:
        ' is Italian for nest. The Nido environment focuses on the basic needs of the infant, a safe bonded relationship between the caregivers and the child, respecting each individual child and the development of the child\u2019s increasing sense of self and independence.',
    },
    'The simplicity and order of our Nido environments allow for safe exploration and discovery of the world around them.',
    'Trust is a basic need that must be nurtured in the young child. Our trained caregivers respectfully respond to the needs of each child and when doing so, this builds a relationship between the two and sends the message to the child that he is unconditionally loved and accepted.',
  ],
  right: [
    'In our Nido environments we believe in the freedom of movement. You will not find children constrained in contraptions, rather you will see the infant placed on their back exploring the environment around them. They are able to move in a natural way and when they are ready. Our floor beds allow for the mobile infant to wake and move off his bed when ready.',
    'Feeding in our Nido environment is done so in a respecting way. The infant that is bottle-fed is held close and given undivided attention while drinking the bottle. The child that is sitting up on his own will sit at a small table, drink from a mini glass and eat off a real plate.',
    'Our infants have an outside area where they are able to get out and have fresh air and enjoy the trees and sounds of nature.',
  ],
} as const;

export const INFANT_BEYOND_BOOKS = {
  heading: 'Beyond the Books',
  body: "At Sundrops we strive to educate by nurturing the social, emotional and cognitive developmental needs for each student, individually. Our mission is to awaken your child's natural desire to learn in an environment where trust, respect, responsibility, community and cooperation flourish. Our classrooms are specially prepared environments with materials that stimulate a student's sense of curiosity and offer dynamic learning at a student's own pace.",
  image: {
    src: '/images/programs/nido-beyond-books.jpg',
    alt: 'Infant exploring wooden toys at Sundrops Montessori',
  },
} as const;

export const INFANT_REGISTRATION = {
  heading: 'Infant Care Registration',
  subheading: 'How To Register Your Child for Infant Care at Sundrops Montessori',
  description:
    "To start the Registration process, please check out our programs based on your child's age, select a campus, and schedule a tour.",
  steps: [
    {
      number: 1,
      title: 'Request Information',
      campusLinks: [{ label: 'Mt Pleasant', href: '/contact-bridge' }],
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
