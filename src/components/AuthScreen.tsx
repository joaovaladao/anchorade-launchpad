import { useState } from 'react';
import { Anchor, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthScreenProps {
  onBack: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthScreen({ onBack, initialMode = 'login' }: AuthScreenProps) {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!loginForm.email.trim() || !loginForm.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const { error } = await signIn(loginForm.email.trim(), loginForm.password);
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!registerForm.fullName.trim() || !registerForm.email.trim() || !registerForm.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const { error } = await signUp(
      registerForm.email.trim(),
      registerForm.password,
      registerForm.fullName.trim()
    );

    if (error) {
      setError(error.message);
    } else {
      setSuccessMessage('Check your email to confirm your account before logging in.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" style={{ animation: 'float 10s ease-in-out infinite 2s' }}></div>

        <svg className="absolute top-10 left-10 w-32 h-32 opacity-5 animate-wave" viewBox="0 0 100 100" fill="none">
          <path d="M0 50 Q 25 30, 50 50 T 100 50" stroke="currentColor" strokeWidth="2" className="text-sky-400" />
          <path d="M0 60 Q 25 40, 50 60 T 100 60" stroke="currentColor" strokeWidth="2" className="text-sky-300" />
          <path d="M0 70 Q 25 50, 50 70 T 100 70" stroke="currentColor" strokeWidth="2" className="text-sky-200" />
        </svg>

        <svg className="absolute bottom-20 right-10 w-40 h-40 opacity-5 animate-float" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" className="text-cyan-300" opacity="0.5" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" className="text-cyan-200" opacity="0.3" />
        </svg>
      </div>

      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={onBack}
                className="p-2 hover:bg-sky-500/20 rounded-lg transition-smooth text-sky-300 hover:text-sky-200"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex-1 text-center">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-ocean rounded-lg blur-lg opacity-40"></div>
                    <div className="relative p-2 bg-gradient-to-br from-sky-600 to-sky-700 rounded-lg shadow-xl glow border border-sky-400/30">
                      <Anchor className="text-white" size={32} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-10"></div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-sky-500/20 shadow-2xl p-8 sm:p-10 animate-scale-in">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-center">
                {isLogin ? 'Welcome Back' : 'Join Anchorage'}
              </h1>
              <p className="text-center text-sky-200/70 text-sm mb-8">
                {isLogin
                  ? 'Log in to access your seller dashboard'
                  : 'Start your sailing adventure and sell your products'}
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm text-center">
                  {successMessage}
                </div>
              )}

              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-sky-100 mb-2">Email</label>
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 focus:bg-slate-900/70 focus:shadow-lg focus:shadow-sky-500/20 transition-smooth"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sky-100 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 focus:bg-slate-900/70 focus:shadow-lg focus:shadow-sky-500/20 transition-smooth"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-300/60 hover:text-sky-300 transition-smooth"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="button-hover-glow w-full mt-8 px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-smooth disabled:opacity-50"
                  >
                    {loading ? 'Signing in...' : 'Log in'}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-sky-500/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-slate-800/40 text-sky-300/60">or</span>
                    </div>
                  </div>

                  <p className="text-center text-sky-100/80 text-sm">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}
                      className="text-sky-300 hover:text-sky-200 font-semibold transition-smooth"
                    >
                      Become a Sailor
                    </button>
                  </p>

                  <div className="mt-6 p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                    <p className="text-xs text-sky-200/70 text-center">
                      Your data stays private. No fees. No hidden charges.
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-sky-100 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={registerForm.fullName}
                      onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                      placeholder="Your name"
                      maxLength={100}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 focus:bg-slate-900/70 focus:shadow-lg focus:shadow-sky-500/20 transition-smooth"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sky-100 mb-2">Email</label>
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 focus:bg-slate-900/70 focus:shadow-lg focus:shadow-sky-500/20 transition-smooth"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sky-100 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 focus:bg-slate-900/70 focus:shadow-lg focus:shadow-sky-500/20 transition-smooth"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-300/60 hover:text-sky-300 transition-smooth"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sky-100 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 focus:bg-slate-900/70 focus:shadow-lg focus:shadow-sky-500/20 transition-smooth"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-300/60 hover:text-sky-300 transition-smooth"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="button-hover-glow w-full mt-8 px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-smooth disabled:opacity-50"
                  >
                    {loading ? 'Creating account...' : 'Create Sailor Account'}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-sky-500/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-slate-800/40 text-sky-300/60">or</span>
                    </div>
                  </div>

                  <p className="text-center text-sky-100/80 text-sm">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}
                      className="text-sky-300 hover:text-sky-200 font-semibold transition-smooth"
                    >
                      Log in
                    </button>
                  </p>

                  <div className="mt-6 p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                    <p className="text-xs text-sky-200/70 text-center">
                      Your data stays private. No fees. No hidden charges.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
