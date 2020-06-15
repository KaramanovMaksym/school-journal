import { ITeacher, ISchool, IStudent, IClass } from '../interfaces/interfaces'
import Teacher from '../models/Teacher'
import { Response, Request } from 'express'
import { getAllDocuments, getDocument } from './helpers'

type ControllerFunction = (req: Request, res: Response) => Promise<Response> 

export const getAllTeachers: ControllerFunction = async (req, res) => getAllDocuments(Teacher, req, res)

export const getTeacher: ControllerFunction =  async (req, res) => getDocument(Teacher, req, res)

export const addTeacher: ControllerFunction =  async (req, res) => {
    try {
        const { name, address, phoneNumbers }: ITeacher = req.body

        const newTeacher: ITeacher = new Teacher({
            name,
            address,
            phoneNumbers,
        })

        const dbResponse = await newTeacher.save()

        console.log('dbResponse outer', dbResponse)


        return res
            .status(201)
            .json({
                message: 'Handling POST request to /Teachers',
                newTeacher: dbResponse,
            })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}

export const deleteTeacher: ControllerFunction = async (req, res) => {
    try {
        const _id: string = req.params.TeacherID
        const deleteResult = await Teacher.deleteOne({_id})
        
        if (!deleteResult.ok) {
            return res
                .status(404)
                .json({ message: `Teacher with ID=${_id} didn\'t delete` })
        }
        
        if (!deleteResult.deletedCount) {
            return res
                .status(404)
                .json({ message: `Teacher with ID=${_id} doesn't exist` })
        }

        return res
            .status(200)
            .json({ message: `Teacher ID=${_id} deleted`, deleteResult })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}

export const updateTeacher: ControllerFunction = async (req, res) => {
    try {
        const _id: string = req.params.TeacherID
        const Teacher: ITeacher = req.body
        const updateResult = await Teacher.update(
            { _id },
            { $set: { ...Teacher } }
        )
        
        if (!updateResult.ok) {
            return res.status(404).json({ message: 'Nothing updated' })
        }

        return res
            .status(200)
            .json({ message: `Teacher ID=${_id} updated`, updateResult })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}
