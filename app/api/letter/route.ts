import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {suratTugasMkSchema, suratKeteranganLulusSchema, suratMahasiswaAktifSchema, laporanHasilStudiSchema} from "@/lib/schema.zod"
import {auth} from "@/lib/auth"
import { z } from 'zod';


export async function GET() {
  try {
    const session = await auth();
  
    const { id, role, idMajor } = session?.user;

    let whereCondition = {};

    if (role.id === 4) {
      whereCondition = { nrp: id };
    } else if (role.id === 2 || role.id == 3) {
      whereCondition = {
        user: {
          idMajor: idMajor
        },
      };
    } 

    const letters = await prisma.pengajuanSurat.findMany({
      where: whereCondition,
      include: {
        laporanHasilStudi: true,
        suratTugasMk: { include: { course: true } },
        suratKeteranganLulus: true,
        suratMahasiswaAktif: true,
        user: true,
      },
      orderBy: {
          tanggalPengajuan: 'asc', // atau 'desc'
      },
    });

    return NextResponse.json(letters, { status: 200 });
  } catch (error) {
    console.error("Error fetch letters:", error);
    return NextResponse.json({ error: "failed fetch letters" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const session = await auth();

    const result = await prisma.$transaction(async (tx) => {
      // 1. buat pengajuanSurat
      const pengajuanSurat = await tx.pengajuanSurat.create({
        data: {
          nrp: session!.user!.id,
          jenisSurat: data.type,
        },
      });

      // 2. buat surat sesuai jenis
      switch (data.type) {
        case "Laporan Hasil Studi":
          laporanHasilStudiSchema.parse(data.payload);
          await tx.laporanHasilStudi.create({
            data: { ...data.payload, idPengajuan: pengajuanSurat.id },
          });
          break;

        case "Tugas Mata Kuliah":
          suratTugasMkSchema.parse(data.payload);
          await tx.suratTugasMk.create({
            data: { ...data.payload, idPengajuan: pengajuanSurat.id },
          });
          break;

        case "Keterangan Lulus":
          suratKeteranganLulusSchema.parse(data.payload);
          await tx.suratKeteranganLulus.create({
            data: { 
              ...data.payload,
              idPengajuan: pengajuanSurat.id,
              tanggalLulus: new Date(data.payload.tanggalLulus),
            },
          });
          break;

        case "Mahasiswa Aktif":
          suratMahasiswaAktifSchema.parse(data.payload);
          await tx.suratMahasiswaAktif.create({
            data: { ...data.payload, idPengajuan: pengajuanSurat.id },
          });
          break;

        default:
          throw new Error("Unknown letter type");
      }

      // 3. ambil pengajuanSurat beserta relasi
      return tx.pengajuanSurat.findUnique({
        where: { id: pengajuanSurat.id },
        include: {
          laporanHasilStudi: true,
          suratTugasMk: { include: { course: true } },
          suratKeteranganLulus: true,
          suratMahasiswaAktif: true,
          user: true,
        },
      });
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Failed to create letter:", error);
    return NextResponse.json({ error: "failed create letter" }, { status: 400 });
  }
}
