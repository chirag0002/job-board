import { Router } from "express"
import { app as adminRouter } from './admin.router'
import { app as jobRouter } from './job.router'

export const app = Router()

app.use('/admin', adminRouter)
app.use('/job', jobRouter)