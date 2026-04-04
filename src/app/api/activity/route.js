import { prisma } from "@/lib/prisma"

export async function POST(request) {
    try {
        const body = await request.json()

        const activity = await prisma.activity.create({
            data: {
                userId: body.userId,
                title: body.title,
                latitude: body.latitude,
                longitude: body.longitude,
                qtyEmp: body.qtyEmp,
                prospect: body.prospect,
                hotProspect: body.hotProspect,
                deal: body.deal,
            },
        })

        return Response.json(activity)

    } catch (error) {
        console.error("Error in activity API:", error)
        return Response.json(
            {error: "Failed to create activity"},
            {status: 500}
        )
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get("userId")

        const activities = await prisma.activity.findMany({
            where: userId ? { userId: Number(userId) } : {},
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
        })

        return Response.json(activities)

    } catch (error) {
        console.error("Error in activity API GET:", error)
        return Response.json(
            {error: "Failed to fetch activities"},
            {status: 500}
        )
    }
}