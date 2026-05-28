import { Heart, Sparkles, Share2, Music, Image, ArrowRight } from 'lucide-react';
import Particles from '../components/Particles';

interface LandingProps {
  onCreateClick: () => void;
}

export default function Landing({ onCreateClick }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 relative overflow-hidden">
      <Particles color="#fda4b4" count={20} />

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
          <span className="font-serif text-rose-700 text-lg font-semibold tracking-wide">FromTheHeart</span>
        </div>
        <button
          onClick={onCreateClick}
          className="text-sm font-medium text-rose-500 hover:text-rose-700 transition-colors duration-200"
        >
          Create yours
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-3xl mx-auto">
        <div className="mb-6 flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-rose-100 rounded-full px-4 py-2 text-rose-500 text-sm font-medium shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Express what words alone cannot</span>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-rose-900 leading-tight mb-6"
          style={{ fontStyle: 'normal' }}>
          Say sorry the way
          <br />
          <span className="italic text-rose-500">they deserve to hear it.</span>
        </h1>

        <p className="text-rose-700/70 text-lg md:text-xl font-sans font-light leading-relaxed mb-10 max-w-xl">
          Create a personal, beautiful apology page in under 5 minutes. Add your words, memories, and music. Share a link. Let them feel it.
        </p>

        <button
          onClick={onCreateClick}
          className="group flex items-center gap-3 bg-rose-400 hover:bg-rose-500 text-white px-8 py-4 rounded-full text-base font-medium shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all duration-300 hover:-translate-y-0.5"
        >
          Create your apology page
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        <p className="mt-4 text-rose-400/60 text-sm font-sans">Free. No account needed. Ready in minutes.</p>
      </section>

      {/* Demo preview card */}
      <section className="relative z-10 px-6 pb-24 max-w-2xl mx-auto">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-rose-100 shadow-2xl shadow-rose-100 overflow-hidden">
          {/* Demo header */}
          <div className="px-8 pt-10 pb-6 text-center border-b border-rose-50">
            <p className="text-rose-400 font-sans text-xs tracking-widest uppercase mb-3 font-medium">A message for</p>
            <h2 className="font-serif text-3xl text-rose-800 italic">Sarah</h2>
            <div className="w-12 h-px bg-rose-200 mx-auto mt-4" />
          </div>

          {/* Demo body */}
          <div className="px-8 py-8 space-y-6">
            <div>
              <p className="font-sans text-rose-500 text-xs tracking-widest uppercase mb-3 font-medium">My apology</p>
              <p className="font-serif text-rose-900 text-lg leading-relaxed italic">
                "I know I hurt you, and I'm deeply sorry. I never meant for my words to make you feel unseen. You mean everything to me, and I would do anything to earn your trust back."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?w=400', caption: 'Our first trip together' },
                { src: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?w=400', caption: 'The day everything changed' },
              ].map((photo, i) => (
                <div key={i} className="rounded-2xl overflow-hidden aspect-square relative">
                  <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-sans font-light px-2">{photo.caption}</p>
                </div>
              ))}
            </div>

            <div className="bg-rose-50/80 rounded-2xl p-5">
              <p className="font-sans text-rose-500 text-xs tracking-widest uppercase mb-2 font-medium">I promise to</p>
              <p className="font-sans text-rose-800 text-sm leading-relaxed">
                Listen more than I speak. Show up when it matters. Choose you, every single day.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-rose-400/50 text-xs font-sans mt-4">This is what your page could look like</p>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: 'Deeply personal',
              desc: 'Add your name, your words, and your memories. Every page is completely unique.',
            },
            {
              icon: Image,
              title: 'Add your photos',
              desc: 'Upload up to 5 photos with captions. Turn your memories into the message.',
            },
            {
              icon: Music,
              title: 'Set the mood',
              desc: 'Add a song link or play soft ambient music in the background.',
            },
            {
              icon: Share2,
              title: 'Share instantly',
              desc: 'Get a unique link to send them. Works beautifully on any device.',
            },
            {
              icon: Sparkles,
              title: 'Choose your theme',
              desc: 'Baby blue, pastel pink, or dark rainy mode. Pick the mood that fits.',
            },
            {
              icon: ArrowRight,
              title: 'Ready in minutes',
              desc: 'No account. No complexity. Just fill in what matters and share.',
            },
          ].map((f, i) => (
            <div key={i} className="bg-white/50 backdrop-blur-sm border border-rose-50 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="font-serif text-rose-800 text-lg mb-2">{f.title}</h3>
              <p className="font-sans text-rose-600/70 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA bottom */}
      <section className="relative z-10 px-6 pb-24 text-center">
        <div className="bg-white/60 backdrop-blur-sm border border-rose-100 rounded-3xl px-8 py-12 max-w-xl mx-auto shadow-lg shadow-rose-50">
          <Heart className="w-8 h-8 text-rose-300 fill-rose-200 mx-auto mb-4 animate-pulse" />
          <h2 className="font-serif text-3xl text-rose-800 mb-3">It starts with saying sorry.</h2>
          <p className="font-sans text-rose-600/70 text-base mb-8 leading-relaxed">
            The hardest part is beginning. Let this page say what you're struggling to say out loud.
          </p>
          <button
            onClick={onCreateClick}
            className="group flex items-center gap-3 bg-rose-400 hover:bg-rose-500 text-white px-8 py-4 rounded-full text-base font-medium shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all duration-300 hover:-translate-y-0.5 mx-auto"
          >
            Create your page now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </section>

      <footer className="relative z-10 text-center pb-10">
        <p className="font-sans text-rose-300/60 text-xs">Made with care &bull; FromTheHeart</p>
      </footer>
    </div>
  );
}
