import { Plus, Trash2, Mail, Heart, CheckSquare } from 'lucide-react';
import type { EditorData } from '../../pages/Editor';
import type { OpenWhenLetter, LoveCard, PromiseTodo } from '../../lib/supabase';

interface Props {
  data: EditorData;
  onChange: (partial: Partial<EditorData>) => void;
}

export default function StepInteractive({ data, onChange }: Props) {
  // --- Open When Letters ---
  const updateLetter = (index: number, field: keyof OpenWhenLetter, value: string) => {
    const letters = data.open_when_letters.map((l, i) =>
      i === index ? { ...l, [field]: value } : l
    );
    onChange({ open_when_letters: letters });
  };

  // --- Love Cards ---
  const addLoveCard = () => {
    if (data.love_cards.length >= 8) return;
    onChange({ love_cards: [...data.love_cards, { front: '', back: '' }] });
  };

  const updateLoveCard = (index: number, field: keyof LoveCard, value: string) => {
    const cards = data.love_cards.map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    );
    onChange({ love_cards: cards });
  };

  const removeLoveCard = (index: number) => {
    onChange({ love_cards: data.love_cards.filter((_, i) => i !== index) });
  };

  // --- Promise Todos ---
  const addTodo = () => {
    if (data.promise_todos.length >= 10) return;
    onChange({ promise_todos: [...data.promise_todos, { text: '', done: false }] });
  };

  const updateTodo = (index: number, text: string) => {
    const todos = data.promise_todos.map((t, i) =>
      i === index ? { ...t, text } : t
    );
    onChange({ promise_todos: todos });
  };

  const removeTodo = (index: number) => {
    onChange({ promise_todos: data.promise_todos.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8 max-w-xl">
      {/* Section toggles */}
      <div className="space-y-2.5">
        {[
          { key: 'show_open_when' as const, label: '"Open When" Letters', desc: '4 sealed letters they open at specific moments', icon: Mail },
          { key: 'show_love_cards' as const, label: '"What I Love About You" Cards', desc: 'Flip cards with hidden messages', icon: Heart },
          { key: 'show_promise_todos' as const, label: 'Promise Action List', desc: 'Specific actions you commit to change', icon: CheckSquare },
        ].map(({ key, label, desc, icon: Icon }) => (
          <label key={key} className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="mt-0.5">
              <div
                onClick={() => onChange({ [key]: !data[key] })}
                className={`w-5 h-5 rounded flex items-center justify-center transition-colors border cursor-pointer ${
                  data[key] ? 'bg-rose-400 border-rose-400' : 'bg-white border-gray-300'
                }`}
              >
                {data[key] && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <p className="font-sans text-sm font-medium text-gray-700">{label}</p>
              </div>
              <p className="font-sans text-xs text-gray-400">{desc}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Open When Letters */}
      {data.show_open_when && (
        <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-rose-400" />
            <p className="font-sans text-sm font-medium text-gray-700">"Open When" Letters</p>
          </div>
          <p className="font-sans text-xs text-gray-400 mb-3">
            These are sealed messages {data.partner_name || 'they'} can open at specific moments. Fill in the message for each trigger.
          </p>
          {data.open_when_letters.map((letter, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-xs font-sans font-medium">{i + 1}</span>
                <input
                  type="text"
                  value={letter.trigger}
                  onChange={e => updateLetter(i, 'trigger', e.target.value)}
                  placeholder="Open when..."
                  className="flex-1 text-sm font-sans text-gray-700 bg-transparent outline-none placeholder:text-gray-300"
                />
              </div>
              <textarea
                value={letter.message}
                onChange={e => updateLetter(i, 'message', e.target.value)}
                placeholder="Write what you want them to read in this moment..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-rose-300 focus:ring-1 focus:ring-rose-100 outline-none font-sans text-sm text-gray-700 placeholder:text-gray-300 transition-all leading-relaxed"
              />
            </div>
          ))}
        </div>
      )}

      {/* Love Cards */}
      {data.show_love_cards && (
        <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <p className="font-sans text-sm font-medium text-gray-700">"What I Love About You" Cards</p>
            </div>
            {data.love_cards.length < 8 && (
              <button
                onClick={addLoveCard}
                className="flex items-center gap-1.5 text-xs font-sans text-rose-400 hover:text-rose-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add card
              </button>
            )}
          </div>
          <p className="font-sans text-xs text-gray-400 mb-3">
            Each card shows a short quality on the front. Press to flip and reveal the deeper message.
          </p>
          {data.love_cards.length === 0 && (
            <button
              onClick={addLoveCard}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
            >
              <Heart className="w-5 h-5 text-gray-300 mx-auto mb-2" />
              <p className="font-sans text-sm text-gray-400">Add your first love card</p>
            </button>
          )}
          {data.love_cards.map((card, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-xs text-gray-400">Card {i + 1}</span>
                <button onClick={() => removeLoveCard(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={card.front}
                onChange={e => updateLoveCard(i, 'front', e.target.value)}
                placeholder="Front: e.g. Your laugh"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-rose-300 focus:ring-1 focus:ring-rose-100 outline-none font-sans text-sm text-gray-700 placeholder:text-gray-300 mb-2 transition-all"
              />
              <textarea
                value={card.back}
                onChange={e => updateLoveCard(i, 'back', e.target.value)}
                placeholder="Back: The deeper reason — e.g. It fills the whole room and makes everything feel safe again"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-rose-300 focus:ring-1 focus:ring-rose-100 outline-none font-sans text-sm text-gray-700 placeholder:text-gray-300 transition-all leading-relaxed"
              />
            </div>
          ))}
        </div>
      )}

      {/* Promise Todos */}
      {data.show_promise_todos && (
        <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-rose-400" />
              <p className="font-sans text-sm font-medium text-gray-700">Promise Action List</p>
            </div>
            {data.promise_todos.length < 10 && (
              <button
                onClick={addTodo}
                className="flex items-center gap-1.5 text-xs font-sans text-rose-400 hover:text-rose-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add promise
              </button>
            )}
          </div>
          <p className="font-sans text-xs text-gray-400 mb-3">
            Specific, concrete actions you commit to. Not vague promises — real things you'll do differently.
          </p>
          {data.promise_todos.length === 0 && (
            <button
              onClick={addTodo}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
            >
              <CheckSquare className="w-5 h-5 text-gray-300 mx-auto mb-2" />
              <p className="font-sans text-sm text-gray-400">Add your first promise</p>
            </button>
          )}
          {data.promise_todos.map((todo, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
              <div className="w-6 h-6 rounded border-2 border-gray-200 flex-shrink-0 flex items-center justify-center">
                <span className="text-xs text-gray-300 font-sans">{i + 1}</span>
              </div>
              <input
                type="text"
                value={todo.text}
                onChange={e => updateTodo(i, e.target.value)}
                placeholder="e.g. I will ask how you feel before assuming..."
                className="flex-1 font-sans text-sm text-gray-700 outline-none placeholder:text-gray-300 bg-transparent"
              />
              <button onClick={() => removeTodo(i)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
