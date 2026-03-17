export const CLASSROOMS = [
  'NIDO',
  'PEE WEE CASA 1',
  'PEE WEE CASA 2',
  'WEE CASA 1',
  'WEE CASA 2',
  'CASA 1',
  'CASA 2',
  'CASA 3',
  'CASA 4',
  'CASA 5',
  'LOWER ELEMENTARY',
  'UPPER ELEMENTARY',
  'ADOLESCENT',
] as const;

export const SLICE_OPTIONS = [
  { value: '1', label: '1 slice', price: '$4' },
  { value: '2', label: '2 slices', price: '$6' },
] as const;

export const PIZZA_FRIDAYS_CONTENT = {
  hero: {
    eyebrow: 'Sundrops Fun',
    title: 'Pizza Fridays!',
    image: '/images/pizza-fridays/sundrops-elem.jpg',
  },
  pizzaImage: '/images/pizza-fridays/pizza-dals.jpg',
  details: {
    heading: 'Pizza Fridays!',
    pricing: {
      oneSlice: '1 slice ~ $4',
      twoSlices: '2 slices ~ $6',
    },
    description:
      "Sundrops Upper Elementary students run a pizza business as a fundraiser. We are offering Cheese Pizza on Fridays (from D'Allesandro's).",
    donationPolicy:
      'Since pizza will be ordered ahead of time, your $4 or $6 will become a donation to the Upper Elementary program if your child has an unplanned absence on pizza day.',
    multiChildNote: 'If you have more than 1 child, please complete 1 form per child.',
    contact: {
      text: 'Please contact Ms. Rissa DeSpain at',
      email: 'rissa@sundropsmontessori.com',
      suffix: 'with any questions or concerns.',
    },
    thankYou: 'Thank you for your continued support of Sundrops Montessori School!',
  },
} as const;
