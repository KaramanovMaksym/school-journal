import { Router } from 'express'
import * as classController  from '../controllers/class.controller'

const classRouter: Router = Router()

// /api/classes

// Get all Class
classRouter.get('/', classController.getAllClasses)

// Get Class by ID
classRouter.get('/:documentID', classController.getClass)

// Create new Class document
classRouter.post('/', classController.addClass)

// Delete Class document by ID
classRouter.delete('/:documentID', classController.deleteClass)

// Update Class document by ID
classRouter.patch('/:documentID', classController.updateClass)


export default classRouter
