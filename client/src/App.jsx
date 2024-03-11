import { Chat } from "./components/Chat";
import { Logs } from "./components/Logs";
import { Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { TreeMUI } from "./components/TreeMUI";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';


function App() {

  const [logsOpen, setIsLogsOpen] = useState(false)
  const [itemId, setItemId] = useState("")

  return (
    <Grid container sx={{maxHeight: '100vh', position: 'relative'}}>
        <TreeMUI setItemId={setItemId}/>
        <Chat itemId={itemId}/>
        <Logs 
          logsOpen={logsOpen} 
          logsClose={() => setIsLogsOpen(false)}
        />

        <IconButton  
          sx={{position: 'absolute', bottom: 10, left: 10}} 
          onClick={() => setIsLogsOpen(true)}
        >
          <OpenInBrowserIcon color="primary" />
          <Typography variant="h6" color="primary">Logs</Typography>
        </IconButton>
        
    </Grid>
  );
}

export default App;
