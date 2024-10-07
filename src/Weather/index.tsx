import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CurrentWeatherData, ForecastWeatherData } from "@/services/api";
import { getWeatherIcon } from '../GetIcon';
// import getWeatherImage from "../getImage";


interface WeatherProps {
    currentWeatherData: CurrentWeatherData | null;
    forecastWeatherData: ForecastWeatherData | null;
  }

export default function Weather({ currentWeatherData, forecastWeatherData }: WeatherProps) {
    
      if(!currentWeatherData) {
        return <ActivityIndicator size="large" color="#ffffff" />
      }

      
        // Obter as previsões diárias
        const today = forecastWeatherData?.list[0];
        // Obter a previsão para hoje (primeiro item)

        if (!today) {
            return <ActivityIndicator size="large" color="#ffffff" />
        }

        // Determinar o ícone apropriado usando a função getWeatherIcon
        const weatherIcon = getWeatherIcon(today.weather[0]);
        // const weatherImage = getWeatherImage(today.weather[0]);

    return (
        <View className='flex flex-row  gap-3 justify-between items- mt-1 px-4'>
            <View className='flex flex-1 h-44 items-start justify-start'>
            
            </View>
            <View className='flex flex-colw-2/3'>
                <View className='flex flex-col w-full items-center justify-end p-4 h-44'>
                    <View className='flex flex-row items-end justify-end w-full '>
                        <View className='items-center justify-center text-center h-full'>
                            <Text className="text-6xl text-white justify-center text-center font-semibold">{(currentWeatherData.main.temp).toFixed(0)}°C</Text>

                        </View>
                        <View className='flex items-center justify-center h-full'>

                            <Text className="text-sm text-white font-light">Max {(currentWeatherData.main.temp_max).toFixed(0)}</Text>
                            <Text className="text-sm text-white font-light">Min {(currentWeatherData.main.temp_min).toFixed(0)}</Text>

                        </View>

                    </View>
                    <View className='flex items-end justify-end w-full '>
                        <Text className="text-lg text-white text-center font-light"><Ionicons name="location-sharp" size={15}/> {currentWeatherData.name}, {currentWeatherData.sys.country} </Text>
                        <Text className="text-lg text-white font-bold capitalize">{currentWeatherData.weather[0].description}</Text>

                    </View>
                
                    <Ionicons name={weatherIcon} size={64} color="#ffffff" />
                </View>

            </View>
                
        </View>            
        
    );
}