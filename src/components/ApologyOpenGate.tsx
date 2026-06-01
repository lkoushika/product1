import { useState } from 'react';
import { themes } from '../lib/themes';
import type { Theme } from '../lib/supabase';
import SorryBunny from './SorryBunny';

interface ApologyOpenGateProps {
  partnerName: string;
  themeId: Theme;
  onOpen: () => void;
}

export default function ApologyOpenGate({ partnerName, themeId, onOpen }: ApologyOpenGateProps) {
  const theme = themes[themeId] ?? themes.pink;
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(onOpen, 450);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center px-4 relative overflow-hidden`}
    >
      <div
        className="absolute top-1/4 left-1/5 w-56 h-56 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: theme.particleColor }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-40 h-40 rounded-full blur-3xl opacity-25"
        style={{ backgroundColor: theme.particleColor }}
      />

      <div
        className={`text-center max-w-sm w-full transition-all duration-500 ease-out ${
          opening ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="flex justify-center mb-2">
          <SorryBunny className="w-44 h-auto drop-shadow-md animate-[gentle-bob_3s_ease-in-out_infinite]" />
        </div>

        <p className={`font-sans text-xs tracking-widest uppercase mb-2 ${theme.mutedColor} font-medium`}>
          Someone made this for you
        </p>
        {partnerName?.trim() && (
          <h1 className={`font-serif text-3xl ${theme.headingColor} italic mb-6`}>{partnerName}</h1>
        )}

        <button
          type="button"
          onClick={handleOpen}
          disabled={opening}
          className={`inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-full font-sans text-sm font-medium tracking-wide shadow-lg shadow-rose-200/50 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 ${theme.buttonBg} ${theme.buttonText}`}
        >
          Open
        </button>

        <p className={`mt-5 font-sans text-xs ${theme.mutedColor} opacity-80`}>
          Tap when you&apos;re ready
        </p>
      </div>

      <style>{`
        @keyframes gentle-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
