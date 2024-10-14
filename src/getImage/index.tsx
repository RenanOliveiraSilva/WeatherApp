export function getWeatherImage(id: number, currentTime: number) {
    let image;
    const date = new Date(currentTime * 1000);
    const hours = date.getHours();

    if (id >= 200 && id < 300) {
        image = require('../../assets/UIKIT/ChuvaForte.png'); // Thunderstorm (Tempestade)
    } else if (id >= 300 && id < 500) {
        image = require('../../assets/UIKIT/NuvemChuva.png'); // Drizzle (Chuvisco)
    } else if (id >= 500 && id < 600) {
        image = require('../../assets/UIKIT/ChuvaForte.png'); // Rain (Chuva)
    } else if (id >= 600 && id < 700) {
        image = require('../../assets/UIKIT/Neve.png'); // Snow (Neve)
    } else if (id >= 700 && id < 800) {
        image = require('../../assets/UIKIT/Neblina.png'); // Atmosphere (Neblina, Fumaça, etc.)
    } else if (id == 800) {
        // Clear Sky (Céu Claro) - Verificar se é dia ou noite
        if (hours >= 18 || hours < 6) { // Considerando noite entre 18h e 6h
            image = require('../../assets/UIKIT/lua.png'); // Lua para noite
        } else {
            image = require('../../assets/UIKIT/Sun.png'); // Sol para dia
        }
    } else if (id > 800 && id < 900) {
        image = require('../../assets/UIKIT/Nublado.png'); // Clouds (Nuvens)
    }

    return image;
}