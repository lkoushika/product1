import { useState } from 'react';
import { Lock, Heart } from 'lucide-react';
import { ACCESS_PASSWORD, logAccess } from '../lib/supabase';

interface GatePageProps {
  onAccess: () => void;
}

export default function GatePage({ onAccess }: GatePageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      logAccess();
      onAccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-200/20 rounded-full blur-3xl" />

      <div className={`relative z-10 w-full max-w-sm ${shake ? 'animate-shake' : ''}`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/60 backdrop-blur-sm border border-rose-100 shadow-lg mb-4">
            <Heart className="w-6 h-6 text-rose-400 fill-rose-300" />
          </div>
          <h1 className="font-serif text-2xl text-rose-800 mb-1">FromTheHeart</h1>
          <p className="font-sans text-sm text-rose-400/60">Enter your access code to continue</p>
        </div>

        {/* Password card */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-rose-100 shadow-2xl shadow-rose-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-sans text-sm font-medium text-rose-600 mb-2">
                <Lock className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                Access code
              </label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false); }}
                placeholder="Enter password..."
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none font-sans text-base text-gray-800 placeholder:text-rose-300/60 bg-white/50 transition-all text-center tracking-wider"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-red-400 text-center">
                Incorrect access code. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3.5 rounded-xl font-sans text-sm font-medium shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all duration-200"
            >
              Unlock
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-xs text-rose-300/50 mt-6">
          This product requires an access code
        </p>
      </div>
    </div>
  );
}

