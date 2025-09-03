import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"


export async function DELETE(req: NextRequest, {params} : {params : {id: number}}) {

    try {
        const {id} = await params

        console.log(id)

        await prisma.pengajuanSurat.delete({where: {id: Number(id) }})

       
        return NextResponse.json({ message: 'Letter deleted successfully' }, { status: 200 });  


    } catch (error) {
        
        console.error('Error deleting course:', error);
        return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
    }

}