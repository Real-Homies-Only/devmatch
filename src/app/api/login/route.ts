import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/utils/firebase";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const FormData = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password should be at least 6 characters")
  });

  try {
    const { email, password } = await request.json();

    const data = {
      email: email,
      password: password
    };
    FormData.parse(data);

    const auth = getAuth(app);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log(user.uid);
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log("Error logging in user:", err);
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 404 }
    );
  }
}
