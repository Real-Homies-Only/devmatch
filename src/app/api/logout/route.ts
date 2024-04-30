import { NextResponse } from "next/server";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/utils/firebase";

export async function GET(): Promise<NextResponse> {
  try {
    const auth = getAuth(app);

    // Sign out the user
    await signOut(auth);

    // Return a success response
    return NextResponse.json(
      { message: "Signed out successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error signing out:", err);
    return NextResponse.json({ error: "Error signing out" }, { status: 500 });
  }
}

export const config = {
  runtime: "edge"
};
