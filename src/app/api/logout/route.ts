import { NextResponse } from "next/server";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/utils/firebase";

export async function GET(): Promise<NextResponse> {
  try {
    const auth = getAuth(app);

    await signOut(auth);

    return NextResponse.json(
      { message: "Signed out successfully" },
      { status: 202 }
    );
  } catch (err) {
    console.error("Error signing out:", err);
    return NextResponse.json({ error: "Error signing out" }, { status: 500 });
  }
}
