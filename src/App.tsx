import { useState } from 'react';
import EntryScreen from './components/EntryScreen';
import ProductDiscovery from './components/ProductDiscovery';
import AuthScreen from './components/AuthScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'entry' | 'discovery' | 'auth'>('entry');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

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