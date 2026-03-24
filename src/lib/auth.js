// HELPER JWT
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"

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

export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}