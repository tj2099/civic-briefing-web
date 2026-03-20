export const AVAILABLE_CITIES = ["San Francisco", "Los Angeles"] as const;

export const ALLOWED_CITY_NAMES = AVAILABLE_CITIES.map((city) => city.toLowerCase());

export function isAllowedCityName(cityName: string) {
  return ALLOWED_CITY_NAMES.includes(cityName.trim().toLowerCase());
}
