import { Document as MongooseDocument, Model } from 'mongoose'
import { Response, Request } from 'express'

export const getAllDocuments = async <T extends MongooseDocument> (model: Model<T>, req: Request, res: Response) => {
    try {
        console.dir(model.modelName)
        const document = await model.find()
        if (document.length === 0) { 
            return res
                .status(404)
                .json({ message: `Collection ${model.modelName} is empty` })
        }
        return res.status(200).json(document)
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', error })
    }
}

export const getDocument = async <T extends MongooseDocument> (model: Model<T>, req: Request, res: Response) => {
    try {
        const id: string = req.params.documentID
        const searchDocument = await model.findById(id)

        if (!searchDocument) {
            return res
                .status(404)
                .json({ message: `${model.modelName} with current id doesn't exist` })
        }
        return res.status(200).json(searchDocument)

    } catch (err) {
        console.log('Error', err)
        return res
            .status(500)
            .json({ message: 'Something wrong, please repeat request', err })
    }
}