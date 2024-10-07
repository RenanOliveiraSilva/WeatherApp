export const getWeatherIcon = (weather: any) => {
    const { id, main } = weather;
  
    if (id >= 200 && id < 300) {
      return 'thunderstorm-outline'; // Trovão
    } else if (id >= 300 && id < 500) {
      return 'rainy-outline'; // Chuvisco
    } else if (id >= 500 && id < 600) {
      return 'rainy-outline'; // Chuva
    } else if (id >= 600 && id < 700) {
      return 'snow-outline'; // Neve
    } else if (id >= 700 && id < 800) {
      return 'cloud-outline'; // Atmosfera (névoa, fumaça, etc.)
    } else if (id === 800) {
      return 'sunny-outline'; // Céu claro
    } else if (id > 800 && id < 900) {
      return 'cloud-outline'; // Nuvens
    } else if (id >= 900 && id < 1000) {
      return 'alert-circle-outline'; // Condições extremas
    } else {
      return 'cloud-outline'; // Ícone padrão para condições desconhecidas
    }
  };