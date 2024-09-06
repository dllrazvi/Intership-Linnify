import { ZodErrorMap, defaultErrorMap, z } from 'zod';

export const getValidationMessages: ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === 'undefined' || issue.received === 'null') {
      return { message: 'The field is required.' };
    }
  }

  if (issue.code === z.ZodIssueCode.invalid_date) {
    return { message: 'The field is required.' };
  }

  if (issue.code === z.ZodIssueCode.too_small && issue.type === 'string') {
    return { message: 'The field is required.' };
  }

  return defaultErrorMap(issue, ctx);
};
