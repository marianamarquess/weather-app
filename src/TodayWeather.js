import iconsKey from "./iconsKey";

export default function TodayWeather({ weather }) {
  const options = { weekday: "long", day: "numeric", month: "long" };
  const todayDate = new Date(weather?.forecast?.forecastday[0].date)
    .toLocaleString("en-US", options)
    .replace(",", "");

  const avgTemp = Math.round(weather?.forecast?.forecastday[0].day.avgtemp_c);
  const weatherDescription =
    weather?.forecast?.forecastday[0].day.condition.text;

  return (
    <div className="today-weather">
      <div>
        <h1>
          {weather?.location?.name}, {weather?.location?.country}
        </h1>
        <p>Today, {todayDate}</p>
      </div>

      <div className="today-icon-details">
        <div className="today-icon">{iconsKey[weatherDescription]}</div>

        <div className="today-details">
          <h2>{avgTemp}º</h2>
          <p>{weatherDescription}</p>
        </div>
      </div>
    </div>
  );
}
