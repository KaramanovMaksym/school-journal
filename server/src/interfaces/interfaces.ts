import {Document} from 'mongoose'

export interface ISchool extends Document {
    name: string
    director?: string
    phoneNumbers?: Array<number>
    address?: string
}

export interface ITeacher extends Document {
    name: IName
    phoneNumbers?: Array<number>
    address?: string
}

export interface IClass extends Document {
    school_id: ID
    headTeacher_id: ID
    classNumber: number
    classLetter: string
}

export interface IStudent extends Document {
    class_id: ID
    name: IName
    healthGroup: HealthGroup
    phoneNumbers?: Array<number>
    address?: string
}

export interface ISchoolSubject extends Document {
    name: string
}

export interface IJournal extends Document {
    school_id: ID
    schoolSubject_id: ID
    year: number
}

export interface IDay extends Document {
    class_id: ID
    day_id: ID
    headTeacher_id: ID
    lessonNumber: number
    theme?: string
    // ratings: 
}

export interface IRating extends Document {
    lesson_id: ID
    student_id: ID
    subject_id: ID
    headTeacher_id: ID
    value: RatingValue,
    typeOfWork?: string
}

export interface ILesson extends Document {
    journal_id: ID
    date: Date
}

interface IName { 
    firstName: string
    lastName: string
    middleName: string
}

type HealthGroup = 'Основна' | 'Підготовча'| 'Спеціальна' | 'Звільнені'
type ID = string | number
type RatingValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
