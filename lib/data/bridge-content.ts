export const BRIDGE_HERO = {
  title: 'BRIDGE CAMPUS AUTHENTIC MONTESSORI EDUCATION',
  subtitle: 'IN MT. PLEASANT, SC',
  cta: { label: 'Visit Campus', href: '/contact/' },
} as const;

export const BRIDGE_PROGRAMS = [
  {
    name: 'Infant',
    subtitle: 'NIDO PROGRAM',
    ageRange: '6 weeks - 14 months',
    href: '/infant-care/',
    bgColor: 'rgba(245, 201, 102, 0.8)',
  },
  {
    name: 'Toddler',
    subtitle: 'WEE CASA PROGRAM',
    ageRange: '14 - 36 months',
    href: '/toddler-programs/',
    bgColor: 'rgba(247, 130, 126, 0.8)',
  },
  {
    name: 'Preschool/Kindergarten',
    subtitle: 'CASA PROGRAM',
    ageRange: '3 - 6 years old',
    href: '/preschool-and-kindergarten/',
    bgColor: 'rgba(242, 55, 170, 0.8)',
  },
  {
    name: 'Elementary',
    subtitle: 'LOWER & UPPER EL',
    ageRange: '1st - 6th Grade',
    href: '/elementary-school/',
    bgColor: 'rgba(31, 63, 168, 0.8)',
  },
  {
    name: 'Middle School',
    subtitle: 'MEZZO FARM PROGRAM',
    ageRange: '7th - 9th Grade',
    href: '/middle-school/',
    bgColor: 'rgba(98, 172, 172, 0.8)',
  },
] as const;

export const BRIDGE_INFO = {
  heading: 'Bridge Campus',
  description:
    'Our flagship campus in Mt Pleasant serves children from 6 weeks through 10th grade. The Bridge Campus features purpose-built Montessori classrooms, outdoor learning gardens, and a welcoming community for families in the East Cooper area.',
  hours: 'M-F: 7:30 am - 5:30 pm',
  closedDays: 'Closed on Weekends',
  address: '955 Houston Northcutt, Mt. Pleasant, SC 29464',
  email: 'Email Bridge Campus',
  emailHref: 'mailto:amanda@sundropsmontessori.com',
  phone: '(843) 849-3652',
} as const;

export const BRIDGE_QUICK_LINKS = [
  { label: 'Tuition', href: '/documents/tuition.pdf' },
  { label: 'Handbook', href: '/documents/handbook.pdf' },
  { label: 'School Calendar', href: '/documents/school-calendar.pdf' },
  { label: 'Birth-Casa Programs Calendar', href: '/documents/birth-casa-calendar.pdf' },
  { label: 'Elementary Programs Calendar', href: '/documents/elementary-calendar.pdf' },
  { label: 'Adolescent Program Calendar', href: '/documents/adolescent-calendar.pdf' },
  { label: 'Google Map', href: 'https://maps.google.com/?q=955+Houston+Northcutt+Mt+Pleasant+SC+29464' },
] as const;

export const BRIDGE_ADMIN = {
  name: 'Ms Amanda',
  title: 'Bridge Administrator',
  image: '/images/staff/amanda.jpg',
  quote: 'Seek first to understand, then to be understood.',
  quoteAuthor: 'Stephen R. Covey',
} as const;

export const BRIDGE_GENERAL_INFO = {
  contacts: [
    {
      role: 'Administrator',
      name: 'Ms Amanda',
      emailLabel: 'Email Amanda',
      emailHref: 'mailto:amanda@sundropsmontessori.com',
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
  gradeLevels: '6 weeks to 9th grade',
} as const;

export const BRIDGE_LEAD_GUIDES = [
  { name: 'Christian Snider', role: 'NIDO Lead Guide' },
  { name: 'Liz Leija', role: 'WEE CASA 1 Lead Guide' },
  { name: 'Jessica Bilton', role: 'CASA 2 Lead Guide' },
  { name: 'Melissa Colby', role: 'CASA 5 Lead Guide' },
  { name: 'Zak Oberrath', role: 'ADOLESCENT Lead Guide' },
  { name: 'Kenara Hill', role: 'PEE WEE CASA 2 Lead Guide' },
  { name: 'Ali Goldman', role: 'WEE CASA 2 Lead Guide' },
  { name: 'Juli Clark', role: 'CASA 3 Lead Guide' },
  { name: 'Lindy Hoel', role: 'LOWER ELEMENTARY Lead Guide' },
  { name: 'Juju Smith', role: 'PEE WEE CASA 1 Lead Guide/Toddler Program Curriculum Coordinator' },
  { name: 'Airial Lilly', role: 'CASA 1 Lead Guide' },
  { name: "A'Sha Green", role: 'CASA 4 Lead Guide' },
  { name: 'Rissa DeSpain', role: 'UPPER ELEMENTARY Lead Guide' },
] as const;
