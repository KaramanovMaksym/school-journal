import {Schema, model, Types} from 'mongoose'
import { ILesson } from '../interfaces/interfaces'

const LessonSchema: Schema = new Schema({
    class_id: {type: Types.ObjectId, required: true},
    day_id: {type: Types.ObjectId, required: true},
    headTeacher_id: {type: Types.ObjectId, required: true},
    lessonNumber: {type: Number, required: true},
    theme: {type: String},
    // ratings
})

export default model<ILesson>('Lessons', LessonSchema)