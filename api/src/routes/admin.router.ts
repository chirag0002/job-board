import { Router } from 'express'
import { adminAuthentication, adminValidation } from '../middlewares/auth.middleware'
import { signIn, signUp } from '../controllers/admin.controller'

export const app = Router()

app.post('/signup', adminValidation, signUp)
app.post('/signin', adminAuthentication, signIn)