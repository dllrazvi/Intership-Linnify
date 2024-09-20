import { z } from 'zod';

export const employeesQuerySchema = z.object({
  search: z.string().optional().default(''),
  sort: z.union([z.literal('name'), z.literal('-name')]).optional().default('name'),
});

export type EmployeesQuerySchema = z.infer<typeof employeesQuerySchema>;
