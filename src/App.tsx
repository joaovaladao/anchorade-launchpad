import { useState } from 'react';
import EntryScreen from './components/EntryScreen';
import ProductDiscovery from './components/ProductDiscovery';
import AuthScreen from './components/AuthScreen';
import SellerDashboard from './components/SellerDashboard';
import UserProfile from './components/UserProfile';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, signOut } = useAuth();

  const [currentScreen, setCurrentScreen] = useState<'entry' | 'discovery' | 'auth'>('entry');
  const [showProfile, setShowProfile] = useState(false);
  const [showDiscoveryAsUser, setShowDiscoveryAsUser] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleSignOut = async () => {
    await signOut();
    setCurrentScreen('entry');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 flex items-center justify-center">
        <div className="text-sky-300 animate-pulse">Loading...</div>
      </div>
    );
  }

  // If logged in, show dashboard or profile
  if (user) {
    if (showDiscoveryAsUser) {
      return (
        <ProductDiscovery onBack={() => setShowDiscoveryAsUser(false)} />
      );
    }
    if (showProfile) {
      return (
        <UserProfile
          user={user}
          onBack={() => setShowProfile(false)}
          onSignOut={handleSignOut}
        />
      );
    }
    return (
      <SellerDashboard
        user={user}
        onSignOut={handleSignOut}
        onProfileClick={() => setShowProfile(true)}
        onBrowseProducts={() => setShowDiscoveryAsUser(true)}
      />
    );
  }

  // Public experience
  return (
    <>
      {currentScreen === 'entry' ? (
        <EntryScreen
          onExplore={() => setCurrentScreen('discovery')}
          onBecomeSailor={() => {
            setAuthMode('register');
            setCurrentScreen('auth');
          }}
          onLogin={() => {
            setAuthMode('login');
            setCurrentScreen('auth');
          }}
          onSignUp={() => {
            setAuthMode('register');
            setCurrentScreen('auth');
          }}
        />
      ) : currentScreen === 'discovery' ? (
        <ProductDiscovery onBack={() => setCurrentScreen('entry')} />
      ) : (
        <AuthScreen onBack={() => setCurrentScreen('entry')} initialMode={authMode} />
      )}
    </>
  );
}

export default App;