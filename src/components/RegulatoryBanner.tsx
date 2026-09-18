import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RegulatoryBannerProps {
  onExplore: () => void;
}

export const RegulatoryBanner: React.FC<RegulatoryBannerProps> = ({ onExplore }) => {
  return (
    <section className="w-full bg-[#E5A812] border-y border-[#C98F0A] py-6 px-4 sm:px-8 text-[#15110F] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Left Content */}
        <div className="flex items-start space-x-4 max-w-3xl group">
          {/* Shield Emblem */}
          <div className="w-12 h-12 rounded-sm bg-[#5C0F1E] text-[#E5A812] flex items-center justify-center shrink-0 shadow-sm mt-0.5 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold tracking-widest text-[#4A2600] uppercase">
                REGULATORY TRADE NOTICE
              </span>
              <span className="inline-flex items-center text-[10px] bg-[#15110F]/10 px-2 py-0.5 rounded-full font-bold">
                <CheckCircle2 className="w-2.5 h-2.5 mr-1 text-[#5C0F1E]" />
                LHR ⇄ LOS COMPLIANT
              </span>
            </div>

            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#15110F] leading-tight">
              Navigating UK–Nigeria Customs & Cargo Clearance
            </h2>

            <p className="text-[13px] sm:text-[14px] text-[#2C1800] leading-relaxed pt-0.5">
              Trade between London Heathrow (LHR) and Lagos Murtala Muhammed (LOS) is fully streamlined. Authorized customs clearance, bonded warehouse facilities, and doorstep delivery across all 36 Nigerian states.
            </p>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="shrink-0 w-full md:w-auto">
          <motion.button
            id="regulatory-explore-solutions-btn"
            onClick={onExplore}
            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 20px rgba(92, 15, 30, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto px-6 py-3.5 bg-[#5C0F1E] hover:bg-[#780016] text-white font-bold text-[13px] tracking-wider uppercase rounded-xs transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>EXPLORE CORRIDOR SOLUTIONS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
