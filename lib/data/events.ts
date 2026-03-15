export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: 'tour' | 'holiday' | 'event' | 'conference' | 'teacher-workday' | 'summer-camp';
  description: string;
  campus?: string;
}

export const schoolEvents: SchoolEvent[] = [
  // August 2025
  {
    id: 'teacher-workday-aug-2025',
    title: 'Teacher Work Days',
    date: '2025-08-11',
    endDate: '2025-08-15',
    type: 'teacher-workday',
    description: 'Staff preparation and professional development before the start of the school year.',
  },
  {
    id: 'back-to-school-2025',
    title: 'First Day of School',
    date: '2025-08-18',
    type: 'event',
    description:
      "Welcome back! The 2025-2026 school year begins. Staggered entry schedules will be shared by your child's guide.",
  },
  // September 2025
  {
    id: 'tour-sep-2025',
    title: 'Monthly Campus Tour',
    date: '2025-09-02',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. See Montessori classrooms in action and meet our guides. RSVP required.',
  },
  {
    id: 'labor-day-2025',
    title: 'Labor Day - School Closed',
    date: '2025-09-01',
    type: 'holiday',
    description: 'School closed in observance of Labor Day.',
  },
  {
    id: 'grandparents-day-2025',
    title: 'Grandparents Day Celebration',
    date: '2025-09-12',
    type: 'event',
    description:
      "A special morning inviting grandparents and special friends to visit classrooms and share in their grandchild's Montessori experience.",
  },
  // October 2025
  {
    id: 'tour-oct-2025',
    title: 'Monthly Campus Tour',
    date: '2025-10-07',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. See Montessori classrooms in action and meet our guides. RSVP required.',
  },
  {
    id: 'book-fair-2025',
    title: 'Book Fair',
    date: '2025-10-06',
    endDate: '2025-10-10',
    type: 'event',
    description:
      "Our annual book fair featuring a curated selection of children's literature. All proceeds support classroom libraries.",
  },
  {
    id: 'teacher-workday-oct-2025',
    title: 'Teacher Work Day - No School',
    date: '2025-10-17',
    type: 'teacher-workday',
    description: 'No school for students. Staff professional development day.',
  },
  {
    id: 'harvest-festival-2025',
    title: 'Harvest Festival',
    date: '2025-10-31',
    type: 'event',
    description:
      'A fall celebration for the whole family with games, crafts, local food, and community fun. All campuses participate.',
  },
  // November 2025
  {
    id: 'tour-nov-2025',
    title: 'Monthly Campus Tour',
    date: '2025-11-04',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. See Montessori classrooms in action and meet our guides. RSVP required.',
  },
  {
    id: 'parent-conferences-fall-2025',
    title: 'Fall Parent-Teacher Conferences',
    date: '2025-11-10',
    endDate: '2025-11-14',
    type: 'conference',
    description:
      "Schedule a one-on-one conference with your child's guide to discuss progress, goals, and development. Sign-up sheets available in your classroom.",
  },
  {
    id: 'thanksgiving-break-2025',
    title: 'Thanksgiving Break - School Closed',
    date: '2025-11-24',
    endDate: '2025-11-28',
    type: 'holiday',
    description: 'School closed for Thanksgiving break. Wishing all families a wonderful holiday.',
  },
  // December 2025
  {
    id: 'tour-dec-2025',
    title: 'Monthly Campus Tour',
    date: '2025-12-02',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. See Montessori classrooms in action and meet our guides. RSVP required.',
  },
  {
    id: 'winter-program-2025',
    title: 'Winter Music Program',
    date: '2025-12-12',
    type: 'event',
    description:
      'Students share songs and performances celebrating the winter season. Families are warmly invited to attend.',
  },
  {
    id: 'winter-break-2025',
    title: 'Winter Break - School Closed',
    date: '2025-12-22',
    endDate: '2026-01-02',
    type: 'holiday',
    description: 'School closed for winter break. Classes resume January 5, 2026.',
  },
  // January 2026
  {
    id: 'school-resumes-jan-2026',
    title: 'School Resumes',
    date: '2026-01-05',
    type: 'event',
    description: 'Welcome back from winter break. Regular schedule resumes.',
  },
  {
    id: 'tour-jan-2026',
    title: 'Monthly Campus Tour',
    date: '2026-01-06',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. See Montessori classrooms in action and meet our guides. RSVP required.',
  },
  {
    id: 'mlk-day-2026',
    title: 'Martin Luther King Jr. Day - School Closed',
    date: '2026-01-19',
    type: 'holiday',
    description: 'School closed in observance of Martin Luther King Jr. Day.',
  },
  // February 2026
  {
    id: 'tour-feb-2026',
    title: 'Monthly Campus Tour',
    date: '2026-02-03',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. See Montessori classrooms in action and meet our guides. RSVP required.',
  },
  {
    id: 'presidents-day-2026',
    title: 'Presidents Day - School Closed',
    date: '2026-02-16',
    type: 'holiday',
    description: 'School closed in observance of Presidents Day.',
  },
  {
    id: 'peace-day-2026',
    title: 'International Peace Day Celebration',
    date: '2026-02-20',
    type: 'event',
    description:
      'Students lead activities and presentations about peace, kindness, and global awareness - core tenets of Montessori philosophy.',
  },
  // March 2026
  {
    id: 'tour-mar-2026',
    title: 'Monthly Campus Tour',
    date: '2026-03-03',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. See Montessori classrooms in action and meet our guides. RSVP required.',
  },
  {
    id: 'parent-conferences-spring-2026',
    title: 'Spring Parent-Teacher Conferences',
    date: '2026-03-16',
    endDate: '2026-03-20',
    type: 'conference',
    description:
      "Schedule a one-on-one conference with your child's guide to review progress and set goals for the final quarter.",
  },
  {
    id: 'spring-break-2026',
    title: 'Spring Break - School Closed',
    date: '2026-03-30',
    endDate: '2026-04-03',
    type: 'holiday',
    description: 'School closed for spring break. Classes resume April 6, 2026.',
  },
  // April 2026
  {
    id: 'school-resumes-apr-2026',
    title: 'School Resumes',
    date: '2026-04-06',
    type: 'event',
    description: 'Welcome back from spring break. Regular schedule resumes.',
  },
  {
    id: 'tour-apr-2026',
    title: 'Monthly Campus Tour',
    date: '2026-04-07',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. See Montessori classrooms in action and meet our guides. RSVP required.',
  },
  {
    id: 'earth-day-2026',
    title: 'Earth Day Celebration',
    date: '2026-04-22',
    type: 'event',
    description:
      'A school-wide celebration of our planet with nature walks, planting activities, recycling projects, and environmental education.',
  },
  {
    id: 'teacher-workday-apr-2026',
    title: 'Teacher Work Day - No School',
    date: '2026-04-24',
    type: 'teacher-workday',
    description: 'No school for students. Staff professional development day.',
  },
  // May 2026
  {
    id: 'tour-may-2026',
    title: 'Monthly Campus Tour',
    date: '2026-05-05',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. See Montessori classrooms in action and meet our guides. RSVP required.',
  },
  {
    id: 'mothers-day-tea-2026',
    title: "Mother's Day Tea",
    date: '2026-05-08',
    type: 'event',
    description:
      'A heartfelt celebration prepared by the children to honor mothers and mother figures. Students serve refreshments and share handmade gifts.',
  },
  {
    id: 'memorial-day-2026',
    title: 'Memorial Day - School Closed',
    date: '2026-05-25',
    type: 'holiday',
    description: 'School closed in observance of Memorial Day.',
  },
  {
    id: 'graduation-2026',
    title: 'Graduation Ceremony',
    date: '2026-05-22',
    type: 'event',
    description:
      'Celebrating our Casa graduates moving to elementary and our 6th graders transitioning to middle school. A joyful milestone for students and families.',
  },
  // June 2026
  {
    id: 'tour-jun-2026',
    title: 'Monthly Campus Tour',
    date: '2026-06-02',
    type: 'tour',
    description:
      'Join us for a guided tour of our campuses. Explore our summer programs and learn about enrollment for the next school year. RSVP required.',
  },
  {
    id: 'last-day-2026',
    title: 'Last Day of School',
    date: '2026-06-05',
    type: 'event',
    description: 'The final day of the 2025-2026 school year. Early dismissal at 12:00 PM. Summer camp begins June 15.',
  },
  {
    id: 'teacher-workday-jun-2026',
    title: 'Teacher Work Days',
    date: '2026-06-08',
    endDate: '2026-06-12',
    type: 'teacher-workday',
    description: 'Staff end-of-year wrap-up, classroom preparation for summer, and professional development.',
  },
  {
    id: 'summer-camp-session-1',
    title: 'Summer Camp - Session 1',
    date: '2026-06-15',
    endDate: '2026-06-26',
    type: 'summer-camp',
    description:
      'Two weeks of themed, hands-on summer fun for ages 3-9. Activities include art, nature exploration, water play, cooking, and more.',
    campus: 'Bridge Campus',
  },
  {
    id: 'summer-camp-session-2',
    title: 'Summer Camp - Session 2',
    date: '2026-06-29',
    endDate: '2026-07-10',
    type: 'summer-camp',
    description:
      'Two weeks of themed, hands-on summer fun for ages 3-9. Activities include science experiments, gardening, creative arts, and outdoor adventures.',
    campus: 'Bridge Campus',
  },
  // July 2026
  {
    id: 'independence-day-2026',
    title: 'Independence Day - No Camp',
    date: '2026-07-03',
    type: 'holiday',
    description: 'Summer camp closed in observance of Independence Day.',
  },
  {
    id: 'summer-camp-session-3',
    title: 'Summer Camp - Session 3',
    date: '2026-07-13',
    endDate: '2026-07-24',
    type: 'summer-camp',
    description:
      'Two weeks of themed, hands-on summer fun for ages 3-9. Activities include music, drama, sports, coding basics, and nature journaling.',
    campus: 'Bridge Campus',
  },
  {
    id: 'summer-camp-session-4',
    title: 'Summer Camp - Session 4',
    date: '2026-07-27',
    endDate: '2026-08-07',
    type: 'summer-camp',
    description:
      'The final session of summer camp for ages 3-9. Activities include community projects, art exhibitions, water play, and preparation for the new school year.',
    campus: 'Bridge Campus',
  },
];
