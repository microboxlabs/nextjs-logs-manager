import { prisma } from "@/lib/prisma"


export const getStatus = async () => {

    const logs = await prisma.log.findMany()
    const status: string[] = []
    logs.map(log => {
        if (!status.includes(log.status)) return status.push(log.status)
    })
    return {
        data: status
    }
}