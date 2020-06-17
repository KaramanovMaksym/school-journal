import { Router } from 'express'
import * as studentController  from '../controllers/student.controller'

const studentRouter: Router = Router()

// /api/students

// Get all students
studentRouter.get('/', studentController.getAllStudents)

// Get student by ID
studentRouter.get('/:documentID', studentController.getStudent)

// Create new student document
studentRouter.post('/', studentController.addStudent)

// Delete student document by ID
studentRouter.delete('/:documentID', studentController.deleteStudent)

// Update student document by ID
studentRouter.patch('/:documentID', studentController.updateStudent)


export default studentRouter
