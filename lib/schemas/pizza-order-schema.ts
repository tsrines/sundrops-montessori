import { z } from 'zod';

export const pizzaOrderSchema = z.object({
  childFirstName: z.string().min(1, "Child's first name is required"),
  childLastName: z.string().min(1, "Child's last name is required"),
  classRoom: z.string().min(1, 'Please select a classroom'),
  dates: z.array(z.string()).min(1, 'Please select at least one Friday'),
  sliceCount: z.enum(['1', '2'], { error: 'Please select a slice count' }),
});

export type PizzaOrderValues = z.infer<typeof pizzaOrderSchema>;
