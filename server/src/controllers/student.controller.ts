import { IStudent } from '../interfaces/interfaces'
import { Response, Request } from 'express'
import { getAllDocuments, getDocument } from './helpers'
import Student from '../models/Student'

type ControllerFunction = (req: Request, res: Response) => Promise<Response> 

export const getAllStudents: ControllerFunction = async (req, res) => getAllDocuments(Student, req, res)

export const getStudent: ControllerFunction =  async (req, res) => getDocument(Student, req, res)

export const addStudent: ControllerFunction =  async (req, res) => {
    try {
        const { name, healthGroup, phoneNumbers, address, class_id}: IStudent = req.body

        const newStudent: IStudent = new Student({
            name,
            address,
            phoneNumbers,
            healthGroup,
            class_id,
        })

        const dbResponse = await newStudent.save()

        console.log('dbResponse outer', dbResponse)


        return res
            .status(201)
            .json({
                message: 'Create student successfully',
                newStudent: dbResponse,
            })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}

export const deleteStudent: ControllerFunction = async (req, res) => {
    try {
        const _id: string = req.params.documentID
        const deleteResult = await Student.deleteOne({_id})
        
        if (!deleteResult.ok) {
            return res
                .status(404)
                .json({ message: `Student with ID=${_id} didn\'t delete` })
        }
        
        if (!deleteResult.deletedCount) {
            return res
                .status(404)
                .json({ message: `Student with ID=${_id} doesn't exist` })
        }

        return res
            .status(200)
            .json({ message: `Student ID=${_id} deleted`, deleteResult })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}

export const updateStudent: ControllerFunction = async (req, res) => {
    try {
        const _id: string = req.params.documentID
        const student: IStudent = req.body
        const updateResult = await Student.updateOne({ _id},

            { $set: { ...student } }
        )
        console.log('updateResult', updateResult)
        if (!updateResult.ok) {
            return res.status(404).json({ message: 'Nothing updated' })
        }

        return res
            .status(200)
            .json({ message: `Student ID=${_id} updated`, updateResult })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}
