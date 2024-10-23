import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
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
        const windDirection = getWindDirection(today.wind.deg);
        // Obter a imagem de acordo com o clima atual
        const image = getWeatherImage(currentWeatherData.weather[0].id, currentTime);

        // Temperatura máxima e miníma
        const maxTemp = today.main.temp_max;
        const minTemp = today.main.temp_min;

        const sunrise = new Date(currentWeatherData.sys.sunrise * 1000);
        const sunriseHour = sunrise.getHours();
        const sunriseMinutes = sunrise.getMinutes();

        const sunset = new Date(currentWeatherData.sys.sunset * 1000);
        const sunsetHour = sunset.getHours();
        const sunsetMinutes = sunset.getMinutes();
        
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
                                {currentWeatherData.name.length < 20 ? 
                                    <Text className="text-lg text-white text-center font-light">
                                        <Ionicons name="location-sharp" size={12}/> {currentWeatherData.name}, {currentWeatherData.sys.country} 
                                    </Text>
                                : 
                                    <Text className="text-sm text-white text-center font-light">
                                        <Ionicons name="location-sharp" size={15}/> {currentWeatherData.name}, {currentWeatherData.sys.country} 
                                    </Text>
                                }
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
                    
                <View className="flex h-full flex-col">
                    <View className="flex-row items-start  mt-4 justify-between h-auto">
                        <View className="flex flex-col flex-[0.48] justify-between">
                        {/* Linha 1 da Coluna 1 */}
                        <View className="w-full flex flex-row p-3 py-2 justify-between rounded-xl" style={{ backgroundColor: color() }}>
                            <View className="flex-col w-1/2 py-2 justify-center items-start">
                            <Text className="text-lg justify-center text-gray-600 font-semibold">
                                {windDirection}
                            </Text>
                            <Text className="text-md justify-center text-gray-600 font-semibold">
                                {currentWeatherData.wind.speed.toFixed(2)} Km/h
                            </Text>
                            </View>
                            <View className="flex-row flex-1 items-center justify-center p-2 relative">
                            <Image 
                                source={require('../../assets/UIKIT/bulssolaEs.png')}
                                resizeMode="contain"
                                className="h-20 w-20"
                                accessibilityLabel="Imagem representando a condição climática atual"
                            />
                            <Image 
                                source={require('../../assets/UIKIT/ponteiro.png')}
                                resizeMode="contain"
                                className="h-9 w-9 absolute"
                                style={{ 
                                top: '78%', 
                                left: '79%', 
                                transform: [
                                    { translateX: -28 },
                                    { translateY: -28 },
                                    { 
                                    rotate: windDirection === "Norte" ? '90deg' :
                                            windDirection === "Nordeste" ? '135deg' :
                                            windDirection === "Leste" ? '180deg' :
                                            windDirection === "Sudeste" ? '225deg' :
                                            windDirection === "Sul" ? '270deg' :
                                            windDirection === 'Sudoeste' ? '315deg' :
                                            windDirection === 'Oeste' ? '0deg' : '45deg'
                                    }
                                ]
                                }}
                                accessibilityLabel="Imagem representando a condição climática atual"
                            />
                            </View>
                        </View>
                        </View>

                        <View className="flex flex-col flex-[0.48] h-1/2 justify-between">
                        {/* Linha 1 da Coluna 1 */}
                        <View className="w-full flex flex-row p-1 h-28 justify-between rounded-xl" style={{ backgroundColor: color() }}>
                            <View className="flex-col w-3/4 py-2 space-y-2 justify-center items-start">
                            <Text className="text-md px-1 mb-2 justify-center text-gray-600 font-semibold">
                                Nascer do sol {sunriseHour}:{sunriseMinutes}
                            </Text>
                            <Text className="text-md px-1 justify-center text-gray-600 font-semibold">
                                Pôr do sol {sunsetHour}:{sunsetMinutes}
                            </Text>
                            </View>
                            <View className="relative flex-1">
                            <Image
                                source={require('../../assets/UIKIT/Sunrise.png')}
                                resizeMode="contain"
                                className="absolute bottom-0 right-0 h-16 w-16"
                                accessibilityLabel="Ícone de sol"
                            />
                            </View>
                        </View>
                        </View>
                    </View>

                    <View className="flex h-auto mt-10 w-full items-center justify-end text-lg">
                        <Text className="text-md font-bold text-gray-700">
                            Dados fornecidos por OpenWeatherMap
                        </Text>
                    </View>
                </View>
            </View>
       </>
    );
}