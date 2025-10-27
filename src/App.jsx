import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import Footer from './components/Footer';
import { Calendar, Car, CreditCard, Mail, Phone, User, CheckCircle } from 'lucide-react';

const Input = ({ label, type = 'text', value, onChange, required = false, placeholder }) => (
  <label className="block">
    <span className="text-sm text-white/80">{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="mt-1 w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
    />
  </label>
);

const Select = ({ label, value, onChange, options }) => (
  <label className="block">
    <span className="text-sm text-white/80">{label}</span>
    <select
      value={value}
      onChange={onChange}
      className="mt-1 w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-zinc-900">
          {o.label}
        </option>
      ))}
    </select>
  </label>
);

const Section = ({ title, subtitle, children, icon: Icon }) => (
  <section className="py-12">
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="h-10 w-10 rounded-lg bg-white/10 text-white flex items-center justify-center">
            <Icon size={18} />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-white/70 text-sm mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  </section>
);

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

const CarBookingForm = ({ onBooked }) => {
  const [form, setForm] = useState({
    pickup: '',
    dropoff: '',
    start: '',
    end: '',
    carType: 'Sedan',
    name: '',
    email: '',
    phone: '',
  });
  const [stage, setStage] = useState('details');

  const handleChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submitDetails = (e) => {
    e.preventDefault();
    setStage('payment');
    onBooked && onBooked({ ...form, status: 'pending', createdAt: new Date().toISOString() });
  };

  const simulatePay = () => {
    onBooked && onBooked({ payment: 'success' }, true);
    setStage('success');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      {stage === 'details' && (
        <form onSubmit={submitDetails} className="grid sm:grid-cols-2 gap-4">
          <Input label="Pickup Location" value={form.pickup} onChange={handleChange('pickup')} required placeholder="e.g., Mumbai Airport" />
          <Input label="Dropoff Location" value={form.dropoff} onChange={handleChange('dropoff')} required placeholder="e.g., South Mumbai" />
          <Input label="Start Date & Time" type="datetime-local" value={form.start} onChange={handleChange('start')} required />
          <Input label="End Date & Time" type="datetime-local" value={form.end} onChange={handleChange('end')} required />
          <Select
            label="Car Type"
            value={form.carType}
            onChange={handleChange('carType')}
            options={[
              { value: 'Sedan', label: 'Sedan' },
              { value: 'SUV', label: 'SUV' },
              { value: 'Supercar', label: 'Supercar' },
              { value: 'Limousine (Chauffeured)', label: 'Limousine (Chauffeured)' },
            ]}
          />
          <div className="grid sm:grid-cols-3 gap-4 sm:col-span-2">
            <Input label="Full Name" value={form.name} onChange={handleChange('name')} required placeholder="Your name" />
            <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} required placeholder="you@example.com" />
            <Input label="Phone" type="tel" value={form.phone} onChange={handleChange('phone')} required placeholder="+91" />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-semibold">
              <Calendar size={18} />
              Review & Continue
            </button>
          </div>
        </form>
      )}

      {stage === 'payment' && (
        <div className="space-y-4">
          <div className="rounded-lg bg-black/40 border border-white/10 p-4 text-white/80">
            <p className="font-medium">Secure Checkout</p>
            <p className="text-sm text-white/70 mt-1">
              This is a demo payment step. In production, this connects to a payment gateway.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-white/80">
              <p className="font-semibold">Reservation Fee</p>
              <p className="text-sm text-white/60">Fully refundable if canceled 24h prior</p>
            </div>
            <p className="text-2xl font-bold text-white">₹9,999</p>
          </div>
          <button onClick={simulatePay} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 text-black font-semibold">
            <CreditCard size={18} /> Pay Now
          </button>
          <button onClick={() => setStage('details')} className="w-full mt-2 text-sm text-white/70 underline">
            Go back
          </button>
        </div>
      )}

      {stage === 'success' && (
        <div className="text-center py-10">
          <CheckCircle size={48} className="mx-auto text-emerald-400" />
          <h3 className="mt-4 text-2xl font-bold text-white">Payment Successful</h3>
          <p className="text-white/70 mt-2">Your luxury ride is confirmed. Our concierge will contact you shortly.</p>
        </div>
      )}
    </div>
  );
};

const EnquiryForm = ({ service, onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', details: '' });
  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ ...form, service, createdAt: new Date().toISOString() });
        setForm({ name: '', email: '', phone: '', details: '' });
      }}
      className="grid sm:grid-cols-2 gap-4"
    >
      <Input label="Full Name" value={form.name} onChange={handle('name')} required placeholder="Your name" />
      <Input label="Email" type="email" value={form.email} onChange={handle('email')} required placeholder="you@example.com" />
      <Input label="Phone" type="tel" value={form.phone} onChange={handle('phone')} required placeholder="+91" />
      <label className="block sm:col-span-2">
        <span className="text-sm text-white/80">Tell us more</span>
        <textarea
          value={form.details}
          onChange={handle('details')}
          required
          rows={4}
          placeholder="Occasion, dates, group size, preferences..."
          className="mt-1 w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </label>
      <div className="sm:col-span-2 flex justify-end">
        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-semibold">
          Submit Enquiry
        </button>
      </div>
    </form>
  );
};

const AdminView = ({ bookings, enquiries, markPaid }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <Section title="Car Bookings" subtitle="Recent car rental reservations" icon={Car}>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-sm text-white/80">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 text-left">Customer</th>
                  <th className="px-3 py-2 text-left">Car</th>
                  <th className="px-3 py-2 text-left">Pickup</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-white/60">No bookings yet.</td>
                  </tr>
                )}
                {bookings.map((b, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="px-3 py-2">{b.name}<div className="text-xs text-white/50">{b.email} · {b.phone}</div></td>
                    <td className="px-3 py-2">{b.carType}</td>
                    <td className="px-3 py-2">{b.pickup}</td>
                    <td className="px-3 py-2">{b.paid ? 'Paid' : 'Pending'}</td>
                    <td className="px-3 py-2 text-right">
                      {!b.paid && (
                        <button onClick={() => markPaid(i)} className="text-emerald-400 hover:text-emerald-300">Mark paid</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
      <div>
        <Section title="Service Enquiries" subtitle="Yachts, jets, choppers, tours, events" icon={Mail}>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-sm text-white/80">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 text-left">Service</th>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Contact</th>
                  <th className="px-3 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-6 text-center text-white/60">No enquiries yet.</td>
                  </tr>
                )}
                {enquiries.map((e, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="px-3 py-2 capitalize">{e.service}</td>
                    <td className="px-3 py-2">{e.name}</td>
                    <td className="px-3 py-2 text-xs">{e.email}<div className="text-white/50">{e.phone}</div></td>
                    <td className="px-3 py-2 max-w-[280px] truncate" title={e.details}>{e.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
};

const App = () => {
  const [route, setRoute] = useState('home');
  const [bookings, setBookings] = useLocalStorage('car_bookings', []);
  const [enquiries, setEnquiries] = useLocalStorage('service_enquiries', []);

  const addBooking = (data, updateLast = false) => {
    setBookings((prev) => {
      if (updateLast && prev.length > 0) {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], paid: true };
        return updated;
      }
      return [...prev, data];
    });
  };

  const markPaid = (index) => {
    setBookings((prev) => prev.map((b, i) => (i === index ? { ...b, paid: true } : b)));
  };

  const submitEnquiry = (data) => setEnquiries((prev) => [data, ...prev]);

  const ServiceHeader = ({ title, caption }) => (
    <div className="max-w-5xl mx-auto px-4 mt-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{title}</h1>
      <p className="text-white/70 mt-2">{caption}</p>
    </div>
  );

  const Content = useMemo(() => {
    switch (route) {
      case 'home':
        return (
          <>
            <Hero onExplore={() => setRoute('cars')} />
            <ServicesGrid onSelect={(key) => setRoute(key)} />
          </>
        );
      case 'cars':
        return (
          <>
            <ServiceHeader title="Luxury Car Rental" caption="Self-drive, chauffeur, and event deployments across major cities." />
            <div className="max-w-5xl mx-auto px-4 mt-6 grid lg:grid-cols-2 gap-8">
              <div>
                <Section title="Reserve your ride" subtitle="Instant confirmation after payment" icon={Car}>
                  <CarBookingForm onBooked={addBooking} />
                </Section>
              </div>
              <div>
                <Section title="Why choose us" subtitle="Every detail perfected">
                  <ul className="list-disc pl-5 text-white/80 space-y-2">
                    <li>Curated fleet: Rolls-Royce, Bentley, Mercedes-Maybach, Lamborghini, Ferrari</li>
                    <li>24/7 concierge support with live trip tracking</li>
                    <li>Doorstep delivery, flexible return, and transparent pricing</li>
                    <li>Comprehensive insurance and verified chauffeurs on request</li>
                  </ul>
                </Section>
              </div>
            </div>
          </>
        );
      case 'yachts':
        return (
          <>
            <ServiceHeader title="Yacht Rental – Goa" caption="Sunset cruises, celebrations, and multi-day charters on premium yachts." />
            <div className="max-w-5xl mx-auto px-4 mt-6">
              <Section title="Plan your charter" subtitle="Share details and our concierge will respond within 30 minutes" icon={Mail}>
                <EnquiryForm service="yachts" onSubmit={submitEnquiry} />
              </Section>
            </div>
          </>
        );
      case 'jets':
        return (
          <>
            <ServiceHeader title="Private Jet Charters" caption="Light to long-range jets, global coverage, and priority slots." />
            <div className="max-w-5xl mx-auto px-4 mt-6">
              <Section title="Request a jet" subtitle="Tell us your route and timing" icon={Plane}>
                <EnquiryForm service="jets" onSubmit={submitEnquiry} />
              </Section>
            </div>
          </>
        );
      case 'choppers':
        return (
          <>
            <ServiceHeader title="Chopper Services" caption="Aerial tours and city transfers with licensed operators." />
            <div className="max-w-5xl mx-auto px-4 mt-6">
              <Section title="Book a chopper" subtitle="We will coordinate clearances and logistics" icon={Helicopter}>
                <EnquiryForm service="choppers" onSubmit={submitEnquiry} />
              </Section>
            </div>
          </>
        );
      case 'tours':
        return (
          <>
            <ServiceHeader title="Bespoke Tours" caption="Handcrafted itineraries with luxury stays and experiences." />
            <div className="max-w-5xl mx-auto px-4 mt-6">
              <Section title="Design a tour" subtitle="Share preferences and dates" icon={Calendar}>
                <EnquiryForm service="tours" onSubmit={submitEnquiry} />
              </Section>
            </div>
          </>
        );
      case 'events':
        return (
          <>
            <ServiceHeader title="Events & PR" caption="From launches to celebrity bookings, executed end-to-end." />
            <div className="max-w-5xl mx-auto px-4 mt-6">
              <Section title="Start a brief" subtitle="Tell us about your goals and audience" icon={Mail}>
                <EnquiryForm service="events" onSubmit={submitEnquiry} />
              </Section>
            </div>
          </>
        );
      case 'admin':
        return (
          <div className="max-w-6xl mx-auto px-4 mt-6">
            <AdminView bookings={bookings} enquiries={enquiries} markPaid={markPaid} />
          </div>
        );
      default:
        return null;
    }
  }, [route, bookings, enquiries]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      <Navbar current={route} onNavigate={setRoute} />
      {Content}
      <Footer />
    </div>
  );
};

export default App;
