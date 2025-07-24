import { z } from 'zod';

export const employeesQuery = z.object({
  search: z.string().optional().default(''),
  sort: z
    .union([z.literal('name'), z.literal('-name')])
    .optional()
    .default('name')
});

export type EmployeesQuery = z.infer<typeof employeesQuery>;
