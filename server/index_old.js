import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'
import {createServer} from 'http'
import { Server } from 'socket.io'


dotenv.config()

const openai = new OpenAI()


const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173/"
}))

const server = createServer(app)
const io = new Server(server)

io.on('connection', socket => {
    socket.on('chat message', async (msg) => {
        const completion = await openai.chat.completions.create({
            messages: [{"role": "system", "content": msg}],
            model: "gpt-3.5-turbo"
        })
    
        const response = completion.choices[0].message.content;

        console.log(response)
        io.emit('chat message', response)
    })
})

app.get('/', (req, res) => {
    const {message} = req.body

    
})


const PORT = process.env.PORT || 8008
server.listen(PORT, () => console.log(`server started on port ${PORT}`))

