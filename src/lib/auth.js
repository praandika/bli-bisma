// HELPER JWT
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"

// Buat Token
export function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
}

// Protect API = Verify token (akses API)
export function verifyToken(request) {
    try {
        const authHeader = request.headers.get("authorization")

        if (!authHeader) return null

        const token = authHeader.split(" ")[1]

        return jwt.verify(token, JWT_SECRET)

    } catch (error) {
        return null
    }
}