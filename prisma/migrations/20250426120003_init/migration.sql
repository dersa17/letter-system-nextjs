-- CreateTable
CREATE TABLE "RoleUser" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(25) NOT NULL,

    CONSTRAINT "RoleUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jurusan" (
    "kode" VARCHAR(2) NOT NULL,
    "nama" VARCHAR(18) NOT NULL,

    CONSTRAINT "Jurusan_pkey" PRIMARY KEY ("kode")
);

-- CreateTable
CREATE TABLE "User" (
    "nik" VARCHAR(7) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "alamat" VARCHAR(45) NOT NULL,
    "periode" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20),
    "image" VARCHAR(30),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "idRole" INTEGER NOT NULL,
    "idJurusan" VARCHAR(2),

    CONSTRAINT "User_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "MataKuliah" (
    "kode" VARCHAR(12) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "SKS" INTEGER NOT NULL,
    "idJurusan" VARCHAR(2) NOT NULL,

    CONSTRAINT "MataKuliah_pkey" PRIMARY KEY ("kode")
);

-- CreateTable
CREATE TABLE "PengajuanSurat" (
    "id" SERIAL NOT NULL,
    "nrp" VARCHAR(7) NOT NULL,
    "moNik" VARCHAR(7),
    "kaprodiNik" VARCHAR(7),
    "jenisSurat" VARCHAR(33) NOT NULL,
    "status" VARCHAR(25) NOT NULL,
    "tanggalPengajuan" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalPersetujuan" TIMESTAMP,
    "fileSurat" VARCHAR(255),
    "tanggalUpload" TIMESTAMP,

    CONSTRAINT "PengajuanSurat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuratTugasMk" (
    "id" SERIAL NOT NULL,
    "tujuanInstansi" VARCHAR(255) NOT NULL,
    "periode" VARCHAR(20),
    "dataMahasiswa" VARCHAR(255) NOT NULL,
    "tujuan" VARCHAR(255) NOT NULL,
    "topik" VARCHAR(255) NOT NULL,
    "idPengajuan" INTEGER NOT NULL,
    "kodeMk" VARCHAR(12) NOT NULL,

    CONSTRAINT "SuratTugasMk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuratMahasiswaAktif" (
    "id" SERIAL NOT NULL,
    "namaLengkap" VARCHAR(100) NOT NULL,
    "nrp" VARCHAR(7) NOT NULL,
    "periode" VARCHAR(20) NOT NULL,
    "alamat" VARCHAR(45) NOT NULL,
    "keperluanPengajuan" VARCHAR(255) NOT NULL,
    "idPengajuan" INTEGER NOT NULL,

    CONSTRAINT "SuratMahasiswaAktif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuratKeteranganLulus" (
    "id" SERIAL NOT NULL,
    "namaLengkap" VARCHAR(100) NOT NULL,
    "nrp" VARCHAR(7) NOT NULL,
    "tanggalLulus" TIMESTAMP NOT NULL,
    "idPengajuan" INTEGER NOT NULL,

    CONSTRAINT "SuratKeteranganLulus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaporanHasilStudi" (
    "id" SERIAL NOT NULL,
    "namaLengkap" VARCHAR(100) NOT NULL,
    "nrp" VARCHAR(7) NOT NULL,
    "keperluanPembuatan" VARCHAR(255) NOT NULL,
    "idPengajuan" INTEGER NOT NULL,

    CONSTRAINT "LaporanHasilStudi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuratTugasMk_idPengajuan_key" ON "SuratTugasMk"("idPengajuan");

-- CreateIndex
CREATE UNIQUE INDEX "SuratMahasiswaAktif_idPengajuan_key" ON "SuratMahasiswaAktif"("idPengajuan");

-- CreateIndex
CREATE UNIQUE INDEX "SuratKeteranganLulus_idPengajuan_key" ON "SuratKeteranganLulus"("idPengajuan");

-- CreateIndex
CREATE UNIQUE INDEX "LaporanHasilStudi_idPengajuan_key" ON "LaporanHasilStudi"("idPengajuan");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "RoleUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idJurusan_fkey" FOREIGN KEY ("idJurusan") REFERENCES "Jurusan"("kode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliah" ADD CONSTRAINT "MataKuliah_idJurusan_fkey" FOREIGN KEY ("idJurusan") REFERENCES "Jurusan"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengajuanSurat" ADD CONSTRAINT "PengajuanSurat_nrp_fkey" FOREIGN KEY ("nrp") REFERENCES "User"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengajuanSurat" ADD CONSTRAINT "PengajuanSurat_moNik_fkey" FOREIGN KEY ("moNik") REFERENCES "User"("nik") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengajuanSurat" ADD CONSTRAINT "PengajuanSurat_kaprodiNik_fkey" FOREIGN KEY ("kaprodiNik") REFERENCES "User"("nik") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratTugasMk" ADD CONSTRAINT "SuratTugasMk_idPengajuan_fkey" FOREIGN KEY ("idPengajuan") REFERENCES "PengajuanSurat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratTugasMk" ADD CONSTRAINT "SuratTugasMk_kodeMk_fkey" FOREIGN KEY ("kodeMk") REFERENCES "MataKuliah"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratMahasiswaAktif" ADD CONSTRAINT "SuratMahasiswaAktif_idPengajuan_fkey" FOREIGN KEY ("idPengajuan") REFERENCES "PengajuanSurat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratKeteranganLulus" ADD CONSTRAINT "SuratKeteranganLulus_idPengajuan_fkey" FOREIGN KEY ("idPengajuan") REFERENCES "PengajuanSurat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaporanHasilStudi" ADD CONSTRAINT "LaporanHasilStudi_idPengajuan_fkey" FOREIGN KEY ("idPengajuan") REFERENCES "PengajuanSurat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
