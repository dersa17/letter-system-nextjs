import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { profileUpdateSchema } from "@/lib/schemas";
import { z } from "zod";
import { put } from "@vercel/blob";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth"; // auth dari export NextAuth(authOptions)


export async function GET() {
  try {
    const session = await auth()
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        role: true,
        major: true,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest,) {
  try {
    const session = await auth()
    const formData = await req.formData()
    const id = session?.user.id;

    const data = {
        nama: formData.get("nama"),
        ...(formData.get("password") && { password: formData.get("password") }),
        ...(formData.get("confirmPassword") && { confirmPassword: formData.get("confirmPassword") }),
        alamat: formData.get("alamat"),
        ...(formData.get("image") && { image: formData.get("image") })
      };

    const validatedData = profileUpdateSchema.parse(data)

    if (validatedData.password) {
        const  hashedPassword = await bcrypt.hash(validatedData.password, 10)
      validatedData.password = hashedPassword
    }

    let imageUrl

    if (validatedData.image) {

        const imageFile = validatedData.image as File;
        const extension = imageFile.name.split('.').pop();

       const blob = await put(`image/${id}.${extension}`, imageFile, {
            access: 'public',
            allowOverwrite: true,
          });
       imageUrl = blob.url
    } 

    const updatedData = await prisma.user.update({
      where: { id },
      data: {
        ...validatedData,
        image: imageUrl
      },
      include: {
        role: true,
        major: true
      }
    });

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}