import express from 'express'
import { submitContact } from '../controllers/contact.controller.js'
import { validate, contactSchema } from '../validation/schema.js'

const contactRouter = express.Router()

// Public endpoint - no authentication required
contactRouter.post('/submit', validate(contactSchema), submitContact)

export default contactRouter

