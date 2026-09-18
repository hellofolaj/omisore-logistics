import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Plane, Phone, ArrowRight, Clock, Building } from 'lucide-react';
import { DepotInfo } from '../types';

interface BilateralCorridorSectionProps {
  onOpenDepotModal: (depotId?: string) => void;
  onOpenCorridorInfo: () => void;
}

export const BilateralCorridorSection: React.FC<BilateralCorridorSectionProps> = ({
  onOpenDepotModal,
  onOpenCorridorInfo,
}) => {
  return (
    <section className="w-full bg-[#FAF7F2] py-14 sm:py-18 px-4 sm:px-8 border-b border-[#EAE4D8] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="text-[11px] font-extrabold tracking-widest text-[#735A00] uppercase">
            GROUND INFRASTRUCTURE
          </div>
          <h2 className="font-display text-[32px] sm:text-[40px] font-extrabold tracking-wide text-[#15110F] uppercase mt-1 leading-tight">
            BILATERAL CORRIDOR PRESENCE
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] mt-1 max-w-3xl">
            Direct physical presence across key consolidation hubs in the United Kingdom and Nigeria, providing drop-off, cargo inspection, and customer service.
          </p>
        </motion.div>

        {/* 2 Hub Cards with Staggered Scroll Reveal & Micro-Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Hub 1: London Consolidation Depot */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group bg-[#FAF6EE] rounded-xs border border-[#EAE4D8] hover:border-[#C9A227] hover:shadow-[0_12px_30px_rgba(201,162,39,0.2)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Top header badge */}
            <div className="p-6 pb-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xs bg-[#5C0F1E] text-[#C9A227] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#780016] transition-all duration-300 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold tracking-widest text-[#735A00] uppercase">
                    UNITED KINGDOM HUB
                  </div>
                  <h3 className="font-bold text-[18px] sm:text-[20px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    London Consolidation Depot
                  </h3>
                </div>
              </div>

              <div className="text-[13px] font-semibold text-[#15110F] bg-white/80 px-3 py-2 rounded-xs border border-[#EAE4D8] group-hover:border-[#C9A227]/40 transition-colors">
                Mok Nails & Cosmetics, 60 Acton High Street, London W3 6LE
              </div>

              <p className="text-[13px] text-[#4A4A4A] leading-relaxed pt-1">
                Primary consolidation point for express parcels, commercial baggage, and air cargo. Open for walk-in package drop-off Monday through Saturday.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 border-t border-[#EAE4D8] bg-[#F4EFE5] group-hover:bg-[#F0E9DC] transition-colors flex flex-wrap items-center justify-between gap-3 text-[13px] font-bold">
              <a
                href="tel:+447450637361"
                className="inline-flex items-center space-x-2 text-[#15110F] hover:text-[#5C0F1E] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#5C0F1E]" />
                <span>+44 7450 637361</span>
              </a>

              <button
                id="london-depot-directions-btn"
                onClick={() => onOpenDepotModal('london-acton')}
                className="inline-flex items-center space-x-1.5 text-[#5C0F1E] hover:text-[#780016] uppercase text-[12px] tracking-wider font-extrabold cursor-pointer group-hover:translate-x-0.5 transition-transform"
              >
                <span>DIRECTIONS & HOURS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Hub 2: Lagos Air Cargo Terminal */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group bg-[#FAF6EE] rounded-xs border border-[#EAE4D8] hover:border-[#C9A227] hover:shadow-[0_12px_30px_rgba(201,162,39,0.2)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Top header badge */}
            <div className="p-6 pb-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xs bg-[#5C0F1E] text-[#C9A227] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#780016] transition-all duration-300 shadow-2xs">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold tracking-widest text-[#735A00] uppercase">
                    NIGERIA GATEWAY
                  </div>
                  <h3 className="font-bold text-[18px] sm:text-[20px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    Lagos Air Cargo Terminal
                  </h3>
                </div>
              </div>

              <div className="text-[13px] font-semibold text-[#15110F] bg-white/80 px-3 py-2 rounded-xs border border-[#EAE4D8] group-hover:border-[#C9A227]/40 transition-colors">
                Cargo Terminal 2, Murtala Muhammed International Airport, Ikeja, Lagos
              </div>

              <p className="text-[13px] text-[#4A4A4A] leading-relaxed pt-1">
                Customs bonded sorting facility for flight reception, freight de-consolidation, and dispatch into nationwide delivery networks.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 border-t border-[#EAE4D8] bg-[#F4EFE5] group-hover:bg-[#F0E9DC] transition-colors flex flex-wrap items-center justify-between gap-3 text-[13px] font-bold">
              <a
                href="tel:+23418889200"
                className="inline-flex items-center space-x-2 text-[#15110F] hover:text-[#5C0F1E] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#5C0F1E]" />
                <span>+234 1 888 9200</span>
              </a>

              <button
                id="lagos-depot-customs-btn"
                onClick={() => onOpenDepotModal('lagos-airport')}
                className="inline-flex items-center space-x-1.5 text-[#5C0F1E] hover:text-[#780016] uppercase text-[12px] tracking-wider font-extrabold cursor-pointer group-hover:translate-x-0.5 transition-transform"
              >
                <span>CUSTOMS DESK INFO</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
