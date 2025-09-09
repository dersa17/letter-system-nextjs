import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';
import { Prisma } from '@prisma/client';


type MODashboardData = {
  amountOfLetter: number;
  amountOfLetterReadyUpload: number;
  amountOfUploaded: number;
  amountOfTugasMataKuliah: number;
  amountOfLaporanHasilStudi: number;
  amountOfKeteranganLulus: number;
  amountOfMahasiswaAktif: number;
  recentLettersUploaded: Prisma.PengajuanSuratGetPayload<{ include: { user: true } }>[];
};

type KaprodiDashboardData = {
  amountOfLetterPending: number;
  amountOfLetterApproved: number;
  amountOfLetterRejected: number;
  amountOfTugasMataKuliah: number;
  amountOfLaporanHasilStudi: number;
  amountOfKeteranganLulus: number;
  amountOfMahasiswaAktif: number;
  recentLettersApproval: Prisma.PengajuanSuratGetPayload<{ include: { user: true } }>[];
};

type AdminDashboardData = {
  amountOfCourse: number;
  amountOfMajor: number;
  amountOfUser: number;
  recentUser: Prisma.UserGetPayload<{ include: { major: true; role: true } }>[];
  recentCourse: Prisma.CourseGetPayload<{include: {major: true}}>[]
  recentMajor: Prisma.MajorGetPayload<object>[]
};

type DashboardStore = {
  dataDashboardAdmin: AdminDashboardData | null;
  dataDashboardMO: MODashboardData | null;
  dataDashboardKaprodi: KaprodiDashboardData | null;
  fetchCourses: (role: 'admin' | 'mo' | 'kaprodi') => Promise<void>;
};

const useDashboardStore = create<DashboardStore>((set) => ({
  dataDashboardAdmin: null,
  dataDashboardMO: null,
  dataDashboardKaprodi: null,

  fetchCourses: async (role) => {
    try {
      const res = await axios.get(`/api/dashboard/${role}`);

      switch (role) {
        case 'admin':
          set({ dataDashboardAdmin: res.data });
          break;
        case 'mo':
          set({ dataDashboardMO: res.data });
          break;
        case 'kaprodi':
          set({ dataDashboardKaprodi: res.data});
          break;
        default:
          console.warn(`Unknown role: ${role}`);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
      toast.error('Failed to fetch dashboard');
    }
  },
}));

export default useDashboardStore;
