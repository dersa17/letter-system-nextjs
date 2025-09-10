import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';
import { Prisma } from '@prisma/client';

type ProfileStore = {
  profile: Prisma.UserGetPayload<{
    include: {
      role: true;
      major: true;
    };
  }> | null;
  isLoading: boolean;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<void
  >;
};

const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  isLoading: false,

  fetchProfile: async () => {
    try {
      const res = await axios.get(`/api/profile`);
      set({ profile: res.data });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to fetch profile');
    } finally {
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.patch(`/api/profile`, data);
      set({ profile: res.data });
      toast.success('Profile successfully updated!');
      return res.data;
    } catch (error) {
            const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error
          ?? error.message
          : 'An unexpected error occurred'
      console.error('Failed to update profile:', errorMessage);
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProfileStore;
