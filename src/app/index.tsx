import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, ImageBackground, View, SafeAreaView, Text, ActivityIndicator } from "react-native";
import { CurrentWeatherData, ForecastWeatherData, getCurrentWeatherData, getForecastWeatherData } from '../../services/api';
import * as Location from "expo-location";
import { Header } from "../Header/Header";
import Weather from "../Weather";

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [background, setBackground] = useState<any>(require('../../assets/UIKIT/Dia.png'));
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherData | null>(null);
  const [forecastWeatherData, setForecastWeatherData] = useState<ForecastWeatherData | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'night' | 'rain'>('morning');
  const [loading, setLoading] = useState<boolean>(true);

  // Função para determinar se é manhã, tarde ou noite
  const determineTimeOfDay = (currentTime: number, sunrise: number, sunset: number): 'morning' | 'afternoon' | 'night' => {
    const currentDate = new Date(currentTime * 1000);
    const hours = currentDate.getHours();

    if (currentTime >= sunrise && currentTime < sunset) {
      return hours >= 12 && hours < 18 ? 'afternoon' : 'morning';
    }
    return 'night';
  };

  // Função para atualizar a imagem de fundo
  const updateBackgroundImage = (data: CurrentWeatherData) => {
    const currentTime = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    setCurrentTime(currentTime);

    // Verificar se o clima atual é chuvoso
    if (data.weather[0].id >= 200 && data.weather[0].id < 600) {
      setBackground(require('../../assets/UIKIT/ChuvaC.png'));
      setTimeOfDay("rain");
      return;
    }

    const timeOfDay = determineTimeOfDay(currentTime, sunrise, sunset);
    setTimeOfDay(timeOfDay);

    switch (timeOfDay) {
      case 'morning':
        setBackground(require('../../assets/UIKIT/Dia.png'));
        break;
      case 'afternoon':
        setBackground(require('../../assets/UIKIT/Tarde.png'));
        break;
      case 'night':
        setBackground(require('../../assets/UIKIT/Noite.png'));
        break;
    }
  };

  // Função para buscar a localização atual do usuário
  const fetchCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setCurrentLocation(currentLocation.coords);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    }
  };

  // Função para buscar os dados climáticos
  const fetchWeatherData = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    try {
      const currentData: CurrentWeatherData = await getCurrentWeatherData(location.latitude, location.longitude);
      setCurrentWeatherData(currentData);

      updateBackgroundImage(currentData);

      const forecastData: ForecastWeatherData = await getForecastWeatherData(location.latitude, location.longitude);
      setForecastWeatherData(forecastData);
    } catch (error) {
      console.error('Erro ao buscar dados climáticos:', error);
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

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
      speed: 0,
    });
  };

  if (loading || !currentWeatherData) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <SafeAreaView className='flex-1'>
      <ImageBackground source={background} className="flex-1" resizeMode="cover">
        <View className="absolute inset-0 bg-black opacity-30" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Header timeOfDay={timeOfDay} onLocationSelected={handleLocationSelected} currentLocation={currentLocation} />
          <Weather currentWeatherData={currentWeatherData} forecastWeatherData={forecastWeatherData} currentTime={currentTime} timeOfDay={timeOfDay} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
