import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm">© {new Date().getFullYear()} Aurelius Luxury. All rights reserved.</p>
          <div className="text-white/60 text-sm">
            Crafted with excellence for discerning travelers.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
