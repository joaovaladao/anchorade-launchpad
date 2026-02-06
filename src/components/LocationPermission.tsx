import { MapPin, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useUserLocation, LocationStatus } from '../hooks/useUserLocation';

interface LocationPermissionProps {
  onLocationGranted: (latitude: number, longitude: number) => void;
  onSkip: () => void;
}

export default function LocationPermission({ onLocationGranted, onSkip }: LocationPermissionProps) {
  const { location, status, error, requestLocation, retry } = useUserLocation();

  const handleRequestClick = () => {
    requestLocation();
  };

  if (location && status === 'granted') {
    onLocationGranted(location.latitude, location.longitude);
  }

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex p-4 bg-sky-500/20 rounded-2xl mb-6">
                <MapPin size={48} className="text-sky-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Enable Location Services
              </h2>
              <p className="text-sky-100/80 text-lg">
                We use your location to show nearby boats and island vendors selling amazing local products.
              </p>
              <p className="text-sky-100/60 text-sm mt-4">
                Your location is only used during this session and never stored or shared.
              </p>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-sky-300 text-sm">What we do with your location:</h3>
              <ul className="space-y-2 text-sm text-sky-100/80">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
                  Show products from nearby sellers
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
                  Help you find the best deals in your area
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
                  Connect with local maritime communities
                </li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleRequestClick}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-smooth flex items-center justify-center gap-2"
              >
                <MapPin size={20} />
                Grant Location Access
              </button>
              <button
                onClick={onSkip}
                className="flex-1 px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-sky-300 font-semibold rounded-lg border border-sky-500/30 hover:border-sky-500/50 transition-smooth"
              >
                Browse All
              </button>
            </div>
          </div>
        );

      case 'requesting':
        return (
          <div className="text-center space-y-6 py-8">
            <Loader size={48} className="text-sky-400 animate-spin mx-auto" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Accessing your location...
              </h2>
              <p className="text-sky-100/80">
                Please confirm the location permission request in your browser
              </p>
            </div>
          </div>
        );

      case 'granted':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="inline-flex p-4 bg-emerald-500/20 rounded-2xl">
              <CheckCircle size={48} className="text-emerald-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Location Found
              </h2>
              <p className="text-sky-100/80 mb-4">
                Showing products near you at coordinates {location?.latitude.toFixed(4)}, {location?.longitude.toFixed(4)}
              </p>
              <p className="text-sky-100/60 text-sm">
                Accuracy: ~{Math.round(location?.accuracy || 0)}m
              </p>
            </div>
          </div>
        );

      case 'denied':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex p-4 bg-amber-500/20 rounded-2xl mb-6">
                <AlertCircle size={48} className="text-amber-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Location Permission Denied
              </h2>
              <p className="text-sky-100/80">
                {error}
              </p>
              <p className="text-sky-100/60 text-sm mt-3">
                To enable location services, go to your browser settings and allow access for this site.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={retry}
                className="flex-1 px-6 py-3 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 font-semibold rounded-lg border border-sky-500/30 hover:border-sky-500/50 transition-smooth"
              >
                Try Again
              </button>
              <button
                onClick={onSkip}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-smooth"
              >
                Continue Without Location
              </button>
            </div>
          </div>
        );

      case 'unsupported':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex p-4 bg-red-500/20 rounded-2xl mb-6">
                <AlertCircle size={48} className="text-red-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Geolocation Not Supported
              </h2>
              <p className="text-sky-100/80">
                Your browser doesn't support geolocation. You can still browse and explore all products.
              </p>
            </div>

            <button
              onClick={onSkip}
              className="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-smooth"
            >
              Browse Products
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex p-4 bg-orange-500/20 rounded-2xl mb-6">
                <AlertCircle size={48} className="text-orange-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Location Error
              </h2>
              <p className="text-sky-100/80">
                {error}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={retry}
                className="flex-1 px-6 py-3 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 font-semibold rounded-lg border border-sky-500/30 hover:border-sky-500/50 transition-smooth"
              >
                Retry
              </button>
              <button
                onClick={onSkip}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-smooth"
              >
                Skip
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-sky-500/20 shadow-2xl">
        {renderContent()}
      </div>
    </div>
  );
}
