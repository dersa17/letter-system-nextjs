import {create} from 'zustand'
import axios from 'axios'
import {toast} from 'sonner'
import {Prisma} from "@prisma/client"


type NotificationStore = {
    notifications: Prisma.NotificationGetPayload<object>[]
    fetchNotification: () => Promise<void>
    markAllAsRead: () => Promise<void>
    markAsRead: (id: number) => Promise<void>
}


const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    fetchNotification: async () => {
        try {
            const res = await axios.get('/api/notification')
            set({notifications: res.data})
        } catch (error) {
            console.error('Failed to fetch notifications:', error)
            toast.error('Failed to fetch notfications')
        }
    },
    markAllAsRead: async () => {
        try {
            const res = await axios.patch('/api/notification')
            set({notifications:  res.data})
        } catch (error) {
             console.error('Failed to mark all as read:', error)
        }
    },
    markAsRead: async (id) => {
          try {
            const res = await axios.patch(`/api/notification/${id}`)
            set({notifications:  res.data})
        } catch (error) {
             console.error('Failed to mark as read:', error)
        }
    }

}) )


export default useNotificationStore