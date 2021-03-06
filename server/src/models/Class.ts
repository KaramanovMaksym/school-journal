import {Schema, model, Types} from 'mongoose'
import { IClass } from '../interfaces/interfaces'

const ClassSchema: Schema = new Schema({
    school_id: {type: Types.ObjectId, required: true, ref: 'Schools'},
    headTeacher_id: {type: Types.ObjectId, required: false, ref: 'Teachers'},
    classNumber: {type: Number, required: true},
    classLetter: {type: String, required: true},
})

export default model<IClass>('Classes', ClassSchema)