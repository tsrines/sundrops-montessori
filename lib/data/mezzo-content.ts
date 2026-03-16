export const MEZZO_HERO = {
  titleLine1: 'MEZZO MONTESSORI',
  titleLine2: 'A Sundrops Montessori Middle School Experience at our Campus in Huger, SC',
  gradeRange: 'Grades 7 - 9',
  cta: { label: 'Schedule A Middle School Tour', href: '/contact-farm' },
} as const;

export const MEZZO_INFO = {
  heading: 'SUNDROPS MEZZO PROGRAM',
  description:
    '7th to 9th Grade. The Sundrops Adolescent Erdkinder Program addresses the unique needs of the middle schooler. The Erdkinder program is a carefully constructed environment allowing for living on the land and learning self-sufficiency. The small community of the farm requires all students to play a role, and often to step out of their comfort zone to realize their potential and success on the farm. See the video tour below.',
  hours: 'M-F: 7:45 am - 3:30 pm',
  closedDays: 'Closed on Weekends',
  address: '1515 Charity Church Rd, Huger, SC 29450',
  email: 'Email Farm School',
  emailHref: 'mailto:zako@sundropsmontessori.com',
  phone: '(843) 849-3652',
} as const;

export const MEZZO_QUICK_LINKS = [
  { label: 'Tuition', href: '/documents/tuition.pdf' },
  { label: 'Handbook', href: '/documents/handbook.pdf' },
  { label: 'Adolescent Calendar', href: '/documents/adolescent-calendar.pdf' },
  { label: 'School Calendar', href: '/documents/school-calendar.pdf' },
  {
    label: 'Google Map',
    href: 'https://maps.google.com/?q=1515+Charity+Church+Rd+Huger+SC+29450',
  },
] as const;

export const MEZZO_COMPARISON = {
  subheading: 'MEZZO FARM SCHOOL COMPARISON',
  heading: "Continuing your Child's Montessori Education Through Middle School",
  description:
    'At a time when the middle school student is most challenged to find their place in the world and learn more about who they are, traditional schools sit them inside at desks to learn in a standardized, test-based method. The Mezzo Farm School Program goes beyond the classroom where each student works to their strengths and learns about their gifts.',
  items: [
    { label: 'Established Curriculum', traditional: true, mezzo: true },
    { label: 'Test-Based Model', traditional: true, mezzo: 'strikethrough' },
    { label: 'Student-Centric Model', traditional: false, mezzo: true },
    { label: 'Varied Extracurricular Activities', traditional: true, mezzo: true },
    { label: 'Field Day Trips', traditional: true, mezzo: true },
    { label: 'Bonding/Multi-Day Field Study Trips', traditional: false, mezzo: true },
    { label: 'Teach about being an Adolescent', traditional: false, mezzo: true },
    { label: 'Multiage Classrooms', traditional: false, mezzo: true },
    { label: 'Teach Soft Skills', traditional: false, mezzo: true },
    {
      label: 'Create an environment where students are encouraged to be themselves',
      traditional: false,
      mezzo: true,
    },
    { label: 'Outside Farm Work', traditional: false, mezzo: true },
    { label: 'Classroom Small Business/Financial Literacy', traditional: false, mezzo: true },
    { label: 'Work based on themes engaging to Adolescents', traditional: false, mezzo: true },
    { label: 'Service Work', traditional: false, mezzo: true },
    { label: 'Respect for Family Time: no assigned homework', traditional: false, mezzo: true },
    { label: 'Options for HS credits', traditional: false, mezzo: true },
  ],
} as const;

export const MEZZO_CAMPUS_LIFE_IMAGES = [
  { src: '/images/campuses/farm/farm7.jpg', alt: 'Students on the farm' },
  { src: '/images/campuses/farm/farm8.jpg', alt: 'Farm school activities' },
  { src: '/images/campuses/farm/farm10.jpg', alt: 'Outdoor learning on the farm' },
  { src: '/images/campuses/farm/farm-4.jpg', alt: 'Farm campus life' },
  { src: '/images/campuses/farm/farm5.jpg', alt: 'Students working outdoors' },
  { src: '/images/campuses/farm/garden-1.jpg', alt: 'Garden at the farm school' },
  { src: '/images/campuses/farm/FarmSchool-2.jpg', alt: 'Farm school community' },
  { src: '/images/campuses/farm/farm-school3.jpg', alt: 'Farm school experience' },
] as const;

export const MEZZO_ALUMNI = {
  subheading: 'Sundrops Middle School',
  programLabel: 'Mezzo Farm Program',
  heading: 'Alumni Spotlight',
  name: 'Nana Yeboah',
  quote:
    "This program is amazing. They got this super scared, shy girl to this confident, outgoing person. I feel like that's who I was on the inside, I just needed help getting there, and that's definitely going to affect the rest of my life, forever.",
  yearsAttended: '2019 - 2022',
  programs: 'Upper Elementary, Mezzo Middle School',
  whereTo: 'College of Charleston',
  videoId: '829806004',
  thumbnail: '/images/nana-overlay.jpg',
} as const;

export const MEZZO_STUDENT_QUOTE = {
  quote: 'Sundrops Middle School is a place where my confidence and place in the world grew.',
  attribution: '~former student',
} as const;

export const MEZZO_VIRTUAL_TOUR = {
  heading: 'Tour Our Adolescent Farm School',
  cta: { label: 'REQUEST MORE INFO', href: '/contact/' },
  videoId: '731103388',
} as const;

export const MEZZO_STAFF = [
  {
    name: 'Mr. Zak Oberrath',
    title: 'Farm School Lead Guide',
    image: '/images/staff/zak-oberrath-2023.jpg',
    emailLabel: 'Email Zak',
    emailHref: 'mailto:zalo@sundropsmontessori.com',
  },
  {
    name: 'Ms. Karen Latsbaugh',
    title: 'Farm School Assistant Guide',
    image: '/images/staff/karen-latsbaugh.jpg',
  },
] as const;

export const MEZZO_CTA = {
  label: 'Schedule A Middle School Tour',
  href: '/contact-farm',
} as const;
