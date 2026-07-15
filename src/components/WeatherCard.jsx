import React from "react"
import ForecastCard from "./ForecastCard"
function WeatherCard({
  city,
  country,
  weather,
  weatherType,
  temperature,
  time,
  wind,
  humidity,
  maxTemp,
  minTemp,
  sunrise,
  sunset,
  forecast,
  darkMode,
}) {

  const getWeatherIcon = (code) => {
  if (code === 0) return "☀️"
  if (code === 1 || code === 2) return "⛅"
  if (code === 3) return "☁️"
  if (code >= 51 && code <= 67) return "🌦️"
  if (code >= 71 && code <= 77) return "❄️"
  if (code >= 80 && code <= 82) return "🌧️"
  if (code >= 95) return "⛈️"

  return "🌍"
}  
return (
 <div
  style={{
  backgroundColor: darkMode
  ? "#0f172a"
  : "rgba(255,255,255,0.9)",

    color: darkMode ? "white" : "black",

    backdropFilter: "blur(8px)",

    width: "100%",
    maxWidth: "380px",

    margin: "20px auto",

    padding: "20px",

    borderRadius: "24px",

  boxShadow: darkMode
  ? "0 10px 30px rgba(0,0,0,0.6)"
  : "0 10px 25px rgba(0,0,0,0.15)",

    transition: "0.4s",
  }}
>
    
      <h2>📍 {city}{country && `, ${country}`}</h2>

      <h2>{weather}</h2>

      <h3>{weatherType}</h3>

      <h1>{temperature}</h1>

      <p
  style={{
    fontSize: "18px",
    color: "#555",
    marginTop: "10px",
  }}
>
  🕒 {time}
</p>

      {wind && <p>💨 Wind: {wind}</p>}
      <p>💧 Humidity: {humidity}</p>
      <p>🔺 Max: {maxTemp}</p>
<p>🔻 Min: {minTemp}</p>
<p>🌅 Sunrise: {sunrise}</p>
<p>🌇 Sunset: {sunset}</p>
<h2>📅 Next 5 Days</h2>

   <div
  style={{
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    marginTop: "15px",
  }}
>
{forecast &&
  forecast.time &&
  forecast.time.map((day, index) => (
    <ForecastCard
      key={index}
      day={new Date(day).toLocaleDateString("en-US", {
        weekday: "short",
      })}
      icon={getWeatherIcon(forecast.weather_code[index])}
      max={forecast.temperature_2m_max[index]}
      min={forecast.temperature_2m_min[index]}
    />
  ))}
</div>

</div>

)
}

export default WeatherCard
