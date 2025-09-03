-- DropForeignKey
ALTER TABLE "LaporanHasilStudi" DROP CONSTRAINT "LaporanHasilStudi_idPengajuan_fkey";

-- DropForeignKey
ALTER TABLE "SuratKeteranganLulus" DROP CONSTRAINT "SuratKeteranganLulus_idPengajuan_fkey";

-- DropForeignKey
ALTER TABLE "SuratMahasiswaAktif" DROP CONSTRAINT "SuratMahasiswaAktif_idPengajuan_fkey";

-- DropForeignKey
ALTER TABLE "SuratTugasMk" DROP CONSTRAINT "SuratTugasMk_idPengajuan_fkey";

-- AlterTable
ALTER TABLE "PengajuanSurat" ALTER COLUMN "status" SET DEFAULT 'Pending';

-- AddForeignKey
ALTER TABLE "SuratTugasMk" ADD CONSTRAINT "SuratTugasMk_idPengajuan_fkey" FOREIGN KEY ("idPengajuan") REFERENCES "PengajuanSurat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratMahasiswaAktif" ADD CONSTRAINT "SuratMahasiswaAktif_idPengajuan_fkey" FOREIGN KEY ("idPengajuan") REFERENCES "PengajuanSurat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratKeteranganLulus" ADD CONSTRAINT "SuratKeteranganLulus_idPengajuan_fkey" FOREIGN KEY ("idPengajuan") REFERENCES "PengajuanSurat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanHasilStudi" ADD CONSTRAINT "LaporanHasilStudi_idPengajuan_fkey" FOREIGN KEY ("idPengajuan") REFERENCES "PengajuanSurat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
