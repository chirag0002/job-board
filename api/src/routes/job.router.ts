import { Router } from 'express'
import { authorization } from '../middlewares/auth.middleware'
import { createJob, deleteJob, getAllJobs, getJob, getMyJobs, updateJob } from '../controllers/job.controller'

export const app = Router()

app.post('/', authorization, createJob)
app.get('/myjobs', authorization, getMyJobs)
app.get('/:jobId', getJob)
app.get('/', getAllJobs)
app.put('/:jobId', authorization, updateJob)
app.delete('/:jobId', authorization, deleteJob)