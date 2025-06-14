import * as ExpoLocation from 'expo-location';

// Константа для расстояния срабатывания уведомления (в метрах)
export const PROXIMITY_THRESHOLD = 100;

interface LocationConfig {
  accuracy: ExpoLocation.LocationAccuracy;
  timeInterval: number;
  distanceInterval: number;
}

export const LOCATION_CONFIG: LocationConfig = {
  accuracy: ExpoLocation.LocationAccuracy.Balanced,
  timeInterval: 5000,
  distanceInterval: 10,
};

export const requestLocationPermissions = async () => {
  const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }
};

export const startLocationTracking = async (
  callback: (location: ExpoLocation.LocationObject) => void
): Promise<ExpoLocation.LocationSubscription> => {
  await requestLocationPermissions();
  
  return await ExpoLocation.watchPositionAsync(
    LOCATION_CONFIG,
    callback
  );
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const x = (lat2 - lat1) * 111.32e3;
  const y = (lon2 - lon1) * (111.32e3 * Math.cos(lat1 * Math.PI / 180));
  return Math.sqrt(x * x + y * y);
};