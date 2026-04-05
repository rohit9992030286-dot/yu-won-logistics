import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  passwordHash: z.string(),
  role: z.enum(['admin', 'booking', 'hub', 'delivery', 'account']),
  partnerCode: z.string().optional(),
  companyCode: z.string().optional(),
  hubCode: z.string().optional(),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;