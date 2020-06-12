import {Schema, model, Types} from 'mongoose'
import { ISchool } from '../interfaces/interfaces'

const UserSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    director: {type: String},
    phoneNumbers: {type: [Number], default: undefined},
    address: {type: String},
})

export default model<ISchool>('Schools', UserSchema)
