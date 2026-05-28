import { Music, Volume2, VolumeX } from 'lucide-react';
import type { EditorData } from '../../pages/Editor';
import type { Theme } from '../../lib/supabase';
import { themes } from '../../lib/themes';

interface Props {
  data: EditorData;
  onChange: (partial: Partial<EditorData>) => void;
}

const themeOrder: Theme[] = ['pink', 'blue', 'dark'];

export default function StepMusicTheme({ data, onChange }: Props) {
  return (
    <div className="space-y-8 max-w-xl">
      {/* Theme selector */}
      <div>
        <p className="font-sans text-sm font-medium text-gray-600 mb-3">Choose your page theme</p>
        <div className="grid grid-cols-3 gap-3">
          {themeOrder.map((themeId) => {
            const t = themes[themeId];
            const isSelected = data.theme === themeId;
            return (
              <button
                key={themeId}
                onClick={() => onChange({ theme: themeId })}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  isSelected ? 'border-gray-800 shadow-md scale-[1.02]' : 'border-transparent hover:border-gray-200'
                }`}
              >
                {/* Swatch preview */}
                <div className={`h-16 bg-gradient-to-br ${t.previewSwatch}`} />
                <div className="bg-white px-2 py-2 text-center">
                  <p className="font-sans text-xs font-medium text-gray-700 leading-tight">{t.name}</p>
                  <p className="font-sans text-xs text-gray-400">{t.description}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Music section */}
      <div>
        <p className="font-sans text-sm font-medium text-gray-600 mb-3">Background music (optional)</p>

        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors mb-4">
          <div className="flex items-center gap-3">
            {data.music_enabled ? (
              <Volume2 className="w-5 h-5 text-rose-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
            <div>
              <p className="font-sans text-sm font-medium text-gray-700">Soft ambient music</p>
              <p className="font-sans text-xs text-gray-400">Plays automatically when they open the page</p>
            </div>
          </div>
          <div
            onClick={() => onChange({ music_enabled: !data.music_enabled })}
            className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${
              data.music_enabled ? 'bg-rose-400' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
              data.music_enabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </div>
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Music className="w-4 h-4 text-gray-300" />
          </div>
          <input
            type="url"
            value={data.music_url}
            onChange={e => onChange({ music_url: e.target.value })}
            placeholder="Or paste a YouTube / Spotify link..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none font-sans text-sm text-gray-700 placeholder:text-gray-300 transition-all"
          />
        </div>
        <p className="mt-1.5 text-xs text-gray-400 font-sans">If both are enabled, your link takes priority over ambient music.</p>
      </div>

      {/* Final note */}
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
        <p className="font-sans text-sm text-rose-700/70 leading-relaxed">
          You're almost there. Once you publish, you'll get a unique link to send to {data.partner_name || 'them'}. The page lives at that link permanently.
        </p>
      </div>
    </div>
  );
}
