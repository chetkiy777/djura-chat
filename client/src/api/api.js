import axios from "axios"




export async function getWeatherByCity(city) {

    const appId = "fa3839290cb7600bd5f211a4dbb0490b"
    const url = "https://api.openweathermap.org/data/2.5/weather"

    const result = await axios.get(`${url}?q=${city}&appid=${appId}&units=metric`)
    
    if (result.status === 200) {
        return result.data

    }

}


export async function getGoogleSheet() {

    const url = "http://localhost:5000/getSheet"

    const result = await axios.get(url)
    
    if (result.status === 200) {
        return result.data
    }

}





