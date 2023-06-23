import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import WeeklyWeather from "./WeeklyWeather";
import TodayWeather from "./TodayWeather";
import DisplayError from "./DisplayError";
import Loader from "./Loader";
import { GOOGLE_KEY, WEATHER_KEY } from "./config";

setupIonicReact();

const forecastDays = 7;

function App() {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [userLocation, setUserLocation] = useState("");

  useEffect(function () {
    async function getUserCity() {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async function (position) {
              try {
                const res = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_KEY}`
                );
                const data = await res.json();

                const dataLocality = data.results.find((result) =>
                  result.types.includes("locality")
                );

                const city = dataLocality.address_components[0].long_name;

                setUserLocation(city);
              } catch (err) {
                setError(err.message);
                setLoader(false);
              }
            },
            async function () {
              try {
                throw new Error(
                  "Couldn't get user location. Reload page or search city."
                );
              } catch (err) {
                setError(err.message);
                setLoader(false);
              }
            }
          );
        } else {
          throw new Error(
            "Couldn't get user location. Reload the page or search city."
          );
        }
      } catch (err) {
        setError(err.message);
        setLoader(false);
      }
    }

    getUserCity();
  }, []);

  useEffect(
    function () {
      async function getLocationForecast() {
        try {
          setLoader(true);

          console.log(userLocation);

          const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_KEY}&q="${userLocation}"&days=${
              forecastDays + 1
            }&aqi=no&alerts=no`
          );

          console.log(res);

          if (!res.ok) throw new Error(`No results found for your location`);

          const data = await res.json();

          setWeather(data);
          setLoader(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoader(false);
        }
      }
      if (userLocation) {
        getLocationForecast();
      }
    },
    [query, userLocation]
  );

  useEffect(
    function () {
      async function getForecast() {
        try {
          setError("");
          setLoader(true);

          const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_KEY}&q=${query}&days=${
              forecastDays + 1
            }&aqi=no&alerts=no`
          );

          if (!res.ok) throw new Error(`No results found for "${query}"`);

          const data = await res.json();

          setWeather(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoader(false);
        }
      }
      if (query && query.length >= 3) {
        getForecast();
      }
    },
    [query]
  );

  return (
    <>
      <header>
        <SearchBar setQuery={setQuery} />
      </header>
      {loader ? (
        <Loader />
      ) : (
        <main>
          {error ? (
            <DisplayError error={error} />
          ) : (
            <>
              <TodayWeather weather={weather} />
              <WeeklyWeather weather={weather} forecastDays={forecastDays} />
            </>
          )}
        </main>
      )}
    </>
  );
}

export default App;
