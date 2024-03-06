import { useState } from "react"
import { Grid, Box, IconButton, Button, TextField } from "@mui/material"
import { TreeView, TreeItem } from "@mui/x-tree-view"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { v4 as uuidv4 } from 'uuid'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import { flatMap, iteratee } from "lodash"
import { Mode } from "@mui/icons-material"


let data = {
    id: 'root',
    name: 'Root',
    children: [
      {
        id: "1",
        name: 'Chetkiy',
        children: [
          {
            id: "2",
            name: 'Designer',
            children: []
          }
        ],
      },
      {
        id: "3",
        name: 'Nazar',
        children: [
          {
            id: "4",
            name: 'Anomymous',
            children: []
          },
          {
            id: "5",
            name: 'BackendGuru',
            children: []
          },
        ],
      },
      {
        id: "6",
        name: 'Ed',
        children: [
          {
            id: "7",
            name: 'Simon',
            children: []
          },
          {
            id: "8",
            name: 'Major',
            children: []
          },
        ]
      }
    ],
  };




export const TreeMUI = ({setItemId}) => {

    const handleSelect = (event, nodeId) => {
        setItemId(nodeId)
      };

    const renderTree = (nodes) => (
        <Box sx={{display: 'flex'}} key={nodes.id} >
            <TreeItem 
                nodeId={nodes.id} 
                label={nodes.name}
            >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
            </TreeItem>
        </Box>
      );


      
    return <Grid item md sx={{display: 'flex', p: 2}}>
        <Box sx={{ minHeight: 110, flexGrow: 1, maxWidth: 300 }}>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={['root']}
                onNodeSelect={handleSelect}
            >
                {renderTree(data)}
            </TreeView>
        </Box>

    </Grid>
}