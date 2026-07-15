import "./ForecastCard.css"
 function ForecastCard({ 
  day,
  icon,
  max,
  min,
}) {
  return (
  
    <div
  className="forecast-card"
  style={{
    backgroundColor:
      icon === "☀️"
        ? "#FFE082"
        : icon === "⛅"
        ? "#BBDEFB"
        : icon === "☁️"
        ? "#E0E0E0"
        : icon === "🌧️"
        ? "#B3E5FC"
        : icon === "❄️"
        ? "#E1F5FE"
        : "#FFFFFF",
  }}
>
    
      <p
  style={{
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "8px",
  }}
>
  {day}
</p>

      <p
  style={{
    fontSize: "42px",
    margin: "10px 0",
  }}
>
  {icon}
</p>

   <p
  style={{
    fontWeight: "bold",
    color: "#d32f2f",
    margin: "5px 0",
  }}
>
  🔺 {max}°
</p>

<p
  style={{
    fontWeight: "bold",
    color: "#1976d2",
    margin: "5px 0",
  }}
>
  🔻 {min}°
</p>
    </div>
  )
}

export default ForecastCard