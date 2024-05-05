import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";

const bucketName = process.env.BUCKET_NAME || "";
const bucketRegion = process.env.BUCKET_REGION || "";
const accessKey = process.env.AWS_ACCESS_KEY || "";
const secretKey = process.env.AWS_SECRET_KEY || "";

const bucket: S3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    secretAccessKey: secretKey,
    accessKeyId: accessKey
  }
});

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const photo: any = formData.get("photo");

    if (photo === null) {
      return NextResponse.json({ error: "No photo provided" }, { status: 400 });
    } else if (photo instanceof File) {
      const photoBuffer = await photo.arrayBuffer();

      const resizedBuffer = await sharp(Buffer.from(photoBuffer))
        .resize(480, 480, { fit: "cover", position: "center" })
        .png()
        .toBuffer();

      const randomKey = crypto.randomBytes(32).toString("hex");
      const bucketParams = {
        Bucket: bucketName,
        Key: `${params.id}_${randomKey}`,
        Body: resizedBuffer,
        ContentType: "image/png"
      };

      await prisma.users.update({
        where: {
          id: params.id
        },
        data: {
          profilePicture: `${params.id}_${randomKey}`
        }
      });

      await prisma.$disconnect;

      const uploadToBucket = new PutObjectCommand(bucketParams);
      bucket.send(uploadToBucket);

      return NextResponse.json(
        {
          headers: {
            Location: "/api/user"
          }
        },
        { status: 200 }
      );
    } else if (photo instanceof Blob) {
      const photoFile = new File([photo], "photo.jpg", { type: photo.type });
      const photoBuffer = await photoFile.arrayBuffer();

      const resizedBuffer = await sharp(Buffer.from(photoBuffer))
        .resize(480, 480, { fit: "cover", position: "center" })
        .png()
        .toBuffer();

      const randomKey = crypto.randomBytes(32).toString("hex");
      const bucketParams = {
        Bucket: bucketName,
        Key: `${params.id}_${randomKey}`,
        Body: resizedBuffer,
        ContentType: "image/png"
      };

      const uploadToBucket = new PutObjectCommand(bucketParams);
      bucket.send(uploadToBucket);

      await prisma.$disconnect;

      return NextResponse.json(
        { status: 202 },
        {
          headers: {
            Location: "/api/user"
          }
        }
      );
    } else {
      await prisma.$disconnect;
      return NextResponse.json(
        {
          headers: {
            Location: "/api/user"
          }
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      {
        headers: {
          Location: "/api/user"
        }
      },
      { status: 500 }
    );
  }
}
