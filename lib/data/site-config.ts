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
    title: 'Founder/Director',
    image: '/images/founder.jpg',
    quote:
      'I started this school to create an educational community and place where our students are free develop at their pace, where they can learn logically, naturally, and spontaneously. In addition, this community fosters a strong self esteem, and guides children to be helpful, empathetic participants. We have built a learning experience where students and their families are part of the community and its growth. We\u2019re thankful for our Montessori community, which has grown to include four campuses and an adolescent farm school.',
  },
};
