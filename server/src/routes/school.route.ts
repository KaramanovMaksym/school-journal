import { Router } from 'express'
import * as schoolController  from '../controllers/school.controller'

const schoolRouter: Router = Router()

// /api/schools

// Get all Schools
schoolRouter.get('/', schoolController.getAllSchools)

// Get School by ID
schoolRouter.get('/:documentID', schoolController.getSchool)

// Create new School document
schoolRouter.post('/', schoolController.addSchool)

// Delete School document by ID
schoolRouter.delete('/:documentID', schoolController.deleteSchool)

// Update School document by ID
schoolRouter.patch('/:documentID', schoolController.updateSchool)


export default schoolRouter
