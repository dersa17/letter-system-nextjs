import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    const majorId = session?.user?.idMajor;

    // Jalankan semua count dan findMany paralel
    const [
      amountOfLetter,
      amountOfLetterReadyUpload,
      amountOfUploaded,
      amountOfTugasMataKuliah,
      amountOfLaporanHasilStudi,
      amountOfKeteranganLulus,
      amountOfMahasiswaAktif,
      recentLettersUploaded,
    ] = await Promise.all([
      prisma.pengajuanSurat.count({ where: { user: { idMajor: majorId } } }),
      prisma.pengajuanSurat.count({ where: { status: "Approved", user: { idMajor: majorId } } }),
      prisma.pengajuanSurat.count({ where: { status: "Finished", user: { idMajor: majorId } } }),
      prisma.suratTugasMk.count({ where: { pengajuanSurat: { user: { idMajor: majorId } } } }),
      prisma.laporanHasilStudi.count({ where: { pengajuanSurat: { user: { idMajor: majorId } } } }),
      prisma.suratKeteranganLulus.count({ where: { pengajuanSurat: { user: { idMajor: majorId } } } }),
      prisma.suratMahasiswaAktif.count({ where: { pengajuanSurat: { user: { idMajor: majorId } } } }),
      prisma.pengajuanSurat.findMany({
        take: 5,
        orderBy: { tanggalPengajuan: "desc" },
        where: { user: { idMajor: majorId }, status: "Finished" }, 
        include: {
          laporanHasilStudi: true,
          suratTugasMk: { include: { course: true } },
          suratKeteranganLulus: true,
          suratMahasiswaAktif: true,
          user: true,
          mo: true,
          kaprodi: true
        }
      }),
    ]);

    const data = {amountOfLetter, amountOfKeteranganLulus, amountOfLaporanHasilStudi, amountOfMahasiswaAktif, recentLettersUploaded, amountOfTugasMataKuliah, amountOfUploaded, amountOfLetterReadyUpload}

    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    console.error("Error fetching data dashboard mo", error);
    return NextResponse.json(
      { error: "Failed to fetch data dashboard mo" },
      { status: 500 }
    );
  }
}
