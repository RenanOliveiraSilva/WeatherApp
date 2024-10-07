// src/services/api.js
import axios from 'axios';
//import { OPENWEATHER_API_KEY } from '@env';

// Interface para Current Weather API
export interface CurrentWeatherData {
  coord: { lon: number; lat: number };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Interface para 3-Hour Forecast API
export interface ForecastWeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: { all: number };
    wind: { speed: number; deg: number };
    visibility: number;
    pop: number;
    sys: { pod: string };
    dt_txt: string;
  }>;
}
// Criando uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  params: {
    APPID: "MINHACHAVE",
    units: 'metric', // Temperatura em Celsius
    lang: 'pt', // Idioma em português
  },
});

const API_KEY = '55d8bc5b1f9f8ee61e20577cd85ed5e3'; // Substitua pela sua chave real

// Função para obter o clima atual
export const getCurrentWeatherData = async (latitude: number, longitude: number): Promise<CurrentWeatherData> => {
  try {
    const response = await axios.get<CurrentWeatherData>('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: 'metric', // 'standard', 'metric', 'imperial'
        lang: 'pt', // Idioma da resposta
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados climáticos atuais:', error);
    throw error;
  }
};

// Função para obter a previsão de 3 horas
export const getForecastWeatherData = async (latitude: number, longitude: number): Promise<ForecastWeatherData> => {
  try {
    const response = await axios.get<ForecastWeatherData>('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados de previsão climática:', error);
    throw error;
  }
};
