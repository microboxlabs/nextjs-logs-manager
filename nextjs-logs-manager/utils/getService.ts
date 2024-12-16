import { prisma } from "@/lib/prisma"

export const getService = async () => {

    const logs = await prisma.log.findMany()
    const service: string[] = []
    logs.map(log => {
        if (!service.includes(log.service)) return service.push(log.service)
    })
    return {
        data: service
    }
}