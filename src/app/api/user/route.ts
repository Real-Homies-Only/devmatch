import { NextResponse } from "next/server";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/utils/firebase";
import { PrismaClient } from "@prisma/client";

const auth = getAuth(app);
const prisma = new PrismaClient();

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export async function GET(): Promise<NextResponse> {
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
              lastName: userInfo.lastName
            };
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

export const config = {
  runtime: "edge"
};
