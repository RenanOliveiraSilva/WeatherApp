import { View, Text, ActivityIndicator, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CurrentWeatherData, ForecastWeatherData } from "@/services/api";
import { getWindDirection } from "../getWind";
import { getWeatherImage } from "../getImage";
import Card from "../Card";


interface WeatherProps {
    currentWeatherData: CurrentWeatherData | null;
    forecastWeatherData: ForecastWeatherData | null;
    currentTime: number;
    timeOfDay: 'morning' | 'afternoon' | 'night' | 'rain' | null;
  }

export default function Weather({ currentWeatherData, forecastWeatherData, currentTime, timeOfDay }: WeatherProps) {
    
        if(!currentWeatherData) {
            return <ActivityIndicator size="large" color="white" />
        }
      
        function color(opacity =0.20){
            const hexOpacity = Math.round(opacity * 255).toString(16).padStart(2, '0');

            if (timeOfDay === 'rain') { return '#0D192B'+hexOpacity; }
            
            if (timeOfDay === 'morning') {
            return '#8BA9DF'+hexOpacity;
        
            } else if (timeOfDay === 'afternoon') {
                return '#E0928C'+hexOpacity;
        
            } 

            return '#543BA0'+hexOpacity;
        
        }

        // Obter as previsões diárias
        const today = forecastWeatherData?.list[0];
        // Obter a previsão para hoje (primeiro item)

        if (!today) {
            return <ActivityIndicator size="large" color="#ffffff" />
        }

        // Determinar o ícone apropriado usando a função getWeatherIcon
        const windDirecton = getWindDirection(today.wind.deg);
        // Obter a imagem de acordo com o clima atual
        const image = getWeatherImage(currentWeatherData.weather[0].id, currentTime);

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
                        className='h-full w-full z-10'
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
                                <Ionicons name="location-sharp" size={15}/> {currentWeatherData.name}, {currentWeatherData.sys.country} 
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
            <View className="px-4 py-2 rounded-xl" style={{backgroundColor: color()}}>
                <View className="flex-row items-center justify-start mb-1">
                    <Ionicons name="time-sharp" size={20} color={"gray"}/>
                    <Text className="ml-2 capitalize font-semibold text-gray-600 text-lg">
                        Previsão por horário
                    </Text>
                </View>
                <Card forecastWeatherData={forecastWeatherData}/>

            </View>
            <View className="flex w-full h-fit mt-4">
                <View className="w-1/2" style={{backgroundColor: color()}}>
                    <View className="flex-row items-center justify-start p-2">
                        <Ionicons name="umbrella-sharp" size={20} color={"gray"}/>
                        <Text className="ml-2 capitalize font-semibold text-gray-600 text-lg">
                            Umidade
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center p-2">
                        <Text className="text-lg text-white font-semibold">
                            {windDirecton}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
       </>
    );
}