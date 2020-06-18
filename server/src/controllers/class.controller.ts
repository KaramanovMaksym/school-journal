import { IClass } from '../interfaces/interfaces'
import Class from '../models/Class'
import { Response, Request } from 'express'
import { getAllDocuments, getDocument } from './helpers'

type ControllerFunction = (req: Request, res: Response) => Promise<Response> 

export const getAllClasses: ControllerFunction = async (req, res) => await getAllDocuments(Class, req, res)

export const getClass: ControllerFunction =  async (req, res) => await getDocument(Class, req, res)

export const addClass: ControllerFunction =  async (req, res) => {
    try {
        const { school_id, headTeacher_id, classNumber, classLetter }: IClass = req.body

        const newClass: IClass = new Class({
            school_id,
            headTeacher_id,
            classNumber,
            classLetter,
        })

        const dbResponse = await newClass.save()

        console.log('dbResponse outer', dbResponse)


        return res
            .status(201)
            .json({
                message: 'Create class successfully',
                newClass: dbResponse,
            })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}

export const deleteClass: ControllerFunction = async (req, res) => {
    try {
        const _id: string = req.params.documentID
        const deleteResult = await Class.deleteOne({_id})
        
        if (!deleteResult.ok) {
            return res
                .status(404)
                .json({ message: `Class with ID=${_id} didn\'t delete` })
        }
        
        if (!deleteResult.deletedCount) {
            return res
                .status(404)
                .json({ message: `Class with ID=${_id} doesn't exist` })
        }

        return res
            .status(200)
            .json({ message: `Class ID=${_id} deleted`, deleteResult })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}

export const updateClass: ControllerFunction = async (req, res) => {
    try {
        const _id: string = req.params.documentID
        const updatedClass: IClass = req.body
        const updateResult = await Class.update(
            { _id },
            { $set: { ...updatedClass } }
        )
        
        if (!updateResult.ok) {
            return res.status(404).json({ message: 'Nothing updated' })
        }

        return res
            .status(200)
            .json({ message: `Class ID=${_id} updated`, updateResult })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}
