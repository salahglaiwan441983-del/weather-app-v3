import { useState, useEffect } from "react"
import WeatherCard from "./components/WeatherCard"
import "./App.css"
function App() {

  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [temperature, setTemperature] = useState("")
const [time, setTime] = useState("")
const [country, setCountry] = useState("")
const [wind, setWind] = useState("")
const [weatherType, setWeatherType] = useState("")
const [weather, setWeather] = useState("")
const [humidity, setHumidity] = useState("")
const [maxTemp, setMaxTemp] = useState("")
const [minTemp, setMinTemp] = useState("")
const [sunrise, setSunrise] = useState("")
const [sunset, setSunset] = useState("")
const [forecast, setForecast] = useState([])
const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites")
  return saved ? JSON.parse(saved) : []
})
const [darkMode, setDarkMode] = useState(false)
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported")
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      setLoading(true)

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
        )

        const data = await response.json()
setWeather("📍 Current Location")
        setForecast(data.daily)
        setTemperature(data.current.temperature_2m + "°C")
        setWind(data.current.wind_speed_10m + " km/h")
        setHumidity(data.current.relative_humidity_2m + "%")

        setMaxTemp(data.daily.temperature_2m_max[0] + "°C")
        setMinTemp(data.daily.temperature_2m_min[0] + "°C")

        setSunrise(
          new Date(data.daily.sunrise[0]).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })
        )

        setSunset(
          new Date(data.daily.sunset[0]).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })
        )

        setTime(
          new Date(data.current.time).toLocaleString("en-GB")
        )

      
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    },
    () => {
      alert("Location access denied")
    }
  )
}
const getWeather = async () => {
  if (city === "") {
    setWeather("Please enter a city ⚠️")
    return
  }

  setLoading(true)

  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    )

    const geoData = await geoResponse.json()

    if (!geoData.results) {
      setWeather("City not found ❌")
      setTemperature("")
      setTime("")
      setCountry("")
      setWind("")
      setWeatherType("")
      setLoading(false)
      return
    }

    const latitude = geoData.results[0].latitude
    const longitude = geoData.results[0].longitude

    setCountry(geoData.results[0].country)
const response = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
)
const data = await response.json()
setForecast(data.daily)
setTemperature(data.current.temperature_2m + "°C")
setMaxTemp(data.daily.temperature_2m_max[0] + "°C")
setMinTemp(data.daily.temperature_2m_min[0] + "°C")
const sunriseTime = new Date(data.daily.sunrise[0]).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
})

const sunsetTime = new Date(data.daily.sunset[0]).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
})

setSunrise(sunriseTime)
setSunset(sunsetTime)

const date = new Date(data.current.time)

const formattedTime = date.toLocaleString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

setTime(formattedTime)
setWind(data.current.wind_speed_10m + " km/h")
setHumidity(data.current.relative_humidity_2m + "%")
setWeather(`🌦️ Weather in ${geoData.results[0].name}`)

const code = data.current.weather_code

    if (code === 0) {
      setWeatherType("☀️ Sunny")
    } else if (code >= 1 && code <= 3) {
      setWeatherType("⛅ Partly Cloudy")
    } else if (code >= 45 && code <= 48) {
      setWeatherType("🌫️ Fog")
    } else if (code >= 51 && code <= 67) {
      setWeatherType("🌦️ Rain")
    } else if (code >= 71 && code <= 77) {
      setWeatherType("❄️ Snow")
    } else if (code >= 80 && code <= 99) {
      setWeatherType("⛈️ Storm")
    } else {
      setWeatherType("🌍 Unknown")
    }

 } catch (error) {
  console.log(error)
  setWeather("Error ❌")
}

  setLoading(false)
}
const addFavorite = () => {
  if (
    city !== "" &&
    !favorites.includes(city)
  ) {
    setFavorites([...favorites, city])
  }
}
const removeFavorite = (cityName) => {
  setFavorites(
    favorites.filter((item) => item !== cityName)
  )
}

useEffect(() => {
  console.log("Saving favorites:", favorites)

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  )
}, [favorites])
return (
  <div
  className="app"
  style={{
    background: darkMode
      ? "#1e293b"
      : "linear-gradient(135deg,#74ebd5,#9face6)",

    minHeight: "100vh",

    transition: "0.5s",

    color: darkMode ? "white" : "black",
  }}
>

    <h1 className="title">
      Weather App 🌦️
    </h1>

    <WeatherCard
      city={city}
      country={country}
      weather={weather}
      weatherType={weatherType}
      temperature={temperature}
      time={time}
      wind={wind}
      humidity={humidity}
      maxTemp={maxTemp}
      minTemp={minTemp}
      sunrise={sunrise}
      sunset={sunset}
      forecast={forecast}
    />

    <input
      className="input"
      type="text"
      placeholder="🔍 Enter city..."
      value={city}
      onChange={(e) => setCity(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          getWeather()
        }
      }}
    />

    <div className="buttons">
<button
  className="btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>
      <button
        className="clearBtn"
        onClick={() => {
          setCity("")
          setCountry("")
          setWeather("")
          setTemperature("")
          setTime("")
          setWind("")
          setWeatherType("")
        }}
      >
        Clear
      </button>
<button
  className="btn"
  onClick={getCurrentLocation}
>
  📍 My Location
</button>
      <button
        className="btn"
        onClick={getWeather}
      >
        {loading ? "Loading... ⏳" : "Get Weather"}
      </button>

      <button
        className="btn"
        onClick={addFavorite}
      >
        ⭐ Favorite
      </button>

    </div>

    <div className="favorites">

      <h3>⭐ Favorite Cities</h3>

      {favorites.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span>📍 {item}</span>

          <button
            onClick={() => removeFavorite(item)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            ❌
          </button>
        </div>
      ))}

    </div>

  </div>
)
  
return (
  <div className="app">
    <h1 className="title">Weather App 🌦️</h1>

    <WeatherCard
      city={city}
      country={country}
      weather={weather}
      weatherType={weatherType}
      temperature={temperature}
      time={time}
      wind={wind}
      humidity={humidity}
      maxTemp={maxTemp}
      minTemp={minTemp}
      sunrise={sunrise}
      sunset={sunset}
      forecast={forecast}
      darkMode={darkMode}
    />

    <input
      className="input"
      type="text"
      placeholder="🔍 Enter city..."
      value={city}
      onChange={(e) => setCity(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          getWeather()
        }
      }}
    />
<div className="buttons">

  <button className="clearBtn">
    Clear
  </button>

 

  <button
    className="btn"
    onClick={getWeather}
  >
    {loading ? "Loading... ⏳" : "Get Weather"}
  </button>

  <button
    className="btn"
    onClick={addFavorite}
  >
    ⭐ Favorite
  </button>

</div>
   <div className="favorites">
  <h3>⭐ Favorite Cities</h3>

  {favorites.map((item, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: "8px",
        gap: "10px",
      }}
    >
      <span>📍 {item}</span>

      <button
        onClick={() => removeFavorite(item)}
        style={{
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        ❌
      </button>
    </div>
  ))}
</div>
  </div>
)
}

export default App
