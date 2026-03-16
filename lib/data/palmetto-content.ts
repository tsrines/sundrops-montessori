export const PAL_HERO = {
  titleLine1: 'Palmetto Campus',
  titleLine2: 'Authentic Montessori School in Downtown Charleston, SC',
  cta: { label: 'Schedule A Tour', href: '/contact-palmetto/' },
} as const;

export const PAL_PROGRAMS = [
  {
    name: 'Early Toddlers',
    subtitle: 'PEE WEE CASA PROGRAM',
    ageRange: '14-24 Months',
    href: '/toddler-programs/',
    bgColor: 'rgba(242, 55, 170, 0.8)',
  },
  {
    name: 'Toddlers',
    subtitle: 'WEE CASA PROGRAM',
    ageRange: '2-3 years old',
    href: '/toddler-programs/',
    bgColor: 'rgba(31, 63, 168, 0.8)',
  },
  {
    name: 'Preschool & Kindergarten',
    subtitle: 'CASA PROGRAM',
    ageRange: '3-6 years old',
    href: '/preschool-and-kindergarten/',
    bgColor: 'rgba(98, 172, 172, 0.8)',
  },
] as const;

export const PAL_INFO = {
  heading: 'Palmetto Campus',
  description: [
    'Our Palmetto campus in downtown Charleston, SC offers infant, toddler, preschool, and kindergarten programs. Sundrops Montessori strives to educate by nurturing the social, emotional, and cognitive developmental needs of each child individually.',
    'Located at 88 Simons Street in downtown Charleston our classrooms are full of natural light and overlook outdoor gardens and play areas.',
  ],
  hours: 'M-F: 7:30 am - 5:30 pm',
  closedDays: 'Closed on Weekends',
  address: '88 Simons Street, Charleston, SC 29403',
  email: 'Email Palmetto Campus',
  emailHref: 'mailto:lindsay@sundropsmontessori.com',
  phone: '(843) 722-4339',
} as const;

export const PAL_QUICK_LINKS = [
  { label: 'Tuition', href: '/documents/tuition.pdf' },
  { label: 'Tuition Policies', href: '/documents/tuition-policies.pdf' },
  { label: 'Handbook', href: '/documents/handbook.pdf' },
  { label: 'School Calendar', href: '/documents/school-calendar.pdf' },
  { label: 'Birth - Casa Programs Calendar', href: '/documents/birth-casa-calendar.pdf' },
  { label: 'Google Map', href: 'https://maps.google.com/?q=88+Simons+Street+Charleston+SC+29403' },
] as const;

export const PAL_ADMIN = {
  name: 'Ms Lindsay',
  title: 'Director',
  heading: 'Palmetto Director',
  image: '/images/staff/lindsay-rs-cr.jpg',
} as const;

export const PAL_GENERAL_INFO = {
  contacts: [
    {
      role: 'Director',
      name: 'Ms Lindsay',
      emailLabel: 'Email Lindsay',
      emailHref: 'mailto:lindsay@sundropsmontessori.com',
    },
    {
      role: 'Assistant Director',
      name: 'Whitney Wiles',
    },
    {
      role: 'Admissions Director',
      name: 'Ms Kejal',
      emailLabel: 'Email Kejal',
      emailHref: 'mailto:kejal@sundropsmontessori.com',
    },
    {
      role: 'Bookkeeper',
      name: 'Ms Tammy',
      emailLabel: 'Email Tammy',
      emailHref: 'mailto:tammy@sundropsmontessori.com',
    },
  ],
  gradeLevels: '14 months to 6 years',
} as const;

export const PAL_LEAD_GUIDES = [
  { name: 'Lindsay Trotta', role: 'Director' },
  { name: 'Kristina Fraser', role: 'PEE WEE Lead' },
  { name: 'Hannah Johnson', role: 'CASA 1 Lead' },
  { name: 'Whitney Wiles', role: 'Assistant Director' },
  { name: 'Amelia Page', role: 'WEE CASA Co-Lead' },
  { name: 'Whitney Wiles', role: 'CASA 2 Lead' },
  { name: 'Sarah Holcomb', role: 'NIDO Lead' },
  { name: 'Emma Waters', role: 'WEE CASA Co-Lead' },
] as const;

export const PAL_INSTAGRAM = {
  handle: '@sundropspalmetto',
  url: 'https://www.instagram.com/sundropspalmetto/',
  posts: [
    {
      image: '/images/instagram/post-1.jpg',
      href: 'https://www.instagram.com/p/CzBgQsuO-p7/',
      alt: 'Halloween fall festival at Sundrops',
    },
    {
      image: '/images/instagram/post-2.jpg',
      href: 'https://www.instagram.com/p/CwYCgMKrhfw/',
      alt: 'Casa enrollment announcement',
    },
    {
      image: '/images/instagram/post-3.jpg',
      href: 'https://www.instagram.com/reel/CvuhGbatT7j/',
      alt: 'Summer environment peek',
    },
    {
      image: '/images/instagram/post-4.jpg',
      href: 'https://www.instagram.com/reel/CvgQ1s-teLf/',
      alt: 'Classroom activities',
    },
    {
      image: '/images/instagram/post-5.jpg',
      href: 'https://www.instagram.com/p/CvSGSBLuD8m/',
      alt: 'Best of Charleston award',
    },
  ],
} as const;
