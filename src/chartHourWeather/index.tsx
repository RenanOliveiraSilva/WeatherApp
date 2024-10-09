export function processWeatherData(forecastList: any[]) {
    // Filtrar os próximos 8 períodos (24 horas com intervalos de 3 horas)
    const next24Hours = forecastList.slice(0, 8);
  
    const labels = next24Hours.map(item => {
      const date = new Date(item.dt * 1000);
      return `${date.getHours()}h`;
    });
  
    const data = next24Hours.map(item => {
      // Converter Kelvin para Celsius
      return (item.main.temp - 273.15).toFixed(1);
    });
  
    return {
      labels,
      datasets: [
        {
          data,
          strokeWidth: 2, // Linha mais grossa
        },
      ],
    };
  }
  