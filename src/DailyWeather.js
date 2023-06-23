import iconsKey from "./iconsKey";

export default function DailyWeather({ dailyWeather }) {
  const dayOfWeek = new Date(dailyWeather.date)
    .toLocaleString("en-us", {
      weekday: "long",
    })
    .substring(0, 3);

  const avgTemp = Math.round(dailyWeather.day.avgtemp_c);

  return (
    <div className="daily-weather">
      <p>{dayOfWeek}</p>
      <div className="weather-icon">
        {iconsKey[dailyWeather.day.condition.text]}
      </div>
      <p className="temperature">{avgTemp}º</p>
    </div>
  );
}
