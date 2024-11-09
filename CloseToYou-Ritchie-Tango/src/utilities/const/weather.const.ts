import { IWeather } from "../../interface/weather.interface";

export const weatherData: IWeather = {
  coord: {
    lon: -0.1278, // Ejemplo: longitud de Londres
    lat: 51.5074, // Ejemplo: latitud de Londres
  },
  weather: [
    {
      id: 801,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d',
    },
  ],
  base: 'stations',
  main: {
    temp: 293.15, // Temperatura en Kelvin
    feels_like: 291.65, // Sensación térmica en Kelvin
    temp_min: 290.15, // Temperatura mínima en Kelvin
    temp_max: 294.15, // Temperatura máxima en Kelvin
    pressure: 1012, // Presión atmosférica en hPa
    humidity: 75, // Humedad en porcentaje
    sea_level: 1012, // Nivel de presión del mar en hPa
    grnd_level: 1010, // Nivel de presión en el suelo en hPa
  },
  visibility: 10000, // Visibilidad en metros
  wind: {
    speed: 5.1, // Velocidad del viento en m/s
    deg: 210, // Dirección del viento en grados
    gust: 7.5, // Ráfagas de viento en m/s
  },
  clouds: {
    all: 75, // Cobertura de nubes en porcentaje
  },
  dt: 1609459200, // Tiempo de la última actualización en formato Unix
  sys: {
    type: 1, // Tipo de sistema (1 = OpenWeatherMap API)
    id: 1234,
    country: 'GB', // País (GB = Reino Unido)
    sunrise: 1609430400, // Hora del amanecer en formato Unix
    sunset: 1609473600, // Hora del atardecer en formato Unix
  },
  timezone: 0, // Zona horaria en segundos respecto a UTC
  id: 2643743, // ID de la ciudad (Londres)
  name: 'London', // Nombre de la ciudad
  cod: 200, // Código de respuesta HTTP (200 = éxito)
};
