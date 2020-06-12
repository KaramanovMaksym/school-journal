import {Schema, model, Types} from 'mongoose'
import { ITeacher } from '../interfaces/interfaces'

const TeacherSchema: Schema = new Schema({
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        middleName: {type: String },
    },
    phoneNumbers: {type: [Number], default: undefined},
    address: {type: String},
})

export default model<ITeacher>('Teachers', TeacherSchema)