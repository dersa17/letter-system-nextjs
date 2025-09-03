import { Download, Calendar, User, FileText, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@prisma/client";

interface LetterDetailContentProps {
  letter: Prisma.PengajuanSuratGetPayload<{
    include: {
      laporanHasilStudi?: true;
      suratTugasMk?: { include: { course: true } };
      suratKeteranganLulus?: true;
      suratMahasiswaAktif?: true;
      user: true;
    };
  }>;
}

const LetterDetailContent = ({ letter }: LetterDetailContentProps) => {
  console.log(letter);
  const getStatusBadge = (status: string) => {
    const variants = {
       Approved: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border border-amber-200",
    Rejected: "bg-rose-100 text-rose-700 border border-rose-200",
    Finished: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    };

    return (
      variants[status as keyof typeof variants] ||
      "bg-muted text-muted-foreground"
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderSpecificFields = () => {
    switch (letter.jenisSurat) {
      case "Mahasiswa Aktif":
        return (
          letter.suratMahasiswaAktif && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={20} className="text-academic-blue" />
                  Active Student Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </p>
                    <p className="text-base">
                      {letter.suratMahasiswaAktif.namaLengkap}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Student ID
                    </p>
                    <p className="text-base">
                      {letter.suratMahasiswaAktif.nrp}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Period
                    </p>
                    <p className="text-base">
                      {letter.suratMahasiswaAktif.periode}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Address
                    </p>
                    <p className="text-base">
                      {letter.suratMahasiswaAktif.alamat}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Submission Purpose
                  </p>
                  <p className="text-base mt-1">
                    {letter.suratMahasiswaAktif.keperluanPengajuan}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        );

      case "Keterangan Lulus":
        return (
          letter.suratKeteranganLulus && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} className="text-academic-blue" />
                  Graduation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </p>
                    <p className="text-base">
                      {letter.suratKeteranganLulus.namaLengkap}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Student ID
                    </p>
                    <p className="text-base">
                      {letter.suratKeteranganLulus.nrp}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Graduation Date
                    </p>
                    <p className="text-base">
                      {formatDate(
                        String(letter.suratKeteranganLulus.tanggalLulus)
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        );

      case "Laporan Hasil Studi":
        return (
          letter.laporanHasilStudi && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} className="text-academic-blue" />
                  Study Report Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </p>
                    <p className="text-base">
                      {letter.laporanHasilStudi.namaLengkap}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Student ID
                    </p>
                    <p className="text-base">{letter.laporanHasilStudi.nrp}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Creation Purpose
                  </p>
                  <p className="text-base mt-1">
                    {letter.laporanHasilStudi.keperluanPembuatan}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        );

      case "Tugas Mata Kuliah":
        return (
          letter.suratTugasMk && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building size={20} className="text-academic-blue" />
                  Assignment Letter Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Target Institution
                    </p>
                    <p className="text-base">
                      {letter.suratTugasMk.tujuanInstansi}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Period
                    </p>
                    <p className="text-base">{letter.suratTugasMk.periode}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Student Data
                    </p>
                    <p className="text-base">
                      {letter.suratTugasMk.dataMahasiswa}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Subject
                    </p>
                    <p className="text-base">
                      {letter.suratTugasMk.course.nama}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Purpose
                  </p>
                  <p className="text-base mt-1">{letter.suratTugasMk.tujuan}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Topic
                  </p>
                  <p className="text-base mt-1">{letter.suratTugasMk.topik}</p>
                </div>
              </CardContent>
            </Card>
          )
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Letter Submission Details
          </h2>
          <p className="text-muted-foreground mt-1">ID: {letter.id}</p>
        </div>
        <Badge className={getStatusBadge(letter.status)}>
          {letter.status.charAt(0).toUpperCase() + letter.status.slice(1)}
        </Badge>
      </div>

      {/* General Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} className="text-academic-blue" />
            General Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Letter Type
              </p>
              <p className="text-base font-medium">{letter.jenisSurat}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Student ID (NRP)
              </p>
              <p className="text-base">{letter.nrp}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                MO NIK
              </p>
              <p className="text-base">{letter.moNik ? letter.moNik : "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Kaprodi NIK
              </p>
              <p className="text-base">{letter.kaprodiNik ? letter.kaprodiNik : "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Submission Date
              </p>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-muted-foreground" />
                <p className="text-base">
                  {formatDate(String(letter.tanggalPengajuan))}
                </p>
              </div>
            </div>
            {letter.tanggalPersetujuan && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Approval Date
                </p>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <p className="text-base">
                    {formatDate(String(letter.tanggalPersetujuan))}
                  </p>
                </div>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Upload Date
              </p>
              <div className="flex items-center gap-2">
                {letter.tanggalUpload ? (
                  <>
                    <Calendar size={16} className="text-muted-foreground" />
                    <p className="text-base">
                      {formatDate(String(letter.tanggalUpload))}
                    </p>
                  </>
                ) : (
                  <p className="text-base text-muted-foreground">-</p>
                )}
              </div>
            </div>
            {letter.fileSurat && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Letter File
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Download size={16} className="mr-2" />
                  Download Letter
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Specific Information */}
      {renderSpecificFields()}
    </div>
  );
};

export default LetterDetailContent;
