export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'enrollment' | 'curriculum' | 'logistics' | 'financial';
}

export const faqs: FaqItem[] = [
  // General
  {
    id: 'what-is-montessori',
    question: 'What is Montessori education?',
    answer:
      "Montessori education is a child-centered approach developed by Dr. Maria Montessori over 100 years ago. It is based on scientific observation of children from birth through adulthood. The method emphasizes hands-on learning, mixed-age classrooms, self-directed activity, and collaborative play. Children make creative choices in their learning while trained guides offer age-appropriate activities to support each child's development.",
    category: 'general',
  },
  {
    id: 'why-mixed-age',
    question: 'Why are Montessori classrooms mixed-age?',
    answer:
      'Mixed-age classrooms mirror real-world social structures and offer unique benefits. Younger children learn from observing and working with older peers, while older children reinforce their knowledge by teaching concepts to younger classmates. This arrangement also develops leadership skills, empathy, and a strong sense of community. Children progress at their own pace without the pressure of grade-level benchmarks.',
    category: 'general',
  },
  {
    id: 'authentic-montessori',
    question: 'Is Sundrops an authentic Montessori school?',
    answer:
      'Yes. Sundrops Montessori is committed to authentic Montessori practice. Our guides hold Montessori credentials from accredited training centers, our classrooms use genuine Montessori materials, and we follow the multi-age groupings and child-led approach that define the method. We continually invest in professional development to ensure fidelity to Montessori principles.',
    category: 'general',
  },
  {
    id: 'difference-from-traditional',
    question: 'How does Montessori differ from traditional education?',
    answer:
      'In traditional education, the teacher directs lessons to the whole class at once. In Montessori, children choose their work from a range of options the guide has introduced. Learning is hands-on with specially designed materials rather than primarily textbook-based. Children work at their own pace and are assessed through observation rather than standardized testing. The focus is on developing the whole child, including social, emotional, and practical life skills alongside academics.',
    category: 'general',
  },
  // Curriculum
  {
    id: 'curriculum-areas',
    question: 'What subjects are covered in the Montessori curriculum?',
    answer:
      'The Montessori curriculum covers five core areas: Practical Life (daily living skills that build independence and coordination), Sensorial (refining the senses through specially designed materials), Language (reading, writing, grammar, and oral expression), Mathematics (concrete to abstract progression using hands-on materials), and Cultural Studies (geography, science, history, art, and music). Spanish is also introduced in our Casa classrooms.',
    category: 'curriculum',
  },
  {
    id: 'academic-readiness',
    question: 'Will my child be academically prepared for traditional school?',
    answer:
      'Montessori children consistently perform well when transitioning to traditional school settings. Research shows Montessori students often exceed grade-level expectations in reading, math, and executive function skills. More importantly, they develop strong self-discipline, a genuine love of learning, and the ability to work independently - skills that serve them well regardless of their future educational path.',
    category: 'curriculum',
  },
  {
    id: 'mezzo-program',
    question: 'What makes the Mezzo middle school program unique?',
    answer:
      'Mezzo is our farm-based adolescent program located in Huger, SC. Rooted in Montessori philosophy for adolescents, the program combines rigorous academics with real-world application through sustainable agriculture, entrepreneurship, and community living. Students develop practical skills, environmental stewardship, and personal responsibility in a setting designed specifically for the unique developmental needs of adolescents.',
    category: 'curriculum',
  },
  {
    id: 'homework',
    question: 'Is homework assigned in Montessori?',
    answer:
      'In the early years (Casa and below), we generally do not assign homework. Children work deeply during the school day, and evening time is best spent with family, in nature, and pursuing personal interests. In elementary and middle school, students may have research projects, reading assignments, or follow-up work that extends their classroom learning, but the volume is intentionally moderate and meaningful.',
    category: 'curriculum',
  },
  // Enrollment
  {
    id: 'enrollment-process',
    question: 'What is the enrollment process?',
    answer:
      "Our enrollment process begins with a campus tour, which we recommend as the best way to experience Sundrops firsthand. Tours are held on the first Tuesday of each month or by appointment. After your tour, you can submit an application online. Applications are reviewed by our admissions team, and families are invited for an interview. Acceptance decisions are communicated within two weeks. A non-refundable registration fee secures your child's spot.",
    category: 'enrollment',
  },
  {
    id: 'age-requirements',
    question: 'What are the age requirements for each program?',
    answer:
      'Our Nido (infant) program accepts children from 6 weeks to 14 months. Toddler programs (Pee Wee and Wee Casa) serve children 14 to 36 months. Casa (preschool and kindergarten) enrolls children ages 3 to 6. Elementary is for 1st through 6th graders, and our Mezzo middle school program serves 7th through 9th grade students. Children must meet the age requirement by September 1 of the enrollment year.',
    category: 'enrollment',
  },
  {
    id: 'mid-year-enrollment',
    question: 'Can my child enroll mid-year?',
    answer:
      'Yes, we accept mid-year enrollment when space is available. New students benefit from a gradual introduction process where they spend increasing amounts of time in the classroom over the first week or two. This helps them acclimate to the Montessori environment and build relationships with their guides and classmates comfortably.',
    category: 'enrollment',
  },
  {
    id: 'toilet-training',
    question: 'Does my child need to be toilet trained for the Casa program?',
    answer:
      "Children do not need to be fully toilet trained to begin the Casa program. Our guides support toilet learning as a practical life skill, working in partnership with families. We ask that children are in the process of learning and that families provide extra clothing. The Montessori approach to toilet learning emphasizes the child's readiness and independence rather than arbitrary timelines.",
    category: 'enrollment',
  },
  // Logistics
  {
    id: 'school-hours',
    question: 'What are the school hours?',
    answer:
      'Our campuses are open Monday through Friday, 7:00 AM to 6:00 PM. The core Montessori work period is from 8:30 AM to 12:00 PM for Casa students and 8:30 AM to 3:00 PM for elementary students. Extended care before and after the core hours is available for enrolled families. We ask that all children arrive by 8:30 AM to participate fully in the morning work cycle.',
    category: 'logistics',
  },
  {
    id: 'meals-snacks',
    question: 'Are meals and snacks provided?',
    answer:
      'We provide a healthy morning snack and afternoon snack daily. Families pack lunch for their children. We encourage nutritious, whole-food lunches and are a nut-aware school. In the Montessori tradition, mealtimes are part of the curriculum - children serve themselves, set the table, and clean up, developing independence and practical life skills.',
    category: 'logistics',
  },
  {
    id: 'discipline-approach',
    question: 'How does Sundrops handle discipline?',
    answer:
      'We follow a positive, respectful approach to discipline grounded in Montessori philosophy. The prepared environment is designed to minimize behavioral issues by engaging children in meaningful work. When conflicts arise, guides help children develop problem-solving and communication skills. We use peace education techniques, including the Peace Table, where children learn to express their feelings and resolve disagreements respectfully. Physical punishment is never used.',
    category: 'logistics',
  },
  {
    id: 'summer-programs',
    question: 'Do you offer summer programs?',
    answer:
      'Yes, we offer summer camp sessions at our Bridge Campus for children ages 3-9. Camp runs in two-week sessions from mid-June through early August. Each session features a unique theme with hands-on activities including art, science, nature exploration, water play, cooking, and outdoor adventures. Summer camp is open to both current Sundrops families and the broader community.',
    category: 'logistics',
  },
  {
    id: 'campus-selection',
    question: 'How do I choose which campus is right for my family?',
    answer:
      "Campus selection often depends on location, the age of your child, and which programs are offered. Bridge Campus is our most comprehensive, offering infant through elementary. Daniel Island Campus serves infants through kindergarten. Palmetto Campus offers toddler and preschool programs in downtown Charleston. We recommend touring the campus closest to you and discussing your child's needs with our admissions team.",
    category: 'logistics',
  },
  // Financial
  {
    id: 'tuition-info',
    question: 'What is the tuition for Sundrops programs?',
    answer:
      'Tuition varies by program and schedule. We offer full-day and half-day options for most programs. Current tuition rates are available upon request during your campus tour or by contacting our admissions office. We believe in transparency and are happy to discuss all costs, including registration fees, materials fees, and any additional program charges.',
    category: 'financial',
  },
  {
    id: 'financial-assistance',
    question: 'Is financial assistance available?',
    answer:
      'We are committed to making Montessori education accessible to families from all backgrounds. Limited financial assistance is available based on demonstrated need. Families may apply for tuition assistance during the enrollment process. We also accept the SC First Steps 4K program vouchers for eligible four-year-olds. Please contact our admissions office to learn more about your options.',
    category: 'financial',
  },
  {
    id: 'sibling-discount',
    question: 'Is there a sibling discount?',
    answer:
      "Yes, we offer a tuition discount for families enrolling more than one child. The discount is applied to the younger sibling's tuition. Details are available from our admissions team and are outlined in the enrollment agreement.",
    category: 'financial',
  },
  {
    id: 'payment-options',
    question: 'What payment options are available?',
    answer:
      'Tuition can be paid annually, semi-annually, or monthly. Annual and semi-annual payments receive a small discount. Monthly payments are due on the first of each month. We accept checks, ACH transfers, and credit cards. A non-refundable registration fee and materials fee are due upon enrollment acceptance.',
    category: 'financial',
  },
];
