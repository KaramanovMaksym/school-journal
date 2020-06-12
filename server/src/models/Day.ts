import {Schema, model, Types} from 'mongoose'
import { IDay } from '../interfaces/interfaces'

const DaySchema: Schema = new Schema({
    journal_id: {type: Types.ObjectId, required: true},
    date: {type: Date, required: true},
})

export default model<IDay>('Days', DaySchema)