import express from 'express'
import cors from'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import "reflect-metadata"
import { AppDataSource } from './initializers/data-source'
import LoginRouter from './routes/login'
import UserRouter from './routes/user'
import FitnessRecordRouter from './routes/fitness_record'
import ActivityRouter from './routes/activity'
import RecommendationRouter from './routes/recommendation'




// setting up server
const port: number = 8080
const app = express()
app.use(cors()) 
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// ROUTES
app.use('/login', LoginRouter)
app.use('/user', UserRouter)
app.use('/fitness_record', FitnessRecordRouter)
app.use('/activity', ActivityRouter)
app.use('/recommendation', RecommendationRouter)


// initiatlizing db & starting server
AppDataSource.initialize()
.then(() => {
    app.listen(port, () => { console.log(`Server is running on port ${port}`) })
})
.catch((err) => console.log(err))