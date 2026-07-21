import React from "react"
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi"
import ForecastCard from "./ForecastCard"
function WeatherCard({

  language,
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
  windDirection,
}) {

const getWeatherIcon = (code) => {
  if (code === 0) return <WiDaySunny size={50} color="#FDB813" />

  if (code === 1 || code === 2)
    return <WiDayCloudy size={50} color="#FDB813" />

  if (code === 3)
    return <WiCloud size={50} color="#90A4AE" />

  if (code >= 51 && code <= 67)
    return <WiRain size={50} color="#42A5F5" />

  if (code >= 71 && code <= 77)
    return <WiSnow size={50} color="#81D4FA" />

  if (code >= 80)
    return <WiThunderstorm size={50} color="#5C6BC0" />

  return <WiCloud size={50} />
}
const getMainWeatherIcon = (weatherType) => {
  if (weatherType.includes("Sunny") || weatherType.includes("مشمس"))
    return <WiDaySunny size={120} color="#FDB813" />

  if (
    weatherType.includes("Cloud") ||
    weatherType.includes("غائم")
  )
    return <WiDayCloudy size={120} color="#F9A825" />

  if (
    weatherType.includes("Rain") ||
    weatherType.includes("مطر")
  )
    return <WiRain size={120} color="#42A5F5" />

  if (
    weatherType.includes("Snow") ||
    weatherType.includes("ثلج")
  )
    return <WiSnow size={120} color="#90CAF9" />

  if (
    weatherType.includes("Storm") ||
    weatherType.includes("عاصفة")
  )
    return <WiThunderstorm size={120} color="#5C6BC0" />

  return <WiCloud size={120} color="#90A4AE" />
}
const t =
  language === "ar"
    ? {
        wind: "💨 الرياح",
        direction: "🧭 الاتجاه",
        humidity: "💧 الرطوبة",
        max: "🔺 العظمى",
        min: "🔻 الصغرى",
        sunrise: "🌅 الشروق",
        sunset: "🌇 الغروب",
        forecast: "📅 الأيام الخمسة القادمة",
      }
    : {
        wind: "💨 Wind",
        direction: "🧭 Direction",
        humidity: "💧 Humidity",
        max: "🔺 Max",
        min: "🔻 Min",
        sunrise: "🌅 Sunrise",
        sunset: "🌇 Sunset",
        forecast: "📅 Next 5 Days",
      }
return (
 <div
 className="weatherCard"
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
    
     <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px",
  }}
>
<h2
  style={{
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px",
  }}
>
  📍 {city}{country && `, ${country}`}
</h2>
 <div className="weatherIcon">
  {getMainWeatherIcon(weatherType)}
</div>

  <h2>{weatherType}</h2>

  <h1
style={{
fontSize:"60px",
margin:"15px 0",
fontWeight:"bold"
}}
>
{temperature}
</h1>
</div>

      <p
  style={{
    fontSize: "18px",
    color: "#555",
    marginTop: "10px",
  }}
>
  🕒 {time}
</p>

  {wind && <p>{t.wind}: {wind}</p>}

{windDirection && <p>{t.direction}: {windDirection}</p>}

<p>{t.humidity}: {humidity}</p>

<p>{t.max}: {maxTemp}</p>

<p>{t.min}: {minTemp}</p>

<p>{t.sunrise}: {sunrise}</p>

<p>{t.sunset}: {sunset}</p>

 <h2
style={{
marginTop:"25px",
marginBottom:"20px",
fontSize:"28px"
}}
>
{t.forecast}
</h2>
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
      day={
        language === "ar"
          ? [
              "الأحد",
              "الإثنين",
              "الثلاثاء",
              "الأربعاء",
              "الخميس",
              "الجمعة",
              "السبت",
            ][new Date(day).getDay()]
          : [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ][new Date(day).getDay()]
      }
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
