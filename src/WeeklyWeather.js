import DailyWeather from "./DailyWeather";

export default function WeeklyWeather({ weather, forecastDays }) {
  return (
    <div className="weekly-weather-container">
      <h3>Next {forecastDays} days...</h3>

      <div className="weekly-weather">
        {weather?.forecast?.forecastday?.slice([1]).map((dailyWeather) => (
          <DailyWeather key={dailyWeather.date} dailyWeather={dailyWeather} />
        ))}
      </div>
    </div>
  );
}
