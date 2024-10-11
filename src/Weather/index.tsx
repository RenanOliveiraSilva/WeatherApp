import { View, Text, ActivityIndicator, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CurrentWeatherData, ForecastWeatherData } from "@/services/api";
import { getWeatherIcon } from '../GetIcon';
import { getWeatherImage } from "../getImage";
import Card from "../Card";


interface WeatherProps {
    currentWeatherData: CurrentWeatherData | null;
    forecastWeatherData: ForecastWeatherData | null;
    currentTime: number;
  }

export default function Weather({ currentWeatherData, forecastWeatherData, currentTime }: WeatherProps) {
    
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
        // Obter a imagem de acordo com o clima atual
        const image = getWeatherImage(currentWeatherData.weather[0].id, currentTime);
        console.log(currentWeatherData);

        // Temperatura máxima e miníma
        const maxTemp = today.main.temp_max;
        const minTemp = today.main.temp_min;
    return (
        <>
        <View className="h-1/2 px-4">
            <View className='flex flex-row w-full items-center justify-start'>
                {/* View Esquerda */}
                <View className='flex-1 h-44 items-center justify-center'>
                    <Image 
                        source={image}
                        resizeMode='contain'
                        className='h-full w-full'
                        accessibilityLabel="Imagem representando a condição climática atual"
                    />
                </View>
                
                {/* View Direita */}
                <View className='flex-1 h-44'>
                    <View className='flex flex-col w-full items-center justify-end p-4 h-full'>
                        <View className='flex flex-row items-end justify-end w-full '>
                            <View className='items-center justify-center text-center h-full'>
                                <Text className="text-6xl text-white justify-center text-center font-semibold">
                                    {(currentWeatherData.main.temp).toFixed(0)}°C
                                </Text>
                            </View>
                            <View className='flex items-center justify-center h-full'>
                                <Text className="text-sm text-white font-light">
                                    Max {maxTemp.toFixed(0)}°C
                                </Text>
                                <Text className="text-sm text-white font-light">
                                    Min {minTemp.toFixed(0)}°C
                                </Text>
                            </View>
                        </View>
                        <View className='flex items-end justify-end w-full '>
                            <Text className="text-lg text-white text-center font-light">
                                <Ionicons name="pin-sharp" size={15}/> {currentWeatherData.name}, {currentWeatherData.sys.country} 
                            </Text>
                            <Text className="text-lg text-white font-bold capitalize">
                                {currentWeatherData.weather[0].description}
                            </Text>
                        </View>
                        {/* Se desejar exibir um ícone adicional */}
                        {/* <Ionicons name={weatherIcon} size={64} color="#ffffff" /> */}
                    </View>
                </View>
            </View>        
        </View>
        <View className="flex-1 px-5">
            <View className="flex-row items-center justify-start mb-1">
                <Ionicons name="time-sharp" size={20} color={"gray"}/>
                <Text className="ml-2 capitalize font-semibold text-gray-600 text-xl">
                    Previsão por horário
                </Text>
            </View>
            <Card forecastWeatherData={forecastWeatherData}/>
        </View>
       </>
    );
}