import WeatherApp from './WeatherApp';
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";



export default function WeatherPage() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Mumbai",
        feelsLike: 32.81,
        humidity: 65,
        temp: 29.49,
        tempMin: 29.49,
        tempMax: 29.49,
        weather: "clear sky"
    });

    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Weather App by Delta</h2>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    );
}
