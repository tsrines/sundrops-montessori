export interface Campus {
  name: string;
  slug: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  programs: string[];
  hours: string;
  description: string;
  mapEmbedUrl: string;
}

export const campuses: Campus[] = [
  {
    name: 'Bridge Campus',
    slug: 'bridge-campus',
    location: 'Mt Pleasant, SC',
    address: '955 Houston Northcutt Blvd, Mt Pleasant, SC 29464',
    phone: '843-849-3652',
    email: 'bridge@sundropsmontessori.com',
    programs: ['Infant (Nido)', 'Toddler (Pee Wee)', 'Preschool & K (Casa)', 'Elementary'],
    hours: 'Monday - Friday, 7:00 AM - 6:00 PM',
    description:
      'Our flagship campus in Mt Pleasant serves children from 6 weeks through 10th grade. The Bridge Campus features purpose-built Montessori classrooms, outdoor learning gardens, and a welcoming community for families in the East Cooper area.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.8!2d-79.862!3d32.814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ4JzUwLjQiTiA3OcKwNTEnNDMuMiJX!5e0!3m2!1sen!2sus!4v1',
  },
  {
    name: 'Daniel Island Campus',
    slug: 'daniel-island-campus',
    location: 'Daniel Island, SC',
    address: '2291 Clements Ferry Rd, Charleston, SC 29492',
    phone: '843-647-7848',
    email: 'di@sundropsmontessori.com',
    programs: ['Infant (Nido)', 'Toddler (Wee Casa)', 'Preschool & K (Casa)'],
    hours: 'Monday - Friday, 7:00 AM - 6:00 PM',
    description:
      'Nestled near Daniel Island, this campus provides Montessori education for infants through kindergarten in a beautifully designed space that connects children to nature and community.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.8!2d-79.88!3d32.86!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sus!4v1',
  },
  {
    name: 'Palmetto Campus',
    slug: 'palmetto-campus',
    location: 'Downtown Charleston, SC',
    address: '88 Simons St, Charleston, SC 29403',
    phone: '843-722-4339',
    email: 'palmetto@sundropsmontessori.com',
    programs: ['Toddler (Wee Casa)', 'Preschool & K (Casa)'],
    hours: 'Monday - Friday, 7:00 AM - 6:00 PM',
    description:
      'Located in the heart of Charleston, the Palmetto Campus brings the Montessori method to downtown families. Our toddler and preschool programs provide a nurturing community for children ages 14 months through kindergarten.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.8!2d-79.97!3d32.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sus!4v1',
  },
  {
    name: 'Farm Campus',
    slug: 'farm-campus',
    location: 'Huger, SC',
    address: '1519 Charity Church Road, Huger, SC 29450',
    phone: '843-849-3652',
    email: 'mezzo@sundropsmontessori.com',
    programs: ['Middle School (Mezzo)'],
    hours: 'Monday - Friday, 8:00 AM - 3:30 PM',
    description:
      'The Farm Campus in Huger, SC is home to our Mezzo adolescent program. Set on a working farm, students engage in real-world learning through sustainable agriculture, entrepreneurship, and community building while meeting rigorous academic standards.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3340.0!2d-79.75!3d33.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sus!4v1',
  },
];
