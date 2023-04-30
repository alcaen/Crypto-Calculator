import { z } from 'zod';
// Types and Schemas used in {monthReturn} route,controller,services or test
// Zod schemas for validation
export const ReturnShema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  monthRet: z.number(),
});

// types for typesafe
export type TReturn = z.infer<typeof ReturnShema>;
