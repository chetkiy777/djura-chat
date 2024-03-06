import { Grid } from "@mui/material"
import styled from "styled-components"


const RootList = styled.ul`
    & li {
        position: relative;
        padding-top: 20px;
    }

    & li::before {
        content:"";
        border-left: 3px solid #000;
        position: absolute;
        height: 100%;
        top: 0;
        left: -30px;
    }

    & li::after {
        content: "";
        border-bottom: 3px solid #000;
        position: absolute;
        left: -30px;
        top: 30px;
        width: 20px;
    }

    & li:last-child::before {
        height: 30px;
    }
`

const List = styled.ul`
    list-style: none;
`

const ListItemButton = styled.button`
    display: block;
    border: 1px solid #000;
    padding: 3px 5px;
`

export const Tree = (props) => {
    return <Grid item md sx={{display: 'flex', p: 2}}>
        <RootList>
            <li>
                <ListItemButton>Root</ListItemButton>
                <List>
                    <li><ListItemButton onClick={(e) => console.log(e)}>Igor Chetkiy</ListItemButton>
                        <List>
                            <li>
                                <ListItemButton>DesignerX</ListItemButton>
                            </li>
                        </List>
                    </li>
                    <li><ListItemButton>Naraz</ListItemButton>
                        <List>
                            <li>
                                <ListItemButton>
                                    Anonymous
                                </ListItemButton>
                            </li>

                            <li>
                                <ListItemButton>
                                    BackEnderX
                                </ListItemButton>
                            </li>
                        </List>
                    </li>

                    <li>
                        <ListItemButton>
                            Ed
                        </ListItemButton>

                        <List>
                            <li>
                                <ListItemButton>
                                    Simon
                                </ListItemButton>    
                            </li>

                            <li>
                                <ListItemButton>
                                    Major
                                </ListItemButton>    
                            </li>
                        </List>
                    </li>
                </List>
            </li>

        </RootList>
    </Grid>
        
}