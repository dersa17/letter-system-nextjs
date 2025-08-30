import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { majorSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function PUT(
    req: NextRequest, 
    { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await req.json();

    const validatedData = majorSchema.parse(data);

    const updatedData = await prisma.major.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error('Error updating major:', error);
    return NextResponse.json({ error: 'Failed to update major' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string  } }) {
  try {
    const { id } = params;

    await prisma.major.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Major deleted successfully' }, { status: 200 });
  } catch (error) {


    if ((error as { code?: string }).code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete major, it is referenced by other data' },
        { status: 400 }
      );
    }


    console.error('Error deleting major:', error);
    return NextResponse.json({ error: 'Failed to delete major' }, { status: 500 });
  }
}