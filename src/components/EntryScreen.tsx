import { Anchor, Ship, MapPin, ChevronRight, Zap, Compass } from 'lucide-react';
import { useState } from 'react';

interface EntryScreenProps {
  onExplore: () => void;
  onBecomeSailor: () => void;
  onLogin: () => void;
  onSignUp: () => void;
}

export default function EntryScreen({ onExplore, onBecomeSailor, onLogin, onSignUp }: EntryScreenProps) {
  const [, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" style={{ animation: 'float 10s ease-in-out infinite 2s' }}></div>

        <svg className="absolute top-10 left-10 w-32 h-32 opacity-10 animate-wave" viewBox="0 0 100 100" fill="none">
          <path d="M0 50 Q 25 30, 50 50 T 100 50" stroke="currentColor" strokeWidth="2" className="text-sky-400" />
          <path d="M0 60 Q 25 40, 50 60 T 100 60" stroke="currentColor" strokeWidth="2" className="text-sky-300" />
          <path d="M0 70 Q 25 50, 50 70 T 100 70" stroke="currentColor" strokeWidth="2" className="text-sky-200" />
        </svg>

        <svg className="absolute bottom-20 right-10 w-40 h-40 opacity-10 animate-float" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" className="text-cyan-300" opacity="0.5" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" className="text-cyan-200" opacity="0.3" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <header className="relative text-center mb-16 lg:mb-24 animate-slide-up">
          <div className="absolute top-0 right-0 flex gap-3 sm:gap-4 items-center">
            <button
              onClick={onLogin}
              className="px-4 sm:px-6 py-2 text-sky-300 hover:text-sky-200 font-medium transition-smooth text-sm sm:text-base"
            >
              Log in
            </button>
            <button
              onClick={onSignUp}
              className="px-4 sm:px-6 py-2 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 hover:text-sky-200 border border-sky-500/40 hover:border-sky-500/60 font-medium rounded-lg transition-smooth text-sm sm:text-base"
            >
              Sign up
            </button>
          </div>
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-ocean rounded-2xl blur-xl opacity-50"></div>
              <div className="relative p-4 bg-gradient-to-br from-sky-600 to-sky-700 rounded-2xl shadow-2xl glow border border-sky-400/30">
                <Anchor className="text-white" size={48} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">Anchorage</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-sky-100 max-w-3xl mx-auto leading-relaxed font-light">
            Connect with local sellers. Trade freely on the waves. Discover the future of maritime commerce.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-sky-300 text-sm">
            <Compass size={16} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>Real-time location-based marketplace</span>
          </div>
        </header>

        <div className="max-w-5xl mx-auto mb-16 lg:mb-20">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 lg:p-12 border border-sky-500/20 backdrop-blur-md shadow-2xl animate-scale-in">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {[
                {
                  icon: Ship,
                  color: 'sky',
                  title: 'For Explorers',
                  desc: 'Find authentic local products as you sail between islands and coastal communities'
                },
                {
                  icon: MapPin,
                  color: 'cyan',
                  title: 'Location Powered',
                  desc: 'Discover sellers nearby in real-time. Perfect for sailors and island hoppers'
                },
                {
                  icon: Zap,
                  color: 'amber',
                  title: 'Instant Trading',
                  desc: 'Seamless commerce experience built for the water and wireless connectivity'
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl transition-smooth cursor-pointer"
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth"></div>
                  <div className="relative">
                    <div className={`inline-flex p-3 bg-${feature.color}-500/20 rounded-xl mb-4 group-hover:bg-${feature.color}-500/30 transition-smooth`}>
                      <feature.icon className={`text-${feature.color}-400`} size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sky-100/80 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onExplore} className="button-hover-glow px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-smooth flex items-center justify-center gap-2 group">
                Explore Nearby Products
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              <button onClick={onBecomeSailor} className="button-hover-glow px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-sky-300 font-semibold rounded-xl border border-sky-500/30 hover:border-sky-400/60 transition-smooth flex items-center justify-center gap-2 group">
                Become a Sailor
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { number: '50K+', label: 'Active Sellers' },
              { number: '100K+', label: 'Happy Explorers' },
              { number: '25+', label: 'Island Regions' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 transition-smooth" style={{ animation: `slideUp 0.8s ease-out ${idx * 0.1}s both` }}>
                <div className="text-3xl font-bold text-sky-300 mb-1">{stat.number}</div>
                <div className="text-sm text-sky-100/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-sky-100/60 text-sm mt-16">
          <p>
            Connecting island communities, sailors, and travelers across the Caribbean and Central America
          </p>
        </footer>
      </div>
    </div>
  );
}
