import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Clock, 
  Search, 
  Lock, 
  ChevronDown, 
  Menu, 
  X, 
  User, 
  Plane, 
  Ship, 
  Package, 
  Building2, 
  PhoneCall 
} from 'lucide-react';

interface HeaderProps {
  onOpenTrack: (waybill?: string) => void;
  onOpenQuote: () => void;
  onOpenShip: () => void;
  onOpenDepot: () => void;
  onOpenPortal: () => void;
  onOpenCorridor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTrack,
  onOpenQuote,
  onOpenShip,
  onOpenDepot,
  onOpenPortal,
  onOpenCorridor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regionDropdown, setRegionDropdown] = useState(false);
  const [currentRegion, setCurrentRegion] = useState('NIGERIA / UK HUB');

  return (
    <header className="w-full bg-white shadow-xs z-30 sticky top-0">
      {/* Top Utility Header */}
      <div className="bg-[#FAF7F2] border-b border-[#EAE4D8] text-[12px] text-[#4A4A4A] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          {/* Left: Region, Depot, Hours */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="relative">
              <button 
                id="region-selector-btn"
                onClick={() => setRegionDropdown(!regionDropdown)}
                className="flex items-center space-x-1.5 font-bold tracking-wider text-[#15110F] hover:text-[#5C0F1E] transition-colors uppercase text-[11px] focus:outline-hidden"
              >
                <Globe className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>REGION: {currentRegion}</span>
                <ChevronDown className="w-3 h-3 text-[#15110F]" />
              </button>

              {regionDropdown && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-[#EAE4D8] rounded-xs shadow-lg py-1 z-50 text-[12px]">
                  <button 
                    onClick={() => { setCurrentRegion('NIGERIA / UK HUB'); setRegionDropdown(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#FDF6E2] flex items-center justify-between font-semibold text-[#15110F]"
                  >
                    <span>🇬🇧 UK ⇄ 🇳🇬 Nigeria Corridor</span>
                    <span className="text-[10px] text-[#5C0F1E] font-bold">PRIMARY</span>
                  </button>
                  <button 
                    onClick={() => { setCurrentRegion('UNITED KINGDOM (ACTON)'); setRegionDropdown(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#FAF7F2] text-[#4A4A4A]"
                  >
                    <span>🇬🇧 London Acton Main Depot</span>
                  </button>
                  <button 
                    onClick={() => { setCurrentRegion('NIGERIA GATEWAY (LOS)'); setRegionDropdown(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#FAF7F2] text-[#4A4A4A]"
                  >
                    <span>🇳🇬 Lagos Cargo Terminal 2 (MMIA)</span>
                  </button>
                </div>
              )}
            </div>

            <button 
              id="find-depot-top-btn"
              onClick={onOpenDepot}
              className="flex items-center space-x-1 hover:text-[#5C0F1E] transition-colors text-[11px] sm:text-[12px]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Find Depot & Drop-off</span>
            </button>

            <div className="hidden md:flex items-center space-x-1 text-[#666666] text-[11px]">
              <Clock className="w-3.5 h-3.5 text-[#888888]" />
              <span>Mon - Sat 08:00 - 18:30 GMT</span>
            </div>
          </div>

          {/* Right: Track Waybill & Customer Portal */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] sm:text-[12px] font-medium">
            <button 
              id="header-track-waybill-btn"
              onClick={() => onOpenTrack()}
              className="flex items-center space-x-1 hover:text-[#5C0F1E] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Track Waybill</span>
            </button>

            <button 
              id="header-portal-login-btn"
              onClick={onOpenPortal}
              className="flex items-center space-x-1 text-[#15110F] font-semibold hover:text-[#5C0F1E] transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#5C0F1E]" />
              <span>Customer Portal Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          {/* Logo emblem */}
          <div className="w-10 h-10 rounded-full bg-[#5C0F1E] flex items-center justify-center p-1.5 shadow-sm border border-[#C9A227]">
            <div className="w-full h-full rounded-full border border-dashed border-[#C9A227] flex items-center justify-center">
              <span className="font-display text-white text-[16px] tracking-wider leading-none">OM</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-display text-[26px] tracking-wider font-extrabold text-[#5C0F1E] leading-none">
                OMISORE
              </span>
            </div>
            <span className="text-[10px] tracking-[0.25em] font-bold text-[#C9A227] leading-none uppercase">
              LOGISTICS WORLDWIDE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-[15px] font-medium text-[#15110F]">
          <button 
            id="nav-track-link"
            onClick={() => onOpenTrack()} 
            className="hover:text-[#5C0F1E] transition-colors cursor-pointer py-1"
          >
            Track
          </button>
          <button 
            id="nav-ship-link"
            onClick={onOpenShip} 
            className="hover:text-[#5C0F1E] transition-colors cursor-pointer py-1"
          >
            Ship
          </button>
          <button 
            id="nav-parcels-link"
            onClick={() => {
              const el = document.getElementById('parcels-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hover:text-[#5C0F1E] transition-colors cursor-pointer py-1"
          >
            Parcels
          </button>
          <button 
            id="nav-freight-link"
            onClick={() => {
              const el = document.getElementById('freight-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hover:text-[#5C0F1E] transition-colors cursor-pointer py-1"
          >
            Freight
          </button>
          <button 
            id="nav-business-link"
            onClick={onOpenCorridor} 
            className="hover:text-[#5C0F1E] transition-colors cursor-pointer py-1"
          >
            Business
          </button>
          <button 
            id="nav-support-link"
            onClick={onOpenDepot} 
            className="hover:text-[#5C0F1E] transition-colors cursor-pointer py-1"
          >
            Support
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <button 
            id="main-instant-quote-btn"
            onClick={onOpenQuote}
            className="px-5 py-2.5 bg-[#C9A227] hover:bg-[#d6af32] text-[#15110F] text-[13px] font-bold tracking-wide rounded-xs transition-colors shadow-xs cursor-pointer"
          >
            Instant Quote
          </button>

          <button 
            id="main-ship-now-btn"
            onClick={onOpenShip}
            className="px-5 py-2.5 bg-[#5C0F1E] hover:bg-[#780016] text-white text-[13px] font-bold tracking-wide rounded-xs transition-colors shadow-xs cursor-pointer"
          >
            Ship Now
          </button>

          <button 
            id="user-avatar-btn"
            onClick={onOpenPortal}
            title="Customer Account"
            className="w-9 h-9 rounded-full bg-[#5C0F1E] text-white flex items-center justify-center hover:bg-[#780016] transition-colors cursor-pointer"
          >
            <User className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button 
            onClick={onOpenQuote}
            className="px-3 py-1.5 bg-[#C9A227] text-[#15110F] text-[11px] font-bold rounded-xs sm:hidden"
          >
            Quote
          </button>
          <button 
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#15110F] hover:text-[#5C0F1E] focus:outline-hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#EAE4D8] px-4 py-4 space-y-3 shadow-md">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#EAE4D8]">
            <button 
              onClick={() => { onOpenQuote(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 bg-[#C9A227] text-[#15110F] text-[13px] font-bold rounded-xs text-center"
            >
              Instant Quote
            </button>
            <button 
              onClick={() => { onOpenShip(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 bg-[#5C0F1E] text-white text-[13px] font-bold rounded-xs text-center"
            >
              Ship Now
            </button>
          </div>

          <div className="flex flex-col space-y-2.5 text-[15px] font-medium text-[#15110F]">
            <button 
              onClick={() => { onOpenTrack(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-2 text-left py-1.5 hover:text-[#5C0F1E]"
            >
              <Search className="w-4 h-4 text-[#C9A227]" />
              <span>Track Waybill</span>
            </button>
            <button 
              onClick={() => { 
                const el = document.getElementById('parcels-section');
                el?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false); 
              }}
              className="flex items-center space-x-2 text-left py-1.5 hover:text-[#5C0F1E]"
            >
              <Package className="w-4 h-4 text-[#C9A227]" />
              <span>Document & Parcel Shipping</span>
            </button>
            <button 
              onClick={() => { 
                const el = document.getElementById('freight-section');
                el?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false); 
              }}
              className="flex items-center space-x-2 text-left py-1.5 hover:text-[#5C0F1E]"
            >
              <Ship className="w-4 h-4 text-[#C9A227]" />
              <span>Cargo & Container Shipping</span>
            </button>
            <button 
              onClick={() => { onOpenCorridor(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-2 text-left py-1.5 hover:text-[#5C0F1E]"
            >
              <Building2 className="w-4 h-4 text-[#C9A227]" />
              <span>UK ⇄ Nigeria Customs & Trade</span>
            </button>
            <button 
              onClick={() => { onOpenDepot(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-2 text-left py-1.5 hover:text-[#5C0F1E]"
            >
              <MapPin className="w-4 h-4 text-[#C9A227]" />
              <span>Consolidation Depots & Hours</span>
            </button>
            <button 
              onClick={() => { onOpenPortal(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-2 text-left py-1.5 text-[#5C0F1E] font-semibold"
            >
              <Lock className="w-4 h-4" />
              <span>Customer Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
