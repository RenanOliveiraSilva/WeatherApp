// src/components/VictoryTemperatureChart.js

import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import { ForecastWeatherData } from '@/services/api';

interface VictoryTemperatureChartProps {
    forecastWeatherData: ForecastWeatherData | null;
}

export default function VictoryTemperatureChart({ forecastWeatherData }: VictoryTemperatureChartProps) {
  if (!forecastWeatherData) {
    return null; // Ou um indicador de carregamento
  }

  // Processar os dados para o VictoryChart
  const data = forecastWeatherData.list.slice(0, 8).map(item => ({
    x: new Date(item.dt * 1000), // Converter timestamp para Date
    y: parseFloat((item.main.temp - 273.15).toFixed(1)), // Converter Kelvin para Celsius
  }));

  return (
    <View className="p-4">
      <Text className="text-center text-white text-lg mb-2">Temperatura nos Próximos 24 Horas</Text>
      <VictoryChart
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        width={Dimensions.get('window').width - 32}
        height={220}
      >
        <VictoryAxis
          tickFormat={(x) => `${x.getHours()}h`}
          style={{
            axis: { stroke: '#ffffff' },
            tickLabels: { fill: '#ffffff', fontSize: 12 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `${y}°C`}
          style={{
            axis: { stroke: '#ffffff' },
            tickLabels: { fill: '#ffffff', fontSize: 12 },
          }}
        />
        <VictoryLine
          data={data}
          style={{
            data: { stroke: '#ffffff', strokeWidth: 2 },
          }}
        />
      </VictoryChart>
    </View>
  );
}
