import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { courseSchema } from '@/lib/schema.zod';
import { z } from 'zod';

export async function PUT(
    req: NextRequest, 
    { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const validatedData = courseSchema.parse(data);

    const updatedData = await prisma.course.update({
      where: { id },
      data: validatedData,
      include: {
        major: true
      }
    });

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string  } }) {
  try {
    const { id } = await params;

    console.log(id)

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
  } catch (error) {


    if ((error as { code?: string }).code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete course, it is referenced by other data' },
        { status: 400 }
      );
    }


    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}