import { ForecastWeatherData } from '@/services/api';
import React from 'react'
import { Text, View, FlatList, Image } from 'react-native'

interface WeatherProps {
  forecastWeatherData: ForecastWeatherData | null;

}

export default function Card({forecastWeatherData} : WeatherProps) {
  if (!forecastWeatherData) {
    return <Text>"Loading..."</Text>;
  }

  return (
    <FlatList
      className=''
      data={forecastWeatherData.list}
      keyExtractor={(item) => item.dt.toString()}
      renderItem={({ item }) => {
        const weatherInfo = item.weather[0];
        const date = new Date(item.dt * 1000);
        const hours = date.getHours();
        const day = date.getDate();
        const mounth = date.getMonth();

        return (
          <View className='flex flex-col text-center items-center justify-between p-2 h-40 w-28'>
            <Text>{ hours == 0 ? day + '/' +  mounth : hours + ":00"}</Text>
            <Image 
              source={{ uri: `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png` }}
              style={{ width: 50, height: 50, resizeMode: 'contain' }}
            />
            <Text>{(item.main.temp).toFixed(1)}°C</Text>
            <View className="h-12 w-full flex items-center justify-center">
              <Text className="capitalize text-center ">
                {weatherInfo.description}
              </Text>
            </View>
          </View>
        );
      }}
      horizontal={true}
    />
  )
}

