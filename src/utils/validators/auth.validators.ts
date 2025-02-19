import { z } from 'zod';

export const userFormSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim().min(6),
});
