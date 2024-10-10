// src/screens/Index.js
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, ImageBackground, View, SafeAreaView } from "react-native";
import { CurrentWeatherData, ForecastWeatherData, getCurrentWeatherData, getForecastWeatherData } from '../../services/api';
import * as Location from "expo-location";


import { Header } from "../Header/Header";
import Weather from "../Weather";



export default function Index() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [background, setBackground] = useState<any>(require('../../assets/UIKIT/Dia.png'));
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherData | null>(null);
  const [forecastWeatherData, setForecastWeatherData] = useState<ForecastWeatherData | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'night'>('morning');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


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

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Solicitar permissões de localização
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permissão para acessar localização foi negada.');
          setLoading(false);
          return;
        }

        // Obter a localização atual
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);

        // Obter dados climáticos atuais
        const currentData: CurrentWeatherData = await getCurrentWeatherData(currentLocation.coords.latitude, currentLocation.coords.longitude);
        setCurrentWeatherData(currentData);

        // Atualizar a imagem de fundo com base no horário
        updateBackgroundImage(currentData);

        // Obter dados de previsão de 3 horas
        const forecastData: ForecastWeatherData = await getForecastWeatherData(currentLocation.coords.latitude, currentLocation.coords.longitude);
        setForecastWeatherData(forecastData);
      } catch (error) {
        console.error('Erro ao buscar dados climáticos:', error);
        setErrorMsg('Erro ao buscar dados climáticos.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);
  
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
          />

          <Weather currentWeatherData={currentWeatherData} forecastWeatherData={forecastWeatherData} currentTime={currentTime} />
          
          

        </ScrollView>
        
      </ImageBackground>
    </SafeAreaView>
  );
}
