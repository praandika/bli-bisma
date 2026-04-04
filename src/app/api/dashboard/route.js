import { prisma } from "@/lib/prisma";

export async function GET() {
    const activities = await prisma.activity.findMany()

    const totalProspect = activities.reduce((sum, activity) => sum + activity.prospect, 0)
    const totalHotProspect = activities.reduce((sum, activity) => sum + activity.hotProspect, 0)
    const totalDeal = activities.reduce((sum, activity) => sum + activity.deal, 0)

    return Response.json({
        totalProspect,
        totalHotProspect,
        totalDeal,
        totalActivity: activities.length
    })
}
