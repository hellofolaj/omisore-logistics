import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Barcode, 
  Calendar, 
  Calculator, 
  Building2, 
  Plane, 
  Ship, 
  Truck, 
  Radio, 
  Warehouse, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onTrack: (waybill: string) => void;
  onOpenShip: () => void;
  onOpenQuote: () => void;
  onOpenBusiness: () => void;
  onSelectTransitMode?: (mode: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onTrack,
  onOpenShip,
  onOpenQuote,
  onOpenBusiness,
  onSelectTransitMode,
}) => {
  const [waybillInput, setWaybillInput] = useState('OMI-UKNG-2026-00124');
  const [selectedTransitMode, setSelectedTransitMode] = useState('road');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waybillInput.trim()) {
      onTrack(waybillInput.trim());
    }
  };

  const transitModes = [
    { id: 'air', label: 'AIR PRIORITY', icon: Plane },
    { id: 'sea', label: 'SEA FREIGHT', icon: Ship },
    { id: 'road', label: 'ROAD & VAN', icon: Truck, isHighlighted: true },
    { id: 'tarmac', label: 'TARMAC HUB', icon: Radio },
    { id: 'depot', label: 'LONDON DEPOT', icon: Warehouse },
  ];

  return (
    <div className="relative w-full bg-[#15110F] text-white overflow-hidden">
      {/* Dynamic Background: Autoplaying Muted Looping Transit/Highway Video with Ken Burns Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2000&q=80"
          className="w-full h-full object-cover object-center animate-ken-burns opacity-40 mix-blend-luminosity scale-105"
        >
          <source src="https://assets.mixkit.co/videos/42777/42777-720.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/34320/34320-720.mp4" type="video/mp4" />
          {/* Fallback image if video cannot load */}
          <img 
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2000&q=80" 
            alt="Logistics transport motorway corridor"
            className="w-full h-full object-cover object-center opacity-45 mix-blend-luminosity animate-ken-burns"
          />
        </video>

        {/* Dark gradient overlay preserving high text contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#15110F]/90 via-[#2A050C]/70 to-[#15110F]/95" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#15110F]/40 to-[#15110F]/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-10 md:pt-16 md:pb-12 flex flex-col items-center">
        
        {/* Primary TRACK YOUR SHIPMENT Card with Scroll/Entrance Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl bg-white rounded-md shadow-2xl p-5 sm:p-7 text-[#15110F] border border-[#EAE4D8] hover:border-[#C9A227]/70 transition-all duration-300"
        >
          {/* Card Top Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-[#5C0F1E]" />
              <h1 className="font-display text-[26px] sm:text-[30px] font-bold tracking-wider text-[#15110F] uppercase leading-none">
                TRACK YOUR SHIPMENT
              </h1>
            </div>

            {/* Live Gateway Pill */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FDF6E2] border border-[#C9A227]/40 rounded-full text-[11px] font-bold tracking-wider text-[#735A00] uppercase shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE TRACKING GATEWAY</span>
            </div>
          </div>

          <p className="text-[#4A4A4A] text-[13px] sm:text-[14px] mb-4">
            Enter your waybill, air consignment number, or maritime container code:
          </p>

          {/* Form Input + Track Button */}
          <form onSubmit={handleTrackSubmit} className="space-y-2.5">
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative grow flex items-center bg-[#F6F1E6] rounded-xs border border-[#D8D1C5] focus-within:border-[#5C0F1E] focus-within:ring-1 focus-within:ring-[#5C0F1E] transition-all duration-300">
                <div className="pl-3.5 pr-2 flex items-center pointer-events-none text-[#735A00]">
                  <Barcode className="w-5 h-5" />
                </div>
                <input
                  id="hero-waybill-input"
                  type="text"
                  value={waybillInput}
                  onChange={(e) => setWaybillInput(e.target.value)}
                  placeholder="e.g. OMI-UKNG-2026-00124"
                  className="w-full bg-transparent py-3 pr-4 text-[#15110F] font-mono text-[14px] sm:text-[15px] font-semibold tracking-wider placeholder-[#888888] focus:outline-hidden"
                />
              </div>

              <motion.button
                id="hero-track-submit-btn"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#5C0F1E] hover:bg-[#780016] text-white font-bold text-[14px] tracking-wider uppercase rounded-xs transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
              >
                <span>TRACK</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Bottom Metadata row */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-[#735A00] pt-1">
              <div className="flex items-center space-x-1.5">
                <span className="text-[#666666]">Sample:</span>
                <button
                  type="button"
                  onClick={() => setWaybillInput('OMI-UKNG-2026-00124')}
                  className="font-mono font-semibold underline hover:text-[#5C0F1E] cursor-pointer transition-colors"
                >
                  OMI-UKNG-2026-00124
                </button>
                <span className="text-[#CCCCCC]">|</span>
                <button
                  type="button"
                  onClick={() => setWaybillInput('OMI-SEANG-2026-00045')}
                  className="font-mono font-semibold underline hover:text-[#5C0F1E] cursor-pointer transition-colors"
                >
                  OMI-SEANG-2026-00045
                </button>
              </div>

              <div className="font-medium text-[#555555]">
                UK ⇄ Nigeria Bilateral Air & Sea Corridor
              </div>
            </div>
          </form>
        </motion.div>

        {/* Quick Action Cards Trio with Scroll Reveal & Hover Micro-Interactions */}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">
          {/* Card 1: Ship Now */}
          <motion.button
            id="hero-quick-ship-btn"
            onClick={onOpenShip}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white hover:bg-[#FCF9F2] text-left p-4 rounded-xs border border-[#EAE4D8] hover:border-[#C9A227] hover:shadow-[0_8px_25px_rgba(201,162,39,0.18)] transition-all duration-300 flex items-start space-x-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[15px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-tight">Ship Now</h3>
              <p className="text-[12px] text-[#666666] truncate mt-0.5">Find service & book depot pick-up...</p>
            </div>
          </motion.button>

          {/* Card 2: Get a Quote */}
          <motion.button
            id="hero-quick-quote-btn"
            onClick={onOpenQuote}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white hover:bg-[#FCF9F2] text-left p-4 rounded-xs border border-[#EAE4D8] hover:border-[#C9A227] hover:shadow-[0_8px_25px_rgba(201,162,39,0.18)] transition-all duration-300 flex items-start space-x-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300 shadow-2xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[15px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-tight">Get a Quote</h3>
              <p className="text-[12px] text-[#666666] truncate mt-0.5">Estimate air & container costs</p>
            </div>
          </motion.button>

          {/* Card 3: Omisore for Business */}
          <motion.button
            id="hero-quick-business-btn"
            onClick={onOpenBusiness}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white hover:bg-[#FCF9F2] text-left p-4 rounded-xs border border-[#EAE4D8] hover:border-[#C9A227] hover:shadow-[0_8px_25px_rgba(201,162,39,0.18)] transition-all duration-300 flex items-start space-x-3 cursor-pointer overflow-hidden"
          >
            {/* Gold Corner Tag */}
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#C9A227] group-hover:bg-[#5C0F1E] transition-colors" />

            <div className="w-9 h-9 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300 shadow-2xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[15px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-tight">Omisore for Business</h3>
              <p className="text-[12px] text-[#666666] truncate mt-0.5">Request enterprise trade terms</p>
            </div>
          </motion.button>
        </div>

      </div>

      {/* Bottom Horizontal Transit Modes Ribbon */}
      <div className="w-full bg-[#350711]/90 backdrop-blur-xs border-t border-[#5C0F1E]/60 text-white py-2.5 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between overflow-x-auto gap-4 scrollbar-none text-[11px] sm:text-[12px] font-bold tracking-wider uppercase">
          {transitModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = selectedTransitMode === mode.id;
            return (
              <button
                key={mode.id}
                id={`transit-mode-${mode.id}`}
                onClick={() => {
                  setSelectedTransitMode(mode.id);
                  onSelectTransitMode?.(mode.id);
                }}
                className={`flex items-center space-x-2 py-1.5 px-3 rounded-xs whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-b-2 border-[#C9A227] text-[#C9A227] bg-[#5C0F1E]/50 shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-[#5C0F1E]/30'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-transform duration-300 ${isSelected ? 'text-[#C9A227] scale-110' : 'text-stone-300'}`} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
