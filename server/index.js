import dotenv from "dotenv"
import OpenAI from "openai"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config()
import {Server} from "socket.io"
import http from "http"
import { env } from "process"

const app = express()
app.use(cors())
app.use(bodyParser.json())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

io.on("connection", (socket) => {

    socket.on("send_message", async (data) => {
        const {message} = data
        console.log(message)
        try {
            const response = await openai.completions.create({
                model: "gpt-3.5-turbo-instruct",
                prompt: message,
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
    
            if (response) {
                const botAnswer = response.choices[0].text

                const answerTpClient = {
                    "author": "AI",
                    "message": botAnswer
                }
                socket.emit("receive_message", answerTpClient)
            }
    
        } catch(e) {
            console.log(e)
        }


    })

    socket.on("disconnect", () => {
        console.log("User is disconnected")
    })
})


const PORT = process.env.PORT || 5000


app.post("/bot", async (req, res) => {
    const {message} = req.body

    const botAnswer = await promptAi(message)

    res.send(botAnswer)
})

server.listen(PORT, () => console.log(`server is running on port ${PORT}`))

