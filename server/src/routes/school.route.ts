import { Router, Request, Response } from 'express'
import School from '../models/School'
import { ISchool } from '../interfaces/interfaces'

const schoolRouter: Router = Router()

// /api/schools

// Get all Schools
schoolRouter.get('/', async (req: Request, res: Response) => {
    try {
        const schools: ISchool[] = await School.find()
        if (schools.length === 0) {
            return res.status(404).json({ message: 'Collection Schools is empty' })
        }
        res.status(200).json(schools)

    } catch (err) {
        res.status(500).json({ message: 'Something wrong, please repeat request', err })
    }
})

// Get School by ID
schoolRouter.get('/:schoolID', async (req: Request, res: Response) => {
    try {
        const id: string = req.params.schoolID
        const searchSchool: ISchool | null = await School.findById(id)
        if (!searchSchool) {
            return res.status(404).json({ message: 'School with current id doesn\'t exist' })
        }
        res.status(200).json(searchSchool)

    } catch (err) {
        console.log('Error', err)
        res.status(500).json({ message: 'Something wrong, please repeat request', err })
    }
})

// Create new School document
schoolRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { name, director, address, phoneNumbers }: ISchool = req.body

        const newSchool: ISchool = new School({
            name,
            director,
            address,
            phoneNumbers,
        })

        await newSchool.save()

        res.status(201).json({
            message: 'Handling POST request to /schools',
            newSchool,
        })

    } catch (err) {
        res.status(500).json({ message: 'Something wrong, please repeat request', err })
    }
})

// Delete School document by ID
schoolRouter.delete('/:schoolID', async (req: Request, res: Response) => {
    try {
        const _id: string = req.params.schoolID
        const deleteResult = await School.deleteOne({_id})
        
        if (!deleteResult) {
            return res.status(404).json({message: `School with ID=${_id} didn\'t delete`})
        }

        res.status(200).json({
            message: `School ID=${_id} deleted`,
            deleteResult
        })

    } catch (err) {
        res.status(500).json({ message: 'Something wrong, please repeat request', err })
    }
})

// Update School document by ID
schoolRouter.patch('/:schoolID', async (req: Request, res: Response) => {
    try {
        const _id: string = req.params.schoolID
        const school: ISchool = req.body
        const updateResult = await School.update({_id}, {$set: {...school}})
        
        if (!updateResult.ok) {
            return res.status(404).json({message: 'Nothing updated'})
        }

        res.status(200).json({
            message: `School ID=${_id} updated`,
            updateResult
        })

    } catch (err) {
        res.status(500).json({ message: 'Something wrong, please repeat request', err })
    }
})


export default schoolRouter
