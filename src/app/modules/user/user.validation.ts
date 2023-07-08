import { z } from 'zod';
const createZodUserSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    email: z.string().email(),
    password: z.string(),
  }),
});
export { createZodUserSchema };
