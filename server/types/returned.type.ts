import { z } from 'zod';

export const ReturnShema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  monthRet: z.number(),
});

export type TReturn = z.infer<typeof ReturnShema>;
