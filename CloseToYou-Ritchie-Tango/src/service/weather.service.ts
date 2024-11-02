import {LatLng} from 'react-native-maps';
import { axiosWeather } from '../config/axios.config';
import { IWeather } from '../interface/weather.interface';
import { WEATHER_API_KEY } from '@env';

export class WeatherService {
  static async getWeather(location: LatLng): Promise<IWeather> {
    const response = await axiosWeather.get('weather', {params: {lat: location.latitude, lon: location.longitude,appid: WEATHER_API_KEY, units: 'metric', lang: 'es'}});
    return response.data as IWeather;
  }
}
