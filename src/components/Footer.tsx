import React from 'react';
import { 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight,
  Plane,
  Ship,
  Truck
} from 'lucide-react';

interface FooterProps {
  onOpenTrack: () => void;
  onOpenQuote: () => void;
  onOpenShip: () => void;
  onOpenDepot: () => void;
  onOpenCorridor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTrack,
  onOpenQuote,
  onOpenShip,
  onOpenDepot,
  onOpenCorridor,
}) => {
  return (
    <footer className="w-full bg-[#15110F] text-[#EAE0DD] pt-14 pb-8 border-t border-[#342F2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#5C0F1E] flex items-center justify-center p-1 shadow-sm border border-[#C9A227]">
                <span className="font-display text-white text-[15px] font-bold">OM</span>
              </div>
              <div>
                <div className="font-display text-[24px] tracking-wider font-extrabold text-white leading-none">
                  OMISORE
                </div>
                <div className="text-[10px] tracking-[0.22em] font-bold text-[#C9A227] leading-none uppercase">
                  LOGISTICS WORLDWIDE
                </div>
              </div>
            </div>

            <p className="text-[13px] text-[#A89F91] leading-relaxed max-w-sm">
              The premier bilateral freight, express parcel, and maritime cargo corridor bridging the United Kingdom and the Federal Republic of Nigeria.
            </p>

            <div className="p-3.5 bg-[#251D1A] rounded-xs border border-[#3E3430] text-[12px] space-y-1">
              <div className="text-[#C9A227] font-bold uppercase tracking-wider text-[10px]">
                UK HMRC & NIGERIA CUSTOMS SERVICE COMPLIANT
              </div>
              <div className="text-[#CCCCCC]">
                Operating under direct bonded apron concessions at Lagos MMIA Cargo Terminal 2.
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-[16px] text-white tracking-wider uppercase">
              CORRIDOR SERVICES
            </h4>
            <ul className="space-y-2 text-[13px] text-[#A89F91]">
              <li>
                <button onClick={onOpenShip} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">
                  Next Flight Dispatch (LHR ➔ LOS)
                </button>
              </li>
              <li>
                <button onClick={onOpenShip} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">
                  Doorstep UK Van Collection
                </button>
              </li>
              <li>
                <button onClick={onOpenQuote} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">
                  Ocean Container (FCL & LCL)
                </button>
              </li>
              <li>
                <button onClick={onOpenCorridor} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">
                  Commercial Form M & PAAR Clearance
                </button>
              </li>
              <li>
                <button onClick={onOpenTrack} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">
                  Live Consignment Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* UK Depot */}
          <div className="space-y-3">
            <h4 className="font-display text-[16px] text-white tracking-wider uppercase">
              UNITED KINGDOM HUB
            </h4>
            <div className="space-y-1.5 text-[12px] text-[#A89F91]">
              <div className="font-semibold text-white">London Consolidation Depot</div>
              <div>Mok Nails & Cosmetics, 60 Acton High Street, London W3 6LE</div>
              <div className="text-[#C9A227] font-mono pt-1">
                <a href="tel:+447450637361" className="hover:underline">+44 7450 637361</a>
              </div>
              <div className="text-[11px] text-[#888888]">Mon – Sat: 08:00 – 18:30 GMT</div>
            </div>
          </div>

          {/* Nigeria Gateway */}
          <div className="space-y-3">
            <h4 className="font-display text-[16px] text-white tracking-wider uppercase">
              NIGERIA GATEWAY
            </h4>
            <div className="space-y-1.5 text-[12px] text-[#A89F91]">
              <div className="font-semibold text-white">Lagos Air Cargo Terminal</div>
              <div>Cargo Terminal 2, Murtala Muhammed Int'l Airport, Ikeja, Lagos</div>
              <div className="text-[#C9A227] font-mono pt-1">
                <a href="tel:+23418889200" className="hover:underline">+234 1 888 9200</a>
              </div>
              <div className="text-[11px] text-[#888888]">24/7 Airside Cargo Operations</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#251D1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#888888]">
          <div>
            © {new Date().getFullYear()} Omisore Logistics Worldwide. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <button onClick={onOpenCorridor} className="hover:text-white transition-colors cursor-pointer">
              Customs Tariff & Regulations
            </button>
            <button onClick={onOpenDepot} className="hover:text-white transition-colors cursor-pointer">
              Bilateral Depot Network
            </button>
            <button onClick={onOpenQuote} className="hover:text-white transition-colors cursor-pointer">
              Freight Calculator
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
