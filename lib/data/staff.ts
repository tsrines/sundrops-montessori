export interface StaffMember {
  name: string;
  title: string;
  campus?: string;
  image: string;
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
      },
      {
        name: 'Ms. Lindsay',
        title: 'Office Administrator',
        campus: 'Palmetto Campus',
        image: '/images/staff/lindsay.jpg',
      },
      {
        name: 'Ms. Whitney Wiles',
        title: 'Director',
        campus: 'Daniel Island Campus',
        image: '/images/staff/whitney-wiles.jpg',
      },
      {
        name: 'Mr. Zak',
        title: 'Director',
        campus: 'Mezzo Farm School',
        image: '/images/staff/zak-oberrath.jpg',
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
