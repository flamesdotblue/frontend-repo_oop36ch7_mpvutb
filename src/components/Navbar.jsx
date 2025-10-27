import React from 'react';
import { Car, Ship, Plane, Helicopter, Home, LayoutDashboard } from 'lucide-react';

const NavItem = ({ icon: Icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10 ${
      active ? 'bg-white/15 text-white' : 'text-white/90'
    }`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

const Navbar = ({ current, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/10 bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 to-rose-500" />
            <span className="text-white text-lg font-semibold tracking-wide">Aurelius Luxury</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <NavItem icon={Home} label="Home" active={current==='home'} onClick={() => onNavigate('home')} />
            <NavItem icon={Car} label="Car Rental" active={current==='cars'} onClick={() => onNavigate('cars')} />
            <NavItem icon={Ship} label="Yacht Rental" active={current==='yachts'} onClick={() => onNavigate('yachts')} />
            <NavItem icon={Plane} label="Private Jet" active={current==='jets'} onClick={() => onNavigate('jets')} />
            <NavItem icon={Helicopter} label="Choppers" active={current==='choppers'} onClick={() => onNavigate('choppers')} />
            <NavItem icon={Home} label="Tours" active={current==='tours'} onClick={() => onNavigate('tours')} />
            <NavItem icon={Home} label="Events & PR" active={current==='events'} onClick={() => onNavigate('events')} />
            <NavItem icon={LayoutDashboard} label="Admin" active={current==='admin'} onClick={() => onNavigate('admin')} />
          </nav>
          <div className="md:hidden">
            <select
              value={current}
              onChange={(e) => onNavigate(e.target.value)}
              className="bg-black/40 text-white border border-white/10 rounded-md px-3 py-2 text-sm"
            >
              <option value="home">Home</option>
              <option value="cars">Car Rental</option>
              <option value="yachts">Yacht Rental</option>
              <option value="jets">Private Jet</option>
              <option value="choppers">Choppers</option>
              <option value="tours">Tours</option>
              <option value="events">Events & PR</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
