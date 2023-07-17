import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import http from 'http'
import 'dotenv/config'
import mongoose from 'mongoose'
import router from './router';

const app = express()

const PORT = process.env.PORT || 8081;
const USERNAME = process.env.MONGO_USERNAME
const PASSWORD = process.env.MONGO_PASSWORD
const CLUSTER = process.env.MONGO_CLUSTER

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser())

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log((`Server running on port ${PORT}`))
})

const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}`

mongoose.connection.on('connecting', () => {
    console.log('Connecting to Mongoose...')
})

mongoose.connection.on('connected', () => {
    console.log('Succesfully connected to Mongoose')
})
mongoose.connection.on('error', (error: Error) => {
    console.log(error)
})

mongoose.connect(MONGO_URI);


app.use('/', router())