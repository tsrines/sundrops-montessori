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
      { label: 'Bridge Campus', href: '/bridge-campus/' },
      { label: 'Daniel Island Campus', href: '/daniel-island-campus/' },
      { label: 'Palmetto Campus', href: '/palmetto-campus/' },
      { label: 'Farm Campus', href: '/farm-campus/' },
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
    { label: 'Bridge Campus', href: '/bridge-campus/' },
    { label: 'Daniel Island Campus', href: '/daniel-island-campus/' },
    { label: 'Palmetto Campus', href: '/palmetto-campus/' },
    { label: 'Farm Campus', href: '/farm-campus/' },
  ],
  resources: [
    { label: 'Tours', href: '/tours/' },
    { label: 'Parent Resources', href: '/parent-resources/' },
    { label: 'FAQs', href: '/faqs/' },
    { label: 'Calendar', href: '/calendar-embed' },
    { label: 'Careers', href: '/careers/' },
    { label: 'Contact', href: '/contact/' },
  ],
} as const;
