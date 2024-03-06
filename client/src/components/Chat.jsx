import { IconButton, Divider, InputBase, Paper, Grid, Box, Typography, List, ListItem } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { useState, useEffect } from "react";
import { dialogs } from "../mokData/dialogs";
import _find from 'lodash/find'
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000")

export const Chat = () => {



    const [inputValue, setInputValue] = useState("")
    const [currentMesages, setCurrentMesages ] = useState([])

    async function sendMessage() {
        if (inputValue !== "") {
            const messageData = {
                author: "Human",
                message: inputValue
            }

            setCurrentMesages([...currentMesages, messageData])
            setInputValue("")

            await socket.emit("send_message", messageData)
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setCurrentMesages((list) => [...list, data])
        })
    },[])



    return <Grid item md sx={{ background: "#2563EB", display: 'flex', flexDirection: 'column', justifyContent: "space-between"  }}>
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
                            
                            <Box style={{width: '400px', height: 'content', border: 'none', resize: 'none'}}>
                                {message.message}
                            </Box>
                                
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
                
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <AudioFileIcon />
                </IconButton>
        </Paper>
    </Grid>
}