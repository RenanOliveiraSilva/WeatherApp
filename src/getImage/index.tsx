import React from 'react'
import { Image } from 'react-native'

export default function getWeatherImage(weather: any) {
    const { id } = weather;
    let image = require('../../assets/UIKIT/Sun.png');
  
    if (id >= 200 && id < 300) {
        image = require('../../assets/UIKIT/Chuva.png');
  
    } else if (id >= 300 && id < 500) {
        image = require('../../assets/UIKIT/NuvemChuva.png');
    } else if (id >= 500 && id < 600) {
        image = require('../../assets/UIKIT/Chuva.png');
    } else if (id >= 600 && id < 700) {
        image = require('../../assets/UIKIT/Neve.png');
    } else if (id >= 700 && id < 800) {
        image = require('../../assets/UIKIT/Neblina.png');
    } else if (id === 800) {
        return require('../../assets/UIKIT/clear.png');
    } else if (id > 800 && id < 900) {
        return require('../../assets/UIKIT/cloudy.png');
    } else if (id >= 900 && id < 1000) {
        return require('../../assets/UIKIT/extreme.png');
    } else {
        return require('../../assets/UIKIT/default.png'); // Imagem padrão
    }
  return (
    <Image 
        source={image}
        resizeMode='contain'
        className='h-25 w-25'
    />
  )
}
