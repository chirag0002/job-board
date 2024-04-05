import { Request, Response } from 'express'
import { Admin } from '../db/db'
import { sign } from 'jsonwebtoken'


export const signUp = async (req: Request, res: Response) => {
    const { name, email, role } = req.body

    try {
        const admin = new Admin({
            name: name,
            email: email,
            role: role
        });
        await admin.save()

        const token = sign({ email: admin.email }, process.env.SECRET_KEY)

        res.status(200).json({
            message: "User saved successfully",
            token: token,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        const token = sign({ email: email }, process.env.SECRET_KEY)

        res.status(200).json({
            message: "User signedIn successfully",
            token: token,
        })
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}