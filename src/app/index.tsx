// src/screens/Index.js
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, ImageBackground, View, ActivityIndicator, PermissionsAndroid, Platform, Image } from "react-native";
import { Header } from "../Header/Header";
import { Ionicons } from '@expo/vector-icons';
import { WeatherData } from '@/services/api';
import Weather from '../Weather/Weather';


export default function Index() {


  
   

  console.log('Dados Climáticos:', weatherData);

  return (
    <ImageBackground
      source={require('../../assets/UIKIT/Noite.png')} // Caminho para sua imagem de fundo
      className="flex-1"
      resizeMode="cover"
    >
      {/* Sobreposição de cor para melhor legibilidade */}
      <View className="absolute inset-0 bg-black opacity-30" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Header />
        <View className="h-1/2 p-3 mr-2">
          {weatherData ? (
            <View className='flex flex-row mt-1 px-4'>
              <View className='flex w-[130px] h-44 items-start justify-start'>
                <Image 
                  source={require('../../assets/UIKIT/lua.png')}
                  resizeMode='contain'
                  className='h-25 w-25'
                />
              </View>
              <View className='flex flex-col flex-1'>
                <View className='flex flex-col w-full items-center justify-end p-4 h-44'>
                  <View className='flex flex-row'>
                    <View className='items-center justify-center  h-full p-3'>
                      <Text className="text-6xl text-white font-semibold">{(weatherData.main.temp).toFixed(0)}°C</Text>

                    </View>
                    <View className='flex items-center justify-center h-full'>

                      <Text className="text-sm text-white font-light">Max {(weatherData.main.temp_max).toFixed(0)}</Text>
                      <Text className="text-sm text-white font-light">Min {(weatherData.main.temp_min).toFixed(0)}</Text>

                    </View>

                  </View>
                  <Text className="text-md text-white font-light"><Ionicons name="location-sharp" size={15}/> {weatherData.name}, {weatherData.sys.country} </Text>
                  <Text className="text-2xl text-white font-semibold capitalize">{weatherData.weather[0].description}</Text>

                </View>

              </View>
                  
            </View>
          ) : (
            <ActivityIndicator size="large" color="#ffffff" />
          )}
        </View>

      </ScrollView>
    </ImageBackground>
  );
}
