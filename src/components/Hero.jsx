import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const Hero = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Experience the Pinnacle of Luxury Travel
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              From supercar rentals to private yachts, jets, and bespoke tours — we curate seamless, world-class experiences with absolute discretion.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-semibold shadow-lg shadow-white/10 hover:shadow-white/20 transition"
              >
                Explore Services
              </button>
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck size={20} className="text-emerald-400" />
                <span>Concierge-managed by experts</span>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-5 text-white/70">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span>500+ five-star client reviews</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-amber-500/30 via-fuchsia-500/20 to-cyan-400/30 border border-white/10 overflow-hidden">
              <img
                alt="Luxury montage"
                className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                src="https://images.unsplash.com/photo-1541443131874-74a4b53a35e5?q=80&w=1600&auto=format&fit=crop"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
