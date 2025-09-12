import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const session = await auth();
    const { id } = await params;
    const { status } = await req.json();

    const updated = await prisma.pengajuanSurat.update({
      where: { id: Number(id) },
      data: {
        status,
        tanggalPersetujuan: new Date(),
        kaprodiNik: session?.user?.id,
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
    });

    if (status === "Approved") {
      const mo = await prisma.user.findFirst({
        where: { idRole: 2, status: "Aktif", idMajor: session?.user?.idMajor },
      });

      if (!mo) {
        return NextResponse.json(
          { error: "MO not found" },
          { status: 404 }
        );
      }

      await prisma.notification.create({
        data: {
          idPengajuan: updated.id,
          userId: mo.id, // ✅ sekarang aman
          type: "Pengajuan Surat Siap Upload",
          message: `Pengajuan surat "${updated?.jenisSurat}" (ID: ${updated?.id}) telah diapprove oleh ${updated?.kaprodi?.nama}.`,
          isRead: false,
        },
      });

      await prisma.notification.create({
        data: {
          idPengajuan: updated.id,
          userId: mo.id,
          type: "Pengajuan Surat Siap Upload",
          message: `Pengajuan surat "${updated?.jenisSurat}" (ID: ${updated?.id}) telah diapprove oleh ${updated?.kaprodi?.nama}.`,
          isRead: false,
        },
      });
    }

    await prisma.notification.create({
      data: {
        idPengajuan: updated.id,
        userId: updated.user.id,
        type: `Pengajuan Surat ${status} `,
        message: `Pengajuan surat "${updated?.jenisSurat}" (ID: ${updated?.id}) ${status} oleh ${updated?.kaprodi?.nama}.`,
        isRead: false,
      },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error update status:", error);
    return NextResponse.json(
      { error: "Failed update status letter" },
      { status: 500 }
    );
  }
}
