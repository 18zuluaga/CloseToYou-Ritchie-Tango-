import {LatLng} from 'react-native-maps';
import {WeatherService} from '../../../../service/weather.service';
import { useCallback } from 'react';

export const useSingleContact = () => {
  const getWeather = useCallback(async (location: LatLng) => {
    const weatherResp = await WeatherService.getWeather(location);
    return weatherResp;
  }, []);

  return {
    getWeather,
  };
};
