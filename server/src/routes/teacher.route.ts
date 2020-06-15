import { Router } from 'express'
import * as teacherController  from '../controllers/teacher.controller'

const teacherRouter: Router = Router()

// /api/teachers

// Get all Teachers
teacherRouter.get('/', teacherController.getAllTeachers)

// Get Teacher by ID
teacherRouter.get('/:documentID', teacherController.getTeacher)

// Create new Teacher document
teacherRouter.post('/', teacherController.addTeacher)

// Delete Teacher document by ID
teacherRouter.delete('/:documentID', teacherController.deleteTeacher)

// Update Teacher document by ID
teacherRouter.patch('/:documentID', teacherController.updateTeacher)


export default teacherRouter
