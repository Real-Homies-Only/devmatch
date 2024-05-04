import { NextResponse } from "next/server";
import { getUserData } from "../utils/getUserData";

export async function GET(): Promise<NextResponse> {
  try {
    const { loggedIn, user } = await getUserData();

    if (loggedIn) {
      return NextResponse.json({ loggedIn: true, user }, { status: 200 });
    } else {
      return NextResponse.json({ loggedIn: false }, { status: 200 });
    }
  } catch (err) {
    console.error("Error checking authentication state:", err);
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  }
}
