import { useEffect, useRef, useState } from 'react';
import { Heart, Music, Volume2, VolumeX, Mail, RotateCw, Check } from 'lucide-react';
import type { ApologyPage, OpenWhenLetter, LoveCard, PromiseTodo } from '../lib/supabase';
import { themes } from '../lib/themes';
import Particles from './Particles';

interface Props {
  page: Partial<ApologyPage> & { partner_name: string; theme: string };
  isPreview?: boolean;
}

export default function ApologyPageView({ page, isPreview }: Props) {
  const theme = themes[(page.theme as keyof typeof themes) || 'pink'];
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [openLetterIndex, setOpenLetterIndex] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [checkedTodos, setCheckedTodos] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const photos = (page.photos as any[]) || [];
  const hasPhotos = photos.length > 0 && page.show_memories;

  const getMusicEmbed = () => {
    if (!page.music_url) return null;
    const url = page.music_url;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&loop=1&controls=0&showinfo=0&rel=0`;
      }
    }
    if (url.includes('open.spotify.com')) {
      const match = url.match(/track\/([A-Za-z0-9]+)/);
      if (match) {
        return `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator`;
      }
    }
    return null;
  };

  const musicEmbed = getMusicEmbed();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} relative overflow-x-hidden`}>
      <Particles color={theme.particleColor} count={14} />

      {/* Hidden music embed */}
      {musicPlaying && musicEmbed && (
        <iframe
          src={musicEmbed}
          className="sr-only"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          title="Background music"
        />
      )}

      {/* Music player button */}
      {(page.music_enabled || page.music_url) && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setMusicPlaying(p => !p)}
            className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              musicPlaying
                ? `${theme.buttonBg} ${theme.buttonText}`
                : 'bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-white'
            }`}
          >
            {musicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-5 py-16 pb-24">

        {/* Opening */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 ${theme.cardBg} border ${theme.cardBorder}`}>
            <Heart className={`w-5 h-5 ${theme.accentColor} fill-current`} />
          </div>
          <p className={`font-sans text-xs tracking-widest uppercase mb-3 ${theme.mutedColor} font-medium`}>
            A message for
          </p>
          <h1 className={`font-serif text-5xl md:text-6xl ${theme.headingColor} italic leading-tight mb-5`}>
            {page.partner_name || 'You'}
          </h1>
          <div className={`w-16 h-px ${theme.dividerColor.replace('border-', 'bg-')} mx-auto`} />
        </div>

        {/* Apology section */}
        {page.show_apology && page.apology_message && (
          <div
            className={`glass ${theme.cardBg} border ${theme.cardBorder} rounded-3xl p-8 mb-8 shadow-xl transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className={`font-sans text-xs tracking-widest uppercase mb-4 ${theme.mutedColor} font-medium`}>
              My apology
            </p>
            <blockquote className={`font-serif text-xl md:text-2xl ${theme.headingColor} leading-relaxed italic`}>
              "{page.apology_message}"
            </blockquote>
          </div>
        )}

        {/* Photos / Memories section */}
        {hasPhotos && (
          <div
            className={`mb-8 transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <p className={`font-sans text-xs tracking-widest uppercase mb-4 ${theme.mutedColor} font-medium text-center`}>
              Our memories
            </p>
            <div className={`grid gap-4 ${photos.length === 1 ? 'grid-cols-1' : photos.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
              {photos.map((photo: { url: string; caption: string }, i: number) => (
                <div
                  key={i}
                  className={`group relative rounded-2xl overflow-hidden shadow-lg ${
                    photos.length === 3 && i === 0 ? 'col-span-2' :
                    photos.length === 5 && i === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <div className="aspect-square">
                    <img
                      src={photo.url}
                      alt={photo.caption || ''}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {photo.caption && (
                    <p className="absolute bottom-3 left-0 right-0 text-center text-white text-sm font-sans font-light px-3">
                      {photo.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What I learned section */}
        {page.show_promise && page.learned_text && (
          <div
            className={`glass ${theme.cardBg} border ${theme.cardBorder} rounded-3xl p-8 mb-8 shadow-xl transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <p className={`font-sans text-xs tracking-widest uppercase mb-4 ${theme.mutedColor} font-medium`}>
              What I've learned
            </p>
            <p className={`font-sans text-base ${theme.textColor} leading-relaxed`}>
              {page.learned_text}
            </p>
          </div>
        )}

        {/* Open When Letters */}
        {page.show_open_when && ((page.open_when_letters as OpenWhenLetter[]) || []).some(l => l.message.trim()) && (
          <div
            className={`mb-8 transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className="text-center mb-6">
              <p className={`font-sans text-xs tracking-widest uppercase ${theme.mutedColor} font-medium mb-1`}>
                Open when
              </p>
              <p className={`font-sans text-sm ${theme.textColor} opacity-60`}>
                These are for specific moments. Tap to open the one you need.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {((page.open_when_letters as OpenWhenLetter[]) || []).filter(l => l.message.trim()).map((letter, i) => (
                <button
                  key={i}
                  onClick={() => setOpenLetterIndex(openLetterIndex === i ? null : i)}
                  className={`relative rounded-2xl p-5 text-left transition-all duration-500 cursor-pointer min-h-[120px] flex flex-col justify-between ${
                    openLetterIndex === i
                      ? `${theme.cardBg} border ${theme.cardBorder} shadow-xl ring-2 ring-rose-200/40`
                      : `${theme.cardBg} border ${theme.cardBorder} shadow-md hover:shadow-lg hover:-translate-y-0.5`
                  }`}
                >
                  {openLetterIndex === i ? (
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className={`w-4 h-4 ${theme.accentColor}`} />
                        <p className={`font-sans text-xs ${theme.mutedColor} font-medium`}>When {letter.trigger}</p>
                      </div>
                      <p className={`font-sans text-sm ${theme.textColor} leading-relaxed`}>
                        {letter.message}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className={`w-8 h-8 rounded-full ${theme.cardBorder.replace('border-', 'bg-')}/30 flex items-center justify-center mb-3`}>
                        <Mail className={`w-4 h-4 ${theme.mutedColor}`} />
                      </div>
                      <div>
                        <p className={`font-sans text-xs ${theme.mutedColor} font-medium mb-1`}>Open when</p>
                        <p className={`font-serif text-lg ${theme.headingColor}`}>{letter.trigger}</p>
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* What I Love About You - Flip Cards */}
        {page.show_love_cards && ((page.love_cards as LoveCard[]) || []).length > 0 && (
          <div
            className={`mb-8 transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="text-center mb-6">
              <p className={`font-sans text-xs tracking-widest uppercase ${theme.mutedColor} font-medium mb-1`}>
                What I love about you
              </p>
              <p className={`font-sans text-sm ${theme.textColor} opacity-60`}>
                Tap each card to reveal what's underneath.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {((page.love_cards as LoveCard[]) || []).map((card, i) => {
                const isFlipped = flippedCards.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => setFlippedCards(prev => {
                      const next = new Set(prev);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      return next;
                    })}
                    className="relative rounded-2xl min-h-[160px] cursor-pointer focus:outline-none group"
                    style={{ perspective: '800px' }}
                  >
                    <div
                      className={`w-full h-full absolute inset-0 transition-transform duration-500`}
                      style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    >
                      {/* Front */}
                      <div
                        className={`absolute inset-0 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} shadow-md flex flex-col items-center justify-center p-4 backface-hidden`}
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <Heart className={`w-5 h-5 ${theme.accentColor} fill-current mb-2`} />
                        <p className={`font-serif text-lg ${theme.headingColor} text-center leading-snug`}>
                          {card.front}
                        </p>
                        <div className="mt-3 flex items-center gap-1 opacity-40">
                          <RotateCw className={`w-3 h-3 ${theme.mutedColor}`} />
                          <span className={`font-sans text-xs ${theme.mutedColor}`}>tap</span>
                        </div>
                      </div>
                      {/* Back */}
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.previewSwatch} shadow-lg flex items-center justify-center p-5 backface-hidden`}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <p className={`font-sans text-sm text-center leading-relaxed ${
                          theme.id === 'dark' ? 'text-slate-100' : 'text-white'
                        }`}>
                          {card.back}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Promise Todo List */}
        {page.show_promise_todos && ((page.promise_todos as PromiseTodo[]) || []).some(t => t.text.trim()) && (
          <div
            className={`glass ${theme.cardBg} border ${theme.cardBorder} rounded-3xl p-8 mb-8 shadow-xl transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '900ms' }}
          >
            <div className="text-center mb-6">
              <p className={`font-sans text-xs tracking-widest uppercase ${theme.mutedColor} font-medium mb-1`}>
                My promises to you
              </p>
              <p className={`font-sans text-sm ${theme.textColor} opacity-60`}>
                Real actions. Not just words.
              </p>
            </div>
            <div className="space-y-3">
              {((page.promise_todos as PromiseTodo[]) || []).filter(t => t.text.trim()).map((todo, i) => {
                const isChecked = checkedTodos.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => setCheckedTodos(prev => {
                      const next = new Set(prev);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      return next;
                    })}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                      isChecked
                        ? `${theme.cardBorder.replace('border-', 'bg-')}/20 ${theme.accentColor}`
                        : `${theme.cardBg} border ${theme.cardBorder} hover:shadow-sm`
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                      isChecked
                        ? `${theme.id === 'dark' ? 'bg-slate-400 border-slate-400' : 'bg-rose-400 border-rose-400'}`
                        : `${theme.id === 'dark' ? 'border-slate-600' : 'border-gray-300'}`
                    }`}>
                      {isChecked && <Check className={`w-3.5 h-3.5 ${theme.id === 'dark' ? 'text-slate-900' : 'text-white'}`} />}
                    </div>
                    <p className={`font-sans text-sm leading-relaxed transition-all duration-300 ${
                      isChecked
                        ? `line-through opacity-50 ${theme.mutedColor}`
                        : `${theme.textColor}`
                    }`}>
                      {todo.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Closing promise */}
        {page.show_promise && page.closing_message && (
          <div
            className={`text-center py-10 px-8 transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className={`w-8 h-px ${theme.dividerColor.replace('border-', 'bg-')} mx-auto mb-6`} />
            <p className={`font-serif text-2xl md:text-3xl ${theme.headingColor} italic leading-relaxed`}>
              "{page.closing_message}"
            </p>
            <div className={`w-8 h-px ${theme.dividerColor.replace('border-', 'bg-')} mx-auto mt-6`} />
          </div>
        )}

        {/* Footer heart */}
        <div
          className={`text-center mt-10 transition-all duration-1000 ${revealed ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <Heart className={`w-6 h-6 ${theme.mutedColor} fill-current mx-auto animate-pulse`} />
          {!isPreview && (
            <p className={`font-sans text-xs mt-3 ${theme.mutedColor} opacity-50`}>
              Made with care on FromTheHeart
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
