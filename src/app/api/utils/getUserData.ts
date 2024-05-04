import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/utils/firebase";
import { PrismaClient } from "@prisma/client";
import { getProfilePicture } from "../utils/getProfilePicture";
import { z } from "zod";

const auth = getAuth(app);
const prisma = new PrismaClient();

const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  userType: z.string(),
  isAdmin: z.boolean(),
  profilePicture: z.string()
});

type User = z.infer<typeof UserSchema>;

export async function getUserData(): Promise<{
  loggedIn: boolean;
  user?: User;
}> {
  const authPromise = new Promise<{ loggedIn: boolean; user?: User }>(
    (resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userInfo = await prisma.users.findFirst({
            where: { id: user.uid }
          });
          if (!userInfo) {
            resolve({ loggedIn: false });
          } else {
            const url = await getProfilePicture(userInfo.profilePicture);
            const currentUser: User = {
              id: user.uid,
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              email: "",
              userType: userInfo.userType,
              isAdmin: userInfo.isAdmin,
              profilePicture: url
            };
            if (user.email) {
              currentUser.email = user.email;
            }
            UserSchema.parse(currentUser);
            resolve({ loggedIn: true, user: currentUser });
          }
        } else {
          resolve({ loggedIn: false });
        }
      });
    }
  );

  const authState = await authPromise;
  await prisma.$disconnect;
  return authState;
}
