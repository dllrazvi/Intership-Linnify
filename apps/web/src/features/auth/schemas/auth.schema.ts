import { z } from 'zod';

export const emailAuthSchema = z.object({
  email: z.string().email('Invalid email address')
});

export const emailCodeAuthSchema = z.object({
  email: z.string().email(),
  code: z
    .string({
      required_error: 'Invalid code. Please enter a 4 digit code'
    })
    .length(4, 'Invalid code. Please enter a 4 digit code')
});

export type EmailAuth = z.infer<typeof emailAuthSchema>;
export type EmailCodeAuth = z.infer<typeof emailCodeAuthSchema>;
