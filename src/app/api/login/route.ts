import { NextResponse, NextRequest } from "next/server";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/utils/firebase";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await request.json();

    const auth = getAuth(app);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log(user.uid);
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log("Error creating user:", err);
    return NextResponse.json(
      { error: "Error logging in user" },
      { status: 400 }
    );
  }
}

export const config = {
  runtime: "edge"
};
