import type { accountSchema, sessionSchema, userSchema } from 'better-auth';
import type { z } from 'zod/v4';

export type Account = z.infer<typeof accountSchema>;

export type User = z.infer<typeof userSchema>;

export type Session = z.infer<typeof sessionSchema>;

export type UserSession = {
  user: User;
  session: Session;
};
