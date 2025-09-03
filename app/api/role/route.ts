import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const roles = await prisma.roleUser.findMany();
      return NextResponse.json(roles, { status: 200 });
    } catch (error) {
      console.error('Error fetching roles:', error);
      return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
    }
  }