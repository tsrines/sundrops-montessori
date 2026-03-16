export const DI_HERO = {
  titleLine1: 'Daniel Island Campus',
  titleLine2: 'Authentic Montessori School in Charleston, SC',
  cta: { label: 'Schedule A Tour', href: '/contact-daniel/' },
} as const;

export const DI_PROGRAMS = [
  {
    name: 'Infant',
    subtitle: 'NIDO PROGRAM',
    ageRange: '4 months - 14 months',
    href: '/infant-care/',
    bgColor: 'rgba(245, 201, 102, 0.8)',
  },
  {
    name: 'Pee Wee',
    subtitle: '',
    ageRange: '14 months - 24 months',
    href: '/toddler-programs/',
    bgColor: 'rgba(31, 63, 168, 0.8)',
  },
  {
    name: 'Toddler',
    subtitle: 'WEE CASA PROGRAM',
    ageRange: '24 months - 36 months',
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
] as const;

export const DI_INFO = {
  heading: 'Daniel Island Campus',
  description: [
    'Sundrops Montessori opened the doors of its Daniel Island campus in August 2017, the third location in the greater Charleston area. Located just off Clements Ferry Road, the campus serves families across Daniel Island, the Cainhoy area, and surrounding neighborhoods.',
    'The Daniel Island campus offers Montessori programs for children from 4 months through kindergarten, including Nido (infant), Pee Wee, Wee Casa (toddler), and Casa (preschool/kindergarten) classrooms. Each environment is thoughtfully prepared to foster independence, curiosity, and a love of learning.',
    'Our dedicated team of Montessori-trained guides creates a warm, nurturing community where children are free to explore, discover, and grow at their own pace.',
  ],
  hours: 'M-F: 7:30 am - 4:30 pm',
  closedDays: 'Closed on Weekends',
  address: ['2391 Clements Ferry Rd.', 'Charleston, SC 29492'],
  email: 'Email Daniel Island Campus',
  emailHref: 'mailto:whitney@sundropsmontessori.com',
  phone: '(843) 647-7848',
} as const;

export const DI_QUICK_LINKS = [
  { label: 'Tuition', href: '/documents/tuition.pdf' },
  { label: 'Handbook', href: '/documents/handbook.pdf' },
  { label: 'School Calendar', href: '/documents/school-calendar.pdf' },
  {
    label: 'Birth - Casa Programs Calendar',
    href: '/documents/birth-casa-calendar.pdf',
  },
  {
    label: 'Google Map',
    href: 'https://maps.google.com/?q=2391+Clements+Ferry+Rd+Charleston+SC+29492',
  },
] as const;

export const DI_CAMPUS_LIFE_IMAGES = [
  { src: '/images/campuses/di/hello-prt-rs.jpg', alt: 'Students greeting each other' },
  { src: '/images/campuses/di/mystery-reader-prt-rs.jpg', alt: 'Mystery reader visiting the classroom' },
  { src: '/images/campuses/di/daniel-island-working-prt-rs.jpg', alt: 'Student working on Montessori materials' },
  {
    src: '/images/campuses/di/daniel-island-group-working-prt-rs.jpg',
    alt: 'Group of students working together',
  },
  {
    src: '/images/campuses/di/daniel-island-playground-prt-rs.jpg',
    alt: 'Students playing on the playground',
  },
  { src: '/images/campuses/di/daniel-island-class-rs.jpg', alt: 'Classroom learning environment' },
  { src: '/images/campuses/di/work-cycle-wc1-prt-rs.jpg', alt: 'Work cycle in the Wee Casa classroom' },
  { src: '/images/campuses/di/daniel-island-outside-prt-rs.jpg', alt: 'Outdoor learning activities' },
  { src: '/images/campuses/di/daniel-island-friends-prt-rs.jpg', alt: 'Students enjoying time with friends' },
] as const;

export const DI_ADMINISTRATORS = [
  {
    name: 'Ms. Whitney Wiles',
    title: 'Daniel Island Director',
    image: '/images/staff/whitney-wiles-new.png',
    emailLabel: 'Email Whitney',
    emailHref: 'mailto:whitney@sundropsmontessori.com',
  },
  {
    name: 'Ms. MC Luebchow',
    title: 'Office Administrator',
    image: '/images/staff/mc-luebchow.jpg',
    emailLabel: 'Email MC',
    emailHref: 'mailto:mcl@sundropsmontessori.com',
  },
] as const;

export const DI_LEAD_GUIDES = [
  { name: 'Ms. Cheryl Norton', role: 'Casa Lead Co-Lead', image: '/images/staff/cheryl-norton.jpg' },
  { name: 'Ms. Felicia Gartung', role: 'Casa Co-Lead', image: '/images/staff/felicia-gartung.jpg' },
  { name: 'Ms. Kelsey McGill', role: 'Nido Lead', image: '/images/staff/kelsey-mcgill.jpg' },
  { name: 'Ms. Haley Anctil', role: 'Pee Wee Lead', image: '/images/staff/haley-anctil.jpg' },
  { name: 'Ms. Elsa Woodberry', role: 'Wee Casa Lead', image: '/images/staff/elsa-woodberry.jpg' },
] as const;
