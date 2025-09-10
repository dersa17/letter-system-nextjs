import { NextResponse, NextRequest} from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";


export async function GET() {
         try {
            const session = await auth()
            const notificatons = await prisma.notification.findMany({where: {
                userId: session?.user?.id,
                isRead: false
                
            },  orderBy: { createdAt: 'desc' } })
            return NextResponse.json(notificatons, {status: 200})
         } catch (error) {
            console.error("Error Featching notification ", error)
            return NextResponse.json({error: "Failed to fetch notification"},  {status: 500})
         }
}


export async function PATCH(req: NextRequest) {
    try {
         const session = await auth()
         const {id} = session?.user

        await prisma.notification.updateMany({
        where: { userId: id, isRead: false },
        data: { isRead: true },
        });

        const unreadNotifications = await prisma.notification.findMany({
        where: { userId: id, isRead: false },
        orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(unreadNotifications, { status: 200 });


    } catch (error) {
        console.error('Error updating notification:', error);
        return NextResponse.json({ error: 'Failed to update notificaton' }, { status: 500 });
    }

}


