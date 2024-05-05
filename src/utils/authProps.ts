import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profilePicture: z.string(),
  userType: z.string(),
  isAdmin: z.boolean()
});

export type User = z.infer<typeof UserSchema>;

export interface Auth {
  user: User;
  logged: boolean;
}
