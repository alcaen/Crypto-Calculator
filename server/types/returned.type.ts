import { z } from 'zod';

export const ReturnShema = z.object({
  name: z.string(),
  price: z.number(),
  monthRet: z.number(),
});

export type TReturn = z.infer<typeof ReturnShema>;
