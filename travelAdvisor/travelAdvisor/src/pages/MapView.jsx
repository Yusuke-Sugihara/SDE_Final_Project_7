import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Header, Map, Sidebar, Filter } from "../components/map";
import { MainContext } from "../context/MainContext";
import { getWeather } from "../api/index"; // Adjust the import path as necessary

const MapView = () => {
    const { places, coordinates, setCoordinates, setBounds, filteredPlaces } = useContext(MainContext);
    const history = useHistory();
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (coordinates.lat && coordinates.lng) {
                try {
                    const weatherData = await getWeather(coordinates.lat, coordinates.lng);
                    console.log(weatherData); // Log the fetched data to the console
                    setWeather(weatherData);
                } catch (error) {
                    console.error("Error fetching weather data: ", error);
                }
            }
        };
    
        fetchWeatherData();
    }, [coordinates]);
    

    return ( 
        <div className="w-full flex flex-wrap-reverse md:flex-nowrap md:h-screen">
            <div className="h-auto md:h-full w-full md:w-[35%] lg:w-[23%] md:overflow-y-scroll"> 
                <div className="w-full text-center">
                    <button className="bg-black text-white py-2 px-8 rounded my-2 hover:bg-gray-600 transition ease-in duration-100"
                        onClick={() => history.goBack()}
                    >
                        <p>Close Map View</p>
                    </button>
                </div>
                <Sidebar places={filteredPlaces ? filteredPlaces : places} />
            </div>
            <div className="h-[50vh] md:h-full w-full md:w-[65%] lg:w-[79%] relative">
                <Header setCoordinates={setCoordinates} />
                <Map 
                    setBounds={setBounds}
                    setCoordinates={setCoordinates}
                    coordinates={coordinates}
                    places={filteredPlaces ? filteredPlaces : places}
                />
                <Filter />
                {weather && (
                    <div className="weather-info">
                       <p className="weather-text"> Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
                       <p className="weather-text"> Humidity: {Math.round(weather.main.humidity)}%</p>
                        {/* You can add more weather details here */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MapView;
