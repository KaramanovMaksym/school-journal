import {Schema, model, Types} from 'mongoose'
import { IStudent } from '../interfaces/interfaces'

const StudentSchema: Schema = new Schema({
    class_id: {type: Types.ObjectId, required: true},
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        middleName: {type: String },
    },
    healthGroup: {type: String, required: true},
    phoneNumbers: {type: [Number], default: undefined},
    address: {type: String},
})

export default model<IStudent>('Students', StudentSchema)