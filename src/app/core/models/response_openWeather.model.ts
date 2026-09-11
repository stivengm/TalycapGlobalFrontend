export interface ResponseOpenWeatherModel {
  name: string;
  main: MainWeatherModel;
  weather: WeatherModel[];
  wind: WindModel;
}

interface MainWeatherModel {
  temp: number;
  feels_like: number;
  humidity: number;
}

interface WeatherModel {
  description: string;
  icon: string;
}

interface WindModel {
  deg: number;
  gust: number;
  speed: number;
}