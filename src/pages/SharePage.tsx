import { useState } from 'react';
import { Heart, Copy, Check, Download, ExternalLink, ArrowLeft } from 'lucide-react';
import type { ApologyPage } from '../lib/supabase';
import { themes } from '../lib/themes';
import ApologyPageView from '../components/ApologyPageView';

interface SharePageProps {
  page: ApologyPage;
  onCreateAnother: () => void;
}

export default function SharePage({ page, onCreateAnother }: SharePageProps) {
  const [copied, setCopied] = useState(false);
  const [showPage, setShowPage] = useState(false);

  const shareUrl = `${window.location.origin}/page/${page.slug}`;
  const theme = themes[page.theme];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const photos = (page.photos as any[]) || [];
    const letters = ((page.open_when_letters as any[]) || []).filter((l: any) => l.message?.trim());
    const cards = (page.love_cards as any[]) || [];
    const todos = ((page.promise_todos as any[]) || []).filter((t: any) => t.text?.trim());
    const themeStyles = {
      pink: { bg: '#fff1f3', card: 'rgba(255,255,255,0.7)', text: '#881337', muted: '#fda4b4', accent: '#f43f6a' },
      blue: { bg: '#f0f9ff', card: 'rgba(255,255,255,0.7)', text: '#0c4a6e', muted: '#93cbfc', accent: '#3b8ef3' },
      dark: { bg: '#0f172a', card: 'rgba(255,255,255,0.05)', text: '#f1f5f9', muted: '#64748b', accent: '#94a3b8' },
    }[page.theme] || {};

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>A message for ${page.partner_name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { min-height: 100vh; background: ${themeStyles.bg}; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
    .container { max-width: 640px; margin: 0 auto; padding: 4rem 1.5rem 6rem; }
    .opening { text-align: center; margin-bottom: 4rem; }
    .label { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: ${themeStyles.muted}; margin-bottom: 0.75rem; font-weight: 500; }
    .name { font-family: 'Playfair Display', serif; font-size: 3.5rem; color: ${themeStyles.text}; font-style: italic; }
    .card { background: ${themeStyles.card}; backdrop-filter: blur(16px); border-radius: 1.5rem; padding: 2rem; margin-bottom: 2rem; border: 1px solid rgba(0,0,0,0.05); }
    blockquote { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: ${themeStyles.text}; line-height: 1.7; font-style: italic; }
    .body-text { font-size: 1rem; color: ${themeStyles.text}; line-height: 1.7; opacity: 0.85; }
    .photos { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
    .photo-item { border-radius: 1rem; overflow: hidden; aspect-ratio: 1; position: relative; }
    .photo-item img { width: 100%; height: 100%; object-fit: cover; }
    .closing { text-align: center; padding: 2.5rem 2rem; }
    .closing-quote { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: ${themeStyles.text}; font-style: italic; line-height: 1.6; }
    .divider { width: 3rem; height: 1px; background: ${themeStyles.muted}; margin: 1.5rem auto; opacity: 0.4; }
    .footer { text-align: center; margin-top: 3rem; color: ${themeStyles.muted}; font-size: 0.75rem; opacity: 0.5; }
    .open-when-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
    .open-when-card { background: ${themeStyles.card}; border: 1px solid rgba(0,0,0,0.05); border-radius: 1rem; padding: 1.25rem; min-height: 100px; }
    .open-when-label { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: ${themeStyles.muted}; margin-bottom: 0.25rem; }
    .open-when-trigger { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: ${themeStyles.text}; margin-bottom: 0.5rem; }
    .open-when-msg { font-size: 0.85rem; color: ${themeStyles.text}; line-height: 1.6; opacity: 0.85; }
    .love-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
    .love-card { background: ${themeStyles.card}; border: 1px solid rgba(0,0,0,0.05); border-radius: 1rem; padding: 1.25rem; text-align: center; min-height: 120px; display: flex; flex-direction: column; justify-content: center; }
    .love-front { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: ${themeStyles.text}; }
    .love-back { font-size: 0.85rem; color: ${themeStyles.text}; line-height: 1.6; opacity: 0.85; }
    .todo-list { list-style: none; margin-bottom: 2rem; }
    .todo-item { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
    .todo-check { width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${themeStyles.muted}; flex-shrink: 0; margin-top: 1px; }
    .todo-text { font-size: 0.9rem; color: ${themeStyles.text}; line-height: 1.5; }
    @media (max-width: 640px) { .love-grid { grid-template-columns: 1fr 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="opening">
      <p class="label">A message for</p>
      <h1 class="name">${page.partner_name}</h1>
      <div class="divider"></div>
    </div>
    ${page.show_apology && page.apology_message ? `
    <div class="card">
      <p class="label">My apology</p>
      <blockquote>"${page.apology_message}"</blockquote>
    </div>` : ''}
    ${photos.length > 0 && page.show_memories ? `
    <p class="label" style="text-align:center;margin-bottom:1rem">Our memories</p>
    <div class="photos">
      ${photos.map((p: any) => `<div class="photo-item"><img src="${p.url}" alt="${p.caption || ''}" /></div>`).join('')}
    </div>` : ''}
    ${page.show_promise && page.learned_text ? `
    <div class="card">
      <p class="label">What I've learned</p>
      <p class="body-text">${page.learned_text}</p>
    </div>` : ''}
    ${page.show_open_when && letters.length > 0 ? `
    <p class="label" style="text-align:center;margin-bottom:1rem">Open when</p>
    <div class="open-when-grid">
      ${letters.map((l: any) => `<div class="open-when-card"><p class="open-when-label">Open when</p><p class="open-when-trigger">${l.trigger}</p><p class="open-when-msg">${l.message}</p></div>`).join('')}
    </div>` : ''}
    ${page.show_love_cards && cards.length > 0 ? `
    <p class="label" style="text-align:center;margin-bottom:1rem">What I love about you</p>
    <div class="love-grid">
      ${cards.map((c: any) => `<div class="love-card"><p class="love-front">${c.front}</p><p class="love-back" style="margin-top:0.5rem">${c.back}</p></div>`).join('')}
    </div>` : ''}
    ${page.show_promise_todos && todos.length > 0 ? `
    <p class="label" style="text-align:center;margin-bottom:1rem">My promises to you</p>
    <ul class="todo-list">
      ${todos.map((t: any) => `<li class="todo-item"><div class="todo-check"></div><p class="todo-text">${t.text}</p></li>`).join('')}
    </ul>` : ''}
    ${page.show_promise && page.closing_message ? `
    <div class="closing">
      <div class="divider"></div>
      <p class="closing-quote">"${page.closing_message}"</p>
      <div class="divider"></div>
    </div>` : ''}
    <div class="footer">Made with care &bull; FromTheHeart</div>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `for-${page.partner_name.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showPage) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setShowPage(false)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-sans transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to share
            </button>
            <span className={`text-sm font-sans ${theme.accentColor} font-medium`}>
              Your page is live
            </span>
          </div>
        </div>
        <div className="pt-14">
          <ApologyPageView page={page} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center px-4 py-16`}>
      <div className="max-w-lg w-full">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${theme.cardBg} border ${theme.cardBorder} shadow-lg mb-4`}>
            <Heart className={`w-7 h-7 ${theme.accentColor} fill-current animate-pulse`} />
          </div>
          <h1 className={`font-serif text-3xl ${theme.headingColor} mb-2`}>
            Your page is ready.
          </h1>
          <p className={`font-sans text-sm ${theme.textColor} opacity-60`}>
            Send this link to {page.partner_name}. It's theirs to keep.
          </p>
        </div>

        {/* Share card */}
        <div className={`glass ${theme.cardBg} border ${theme.cardBorder} rounded-3xl p-6 shadow-2xl mb-6`}>
          <p className={`font-sans text-xs tracking-widest uppercase ${theme.mutedColor} font-medium mb-3`}>
            Your share link
          </p>
          <div className="flex items-center gap-2 bg-white/50 rounded-xl p-3 mb-4">
            <p className={`flex-1 font-sans text-sm ${theme.textColor} truncate`}>{shareUrl}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans text-sm font-medium transition-all duration-200 ${
                copied
                  ? 'bg-green-400 text-white'
                  : `${theme.buttonBg} ${theme.buttonText}`
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy link'}
            </button>

            <button
              onClick={() => setShowPage(true)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans text-sm font-medium border ${theme.cardBorder} ${theme.textColor} hover:bg-white/30 transition-colors`}
            >
              <ExternalLink className="w-4 h-4" />
              Preview
            </button>
          </div>

          <button
            onClick={handleDownload}
            className={`w-full flex items-center justify-center gap-2 mt-3 py-3 px-4 rounded-xl font-sans text-sm font-medium border ${theme.cardBorder} ${theme.textColor} hover:bg-white/30 transition-colors`}
          >
            <Download className="w-4 h-4" />
            Download as HTML file
          </button>
        </div>

        {/* Tips */}
        <div className={`glass ${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-5 mb-6`}>
          <p className={`font-sans text-xs ${theme.textColor} opacity-60 leading-relaxed`}>
            Share the link over text, WhatsApp, or email. The page works on any device, even without internet after download.
          </p>
        </div>

      </div>
    </div>
  );
}



