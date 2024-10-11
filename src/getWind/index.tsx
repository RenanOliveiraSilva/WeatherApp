export function getWindDirection(deg: number) {
  if (deg >= 337.5 || deg < 22.5) {
    return 'N'; // Norte
  } else if (deg >= 22.5 && deg < 67.5) {
    return 'NE'; // Nordeste
  } else if (deg >= 67.5 && deg < 112.5) {
    return 'E'; // Leste
  } else if (deg >= 112.5 && deg < 157.5) {
    return 'SE'; // Sudeste
  } else if (deg >= 157.5 && deg < 202.5) {
    return 'S'; // Sul
  } else if (deg >= 202.5 && deg < 247.5) {
    return 'SW'; // Sudoeste
  } else if (deg >= 247.5 && deg < 292.5) {
    return 'W'; // Oeste
  } else if (deg >= 292.5 && deg < 337.5) {
    return 'NW'; // Noroeste
  }
}
