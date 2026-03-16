export const CAREERS_HERO = {
  heading: 'We are always looking for good people',
  description:
    'Sundrops Montessori is accepting resumes for our **Primary and Elementary School** Programs, as well as our **Infant and Toddler** Programs.',
  image: {
    src: '/images/careers/guides-sundrops-rs.jpg',
    alt: 'Sundrops Montessori classroom guides',
  },
} as const;

export const GUIDE_PROGRAMS = [
  {
    id: 'primary',
    title: 'Montessori Primary School',
    description: 'Our Pre-K and Kindergarten CASA programs: 3 - 6 years old',
  },
  {
    id: 'elementary',
    title: 'Montessori Elementary School',
    description: 'Lower El & Upper El: 1st - 6th Grade',
  },
  {
    id: 'infant',
    title: 'Infant Program',
    description: 'Our Montessori NIDO program: 6 weeks - 14 months',
  },
  {
    id: 'toddler',
    title: 'Toddler Program',
    description: 'Our Montessori WEE CASA Programs: 14 - 36 months',
  },
] as const;

export const PERKS_BENEFITS = [
  {
    iconSrc: '/images/careers/icon-benefit-1.png',
    title: 'Vision and Dental',
    description: 'We think good eyesight and strong teeth are important',
  },
  {
    iconSrc: '/images/careers/icon-benefit-4.png',
    title: 'Montessori Certification',
    description: 'We offer to those who would like to make teaching this methodology a career',
  },
  {
    iconSrc: '/images/careers/icon-benefit-3.png',
    title: 'Competitive Pay',
    description: 'With competitive salary options when the time comes',
  },
  {
    iconSrc: '/images/careers/icon-benefit-2.png',
    title: '401K',
    description: 'A career with a financial future',
  },
  {
    iconSrc: '/images/careers/icon-benefit-6.png',
    title: 'Health Care',
    description: 'Premium Healthcare Benefits',
  },
  {
    iconSrc: '/images/careers/icon-benefit-5.png',
    title: 'Personal Time Off',
    description: 'When certain milestones are met, PTO is generously offered',
  },
] as const;

export const PROGRAM_CHECKBOXES = [
  { id: 'nido', label: 'Nido' },
  { id: 'wee-casa', label: 'Wee Casa' },
  { id: 'casa', label: 'Casa' },
  { id: 'elementary', label: 'Elementary' },
] as const;
