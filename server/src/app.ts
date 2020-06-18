import express, {Application, Request, Response, NextFunction } from 'express'
import config from 'config'
import db from 'mongoose'
import { schoolRouter, teacherRouter, studentRouter, classRouter } from './routes'

const app: Application = express()

app.use(express.json())
app.use('/api/schools', schoolRouter)
app.use('/api/teachers', teacherRouter)
app.use('/api/students', studentRouter)
app.use('/api/classes', classRouter)

const PORT: number = config.get('port') || 5000
const DB_URI: string = config.get('mongoURI')

const start = async (): Promise<void> => {
    try {
        await db.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Main Page')
})

start()
