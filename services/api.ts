// api.ts
import axios, { AxiosResponse } from "axios";// Certifique-se de que está configurado corretamente

// Definição de tipos para a resposta da API do OpenWeather
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
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
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
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

// Função para buscar dados climáticos com tipagem
export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response: AxiosResponse<WeatherData> = await api.get('', {
      params: {
        lat,
        lon,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados climáticos:', error);
    throw error;
  }
};