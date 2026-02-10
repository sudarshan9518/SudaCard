import express from 'express'
import { email } from '../controllers/EmailController.js'


const emailRouter = express.Router()


emailRouter.post('/email', email )




export default emailRouter