// Login API route for user authentication
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { generateToken } from "@/lib/auth"

export async function POST(request) {
    try {
        const body = await request.json()

        const user = await prisma.user.findUnique({
            where: {email: body.email},
        })

        if (!user)
            return Response.json(
                { error: "User not found" },
                { status: 401 }
            )
        
        const isValid = await bcrypt.compare(
            body.password,
            user.password
        )

        if (!isValid)
            return Response.json(
                { error: "Wrong password" },
                { status: 401 }
            )

        const token = generateToken(user)

        return Response.json({token, user})
        
    } catch (error) {
        console.error("Error in login:", error)
        return Response.json(
            { error: "An error occurred during login" },
            { status: 500 }
        )
    }
}