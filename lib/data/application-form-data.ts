export const APPLICATION_CAMPUSES = [
  { value: 'bridge', label: 'Bridge Campus', address: '955 Houston Northcutt Blvd, Mt Pleasant, SC 29464' },
  { value: 'daniel-island', label: 'Daniel Island Campus', address: '2391 Clements Ferry Rd, Charleston, SC 29492' },
  { value: 'palmetto', label: 'Palmetto Campus', address: '88 Simons St, Charleston, SC 29403' },
  { value: 'farm', label: 'Farm Campus', address: '1515 Charity Church Rd, Huger, SC 29450' },
] as const;

export const APPLICATION_PROGRAMS = [
  {
    value: 'nido',
    label: 'Infant Care (Nido)',
    ageRange: '6 weeks - 14 months',
    availableAt: ['bridge', 'daniel-island'],
  },
  {
    value: 'pee-wee-wee-casa',
    label: 'Toddler (Pee Wee / Wee Casa)',
    ageRange: '14 - 36 months',
    availableAt: ['bridge', 'daniel-island', 'palmetto'],
  },
  {
    value: 'casa',
    label: 'Preschool & Kindergarten (Casa)',
    ageRange: '3 - 6 years',
    availableAt: ['bridge', 'daniel-island', 'palmetto'],
  },
  {
    value: 'elementary',
    label: 'Elementary School',
    ageRange: '1st - 6th Grade',
    availableAt: ['bridge'],
  },
  {
    value: 'mezzo',
    label: 'Middle School (Mezzo)',
    ageRange: '7th - 9th Grade',
    availableAt: ['farm'],
  },
] as const;

export const APPLICATION_SESSIONS = [
  {
    value: 'half-day',
    label: 'Half Day',
    hours: '7:30 AM - 12:00 PM',
    availableFor: ['pee-wee-wee-casa', 'casa'],
  },
  {
    value: 'school-day',
    label: 'School Day',
    hours: '8:15 AM - 3:00 PM',
    availableFor: ['nido', 'pee-wee-wee-casa', 'casa', 'elementary', 'mezzo'],
  },
  {
    value: 'full-day',
    label: 'Full Day',
    hours: '7:30 AM - 5:30 PM',
    availableFor: ['nido', 'pee-wee-wee-casa', 'casa', 'elementary', 'mezzo'],
  },
] as const;

export function getAvailablePrograms(campus: string) {
  if (!campus) return [...APPLICATION_PROGRAMS];
  return APPLICATION_PROGRAMS.filter((p) => (p.availableAt as readonly string[]).includes(campus));
}

export function getAvailableSessions(program: string) {
  if (!program) return [...APPLICATION_SESSIONS];
  return APPLICATION_SESSIONS.filter((s) => (s.availableFor as readonly string[]).includes(program));
}
