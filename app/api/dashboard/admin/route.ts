import { NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
    const [amountOfCourse, amountOfMajor, amountOfUser, recentUser, recentCourse, recentMajor] = await Promise.all([
      prisma.course.count(),
      prisma.major.count(),
      prisma.user.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          role: true,
          major: true
        }
      }),
      prisma.course.findMany({
        take: 5,
        include: {
          major: true
        }
      }),
      prisma.major.findMany({
        take: 5,
      }),
    ]);

        const data = {
            amountOfCourse, amountOfMajor, amountOfUser, recentUser, recentCourse, recentMajor
        }

        return NextResponse.json(data, {status: 200})

    } catch (error) {
        console.error("Error Fetching data dashboard admin", error)
        return NextResponse.json({ error: "failed fetch data dashboard admin" }, { status: 500 });
    }
}