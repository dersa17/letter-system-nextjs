import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { courseSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        major: true
      }
    }); 
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const validatedData = courseSchema.parse(data)

    const course = await prisma.course.create({
      data: validatedData,
      include: {
        major: true
      }
    });
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
   
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json(
        { error: 'Duplicate entry detected' },
        { status: 400 }
    );}

    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

