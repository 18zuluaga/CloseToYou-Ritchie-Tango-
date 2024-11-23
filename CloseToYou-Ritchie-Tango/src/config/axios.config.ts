import axios, {AxiosInstance} from 'axios';

export const axiosWeather: AxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosBackend: AxiosInstance = axios.create({
  baseURL: 'closetoyou-ritchie-tango-backend-production.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosBackendMultipart: AxiosInstance = axios.create({
  baseURL: 'closetoyou-ritchie-tango-backend-production.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
