import {Schema, model, Types} from 'mongoose'
import { IJournal } from '../interfaces/interfaces'

const JournalSchema: Schema = new Schema({
    school_id: {type: Types.ObjectId, required: true},
    schoolSubject_id: {type: Types.ObjectId, required: true},
    year: {type: String, required: true},
})

export default model<IJournal>('Journals', JournalSchema)