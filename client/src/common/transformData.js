import { RowingTwoTone } from "@mui/icons-material"

export const transformData = (data) => {

    let result = []

    if (!data) {
        return null
    }

    data.shift()
    
    for (let row of data) {

            result.push({
                number: row[0],
                name: row[1],
                position: row[2],
                clothes: row[3],
                weapon: row[4],
                transport: row[5]
            })
    }

    return result
}