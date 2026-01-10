import { env } from "../config/env.js";

export const fetchCurrentWeather = async ({ city, units }) => {
  console.log("API key length:", env.OPENWEATHER_API_KEY?.length);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${env.OPENWEATHER_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    console.error("Provider error:", res.status, text);
    throw new Error("Weather data fetch failed");
  }

  const data = await res.json();

  return {
    city: data.name,
    units,
    temperature: data.main.temp,
    condition: data.weather[0].main,
    source: "openweathermap",
  };
};