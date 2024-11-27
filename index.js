import express from 'express'
import { dbConnection } from './dataBase/dbConnection.js'
import morgan from 'morgan'
import { routes } from './Src/modules/index.routes.js'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3001


//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('uploads'))
// // http://localhost:3001/brand/9d0dd53c-3786-4d3b-96f9-0c810a632e1b-man-using-external-storage-used_23-2149388492.jpg


 app.get('/', (req, res) => res.send('Hello World!'))

routes(app)
dbConnection()
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))
// handle error outside express
process.on('unhandledRejection',(err) => {
    console.log('unhandledRejection',err)
})