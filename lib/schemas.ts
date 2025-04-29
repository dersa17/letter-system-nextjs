import {z} from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const userSchema = z.object ({
    id: z.string().max(7),
    nama: z.string().max(100),
    email: z.string().email().max(45),
    alamat: z.string().max(45),
    periode: z.string().max(20),
    status: z.string().max(20).nullable(),
    image:
        z.instanceof(File).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Only .jpg, .png, .webp, and .jpeg formats are supported.",
        }).refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "Max image size is 5MB.",
        }).optional().nullable(),
    idRole: z.number(),
    idJurusan: z.string().nullable()
})


export const jurusanSchema = z.object({
    id: z.string().max(2),
    nama: z.string().max(18)
})


export const mataKuliahSchema = z.object({
    id: z.string().max(12),
    nama: z.string().max(100),
    sks: z.number().int(),
    idJurusan: z.string().max(2)
})


export const pengajuanSuratSchema = z.object({
    fileSurat: z.instanceof(File).refine((file) => file.type === "application/pdf", {
        message: "Only .pdf format is supported.",
      }).optional().nullable(),
  });


export const suratTugasMkSchema = z.object({
    tujuanInstansi: z.string().max(255),
    periode: z.string().max(20).nullable().optional(),
    dataMahasiswa: z.string().max(255),
    tujuan: z.string().max(255),
    topik: z.string().max(255),
    idPengajuan: z.number(),
    kodeMk: z.string().max(12),
  });


  export const suratMahasiswaAktifSchema = z.object({
    namaLengkap: z.string().max(100),
    nrp: z.string().max(7),
    periode: z.string().max(20),
    alamat: z.string().max(45),
    keperluanPengajuan: z.string().max(255),
    idPengajuan: z.number(),
  });
  

  export const suratKeteranganLulusSchema = z.object({
    namaLengkap: z.string().max(100),
    nrp: z.string().max(7),
    tanggalLulus: z.date(),
    idPengajuan: z.number(),
  });

  export const laporanHasilStudiSchema = z.object({
    namaLengkap: z.string().max(100),
    nrp: z.string().max(7),
    keperluanPembuatan: z.string().max(255),
    idPengajuan: z.number(),
  });


