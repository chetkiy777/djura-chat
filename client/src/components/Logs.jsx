import { Box, List, ListItem, ListItemText, Typography, Grid, Drawer } from "@mui/material"
import { listItems } from "../mokData/logs-items"



export const Logs = (props) => {

    const {logsOpen, logsClose} = props

    return <Drawer anchor="bottom" open={logsOpen} onClose={logsClose}>
        <Grid item md={12}>
            <Box sx={{backgroundColor: "#111827", color: "#fafafa", flexGrow: 1, maxHeight: "400px"}}>
                <List>
                    {
                        listItems && listItems.map(item => 
                            <ListItem key={item.id}>
                                <Typography sx={{mr: 2, color: "#2563EB" }} component="span">
                                    {item.date}
                                </Typography>
                                
                                <ListItemText 
                                    primary={item.text}
                                />
                            </ListItem>)
                    }
                
                </List>
            </Box>
        </Grid>
    </Drawer>


}