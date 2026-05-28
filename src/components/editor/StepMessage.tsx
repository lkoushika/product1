import type { EditorData } from '../../pages/Editor';

interface Props {
  data: EditorData;
  onChange: (partial: Partial<EditorData>) => void;
}

export default function StepMessage({ data, onChange }: Props) {
  return (
    <div className="space-y-6 max-w-xl">
      {data.show_apology && (
        <div>
          <label className="block font-sans text-sm font-medium text-gray-600 mb-2">
            Your apology message <span className="text-rose-400">*</span>
          </label>
          <textarea
            value={data.apology_message}
            onChange={e => onChange({ apology_message: e.target.value })}
            placeholder="Write what's in your heart. Don't filter it. Just say it how it feels..."
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none font-sans text-base text-gray-800 placeholder:text-gray-300 transition-all leading-relaxed"
            autoFocus
          />
          <div className="flex justify-between mt-1.5">
            <p className="text-xs text-gray-400 font-sans">This is the heart of your page. Be honest and specific.</p>
            <p className="text-xs text-gray-300 font-sans">{data.apology_message.length} chars</p>
          </div>
        </div>
      )}

      {data.show_promise && (
        <>
          <div>
            <label className="block font-sans text-sm font-medium text-gray-600 mb-2">
              What I learned / How I'll change
            </label>
            <textarea
              value={data.learned_text}
              onChange={e => onChange({ learned_text: e.target.value })}
              placeholder="e.g. I've learned that I don't listen enough. I will choose patience over pride..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none font-sans text-base text-gray-800 placeholder:text-gray-300 transition-all leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-sans text-sm font-medium text-gray-600 mb-2">
              Closing message
            </label>
            <textarea
              value={data.closing_message}
              onChange={e => onChange({ closing_message: e.target.value })}
              placeholder="A final word from the heart. How you want them to feel after reading this..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none font-sans text-base text-gray-800 placeholder:text-gray-300 transition-all leading-relaxed"
            />
          </div>
        </>
      )}

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
        <p className="font-sans text-xs text-amber-700/80 leading-relaxed">
          <span className="font-medium">Tip:</span> Be specific about what you did, not just how you feel. "I raised my voice when you needed comfort" lands deeper than "I'm sorry for being bad."
        </p>
      </div>
    </div>
  );
}
