import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  params: {
    q: 'London,uk',
    APPID: 'CHAVEAPI',
    units: 'metric',
    lang: 'pt',
  },
});

export default api;