import { z } from 'zod';

export const querySchema = z.object({
  search: z.string().optional().default(''),
  sort: z.string().optional().default('name')
});

export type QueryParams = z.infer<typeof querySchema>;
