import axios, { AxiosInstance } from 'axios';

export const axiosWeather: AxiosInstance = axios.create({
  baseURL:
    'https://api.openweathermap.org/data/2.5', // URL base de la API
  timeout: 10000, // Tiempo de espera de la solicitud en milisegundos
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido
  },
});
