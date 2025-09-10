import {create} from 'zustand'
import axios from 'axios'
import {toast} from 'sonner'
import { Prisma } from '@prisma/client'


type CourseStore = {
    courses: Prisma.CourseGetPayload<{include: {
      major: true
    }}>[]
    fetchCourses: () => Promise<void>
    addCourse: (data: Prisma.CourseGetPayload<object>) => Promise<void>
    updateCourse: (id: string | number, data: Prisma.CourseGetPayload<object>) => Promise<void>;
    deleteCourse: (id: string | number) => Promise<void>;
}

const useCourseStore = create<CourseStore>((set) => ({
    courses: [],
    fetchCourses: async () => {
        try {
          const res = await axios.get('/api/course');
          set({ courses: res.data });
        } catch (error) {
          console.error('Failed to fetch courses:', error);
          toast.error('Failed to fetch courses');
        }
      },
      addCourse: async (data) => {
        try {
          const res = await axios.post('/api/course', data);
          set((state) => ({ courses: [...state.courses, res.data] }));
          toast.success('Course successfully created!');
        } catch (error) {
               const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error
          ?? error.message
          : 'An unexpected error occurred'
          console.error('Failed to add course:', errorMessage);
          toast.error(errorMessage);
        }
      },
      updateCourse: async (id, data) => {
        try {
          const res = await axios.put(`/api/course/${id}`, data);
          set((state) => ({
            courses: state.courses.map((course) =>
              course.id === id ? { ...course, ...res.data } : course
            ),
          }));
          toast.success('Course successfully updated!')
        } catch (error) {
             const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error
          ?? error.message
          : 'An unexpected error occurred'
          console.error('Failed to update course:', errorMessage);
          toast.error(errorMessage)
        }
      },
      deleteCourse: async (id) => {
        try {
          await axios.delete(`/api/course/${id}`);
          set((state) => ({
            courses: state.courses.filter((course) => course.id !== id),
          }));
          toast.success('Course successfully deleted!');
        } catch (error) {
              const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error
          ?? error.message
          : 'An unexpected error occurred'
          console.error('Failed to delete course:', errorMessage);
          toast.error(errorMessage);
        }
      },
  

}))

export default useCourseStore