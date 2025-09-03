import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { userCreateSchema } from "@/lib/schema.zod";
import { z } from "zod";
import { put } from "@vercel/blob";
import bcrypt from "bcryptjs";


export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
        major: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("Error Fetching Users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data = {
      id: formData.get("id"),
      nama: formData.get("nama"),
      email: formData.get("email"),
      password: formData.get("password"),
      alamat: formData.get("alamat"),
      periode: formData.get("periode"),
      ...(formData.get("status") && { status: formData.get("status") }),
      idRole: Number(formData.get("idRole")),
      ...(formData.get("idMajor") && { idMajor: formData.get("idMajor") }),
      ...(formData.get("image") && { image: formData.get("image") }),
    };

    const validatedData = userCreateSchema.parse(data);

    if (validatedData.password) {
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      validatedData.password = hashedPassword;
    }

    let imageUrl;

    if (validatedData.image) {
      const imageFile = validatedData.image as File;
      const extension = imageFile.name.split(".").pop();

      const blob = await put(`image/${data.id}.${extension}`, imageFile, {
        access: "public",
        allowOverwrite: true,
      });
      imageUrl = blob.url;
    } else {
      imageUrl =
        "https://gb9oyv3aknnnvqa0.public.blob.vercel-storage.com/image/defaultprofile.jpg";
    }

    const user = await prisma.user.create({
      data: {
        ...validatedData,
        image: imageUrl,
      },
      include: {
        role: true,
        major: true,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    if ((error as { code?: string }).code === "P2002") {
      return NextResponse.json(
        { error: "Duplicate entry detected" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
