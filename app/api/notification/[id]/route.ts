import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params;

    await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true }
    });

    const unreadNotifications = await prisma.notification.findMany({
      where: { isRead: false, userId: session?.user?.id  },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(unreadNotifications, { status: 200 });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}
