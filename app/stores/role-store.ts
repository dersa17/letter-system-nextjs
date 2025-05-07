import {create} from 'zustand'
import axios from 'axios'
import {toast} from 'sonner'
import { Prisma } from '@prisma/client'


type RoleUserStore = {
    roles: Prisma.RoleUserGetPayload<object>[]
    fetchRoles: () => Promise<void>
}

const useRoleStore = create<RoleUserStore>((set) => ({
    roles: [],
    fetchRoles: async () => {
        try {
          const res = await axios.get('/api/admin/role');
          set({ roles: res.data });
        } catch (error) {
          console.error('Failed to fetch roles:', error);
          toast.error('Failed to fetch roles');
        }
      },
}))

export default useRoleStore