import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword
} from "firebase/auth";
import { app } from "@/utils/firebase";

const auth = getAuth(app);

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

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        return NextResponse.json({ error: error.message }, { status: 404 });
      });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log("Error logging in user:", err);
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 404 }
    );
  }
}
