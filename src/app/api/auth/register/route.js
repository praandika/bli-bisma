// Register API route for creating new users
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { generateToken } from "@/lib/auth"

export async function POST(request) {
    try {
        const body = await request.json()

        const hashedPassword = await bcrypt.hash(body.password, 10)

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                role: body.role,
                parentId: body.parentId || null,
            },
        })

        const token = generateToken(user)

        return Response.json({token, user})

    } catch (error) {
        console.error("Error in registration:", error)
        return Response.json(
            { error: "An error occurred during registration" },
            { status: 500 }
        )
    }
}