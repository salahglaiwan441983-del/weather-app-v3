import "./ForecastCard.css"

function ForecastCard({ day, icon, max, min }) {
  return (
    <div className="forecastCard">

      <div className="forecastDay">
        {day}
      </div>

      <div className="forecastIcon">
        {icon}
      </div>

      <div className="max">
        🔺 {max}°
      </div>

      <div className="min">
        🔻 {min}°
      </div>

    </div>
  )
}

export default ForecastCard