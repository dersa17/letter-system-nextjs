import {create} from "zustand"
import axios from "axios"
import {toast} from 'sonner'
import { Prisma } from '@prisma/client'
import { laporanHasilStudiSchema, suratTugasMkSchema, suratKeteranganLulusSchema, suratMahasiswaAktifSchema } from "@/lib/schema.zod"
import { z } from "zod";

type LetterInput =
  | { type: 'Laporan Hasil Studi'; payload: z.infer<typeof laporanHasilStudiSchema> }
  | { type: 'Tugas Mata Kuliah'; payload: z.infer<typeof suratTugasMkSchema> }
  | { type: 'Keterangan Lulus'; payload: z.infer<typeof suratKeteranganLulusSchema> }
  | { type: 'Mahasiswa Aktif'; payload: z.infer<typeof suratMahasiswaAktifSchema> };


type LetterStore = {
    letters: Prisma.PengajuanSuratGetPayload<{
  include: {
    laporanHasilStudi?: true;
    suratTugasMk?: { include: { course: true } };
    suratKeteranganLulus?: true;
    suratMahasiswaAktif?: true;
    user: true,
  };
}>[];

    fetchLetters: () => Promise<void>
    addLetter: (data: LetterInput) => Promise<Prisma.PengajuanSuratGetPayload<{include: {
        laporanHasilStudi?: true
        suratTugasMk?: {include: {course: true}}
        suratMahasiswaAktif?: true
        suratKeteranganLulus?: true
        user: true,
    }}> | null>
    deleteLetter: (id: number) => Promise<void>
}


const useLetterStore = create<LetterStore>((set) => ({
    letters: [],
    fetchLetters: async () => {
      try {
          const res = await axios.get('/api/letter');
          set({ letters: res.data });
        } catch (error) {
          console.error('Failed to fetch letters:', error);
          toast.error('Failed to fetch letters');
        }
    },
    addLetter: async (data) => {
        try {
            const res = await axios.post('/api/letter', data)
            console.log(res.data)
            set((state) => ({letters: [...state.letters, res.data]}))
            toast.success('Letter successfully created!');
            return res.data;
        } catch (error) {
        const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error
          ?? error.message
          : 'An unexpected error occurred'
          console.error('Failed to add letter:', errorMessage);
          toast.error(errorMessage);
          return null;
        }
    },
    deleteLetter: async (id) => {
        try {
            console.log("testing: ", id)
            await axios.delete(`/api/letter/${id}`)
            set((state) => ({
            letters: state.letters.filter((letter) => letter.id !== id),
            }));
            toast.success('Letter successfully deleted!');
        } catch(error) {
          const errorMessage =
          axios.isAxiosError(error) ? error.response?.data?.error ?? error.message : 'An unexpected error occurred';

          console.error('Failed to delete letter:', errorMessage);
          toast.error(errorMessage);
        }
    }

}))


export default useLetterStore