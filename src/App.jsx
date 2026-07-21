import { FaCloud, FaStar } from "react-icons/fa"
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

const [weatherType, setWeatherType] = useState("")
const getBackground = () => {
  const hour = new Date().getHours()

  const isNight = hour >= 18 || hour < 6

  if (weatherType.includes("Rain") || weatherType.includes("مطر")) {
    return "linear-gradient(135deg,#3a6073,#16222A)"
  }

  if (weatherType.includes("Storm") || weatherType.includes("عاصفة")) {
    return "linear-gradient(135deg,#232526,#414345)"
  }

  if (weatherType.includes("Cloud") || weatherType.includes("غائم")) {
    return "linear-gradient(135deg,#bdc3c7,#2c3e50)"
  }

  if (isNight) {
    return "linear-gradient(135deg,#0f2027,#203a43,#2c5364)"
  }

  return "linear-gradient(135deg,#56CCF2,#2F80ED)"
}
const [weather, setWeather] = useState("")
const [humidity, setHumidity] = useState("")
const [maxTemp, setMaxTemp] = useState("")
const [minTemp, setMinTemp] = useState("")
const [sunrise, setSunrise] = useState("")
const [sunset, setSunset] = useState("")
const [wind, setWind] = useState("")
const [windDirection, setWindDirection] = useState("")
const [windDegree, setWindDegree] = useState(0)
const [language, setLanguage] = useState("ar")
const text = {
  ar: {
    title: "🌦️ تطبيق الطقس",
    search: "🔍 أدخل اسم المدينة...",
    getWeather: "عرض الطقس",
    loading: "جاري التحميل...",
    location: "📍 موقعي",
    favorite: "⭐ المفضلة",
    clear: "🗑️ مسح",
    favorites: "⭐ المدن المفضلة",
  },

  en: {
    title: "🌦️ Weather App",
    search: "🔍 Enter city...",
    getWeather: "Get Weather",
    loading: "Loading...",
    location: "📍 My Location",
    favorite: "⭐ Favorite",
    clear: "🗑️ Clear",
    favorites: "⭐ Favorite Cities",
  },
}
const [forecast, setForecast] = useState([])
const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites")
  return saved ? JSON.parse(saved) : []
})
const [darkMode, setDarkMode] = useState(false)
const getWindDirection = (degree, language) => {
  if (degree >= 337.5 || degree < 22.5)
    return language === "ar" ? "⬆️ شمال" : "⬆️ North"

  if (degree < 67.5)
    return language === "ar" ? "↗️ شمال شرق" : "↗️ North East"

  if (degree < 112.5)
    return language === "ar" ? "➡️ شرق" : "➡️ East"

  if (degree < 157.5)
    return language === "ar" ? "↘️ جنوب شرق" : "↘️ South East"

  if (degree < 202.5)
    return language === "ar" ? "⬇️ جنوب" : "⬇️ South"

  if (degree < 247.5)
    return language === "ar" ? "↙️ جنوب غرب" : "↙️ South West"

  if (degree < 292.5)
    return language === "ar" ? "⬅️ غرب" : "⬅️ West"

  return language === "ar" ? "↖️ شمال غرب" : "↖️ North West"
}
const getCurrentLocation = () => {
  console.log("Button Clicked");
  if (!navigator.geolocation) {
    alert("Geolocation is not supported")
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
   const locationResponse = await fetch(
  `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
)

const locationData = await locationResponse.json()
const cityName =
  locationData.address.city ||
  locationData.address.town ||
  locationData.address.village ||
  locationData.address.municipality ||
  "Unknown"

if (language === "ar") {
  setCity(cityName)
} else {
  setCity("Misrata")
}

setCountry(locationData.address.country || "") 



      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
        )

        const data = await response.json()

        setForecast(data.daily)
        setTemperature(data.current.temperature_2m + "°C")
        setWind(data.current.wind_speed_10m + " km/h")
        setWindDegree(data.current.wind_direction_10m)
        setWindDirection(
  getWindDirection(data.current.wind_direction_10m, language)
)
        const degree = data.current.wind_direction_10m
let direction = ""

if (language === "ar") {
  if (degree >= 337.5 || degree < 22.5) direction = "⬆️ شمال"
  else if (degree < 67.5) direction = "↗️ شمال شرق"
  else if (degree < 112.5) direction = "➡️ شرق"
  else if (degree < 157.5) direction = "↘️ جنوب شرق"
  else if (degree < 202.5) direction = "⬇️ جنوب"
  else if (degree < 247.5) direction = "↙️ جنوب غرب"
  else if (degree < 292.5) direction = "⬅️ غرب"
  else direction = "↖️ شمال غرب"
} else {
  if (degree >= 337.5 || degree < 22.5) direction = "⬆️ North"
  else if (degree < 67.5) direction = "↗️ North East"
  else if (degree < 112.5) direction = "➡️ East"
  else if (degree < 157.5) direction = "↘️ South East"
  else if (degree < 202.5) direction = "⬇️ South"
  else if (degree < 247.5) direction = "↙️ South West"
  else if (degree < 292.5) direction = "⬅️ West"
  else direction = "↖️ North West"
}

if (language === "ar") {
  direction = direction
    .replace("North East", "شمال شرق")
    .replace("North West", "شمال غرب")
    .replace("South East", "جنوب شرق")
    .replace("South West", "جنوب غرب")
    .replace("North", "شمال")
    .replace("South", "جنوب")
    .replace("East", "شرق")
    .replace("West", "غرب")
}

setWindDirection(direction)

        setHumidity(data.current.relative_humidity_2m + "%")
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
setCity(geoData.results[0].name)
setCountry(geoData.results[0].country)

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
useEffect(() => {
  setWindDirection(getWindDirection(windDegree, language))
}, [language, windDegree])
const hour = new Date().getHours()

const isNight = hour >= 18 || hour < 6
return (
<>
<div className="sky">

{!isNight ? (
  <>
    <FaCloud className="cloud" />
    <FaCloud className="cloud" />
    <FaCloud className="cloud" />
  </>
) : (
  <>
    <FaStar
      className="star"
      style={{ top: "10%", left: "20%" }}
    />

    <FaStar
      className="star"
      style={{ top: "30%", left: "70%" }}
    />

    <FaStar
      className="star"
      style={{ top: "60%", left: "40%" }}
    />

    <FaStar
      className="star"
      style={{ top: "80%", left: "85%" }}
    />
  </>
)}

</div>



  <div
    className="app"
    style={{
      background: getBackground(),
      transition: "0.8s ease",
    }}
  >
<button
  className="btn"
  style={{
    maxWidth: "180px",
    marginBottom: "20px",
  }}
  onClick={() =>
    setLanguage(language === "ar" ? "en" : "ar")
  }
>
  {language === "ar"
    ? "🇬🇧 English"
    : "🇱🇾 العربية"}
</button>
   <h1 className="title">
  {text[language].title}
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
      language={language}
      windDirection={windDirection}
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

  {/* Dark Mode */}
  <button
    className="btn"
    onClick={() => setDarkMode(!darkMode)}
  >
  {
  darkMode
    ? (language === "ar" ? "☀️ فاتح" : "☀️ Light")
    : (language === "ar" ? "🌙 داكن" : "🌙 Dark")
}
  </button>

  {/* Language */}
  <button
    className="btn"
    onClick={() =>
      setLanguage(language === "ar" ? "en" : "ar")
    }
  >
    {language === "ar"
      ? "🇬🇧 English"
      : "🇱🇾 العربية"}
  </button>

  {/* Clear */}
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
    {text[language].clear}
  </button>

  {/* Current Location */}
  <button
  className="btn"
  onClick={getCurrentLocation}
  disabled={loading}
>
  {loading ? (
    <div className="spinner"></div>
  ) : (
    language === "ar" ? "📍 موقعي" : "📍 My Location"
  )}
</button>

  {/* Search */}
 <button
  className="btn"
  onClick={getWeather}
  disabled={loading}
>
  {loading ? (
    <div className="spinner"></div>
  ) : (
    language === "ar" ? "🔍 بحث" : "🔍 Search"
  )}
 
</button>
<button
  className="btn"
  onClick={() => {
    if (city !== "") {
      getWeather()
    } else {
      getCurrentLocation()
    }
  }}
>
  {language === "ar" ? "🔄 تحديث" : "🔄 Refresh"}
</button>
  {/* Favorite */}
  <button
    className="btn"
    onClick={addFavorite}
  >
    {text[language].favorite}
  </button>

</div>

<div className="favorites">

  <h3>{text[language].favorites}</h3>

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

</>
)

  
return (
  
  <div
  className="App"
  style={{
    minHeight: "100vh",
    background: getBackground(),
    transition: "background 1s ease",
  }}
>
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
     placeholder={text[language].search}
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
  className="clearBtn"
  onClick={clearWeather}
>
  {text[language].clear}
</button>

 

  <button
    className="btn"
    onClick={getWeather}
  >
  {loading
  ? text[language].loading
  : text[language].getWeather}
  </button>

  <button
    className="btn"
  onClick={addFavorite}
  >
   {text[language].favorite}
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
