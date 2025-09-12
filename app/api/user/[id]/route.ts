import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { userUpdateSchema } from '@/lib/schema.zod';
import { z } from 'zod';
import {put}  from "@vercel/blob"
import bcrypt from 'bcryptjs';

export async function PUT(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData()

    const data = {
        id: formData.get("id"),
        nama: formData.get("nama"),
        email: formData.get("email"),
        ...(formData.get("password") && { password: formData.get("password") }),
        alamat: formData.get("alamat"),
        periode: formData.get("periode"),
        ...(formData.get("status") && { status: formData.get("status") }),
        idRole: Number(formData.get("idRole")),
        ...(formData.get("idMajor") && { idMajor: formData.get("idMajor") }),
        ...(formData.get("image") && { image: formData.get("image") })
      };

      const validatedData = userUpdateSchema.parse(data)

    if (validatedData.password) {
        const  hashedPassword = await bcrypt.hash(validatedData.password, 10)
      validatedData.password = hashedPassword
    }

    let imageUrl

    if (validatedData.image) {

        const imageFile = validatedData.image as File;
        const extension = imageFile.name.split('.').pop();

       const blob = await put(`image/${data.id}.${extension}`, imageFile, {
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

    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: Promise<{ id: string  }> }) {
  try {
    const { id } = await params;

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'user deleted successfully' }, { status: 200 });
  } catch (error) {


    if ((error as { code?: string }).code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete user, it is referenced by other data' },
        { status: 400 }
      );
    }


    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}