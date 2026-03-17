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
      { label: 'Infant', href: '/infant-care/' },
      { label: 'Toddler', href: '/toddler-programs/' },
      {
        label: 'Preschool & Kindergarten',
        href: '/preschool-and-kindergarten/',
      },
      { label: 'Elementary School', href: '/elementary-school/' },
      { label: 'Middle School', href: '/mezzo-program/' },
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
  { label: 'FAQs', href: '/faqs/' },
  { label: 'Calendar', href: '/calendar-embed' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Contact', href: '/contact/' },
  {
    label: 'Parent Resources',
    href: '#',
    children: [{ label: 'Pizza Fridays', href: '/pizza-fridays/' }],
  },
];

export const footerNavigation = {
  programs: [
    { label: 'Infant', href: '/infant-care/' },
    { label: 'Toddler', href: '/toddler-programs/' },
    {
      label: 'Preschool & Kindergarten',
      href: '/preschool-and-kindergarten/',
    },
    { label: 'Elementary School', href: '/elementary-school/' },
    { label: 'Middle School', href: '/mezzo-program/' },
  ],
  campuses: [
    { label: 'Bridge (Mt. Pleasant)', href: '/bridge-campus/' },
    { label: 'Daniel Island', href: '/daniel-island-campus/' },
    { label: 'Palmetto (Charleston)', href: '/palmetto-campus/' },
    { label: 'Mezzo Middle School', href: '/middle-school/' },
  ],
  resources: [
    { label: 'FAQs', href: '/faqs/' },
    { label: 'Calendar', href: '/calendar-embed' },
    { label: 'Careers', href: '/careers/' },
    { label: 'Field Trip Permission', href: '/field-trip-permission/' },
    { label: 'Pizza Fridays', href: '/pizza-fridays/' },
    { label: 'Contact', href: '/contact/' },
  ],
} as const;
