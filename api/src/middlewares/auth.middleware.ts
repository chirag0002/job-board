import { NextFunction, Request, Response } from "express"
import { verify, VerifyErrors } from "jsonwebtoken"
import { Admin } from "../db/db"

export const adminValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    const admin = await Admin.findOne({ email: email })
    if (admin) return res.status(401).json({ message: "Admin already exists" })

    next()
}

export const adminAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    const admin = await Admin.findOne({ email: email })
    if (!admin) return res.status(401).json({ message: "Admin does not exist" })

    next()
}

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']

    if (!token) return res.status(401).json({ message: 'No auth token provided' })

    verify(token, process.env.SECRET_KEY, async (err: VerifyErrors | null, decoded: any) => {
        if (err) return res.status(401).json({ message: 'Invalid auth token' })

        try {
            const admin = await Admin.findOne({ email: decoded.email })
            if (!admin) return res.status(404).json({ message: 'User not found, unauthorised access' })

            req.admin = admin
            next()
        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    })
}