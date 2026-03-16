export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { label: 'About', href: '/about-us/' },
  {
    label: 'Programs',
    href: '#',
    children: [
      { label: 'Infant (Nido)', href: '/infant-care/' },
      { label: 'Toddler (Pee Wee / Wee Casa)', href: '/toddler-programs/' },
      {
        label: 'Preschool & Kindergarten (Casa)',
        href: '/preschool-and-kindergarten/',
      },
      { label: 'Elementary School', href: '/elementary-school/' },
      { label: 'Middle School (Mezzo)', href: '/middle-school/' },
    ],
  },
  {
    label: 'Campuses',
    href: '#',
    children: [
      { label: 'Bridge (Mt. Pleasant)', href: '/bridge-campus/' },
      { label: 'Daniel Island', href: '/daniel-island-campus/' },
      { label: 'Palmetto (Charleston)', href: '/palmetto-campus/' },
      { label: 'Mezzo Middle School', href: '/middle-school/' },
    ],
  },
  { label: 'Tours', href: '/tours/' },
  { label: 'FAQs', href: '/faqs/' },
  { label: 'Calendar', href: '/calendar-embed' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNavigation = {
  programs: [
    { label: 'Infant Care (Nido)', href: '/infant-care/' },
    { label: 'Toddler Programs', href: '/toddler-programs/' },
    {
      label: 'Preschool & Kindergarten',
      href: '/preschool-and-kindergarten/',
    },
    { label: 'Elementary School', href: '/elementary-school/' },
    { label: 'Middle School (Mezzo)', href: '/middle-school/' },
  ],
  campuses: [
    { label: 'Bridge (Mt. Pleasant)', href: '/bridge-campus/' },
    { label: 'Daniel Island', href: '/daniel-island-campus/' },
    { label: 'Palmetto (Charleston)', href: '/palmetto-campus/' },
    { label: 'Mezzo Middle School', href: '/middle-school/' },
  ],
  resources: [
    { label: 'Tours', href: '/tours/' },
    { label: 'FAQs', href: '/faqs/' },
    { label: 'Calendar', href: '/calendar-embed' },
    { label: 'Careers', href: '/careers/' },
    { label: 'Field Trip Permission', href: '/field-trip-permission/' },
    { label: 'Contact', href: '/contact/' },
  ],
} as const;
