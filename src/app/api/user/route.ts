import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/utils/firebase";
import { PrismaClient } from "@prisma/client";

const auth = getAuth(app);
const prisma = new PrismaClient();

export async function GET(): Promise<NextResponse> {
  const UserSchema = z.object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    userType: z.string(),
    isAdmin: z.boolean()
  });

  type User = z.infer<typeof UserSchema>;

  try {
    const authPromise = new Promise<{
      loggedIn: boolean;
      user?: { id: string };
    }>((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userInfo = await prisma.users.findFirst({
            where: {
              id: user.uid
            }
          });
          if (!userInfo) {
            resolve({ loggedIn: false });
          } else {
            const currentUser: User = {
              id: user.uid,
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              email: "",
              userType: userInfo.userType,
              isAdmin: userInfo.isAdmin
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
    });

    const authState = await authPromise;

    if (authState.loggedIn) {
      return NextResponse.json(
        { loggedIn: true, user: authState.user },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ loggedIn: false }, { status: 200 });
    }
  } catch (err) {
    console.error("Error checking authentication state:", err);
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
}
