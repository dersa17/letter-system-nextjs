import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';
import { Prisma } from '@prisma/client';
import z from 'zod';
import { majorSchema } from '@/lib/schema.zod';


type MajorStore = {
    majors: Prisma.MajorGetPayload<object>[]
    fetchMajors: () => Promise<void>
    addMajor: (data: z.infer<typeof majorSchema>) => Promise<void>
    updateMajor: (id: string | number, data: z.infer<typeof majorSchema>) => Promise<void>;
    deleteMajor: (id: string | number) => Promise<void>;
}

const useMajorStore = create<MajorStore>((set) => ({
    majors: [],
    fetchMajors: async () => {
      try {
        const res = await axios.get('/api/major');
        set({ majors: res.data });
      } catch (error) {
        console.error('Failed to fetch majors:', error);
        toast.error('Failed to fetch majors');
      }
    },
    addMajor: async (data) => {
      try {
        const res = await axios.post('/api/major', data);
        set((state) => ({ majors: [...state.majors, res.data] }));
        toast.success('Major successfully created!');
        return res.data;
      } catch (error) {
             const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error
          ?? error.message
          : 'An unexpected error occurred'
        console.error('Failed to add major:', errorMessage);
        toast.error(errorMessage);
      }
    },
    updateMajor: async (id, data) => {
      try {
        const res = await axios.put(`/api/major/${id}`, data);
        set((state) => ({
          majors: state.majors.map((major) =>
            major.id === id ? { ...major, ...res.data } : major
          ),
        }));
        toast.success('Major successfully updated!');
        return res.data;
      } catch (error) {
            const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error
          ?? error.message
          : 'An unexpected error occurred'
        console.error('Failed to update major:', errorMessage);
        toast.error(errorMessage);
      }
    },
    deleteMajor: async (id) => {
      try {
        await axios.delete(`/api/major/${id}`);
        set((state) => ({
          majors: state.majors.filter((major) => major.id !== id),
        }));
        toast.success('Major successfully deleted!');
      } catch (error) {
            const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error
          ?? error.message
          : 'An unexpected error occurred'
        console.error('Failed to delete major:', errorMessage);
        toast.error(errorMessage);
      }
    },

}))

export default useMajorStore