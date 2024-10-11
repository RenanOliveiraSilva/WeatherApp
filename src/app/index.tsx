import React, { useCallback, useEffect, useState } from 'react';
import { Modal, ScrollView, ImageBackground, View, SafeAreaView, Text, ActivityIndicator } from "react-native";
import { CurrentWeatherData, ForecastWeatherData, getCurrentWeatherData, getForecastWeatherData } from '../../services/api';
import * as Location from "expo-location";
import { Header } from "../Header/Header";
import Weather from "../Weather";

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [currentLocation, setcurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [background, setBackground] = useState<any>(require('../../assets/UIKIT/Dia.png'));
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherData | null>(null);
  const [forecastWeatherData, setForecastWeatherData] = useState<ForecastWeatherData | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'night'>('morning');

  // Função para determinar se é manhã, tarde ou noite
  const determineTimeOfDay = (currentTime: number, sunrise: number, sunset: number): 'morning' | 'afternoon' | 'night' => {
    const currentDate = new Date(currentTime * 1000);
    const hours = currentDate.getHours();

    if (currentTime >= sunrise && currentTime < sunset) {
      if (hours >= 12 && hours < 18) {
        return 'afternoon';
      }
      return 'morning';
    } else {
      return 'night';
    }
  };

  // Função para atualizar a imagem de fundo
  const updateBackgroundImage = (data: CurrentWeatherData) => {
    const currentTime = data.dt; // Horário atual em Unix
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    setCurrentTime(currentTime);
    const timeOfDay = determineTimeOfDay(currentTime, sunrise, sunset);

    setTimeOfDay(timeOfDay);

    switch (timeOfDay) {
      case 'morning':
        setBackground(require('../../assets/UIKIT/Dia.png')); // Imagem de manhã
        break;
      case 'afternoon':
        setBackground(require('../../assets/UIKIT/Tarde.png')); // Imagem de tarde
        break;
      case 'night':
        setBackground(require('../../assets/UIKIT/Noite.png')); // Imagem de noite
        break;
    }
  };

  // Função para buscar a localização atual do usuário
  const fetchCurrentLocation = async () => {
    try {
      // Solicitar permissões de localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return <Text>Permissão para acessar localização foi negada.</Text>
      }

      // Obter a localização atual
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setcurrentLocation(currentLocation.coords);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      
    }
  };

  // Função para buscar os dados climáticos
  const fetchWeatherData = useCallback(async () => {
    if (!location) return <ActivityIndicator size="large" color="#ffffff" />;

    try {
      // Obter dados climáticos atuais
      const currentData: CurrentWeatherData = await getCurrentWeatherData(location.latitude, location.longitude);
      setCurrentWeatherData(currentData);

      // Atualizar a imagem de fundo com base no horário
      updateBackgroundImage(currentData);

      // Obter dados de previsão de 3 horas
      const forecastData: ForecastWeatherData = await getForecastWeatherData(location.latitude, location.longitude);
      setForecastWeatherData(forecastData);
    } catch (error) {
      console.error('Erro ao buscar dados climáticos:', error);
     
    } finally {
      
    }
  }, [location]);

  // useEffect para buscar a localização atual ao montar o componente
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  // useEffect para buscar os dados climáticos sempre que a localização mudar
  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleLocationSelected = (lat: number, lon: number) => {
    setLocation({ 
      latitude: lat, 
      longitude: lon, 
      altitude: 0, 
      accuracy: 0, 
      altitudeAccuracy: 0, 
      heading: 0, 
      speed: 0 
    });
  };

  return (
    <SafeAreaView className='flex-1'>
      <ImageBackground
        source={background} // Caminho para sua imagem de fundo
        className="flex-1"
        resizeMode="cover"
      >
        {/* Sobreposição de cor para melhor legibilidade */}
        <View className="absolute inset-0 bg-black opacity-30" />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Header 
            timeOfDay={timeOfDay}
            onLocationSelected={handleLocationSelected}
            currentLocation={currentLocation}
          />
          <Weather currentWeatherData={currentWeatherData} forecastWeatherData={forecastWeatherData} currentTime={currentTime} timeOfDay={timeOfDay}/>
          
        </ScrollView>
        
      </ImageBackground>
    </SafeAreaView>
  );
}
