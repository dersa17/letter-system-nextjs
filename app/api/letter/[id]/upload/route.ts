import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { pengajuanSuratSchema } from "@/lib/schema.zod"
import { put } from "@vercel/blob"


export async function PATCH(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const session = await auth()
    const { id } = params

    const formData = await req.formData()
    const fileSuratRaw = formData.get("fileSurat")

    if (!(fileSuratRaw instanceof File)) {
      return NextResponse.json({ error: "File tidak valid" }, { status: 400 })
    }

    // Bungkus sesuai schema
    const validatedData = pengajuanSuratSchema.parse({ fileSurat: fileSuratRaw })
    const fileSurat = validatedData.fileSurat

    const extension = fileSurat.name.split(".").pop()
    const blob = await put(`letter/${id}.${extension}`, fileSurat, {
      access: "public",
      allowOverwrite: true,
    })
    const suratUrl = blob.url

    const updated = await prisma.pengajuanSurat.update({
      where: { id: Number(id) },
      data: {
        fileSurat: suratUrl,
        tanggalUpload: new Date(),
        moNik: session?.user?.id,
        status: "Finished"
      },
      include: {
        laporanHasilStudi: true,
        suratTugasMk: { include: { course: true } },
        suratKeteranganLulus: true,
        suratMahasiswaAktif: true,
        user: true,
        mo: true,
        kaprodi: true,
      },
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error("Error upload status:", error)
    return NextResponse.json({ error: "Failed upload letter" }, { status: 500 })
  }
}
