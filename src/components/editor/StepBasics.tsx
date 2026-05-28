import type { EditorData } from '../../pages/Editor';

interface Props {
  data: EditorData;
  onChange: (partial: Partial<EditorData>) => void;
}

export default function StepBasics({ data, onChange }: Props) {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <label className="block font-sans text-sm font-medium text-gray-600 mb-2">
          Their name <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          value={data.partner_name}
          onChange={e => onChange({ partner_name: e.target.value })}
          placeholder="e.g. Sarah, my love, babe..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none font-sans text-base text-gray-800 placeholder:text-gray-300 transition-all"
          autoFocus
        />
        <p className="mt-1.5 text-xs text-gray-400 font-sans">This appears at the top of the page as a personal greeting.</p>
      </div>

      <div className="bg-rose-50/50 rounded-2xl p-5">
        <p className="font-sans text-sm text-rose-700/70 leading-relaxed">
          <span className="font-medium text-rose-600">What you're building:</span> A beautiful, personal webpage that opens with their name and holds your message, your memories, and your promise — all in one place they can return to.
        </p>
      </div>

      <div>
        <p className="font-sans text-sm font-medium text-gray-600 mb-3">Which sections would you like to include?</p>
        <div className="space-y-2.5">
          {[
            { key: 'show_apology' as const, label: 'Apology message', desc: 'Your main heartfelt message to them' },
            { key: 'show_memories' as const, label: 'Memories & photos', desc: 'Photos with short captions' },
            { key: 'show_promise' as const, label: 'Closing promise', desc: 'What you learned and what you\'ll change' },
            { key: 'show_open_when' as const, label: '"Open When" Letters', desc: '4 sealed letters for specific moments' },
            { key: 'show_love_cards' as const, label: '"What I Love About You" Cards', desc: 'Flip cards with hidden messages' },
            { key: 'show_promise_todos' as const, label: 'Promise Action List', desc: 'Specific actions you commit to change' },
          ].map(({ key, label, desc }) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="mt-0.5">
                <input
                  type="checkbox"
                  checked={data[key]}
                  onChange={e => onChange({ [key]: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${
                  data[key] ? 'bg-rose-400 border-rose-400' : 'bg-white border-gray-300'
                }`}>
                  {data[key] && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-gray-700">{label}</p>
                <p className="font-sans text-xs text-gray-400">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
