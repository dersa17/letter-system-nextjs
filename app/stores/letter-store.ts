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
    laporanHasilStudi: true;
    suratTugasMk: { include: { course: true } };
    suratKeteranganLulus: true;
    suratMahasiswaAktif: true;
    user: true,
    mo: true,
    kaprodi: true
  };
}>[];

    fetchLetters: () => Promise<void>
    addLetter: (data: LetterInput) => Promise<void>
    deleteLetter: (id: number) => Promise<void>
    updateStatusLetter: (id: number, status: string) => Promise<void>
    uploadLetter:(id: number, data: FormData) => Promise<void>
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
    },
    updateStatusLetter: async (id, status) => {
        try {
          const res =await axios.patch(`/api/letter/${id}/status`, {status})
          console.log(res)
          set((state) => ({
          letters: state.letters.map((l) =>
            l.id === id ? res.data : l
          ),
        }));
        toast.success(`Letter Successfully ${status}`);
        } catch (error) {
          const errorMessage =
          axios.isAxiosError(error) ? error.response?.data?.error ?? error.message : 'An unexpected error occurred';
          console.error(`Failed to ${status} letter:`, errorMessage);
          toast.error(errorMessage);
        }
    },
    uploadLetter: async (id, file ) => {
        try {
          const res =await axios.patch(`/api/letter/${id}/upload`, file)
          console.log(res)
          set((state) => ({
          letters: state.letters.map((l) =>
            l.id === id ? res.data : l
          ),
        }));
        toast.success(`Letter Successfully uploaded`);
        } catch (error) {
          const errorMessage =
          axios.isAxiosError(error) ? error.response?.data?.error ?? error.message : 'An unexpected error occurred';
          console.error(`Failed to upload file letter:`, errorMessage);
          toast.error(errorMessage);
        }
    }

}))


export default useLetterStore