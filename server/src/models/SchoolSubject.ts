import {Schema, model, Types} from 'mongoose'
import { ISchoolSubject } from '../interfaces/interfaces'

const SchoolSubjectSchema: Schema = new Schema({
    school_id: {type: Types.ObjectId, required: true},
    schoolSubject_id: {type: Types.ObjectId, required: true},
    year: {type: String, required: true},
})

export default model<ISchoolSubject>('SchoolSubjects', SchoolSubjectSchema)