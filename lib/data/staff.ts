export interface StaffMember {
  name: string;
  title: string;
  campus?: string;
  image: string;
  bio?: string[];
  quote?: string;
}

export interface StaffGroup {
  label: string;
  members: StaffMember[];
}

export const staffGroups: StaffGroup[] = [
  {
    label: 'School Administrators',
    members: [
      {
        name: 'Shannon Smith',
        title: 'Founder / Director',
        image: '/images/staff/shannon-smith.jpg',
      },
      {
        name: 'Jeanie Douglass',
        title: 'Special Education Coordinator / Partner',
        image: '/images/staff/jeanie-douglass.jpg',
      },
      {
        name: 'Tammy Gable',
        title: 'Queen of the Coin',
        image: '/images/staff/tammy-gable.jpg',
      },
      {
        name: 'Kejal Amin',
        title: 'Admissions Director',
        image: '/images/staff/kejal-amin.jpg',
      },
    ],
  },
  {
    label: 'Campus Administrators',
    members: [
      {
        name: 'Ms. Amanda',
        title: 'Office Administrator',
        campus: 'Bridge Campus',
        image: '/images/staff/amanda.jpg',
        quote: 'Seek first to understand, then to be understood.',
        bio: [
          'Amanda moved to Charleston in 2006 for a change of pace, and quickly connected to the enlightened world of Montessori. She started out as a substitute teacher at the Beach Campus and later moved to East Cooper Montessori Charter School, where she taught lower and upper elementary for four years.',
        ],
      },
      {
        name: 'Ms. Lindsay',
        title: 'Office Administrator',
        campus: 'Palmetto Campus',
        image: '/images/staff/lindsay.jpg',
        bio: [
          'Lindsay Trotta began her journey with Sundrops in 2007. She fell in love with the Montessori Methodology. After being a teacher\u2019s assistant for a couple years, she decided to get her AMS Montessori Primary (3-6) Training. She taught as a Primary Teacher for 12 years. Ten of those years were at the Palmetto Campus.',
          'In 2020, during the beginning of the Covid pandemic, she was given the opportunity to take over Sundrops Montessori \u2014 Palmetto Campus as Director. She enjoys spending time with her family: her husband, daughter (Josephine, 4) and her 2 dogs. When she isn\u2019t at school; she is working in the garden with her daughter, cooking wholesome meals, listening to music, or reading books.',
        ],
      },
      {
        name: 'Ms. Whitney Wiles',
        title: 'Director',
        campus: 'Daniel Island Campus',
        image: '/images/staff/whitney-wiles.jpg',
        bio: ['Bio coming soon.'],
      },
      {
        name: 'Mr. Zak',
        title: 'Director',
        campus: 'Mezzo Farm School',
        image: '/images/staff/zak-oberrath.jpg',
        quote:
          'Get action. Do things; be sane; don\u2019t fritter away your time; create, act, take a place wherever you are and be somebody; get action. \u2014 Theodore Roosevelt',
        bio: [
          'My name is Zak Oberrath and I have been living in the Charleston area for over 20 years and teaching Montessori for 17 of those. Trained in lower, upper and secondary Montessori, I started the upper elementary program and the adolescent program at East Cooper Montessori Charter School. Sundrops eagerly wanted to start an adolescent program and in 2017 we began the Mezzo Montessori program which covers grades 7-9.',
          'My beliefs in the importance of connecting with nature and the outdoors, bleeds from my personal life into school. We backpack, camp, ski and explore the world. When I am not at school, I spend time playing volleyball and tennis, strumming the guitar or traveling abroad. Nothing makes me happier than to be exploring a new part of the world and just wandering around.',
          'My philosophy can be summed up by a Theodore Roosevelt quote. "Get action. Do things; be sane; don\u2019t fritter away your time; create, act, take a place wherever you are and be somebody; get action."',
        ],
      },
    ],
  },
  {
    label: 'Special Programs Guides',
    members: [
      {
        name: 'Ms. Emily Bengal',
        title: 'Spanish Teacher / Lower & Upper El',
        image: '/images/staff/placeholder.svg',
      },
      {
        name: 'Mr. Adrian Parra',
        title: 'Art & Design Guide',
        image: '/images/staff/placeholder.svg',
      },
      {
        name: 'Ms. Chandler Marburg',
        title: 'Music Guide',
        image: '/images/staff/placeholder.svg',
      },
    ],
  },
];
