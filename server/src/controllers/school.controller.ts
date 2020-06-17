import { ISchool } from '../interfaces/interfaces'
import School from '../models/School'
import { Response, Request } from 'express'
import { getAllDocuments, getDocument } from './helpers'

type ControllerFunction = (req: Request, res: Response) => Promise<Response> 

export const getAllSchools: ControllerFunction = async (req, res) => await getAllDocuments(School, req, res)

export const getSchool: ControllerFunction =  async (req, res) => await getDocument(School, req, res)

export const addSchool: ControllerFunction =  async (req, res) => {
    try {
        const { name, director, address, phoneNumbers }: ISchool = req.body

        const newSchool: ISchool = new School({
            name,
            director,
            address,
            phoneNumbers,
        })

        const dbResponse = await newSchool.save()

        console.log('dbResponse outer', dbResponse)


        return res
            .status(201)
            .json({
                message: 'Create school successfully',
                newSchool: dbResponse,
            })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}

export const deleteSchool: ControllerFunction = async (req, res) => {
    try {
        const _id: string = req.params.schoolID
        const deleteResult = await School.deleteOne({_id})
        
        if (!deleteResult.ok) {
            return res
                .status(404)
                .json({ message: `School with ID=${_id} didn\'t delete` })
        }
        
        if (!deleteResult.deletedCount) {
            return res
                .status(404)
                .json({ message: `School with ID=${_id} doesn't exist` })
        }

        return res
            .status(200)
            .json({ message: `School ID=${_id} deleted`, deleteResult })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}

export const updateSchool: ControllerFunction = async (req, res) => {
    try {
        const _id: string = req.params.schoolID
        const school: ISchool = req.body
        const updateResult = await School.update(
            { _id },
            { $set: { ...school } }
        )
        
        if (!updateResult.ok) {
            return res.status(404).json({ message: 'Nothing updated' })
        }

        return res
            .status(200)
            .json({ message: `School ID=${_id} updated`, updateResult })

    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}
