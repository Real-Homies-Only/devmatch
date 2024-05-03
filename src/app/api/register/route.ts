import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/utils/firebase";

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const FormData = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Password should be at least 6 characters"),
    userType: z.string()
  });

  try {
    const { firstName, lastName, email, password, userType } =
      await request.json();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userType: userType
    };
    FormData.parse(data);

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
    return NextResponse.json({ error: "Error creating user" }, { status: 406 });
  } finally {
    await prisma.$disconnect();
  }
}
