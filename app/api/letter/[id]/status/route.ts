import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"




export async function PATCH(req: NextRequest, {params} : {params: {id: number}}) {
    try {
        const session = await auth()
        const {id} = await params
        const {status} = await req.json()
        
        const updated = await prisma.pengajuanSurat.update({
            where: { id: Number(id) },
            data: { status, tanggalPersetujuan: new Date(), kaprodiNik: session?.user?.id },
             include: {
          laporanHasilStudi: true,
          suratTugasMk: { include: { course: true } },
          suratKeteranganLulus: true,
          suratMahasiswaAktif: true,
          user: true,
          mo: true,
          kaprodi: true
        },
        });
        return NextResponse.json(updated, { status: 200 });  

    } catch (error) {
        console.error("Error update status:", error)
        return NextResponse.json({error:'Failed update status letter'}, {status: 500})
    }
}