export type WeatherData = {
  city: string;
  units: string;
  temperature: number;
  condition: string;
  source: string;
};

export type WeatherResponse = {
  status: string;
  data: WeatherData;
  timestamp: string;
};