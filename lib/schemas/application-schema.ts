import { z } from 'zod';

export const applicationSchema = z
  .object({
    // Child Information
    childFirstName: z.string().min(1, "Child's first name is required"),
    childLastName: z.string().min(1, "Child's last name is required"),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    gender: z.string().optional(),
    address: z.string().min(1, 'Address is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(5, 'Please enter a valid zip code'),
    desiredStartDate: z.string().min(1, 'Desired start date is required'),
    previousSchool: z.string().optional(),
    siblings: z.string().optional(),
    siblingsAges: z.string().optional(),

    // Parent/Guardian 1
    parent1FirstName: z.string().min(1, 'First name is required'),
    parent1LastName: z.string().min(1, 'Last name is required'),
    parent1Phone: z.string().min(10, 'Please enter a valid phone number'),
    parent1Employer: z.string().optional(),
    parent1Position: z.string().optional(),
    parent1WorkPhone: z.string().optional(),

    // Parent/Guardian 2
    parent2FirstName: z.string().optional(),
    parent2LastName: z.string().optional(),
    parent2Phone: z.string().optional(),
    parent2Employer: z.string().optional(),
    parent2Position: z.string().optional(),
    parent2WorkPhone: z.string().optional(),

    // Contact
    email1: z.string().email('Please enter a valid email address'),
    email2: z.string().email('Please enter a valid email address').or(z.literal('')).optional(),

    // Selections
    campus: z.string().min(1, 'Please select a campus'),
    program: z.string().min(1, 'Please select a program'),
    session: z.string().min(1, 'Please select a session type'),
  })
  .superRefine((data, ctx) => {
    // Nido is not available at Farm Campus
    if (data.campus === 'farm' && data.program === 'nido') {
      ctx.addIssue({
        code: 'custom',
        message: 'Infant Care (Nido) is not available at the Farm Campus',
        path: ['program'],
      });
    }

    // Elementary is only available at Bridge
    if (data.campus && data.campus !== 'bridge' && data.program === 'elementary') {
      ctx.addIssue({
        code: 'custom',
        message: 'Elementary School is only available at the Bridge Campus',
        path: ['program'],
      });
    }

    // Mezzo is only available at Farm Campus
    if (data.campus && data.campus !== 'farm' && data.program === 'mezzo') {
      ctx.addIssue({
        code: 'custom',
        message: 'Middle School (Mezzo) is only available at the Farm Campus',
        path: ['program'],
      });
    }

    // Half Day is only available for Pee Wee/Wee Casa and Casa
    if (data.session === 'half-day' && data.program !== 'pee-wee-wee-casa' && data.program !== 'casa') {
      ctx.addIssue({
        code: 'custom',
        message: 'Half Day is only available for Toddler and Preschool programs',
        path: ['session'],
      });
    }
  });

export type ApplicationValues = z.infer<typeof applicationSchema>;
