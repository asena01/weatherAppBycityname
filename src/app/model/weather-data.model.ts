export interface WeatherDataModel {
  city: string;
  localtime: string;
  temprature: number;
  weather_icons: string;
  weather_descriptions: string;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  humidity: string;
  feelslike: string;
}

export class weathModFordata {
  data = [{
    city: '',
    localtime: '',
    temprature: 0,
    weather_icons: '',
    weather_descriptions: '',
    wind_speed: 0,
    wind_degree: 0,
    wind_dir: '',
    pressure: 0,
    humidity: '',
    feelslike: ''
  }]
}
