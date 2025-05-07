import {create} from 'zustand'
import axios from 'axios'
import {toast} from 'sonner'
import { Prisma } from '@prisma/client'


type UserStore = {
    users: Prisma.UserGetPayload<{include: {
      role: true
      major: true
    }}>[]
    fetchUsers: () => Promise<void>
    addUser: (data: FormData) => Promise<Prisma.UserGetPayload<{include: {
      role: true
      major: true
    }}> | null>
    updateUser: (id: string, data: FormData) => Promise<Prisma.UserGetPayload<{include: {
      role: true
      major: true
    }}> | null>;
    deleteUser: (id: string) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
     users: [],
    fetchUsers: async () => {
        try {
          const res = await axios.get('/api/admin/user');
          set({ users: res.data });
        } catch (error) {
          console.error('Failed to fetch users:', error);
          toast.error('Failed to fetch users');
        }
      },
      addUser: async (data) => {
        try {
          const res = await axios.post('/api/admin/user', data);
          set((state) => ({ users: [...state.users, res.data] }));
          toast.success('User successfully created!');
          return res.data;
        } catch (error) {
          const errorMessage = axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'An unexpected error occurred'
          console.error('Failed to add user:', errorMessage);
          toast.error(errorMessage);
          return null;
        }
      },
      updateUser: async (id, data) => {
        try {
          const res = await axios.put(`/api/admin/user/${id}`, data);
          set((state) => ({
            users: state.users.map((user) =>
              user.id === id ? { ...user, ...res.data } : user
            ),
          }));
          toast.success('User successfully updated!');
          return res.data;
        } catch (error) {
          const errorMessage = axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'An unexpected error occurred'
          console.error('Failed to update user:', errorMessage);
          toast.error(errorMessage);
          return null;
        }
      },
      deleteUser: async (id) => {
        try {
          await axios.delete(`/api/admin/user/${id}`);
          set((state) => ({
            users: state.users.filter((user) => user.id !== id),
          }));
          toast.success('User successfully deleted!');
        } catch (error) {
          const errorMessage = axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'An unexpected error occurred'
          console.error('Failed to delete user:', errorMessage);
          toast.error(errorMessage);
        }
      },
  

}))

export default useUserStore