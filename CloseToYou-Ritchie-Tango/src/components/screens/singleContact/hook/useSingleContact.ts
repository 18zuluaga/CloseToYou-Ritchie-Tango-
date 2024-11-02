import {LatLng} from 'react-native-maps';
import {WeatherService} from '../../../../service/weather.service';

export const useSingleContact = () => {
  const getWeather = async (location: LatLng) => {
    const weatherResp = await WeatherService.getWeather(location);
    return weatherResp;
  };

  return {
    getWeather,
  };
};
