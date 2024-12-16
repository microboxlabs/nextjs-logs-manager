import { prisma } from "@/lib/prisma"


export const getInitData = async () => {

    const total = await prisma.log.count()
    const resp = await prisma.log.findMany({
        take: 5,
        skip: 0,
    })

    return {
        data: resp,
        pagination: {
            total,
            totalPages: Math.ceil(total / 5)
        }

    }
}