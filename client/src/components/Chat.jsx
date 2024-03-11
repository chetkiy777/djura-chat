import { IconButton, Divider, InputBase, Paper, Grid, Box, Typography, List, ListItem } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { useState, useEffect, useCallback, useRef } from "react";
import { dialogs } from "../mokData/dialogs";
import _find from 'lodash/find'
import io from "socket.io-client";
import { getGoogleSheet, getWeatherByCity } from "../api/api";

const socket = io.connect("http://localhost:5000")

export const Chat = ({itemId}) => {

    const elemRef = useRef(null)

    const [inputValue, setInputValue] = useState("")
    const [currentMesages, setCurrentMesages ] = useState([])


    async function getSheet() {
        return await getGoogleSheet()
    }

    useEffect(() => {

        getSheet()
        console.log(itemId)
    }, [itemId])



    useEffect(() => {
        elemRef?.current?.scrollIntoView({ top: elemRef.scrollHeight})
    }, [currentMesages])

    const sendMessage = useCallback(async function sendMessage() {
        if (inputValue !== "") {
            const messageData = {
                author: "Human",
                message: inputValue
            }

            setCurrentMesages((list) => [...list, messageData])
            setInputValue("")

            await socket.emit("send_message", messageData)
        }
    }, [inputValue])


    async function getWeather() {
        
        if (!inputValue) {
            return
        }

        const city = inputValue

        let result = await getWeatherByCity(city)

        console.log(result)
        if (result) {
            const message = {
                author: "openweather",
                message: JSON.stringify(result, null, 4)
            }

            setCurrentMesages(list => [...list, message])


        }

        setInputValue("")
        
    }


    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                sendMessage()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [sendMessage]);


    useEffect(() => {
        socket.on("receive_message", (data) => {
            setCurrentMesages((list) => [...list, data])
            elemRef?.current?.scrollIntoView({ top: elemRef.scrollHeight})
        })
    },[])



    return <Grid item md sx={{ background: "#2563EB", display: 'flex', flexDirection: 'column', justifyContent: "space-between"}}>
                <List 
                    sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    p: 2,
                    m: 2, 
                    height: '81vh',
                    overflowY: 'auto'
                }}>
                    {
                        currentMesages.map((message, index) => <ListItem key={index} sx={{
                            width: 'max-content',
                            display: 'flex',
                            p: 1,
                            marginBottom: 5,
                            background: '#fafafa',
                            alignSelf: message.from === 'bot' ? 'start' : 'end',
                            position: 'relative',
                            borderRadius: '5px'
                        }}>

                            <Typography sx={{position: 'absolute', top: '-25px', left: '10px', color: '#fafafa'}}>
                                {message.author}
                            </Typography>
                            
                            <span ref={elemRef} style={{width: '400px', wordWrap: "break-word", height: "auto"}}>{message.message}</span>
                                
                        </ListItem>)
                    }
                </List>

            <Paper
                component="form"
                sx={{ p: 1, m: 2, display: 'flex', justifyContent: 'flex-end', width: '95%'}}
                
            >
                
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="enter text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />

                <IconButton color="primary" type="button" sx={{ p: '10px' }} onClick={sendMessage}>
                    <SendIcon />
                </IconButton>

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={getWeather}>
                    <AudioFileIcon />
                </IconButton>
        </Paper>
    </Grid>
}