import { useState, useCallback } from 'react';

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export type LocationStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'error' | 'unsupported';

interface UseUserLocationResult {
  location: UserLocation | null;
  status: LocationStatus;
  error: string | null;
  requestLocation: () => void;
  retry: () => void;
}

export const useUserLocation = (): UseUserLocationResult => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('unsupported');
      setError('Geolocation is not supported by your browser');
      return;
    }

    setStatus('requesting');
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ latitude, longitude, accuracy });
        setStatus('granted');
        setError(null);
      },
      (err) => {
        if (err.code === 1) {
          setStatus('denied');
          setError('Location permission denied. You can still browse all products.');
        } else if (err.code === 2) {
          setStatus('error');
          setError('Unable to retrieve your location. Please check your connection and try again.');
        } else if (err.code === 3) {
          setStatus('error');
          setError('Location request timed out. Please try again.');
        } else {
          setStatus('error');
          setError('An error occurred while accessing your location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const retry = useCallback(() => {
    setLocation(null);
    setStatus('idle');
    setError(null);
    requestLocation();
  }, [requestLocation]);

  return {
    location,
    status,
    error,
    requestLocation,
    retry,
  };
};
