import { NextResponse, NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/utils/firebase";

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { firstName, lastName, email, password, userType } =
      await request.json();

    const auth = getAuth(app);
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await prisma.users.create({
      data: {
        id: user.uid,
        firstName,
        lastName,
        userType,
        isAdmin: false
      }
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error creating user:", err);
    return NextResponse.json({ error: "Error creating user" }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}

export const config = {
  runtime: "edge"
};
