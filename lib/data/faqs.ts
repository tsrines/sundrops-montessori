export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general';
}

export const faqs: FaqItem[] = [
  {
    id: 'what-is-montessori',
    question: 'What is a Montessori School?',
    answer:
      'Montessori is a unique method of teaching developed more than 100 years ago by Italian born physician, educator and peace advocate, Dr. Maria Montessori. The Montessori teaching method uses hands-on, self-correcting materials in a thoughtfully prepared environment that encourages responsibility, independence and confidence. It is an approach that values the human spirit and the development of the whole child \u2013 physical, social, emotional and cognitive. Students are focused due to their desire to learn. They work in multi-age classrooms at their own pace, guided by the teacher, until they master their work. In this environment, learning is an exciting process of self-discovery. Children are fully engaged in work that matters to them. They are given freedom with responsibility \u2013 they are trusted and respected. Montessori is the spark that ignites a lifelong love of learning. Some basic premises of the Montessori approach to teaching and learning include: children have a natural tendency to learn by active participation; children are capable of self-directed learning; children learn in a distinctly different way from adults; children are masters of a classroom environment that has been specifically prepared for them to be academic, comfortable, and to allow a maximum amount of independence; children learn through discovery, so instructional materials that are self-correcting are used as much as possible.',
    category: 'general',
  },
  {
    id: 'difference-from-traditional',
    question: 'What is the difference between a Montessori and a Traditional School?',
    answer:
      'Montessori represents an entirely different approach to education where emphasis is placed on all five senses, not just listening, watching or reading. Children in Montessori classes learn at their own individual pace and according to their own choice of activities from hundreds of possibilities. Learning is an exciting process of discovery leading to concentration, motivation, self-discipline, and a lifelong love of learning. Montessori classes place children in three-year age groups (3-6, 6-9, 9-12, etc.), forming communities in which the older children spontaneously share their knowledge with the younger children. In a traditional approach there is emphasis on rote knowledge, the teacher\u2019s role is dominant and active with the child as a passive participant, same age grouping, most teaching done by teacher with collaboration discouraged, and curriculum structured with little regard for child\u2019s interests. In a Montessori approach there is emphasis on cognitive structures and social development, the teacher\u2019s role is unobtrusive with the child actively participating in learning, mixed age grouping, children encouraged to teach, collaborate and help each other, and the child chooses own work from interests and abilities.',
    category: 'general',
  },
  {
    id: 'successful-later-in-life',
    question: 'Are Montessori Children successful later in life?',
    answer:
      'Research studies show that Montessori children are well prepared academically, socially and emotionally for later in life. In addition to scoring well on standardized tests, Montessori children are ranked above average on such criteria as following directions, turning in work on time, listening attentively, using basic skills, showing responsibility, asking provocative questions, showing enthusiasm for learning and adapting to new situations. There have been many famous people who have had a Montessori education. Just a few listed here: Larry Page and Sergey Brin \u2013 Founders of Google, Jeff Bezos \u2013 Founder of Amazon, Jacqueline Bouvier Kennedy Onassis \u2013 former First Lady, Sean \u2018P. Diddy\u2019 Combs \u2013 Singer, Prince Harry and Prince William.',
    category: 'general',
  },
  {
    id: 'where-did-montessori-come-from',
    question: 'Where did Montessori Schools come from?',
    answer:
      'Montessori education was founded in 1907 by Dr. Maria Montessori, the first female physician in Italy. She based her educational methods on scientific observation of children\u2019s learning processes. Guided by her discovery that children are born with the ability to teach themselves, Dr. Montessori designed a "prepared environment" in which children could freely choose from a number of developmentally appropriate activities. Now, a century after Dr. Montessori\u2019s first Casa dei Bambini ("Children\u2019s House") in Rome, Montessori education is offered worldwide, spanning ages from birth to adolescence.',
    category: 'general',
  },
  {
    id: 'why-3-year-program',
    question: 'Why a 3-year Montessori School Program?',
    answer:
      'Dr. Montessori identified four "planes of development," with each stage having its own developmental characteristics and challenges. The Early Childhood Montessori environment for children ages three to six is designed to work with the "absorbent mind," their "sensitive periods" and the tendencies of children at this stage of their development. The years from 3-6 are one phase of growth, with physical, intellectual and psychological characteristics common to that whole period. Learning that takes place during these years comes spontaneously without effort, leading children to enter the elementary years with a clear, concrete sense of many abstract concepts. This process seems to necessitate an educational approach with an extended time frame within which the individual child has room to grow at his/her own pace. In accord with this thinking, a Montessori school program, including the developmental learning aids and the work activities which go with it, is sequential and meant to be experienced over a three-year time span and not in individual, successive, one-year capsules. The 3-year cycle also relates to Montessori\u2019s valuable concept of age-mixed and ungraded classes. The hope is really that the younger children might learn from older ones who, in turn, have come up from "the ranks" and are well on their way to being self-directed. The 3 year cycle ensures completion of the work necessary to the development of the whole child at that particular age. To receive the full benefits of a Montessori education, a child who enrolls should remain in the program for 3 years or more.',
    category: 'general',
  },
  {
    id: 'montessori-at-home',
    question: 'Can I use Montessori principles at home with my child?',
    answer:
      'Yes. Look at your home through your child\u2019s eyes. Children need a sense of belonging and they acquire that sense by participating fully in the routines of everyday life. "Help me do it by myself" is the life theme of the preschooler. Find ways for your child to participate in meal preparation, cleaning, gardening, and caring for clothes, shoes and toys. Providing opportunities for independence is the surest way to build your child\u2019s self-esteem. Many parents use the Montessori philosophy with their children by following the children\u2019s interest and not interrupting concentration. In school, only a trained Montessori teacher can properly implement Montessori education using the specialized learning equipment of the Montessori "prepared environment." In a Montessori school, social development comes from being in a positive and unique environment with other children which is an integral part of Montessori education.',
    category: 'general',
  },
];
