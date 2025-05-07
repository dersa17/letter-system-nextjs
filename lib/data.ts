import prisma  from "@/lib/prisma";




export const getUserCount = async () => {
    try {
        return await prisma.user.count();
    } catch (error) {
        console.error('Error fetching user count:', error);
        return 0;
    }
}

export const getJurusanCount = async () => {
    try {
        return await prisma.major.count()
    }catch (error) {
        console.log("Error fetching jurusan count:", error)
        return 0
    }
}

export const getMataKuliahCount = async () => {
    try {
        return await prisma.course.count()
    }catch (error) {
        console.log("Error fetching mata kuliah count:", error)
        return 0
    }
}

