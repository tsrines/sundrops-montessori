export interface Program {
  name: string;
  montessoriName: string;
  slug: string;
  ageRange: string;
  description: string;
  extendedDescription?: string;
  features: string[];
  campuses: string[];
  image: string;
  color: string;
}

export const programs: Program[] = [
  {
    name: 'Infant Care',
    montessoriName: 'Nido',
    slug: 'infant-care',
    ageRange: '6 weeks - 14 months',
    description:
      'The word Nido is Italian for nest. The Nido environment focuses on the basic needs of the infant, a safe bonded relationship between the caregivers and the child, respecting each individual child and the development of the child\u2019s increasing sense of self and independence.',
    extendedDescription:
      'The simplicity and order of our Nido environments allow for safe exploration and discovery of the world around them. Trust is a basic need that must be nurtured in the young child. Our trained caregivers respectfully respond to the needs of each child and when doing so, this builds a relationship between the two and sends the message to the child that he is unconditionally loved and accepted. In our Nido environments we believe in the freedom of movement. You will not find children constrained in contraptions, rather you will see the infant placed on their back exploring the environment around them. They are able to move in a natural way and when they are ready. Our floor beds allow for the mobile infant to wake and move off his bed when ready. Feeding in our Nido environment is done so in a respecting way. The infant that is bottle-fed is held close and given undivided attention while drinking the bottle. The child that is sitting up on his own will sit at a small table, drink from a mini glass and eat off a real plate. Our infants have an outside area where they are able to get out and have fresh air and enjoy the trees and sounds of nature.',
    features: [
      'Safe bonded relationship between caregivers and child',
      'Freedom of movement -- no contraptions',
      'Floor beds for mobile infants',
      'Respectful feeding practices',
      'Outdoor area for fresh air and nature',
      'Simplicity and order for safe exploration',
    ],
    campuses: ['Bridge Campus', 'Daniel Island Campus'],
    image: '/images/programs/infant-care-hero.jpg',
    color: '#E2BE6A',
  },
  {
    name: 'Toddler Programs',
    montessoriName: 'Pee Wee / Wee Casa',
    slug: 'toddler-programs',
    ageRange: '14 - 36 months',
    description:
      'Our Pee Wee (14-24 months) and Wee Casa (24-36 months) classrooms are designed for children ages 14 to 36 months. It is an environment that is set up to entice our little ones to explore in a classroom where everything they need is at their level.',
    extendedDescription:
      'Here your child paints, waters the plants, sweeps with miniature brooms, cleans up spills, and works with materials that develop fine and gross motor coordination and focus and concentration. "Help me to do it by myself". Very young children working toward independence in eating, dressing and toileting are really working toward what they want to do. We take each child as an individual, allowing them to go at his or her own pace, to achieve their independence. Snack is set out for children to serve themselves when they are hungry and tiny pitchers of water with cups so they can pour themselves water when they are thirsty. Everything your child does in his or her environment encourages and fosters independence. Our program is prominent by the way we approach your child with respect. We believe in assisting your child in becoming a self-sufficient member of our community where they have ownership of their environment. At this stage in a child\u2019s life language development is on the cusp of explosion. It is vital that your child is surrounded by rich and stimulating conversation. A 20 month old child, trying to put his shoe on, might be encouraged with "pull, use your muscles and push your foot in while you pull the tabs up." The toddler\u2019s mind absorbs the new vocabulary, which plants the seeds for reading, writing and self-expression later in life. Children at this age need to have a lot of outside time. Our playground is equipped with climbing structures that are developmentally appropriate and offer many gross motor opportunities as well as beautiful trees to shade the play area on our sunny days.',
    features: [
      'Fostering independence in eating, dressing, and toileting',
      'Rich language development environment',
      'Respect for the child',
      'Practical life activities at child\u2019s level',
      'Developmentally appropriate outdoor playground',
      'Self-serve snack and water stations',
    ],
    campuses: ['Bridge Campus', 'Daniel Island Campus', 'Palmetto Campus'],
    image: '/images/programs/toddler-programs-hero.jpg',
    color: '#E8959A',
  },
  {
    name: 'Preschool & Kindergarten',
    montessoriName: 'Casa',
    slug: 'preschool-and-kindergarten',
    ageRange: '3 - 6 years',
    description:
      'At Sundrops preschool & kindergarten programs, also known as the Casa classrooms, children from 3 to 6 years old possess what Dr. Montessori called the absorbent mind. This gives them the ability to absorb all aspects of their culture and environment with very little effort.',
    extendedDescription:
      'The environment has five distinct areas of study: practical life, sensorial materials, language, mathematics and cultural studies. Other subjects such as art, Spanish, biology, botany, zoology and music are presented as extensions of the sensorial and language activities. Children learn about people and cultures, giving them a connection to the global human family. Our teachers follow the child through their experience of the classroom environment. Based on their observations they develop an individualized lesson plan that best suits the child\u2019s interests. This learning process allows the children to have choices regarding their education, fostering confidence and independence. We encourage parents to allow their children to complete the 3 years full cycle in the Montessori Classroom to see fruition of the Montessori Method. First year \u2013 child is adapting to the prepared environment. Lessons will be given to develop skills in concentration, sequencing, attention span, memory skills, auditory and visual discrimination, co-ordination, language and socialization. Second year \u2013 child begins to do more in-depth work with letters, numbers and the writing process. The passageway to abstraction begins to unfold. Third year \u2013 brings fruition from the 1st and 2nd year. Further development of reading and writing skills. The child becomes more confident and conscious of his knowledge and is ready to move on to primary school.',
    features: [
      'Five areas of study: practical life, sensorial, language, math, cultural studies',
      'Art, Spanish, biology, botany, zoology, and music',
      'Individualized lesson plans based on observation',
      '3-year learning cycle for full Montessori fruition',
      'Absorbent mind development',
      'Connection to the global human family',
    ],
    campuses: ['Bridge Campus', 'Daniel Island Campus', 'Palmetto Campus'],
    image: '/images/programs/preschool-hero.jpg',
    color: '#E44B93',
  },
  {
    name: 'Elementary School',
    montessoriName: 'Lower & Upper Elementary',
    slug: 'elementary-school',
    ageRange: '1st - 6th Grade',
    description:
      'The Sundrops Elementary Programs offers a unique and intimate setting that fosters confidence and growth through an authentic Montessori education.',
    extendedDescription:
      'During this stage of development children become conceptual rather than sensorial explorers. They develop a greater understanding of abstraction and imagination. At this time the style of learning moves into research-based work that often occurs in small groups. The teacher\u2019s role is to guide students in a way that enables them to utilize their intrinsic motivation to learn. Elementary teachers use the "Five Great Lessons" as a way to explain grand concepts and the integration of different subjects. The students are drawn to these lessons; sparking their interest in the various disciplines that stem from the specific story. An experiential approach infuses the Montessori curriculum to provide concrete experiences, including frequent outings into the community. Near the end of the three-year cycle, lower elementary students will naturally move toward more abstract work, problem solving and real life application of their learning. This is the foundation of the upper elementary curriculum. The Sundrops elementary curriculum covers many disciplines, such as language, mathematics, science, and history. Studies are also enriched with Spanish, music, art and yoga that are integrated into the school day and through weekly special area classes. Practical life, gardening and handwork are an integral part of each work cycle and help the students learn to care for living things and hone their fine motor skills. The classroom space extends to an outdoor learning environment where students are free to do their work.',
    features: [
      'Five Great Lessons curriculum',
      'Research-based learning in small groups',
      'Experiential approach with community outings',
      'Spanish, music, art, and yoga',
      'Practical life, gardening, and handwork',
      'Outdoor learning environment',
    ],
    campuses: ['Bridge Campus'],
    image: '/images/programs/elementary-hero.jpg',
    color: '#6B5CC5',
  },
  {
    name: 'Middle School',
    montessoriName: 'Mezzo Farm Program',
    slug: 'middle-school',
    ageRange: '7th - 9th Grade',
    description:
      'The Sundrops Adolescent Erdkinder Program addresses the unique needs of the middle schooler. The Erdkinder program is a carefully constructed environment allowing for living on the land and learning self-sufficiency.',
    extendedDescription:
      'The small community of the farm requires all students to play a role, and often to step out of their comfort zone to realize their potential and success on the farm. At a time when the middle school student is most challenged to find their place in the world and learn more about who they are, traditional schools sit them inside at desks to learn in a standardized, test-based method. The Mezzo Farm School Program goes beyond the classroom where each student works to their strengths and learns about their gifts.',
    features: [
      'Bonding/multi-day field study trips (Yellowstone, Keys, Andros Island, etc.)',
      'Teach about being an adolescent',
      'Multiage classrooms (peer mentoring and advanced learning)',
      'Teach soft skills: prioritizing, group work, learning from mistakes',
      'Environment where students are encouraged to be themselves',
      'Outside farm work to develop social appreciation, tool use, and land connection',
      'Classroom small business / financial literacy (e.g. weekly farmers market)',
      'Work based on themes engaging to adolescents',
      'Service work',
      'Respect for family time: no assigned homework',
      'Options for high school credits',
    ],
    campuses: ['Farm Campus'],
    image: '/images/programs/middle-school-hero.jpg',
    color: '#A3C5BC',
  },
];
