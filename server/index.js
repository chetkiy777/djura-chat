import {google} from "googleapis"
import {Server} from "socket.io"
import dotenv from "dotenv"
import OpenAI from "openai"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import http from "http"
dotenv.config()


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



const serviceAccountKeyFile = "./djura-chat-09231493e075.json";
const sheetId = '1hb_7oXfhETxvLiOMdp5lESKp4XrwM-KvAw-FMBH4Ldc'
const tabName = 'users'
const range = 'A:H'


main().then(() => {
    console.log('Completed')
  })
  
  async function main() {
    // Generating google sheet client
    const googleSheetClient = await _getGoogleSheetClient();
  
    // Reading Google Sheet from a specific range
    const data = await _readGoogleSheet(googleSheetClient, sheetId, tabName, range);
    console.log(data);
    
    // Adding a new row to Google Sheet
    const dataToBeInserted = [
       ['11', 'rohith', 'Rohith', 'Sharma', 'Active'],
       ['12', 'virat', 'Virat', 'Kohli', 'Active']
    ]
    // await _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, dataToBeInserted);
}


async function _readGoogleSheet(googleSheetClient, sheetId, tabName, range) {
    const res = await googleSheetClient.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${tabName}!${range}`,
    });

    return res.data.values;
}


async function _getGoogleSheetClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccountKeyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();
    return google.sheets({
      version: 'v4',
      auth: authClient,
    });
}




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

