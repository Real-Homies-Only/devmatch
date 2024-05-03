import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  {
    params
  }: {
    params: { id: string };
  }
): Promise<NextResponse> {
  const UserSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    userType: z.string()
  });

  type User = z.infer<typeof UserSchema>;

  try {
    console.log("hello " + params.id);
    if (!params.id) {
      throw new Error();
    } else {
      const idString = params.id;

      const userInfo = await prisma.users.findFirst({
        where: {
          id: idString
        }
      });

      if (!userInfo) {
        throw new Error();
      } else {
        const foundUser: User = {
          id: idString,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          userType: userInfo.userType
        };

        UserSchema.parse(foundUser);
        return NextResponse.json({ user: foundUser }, { status: 200 });
      }
    }
  } catch (err) {
    console.error("Error getting profile of user:", err);
    return NextResponse.json({ status: 500 });
  } finally {
    await prisma.$disconnect;
  }
}
