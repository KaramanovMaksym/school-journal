import {Schema, model, Types} from 'mongoose'
import { IRating } from '../interfaces/interfaces'

const RatingSchema: Schema = new Schema({
    lesson_id: {type: Types.ObjectId, required: true},
    student_id: {type: Types.ObjectId, required: true},
    subject_id: {type: Types.ObjectId, required: true},
    headTeacher_id: {type: Types.ObjectId, required: true},
    value: {type: Number, required: true},
    typeOfWork: {type: String},
})

export default model<IRating>('Ratings', RatingSchema)