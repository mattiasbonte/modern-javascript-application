import { setCity } from './city';
import windDir from './wind';

//import images
import STATUS_SUN from '../img/status/sun.svg';
import STATUS_NIGHT_CLOUD_FULL from '../img/status/night-cloud-full.svg';
import STATUS_CLOUD_SUN from '../img/status/cloud-sun.svg';
import STATUS_NIGHT_CLOUD_HALF from '../img/status/night-cloud-half.svg';
import STATUS_CLOUDS from '../img/status/clouds.svg';
import STATUS_RAIN from '../img/status/rain.svg';
import STATUS_RAIN_CLOUD_SUN from '../img/status/rain-cloud-sun.svg';
import STATUS_THUNDER_STORM from '../img/status/thunder-storm.svg';
import STATUS_SNOW from '../img/status/snowy.svg';
import STATUS_FOG from '../img/status/fog.svg';
import STATUS_NIGHT_FOG from '../img/status/fog-night.svg';
import STATUS_DEFAULT from '../img/status/default.svg';

export default async function printWeather(weather, forecast, id) {
  // Wait for Data from API
  const weatherData = await weather;
  const forecastData = await forecast;

  // City Name
  const cityName = await weatherData.name;
  const countryCode = await weatherData.sys.country;
  console.log(cityName, countryCode, id);
  setCity(cityName, countryCode, id);

  // Show WeatherBox
  const weatherBox = document.querySelector(`#weatherBox${id}`).classList;
  weatherBox.remove('hidden');

  // WEATHER ICON SWAP
  const weatherIcon = document.querySelector(`#weatherIcon${id}`);
  const icon = await weatherData.weather[0].icon;
  switch (icon) {
    case '01d': // day: clear sky
      weatherIcon.src = STATUS_SUN;
      break;
    case '01n': // night: clear sky
      weatherIcon.src = STATUS_NIGHT_CLOUD_FULL;
      break;
    case '02d': // day: few clouds
      weatherIcon.src = STATUS_CLOUD_SUN;
      break;
    case '02n': // night: few clouds
      weatherIcon.src = STATUS_NIGHT_CLOUD_HALF;
      break;
    case '03d': // day: scattered clouds
      weatherIcon.src = STATUS_CLOUDS;
      break;
    case '03n': // night: scattered clouds
      weatherIcon.src = STATUS_NIGHT_CLOUD_HALF;
      break;
    case '04d': // day: broken clouds
      weatherIcon.src = STATUS_CLOUDS;
      break;
    case '04n': // night: broken clouds
      weatherIcon.src = STATUS_NIGHT_CLOUD_HALF;
      break;
    case '09d': // day: shower rain
      weatherIcon.src = STATUS_RAIN;
      break;
    case '09n': // night: shower rain
      weatherIcon.src = STATUS_RAIN;
      break;
    case '10d': // day: light rain
      weatherIcon.src = STATUS_RAIN_CLOUD_SUN;
      break;
    case '10n': // night: light rain
      weatherIcon.src = STATUS_RAIN;
      break;
    case '11d': // day: thunderstorm
      weatherIcon.src = STATUS_THUNDER_STORM;
      break;
    case '11n': // night: thunderstorm
      weatherIcon.src = STATUS_THUNDER_STORM;
      break;
    case '13d': // day: snow
      weatherIcon.src = STATUS_SNOW;
      break;
    case '13n': // night: snow
      weatherIcon.src = STATUS_SNOW;
      break;
    case '50d': // day: fog
      weatherIcon.src = STATUS_FOG;
      break;
    case '50n': // night: fog
      weatherIcon.src = STATUS_NIGHT_FOG;
      break;
    default:
      weatherIcon.src = STATUS_DEFAULT;
      break;
  }

  // ============================= //
  // Print CURRENT WEATHER SECTION //
  // ============================= //
  // TEMPS
  const temp = document.querySelector(`#temp${id}`);
  const currentTemp = `${(weatherData.main.temp - 273).toFixed(0)}°`;
  const min = document.querySelector(`#min${id}`);
  const minTemp = `${(weatherData.main.temp_min - 273).toFixed(0)}°`;
  const max = document.querySelector(`#max${id}`);
  const maxTemp = `${(weatherData.main.temp_max - 273).toFixed(0)}°`;
  temp.textContent = currentTemp;
  min.textContent = minTemp;
  max.textContent = maxTemp;
  temp.title = `It's currently ${currentTemp} Celsius in ${cityName}`;
  min.title = `It will be minimum ${minTemp} Celsius in ${cityName}`;
  max.title = `It will be maximum ${maxTemp} Celsius in ${cityName}`;
  // FEELS
  const feels = document.querySelector(`#feels${id}`);
  const feelsTemp = `${(weatherData.main.feels_like - 273).toFixed(0)}°`;
  feels.textContent = feelsTemp;
  feels.title = `It feels like ${feelsTemp} Celsius in ${cityName}`;
  // TIME
  const thisTime = document.querySelector(`#thisTime${id}`);
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : '';
  hours < 10 ? (hours = `0${hours}`) : '';
  thisTime.textContent = `${hours}:${minutes}`;
  // CITY
  const thisCity = document.querySelector(`#thisCity${id}`);
  thisCity.textContent = cityName;
  // Probability RAIN
  const probRain = document.querySelector(`#probRain${id}`);
  const probRainCalc = (forecastData.list[0].pop * 100).toFixed(0);
  probRain.textContent = probRainCalc;
  probRain.title = `There is a ${probRainCalc}% chance of rain in ${cityName}`;
  // Probability CLOUDS
  const probCloud = document.querySelector(`#probCloud${id}`);
  const probCld = weatherData.clouds.all.toFixed(0);
  probCloud.textContent = probCld;
  probCloud.title = `${probCld}% of the sky in ${cityName} is covered by clouds`;
  // HUMIDITY
  const humidity = document.querySelector(`#humidity${id}`);
  const humid = weatherData.main.humidity;
  humidity.textContent = humid;
  humidity.title = `There is ${humid}% humidity in the air in ${cityName}`;
  // VISIBILITY
  const visibility = document.querySelector(`#visibility${id}`);
  const sight = weatherData.visibility;
  sight > 900 ? (visibility.textContent = '+900') : (visibility.textContent = sight);
  visibility.title = `It's possible to see ${sight} meters far in ${cityName}`;
  // WIND
  const windSpeed = document.querySelector(`#windSpeed${id}`);
  const windDeg = document.querySelector(`#windDeg${id}`);
  const windSpd = weatherData.wind.speed.toFixed(0);
  const windDegree = weatherData.wind.deg;
  const windPos = windDir(windDegree);
  windSpeed.textContent = windSpd;
  windDeg.style.transform = `rotate(${windDegree}deg)`;
  windDeg.title = `Wind blows ${windPos} at ${windSpd}m/s in ${cityName}`;
  // PRESSURES
  const sea = document.querySelector(`#presSea${id}`);
  const seaPress = forecastData.list[0].main.sea_level;
  const land = document.querySelector(`#presLand${id}`);
  const landPress = forecastData.list[0].main.grnd_level;
  sea.textContent = seaPress;
  land.textContent = landPress;
  sea.title = `Atmospheric pressure at sea level is ${seaPress} hPa`;
  land.title = `Atmospheric pressure at ${cityName}'s ground level is ${landPress} hPa`;
  // STATUS
  const status = document.querySelector(`#status${id}`);
  const statusIcon = document.querySelector(`#statusIcon${id}`);
  const description = weatherData.weather[0].description;
  status.textContent = description;
  statusIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  statusIcon.alt = `${description} icon`;
  statusIcon.title = `${description} in ${cityName}`;
  weatherIcon.alt = `${description} icon`;
  weatherIcon.title = `${description} in ${cityName}`;
}
