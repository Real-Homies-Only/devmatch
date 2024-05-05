import { getAuth, getIdToken } from "firebase/auth";
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
  console.log("Getting user data...");

  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.log("No user logged in");
    await prisma.$disconnect();
    return { loggedIn: false };
  }

  try {
    console.log("Got user data");
    await getIdToken(currentUser, true);
    const userInfo = await prisma.users.findFirst({
      where: { id: currentUser.uid }
    });

    if (!userInfo) {
      await prisma.$disconnect();
      return { loggedIn: false };
    }

    const url = await getProfilePicture(userInfo.profilePicture);
    const userData: User = {
      id: currentUser.uid,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: currentUser.email || "",
      userType: userInfo.userType,
      isAdmin: userInfo.isAdmin,
      profilePicture: url
    };

    UserSchema.parse(userData);
    await prisma.$disconnect();
    return { loggedIn: true, user: userData };
  } catch (error) {
    console.error("Error getting user data:", error);
    await prisma.$disconnect();
    return { loggedIn: false };
  }
}
