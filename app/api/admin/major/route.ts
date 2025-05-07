import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { majorSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function GET() {
  try {
    const majors = await prisma.major.findMany();
    return NextResponse.json(majors, { status: 200 });
  } catch (error) {
    console.error('Error fetching majors:', error);
    return NextResponse.json({ error: 'Failed to fetch majors' }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const validatedData = majorSchema.parse(data)

    const major = await prisma.major.create({
      data: validatedData,
    });
    return NextResponse.json(major, { status: 201 });
  } catch (error) {
   
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json(
        { error: 'Duplicate entry detected' },
        { status: 400 }
    );}

    return NextResponse.json({ error: 'Failed to Create major' }, { status: 500 });
  }
}

