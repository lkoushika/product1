import { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import type { ApologyPage, Photo, Theme, OpenWhenLetter, LoveCard, PromiseTodo } from '../lib/supabase';
import { themes } from '../lib/themes';
import StepBasics from '../components/editor/StepBasics';
import StepMessage from '../components/editor/StepMessage';
import StepMemories from '../components/editor/StepMemories';
import StepMusicTheme from '../components/editor/StepMusicTheme';
import StepInteractive from '../components/editor/StepInteractive';
import ApologyPageView from '../components/ApologyPageView';

interface EditorProps {
  onPublish: (page: Omit<ApologyPage, 'id' | 'created_at'>) => Promise<void>;
  isPublishing: boolean;
}

export type EditorData = {
  partner_name: string;
  apology_message: string;
  learned_text: string;
  closing_message: string;
  photos: Photo[];
  music_url: string;
  music_enabled: boolean;
  theme: Theme;
  show_apology: boolean;
  show_memories: boolean;
  show_promise: boolean;
  open_when_letters: OpenWhenLetter[];
  love_cards: LoveCard[];
  promise_todos: PromiseTodo[];
  show_open_when: boolean;
  show_love_cards: boolean;
  show_promise_todos: boolean;
};

const defaultData: EditorData = {
  partner_name: '',
  apology_message: '',
  learned_text: '',
  closing_message: '',
  photos: [],
  music_url: '',
  music_enabled: false,
  theme: 'pink',
  show_apology: true,
  show_memories: true,
  show_promise: true,
  open_when_letters: [
    { trigger: 'you feel alone', message: '' },
    { trigger: 'you miss me', message: '' },
    { trigger: 'you are sad', message: '' },
    { trigger: 'you need a reminder', message: '' },
  ],
  love_cards: [],
  promise_todos: [],
  show_open_when: false,
  show_love_cards: false,
  show_promise_todos: false,
};

const steps = [
  { label: 'Who is this for?', short: 'Who' },
  { label: 'Your message', short: 'Message' },
  { label: 'Memories', short: 'Memories' },
  { label: 'Interactive sections', short: 'Interactive' },
  { label: 'Music & Theme', short: 'Finish' },
];

export default function Editor({ onPublish, isPublishing }: EditorProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<EditorData>(defaultData);
  const [showPreview, setShowPreview] = useState(false);

  const update = (partial: Partial<EditorData>) => {
    setData(prev => ({ ...prev, ...partial }));
  };

  const theme = themes[data.theme];

  const canProceed = (): boolean => {
    if (step === 0) return data.partner_name.trim().length > 0;
    if (step === 1) return data.apology_message.trim().length > 0;
    return true;
  };

  const handlePublish = () => {
    const slug = `${data.partner_name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Math.random().toString(36).slice(2, 8)}`;
    onPublish({
      ...data,
      slug,
      music_url: data.music_url || null,
    });
  };

  if (showPreview) {
    return (
      <div className="min-h-screen">
        {/* Preview bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setShowPreview(false)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-sans transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to editor
            </button>
            <span className="text-gray-400 text-xs font-sans">Live Preview</span>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-2 bg-rose-400 hover:bg-rose-500 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-full font-medium transition-colors"
            >
              {isPublishing ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Heart className="w-3.5 h-3.5" />}
              {isPublishing ? 'Publishing...' : 'Publish & Share'}
            </button>
          </div>
        </div>
        <div className="pt-14">
          <ApologyPageView page={{ ...data, slug: 'preview', id: 'preview' }} isPreview />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-300" />
            <span className="font-serif text-rose-700 text-base font-semibold">FromTheHeart</span>
          </div>
          <button
            onClick={() => setShowPreview(true)}
            className="text-sm text-gray-500 hover:text-gray-700 font-sans border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            Preview
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'opacity-100' : 'opacity-30'} transition-opacity`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium font-sans transition-colors ${
                  i < step ? 'bg-rose-400 text-white' :
                  i === step ? 'bg-rose-400 text-white ring-4 ring-rose-100' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-sans hidden sm:block ${i === step ? 'text-rose-600 font-medium' : 'text-gray-400'}`}>
                  {s.short}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-px mx-2 sm:mx-3 transition-colors ${i < step ? 'bg-rose-300' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 pt-8 pb-4 border-b border-gray-50">
            <h2 className="font-serif text-2xl text-gray-800">{steps[step].label}</h2>
          </div>

          <div className="p-6">
            {step === 0 && <StepBasics data={data} onChange={update} />}
            {step === 1 && <StepMessage data={data} onChange={update} />}
            {step === 2 && <StepMemories data={data} onChange={update} />}
            {step === 3 && <StepInteractive data={data} onChange={update} />}
            {step === 4 && <StepMusicTheme data={data} onChange={update} />}
          </div>

          {/* Navigation */}
          <div className="px-6 pb-8 flex items-center justify-between">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 disabled:opacity-0 text-sm font-sans transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-rose-400 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full text-sm font-medium font-sans shadow-sm transition-all duration-200"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPreview(true)}
                  className="text-sm text-gray-500 hover:text-gray-700 font-sans border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-full transition-colors"
                >
                  Preview first
                </button>
                <button
                  onClick={handlePublish}
                  disabled={isPublishing || !data.partner_name.trim() || !data.apology_message.trim()}
                  className="flex items-center gap-2 bg-rose-400 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full text-sm font-medium font-sans shadow-lg shadow-rose-200 transition-all duration-200"
                >
                  {isPublishing ? <Loader className="w-4 h-4 animate-spin" /> : <Heart className="w-4 h-4 fill-white" />}
                  {isPublishing ? 'Publishing...' : 'Publish & Get Link'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live mini preview hint */}
        {data.partner_name && (
          <div className={`mt-6 rounded-2xl border p-4 ${theme.cardBg} ${theme.cardBorder} bg-gradient-to-br ${theme.bgGradient}`}>
            <p className="font-sans text-xs text-center mb-2 opacity-50">Quick preview</p>
            <p className={`font-serif text-center text-xl ${theme.headingColor} italic`}>
              A message for {data.partner_name}
            </p>
            {data.apology_message && (
              <p className={`font-sans text-sm text-center mt-2 ${theme.textColor} opacity-70 line-clamp-2`}>
                "{data.apology_message.slice(0, 100)}{data.apology_message.length > 100 ? '...' : ''}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
