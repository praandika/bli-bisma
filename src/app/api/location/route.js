import {prisma} from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"

export async function POST(request) {
    try {
        const user = verifyToken(request)

        if (!user) {
            return Response.json(
                {error: "Unauthorized"},
                {status: 401}
            )
        }

        const body = await request.json()

        const location = await prisma.locationLog.create({
            data: {
                userId: user.id, // Ambil userId dari token yang sudah diverifikasi bukan dari body
                latitude: body.latitude,
                longitude: body.longitude,
            },
        })

        return Response.json(location)

    } catch (error) {
        console.error("Error in location API:", error)
        return Response.json(
            {error: "Failed to create location"},
            {status: 500}
        )
    }
}

export async function GET() {
    try {
        const locations = await prisma.locationLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 20,
            include: {
                user: {
                    select: {
                        name: true,
                        role: true
                    }
                }
            }

        })

        return Response.json(locations)

    } catch (error) {
        console.error("Error in location API GET:", error)
        return Response.json(
            {error: "Failed to fetch locations"},
            {status: 500}
        )
    }
}