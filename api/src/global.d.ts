import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            admin: any
        }
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET_KEY: string
        }
    }
}