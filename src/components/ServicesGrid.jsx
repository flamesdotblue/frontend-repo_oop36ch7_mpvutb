import React from 'react';
import { Car, Ship, Plane, Helicopter, Calendar, Sparkles } from 'lucide-react';

const Card = ({ icon: Icon, title, desc, cta, onClick }) => (
  <button
    onClick={onClick}
    className="text-left group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-6 flex flex-col justify-between"
  >
    <div>
      <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center text-white">
        <Icon size={22} />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-white/70 text-sm">{desc}</p>
    </div>
    <div className="mt-6 inline-flex items-center gap-2 text-amber-300 group-hover:gap-3 transition-all">
      <span className="text-sm font-medium">{cta}</span>
      <Calendar size={16} />
    </div>
  </button>
);

const ServicesGrid = ({ onSelect }) => {
  const services = [
    {
      key: 'cars',
      icon: Car,
      title: 'Luxury Car Rental',
      desc: 'Choose from supercars, SUVs, and chauffeured limousines for any occasion.',
      cta: 'Book a car',
    },
    {
      key: 'yachts',
      icon: Ship,
      title: 'Yacht Rental (Goa)',
      desc: 'Private charters, sunset cruises, and bespoke events on the Arabian Sea.',
      cta: 'Plan a charter',
    },
    {
      key: 'jets',
      icon: Plane,
      title: 'Private Jet',
      desc: 'On-demand charters, route planning, and VIP ground handling.',
      cta: 'Request a jet',
    },
    {
      key: 'choppers',
      icon: Helicopter,
      title: 'Chopper Services',
      desc: 'City transfers, aerial tours, and special event deployments.',
      cta: 'Book a chopper',
    },
    {
      key: 'tours',
      icon: Sparkles,
      title: 'Bespoke Tours',
      desc: 'Curated itineraries with luxury stays, dining, and exclusive access.',
      cta: 'Design a tour',
    },
    {
      key: 'events',
      icon: Sparkles,
      title: 'Events & PR',
      desc: 'End-to-end event management, talent, and premium brand activations.',
      cta: 'Start a brief',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Signature Services</h2>
          <p className="text-white/70 text-sm max-w-md">
            White-glove logistics and a personal concierge with every reservation.
          </p>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Card key={s.key} icon={s.icon} title={s.title} desc={s.desc} cta={s.cta} onClick={() => onSelect(s.key)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
