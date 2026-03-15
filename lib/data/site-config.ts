export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  social: {
    facebook: string;
    instagram: string;
  };
  founder: {
    name: string;
    title: string;
    image: string;
    quote: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Sundrops Montessori',
  tagline: 'Authentic Montessori Education in Charleston, SC',
  description:
    'Authentic Montessori education for children ages 6 weeks through 9th grade in the greater Charleston, SC area.',
  url: 'https://sundropsmontessori.com',
  phone: '843-849-3652',
  email: 'info@sundropsmontessori.com',
  address: {
    street: '955 Houston Northcutt Blvd',
    city: 'Mt Pleasant',
    state: 'SC',
    zip: '29464',
  },
  social: {
    facebook: 'https://facebook.com/respectfuleducation',
    instagram: 'https://instagram.com/sundropsbridge/',
  },
  founder: {
    name: 'Shannon Smith',
    title: 'Founder & Head of School',
    image: '/images/founder.jpg',
    quote:
      'I started this school to create an educational community that nurtures the whole child - mind, body, and spirit. Every decision we make centers on what is best for the children in our care.',
  },
};
