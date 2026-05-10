import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import chatRoute from './routes/chat.js'
import documentRoute from './routes/document.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(chatRoute)
app.use(documentRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server ready on port: ${PORT}`))
