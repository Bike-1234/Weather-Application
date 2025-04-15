import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { colors } from "@mui/material";

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "39ccb13371fa92de264dc59869f8ceaa";  // Ensure to replace this with an actual secure API key

    const getWeatherInfo = async () => {
        try{
            const response = await fetch(
                `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        
            );
            const jsonResponse = await response.json();
            const result = {
            city: city,            
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        
        
        };
        console.log(result);  // Optional: Log result for debugging
        return result;
    }catch(err) {
        throw err;
        
    }
};

    const handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
        const newInfo = await getWeatherInfo(); // Fetch weather info only once
        updateInfo(newInfo);  // Update parent component state with new weather data
        setCity("");  // Clear the input field after the request
        }catch(err){
            setError("true");
        }
        
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br />
                <br />
                <Button variant="contained" type="submit">Search</Button>
                {error && <p style={{color: "red"}}>No such place exists</p>} 
            </form>
        </div>
    );
}
