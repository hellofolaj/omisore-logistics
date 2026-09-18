import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, Bell, Calendar, Info } from 'lucide-react';
import { SERVICE_BULLETINS } from '../data/mockData';
import { BulletinItem } from '../types';

interface ServiceUpdatesSectionProps {
  onSelectBulletin?: (bulletin: BulletinItem) => void;
}

export const ServiceUpdatesSection: React.FC<ServiceUpdatesSectionProps> = ({ onSelectBulletin }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (bulletin: BulletinItem) => {
    if (expandedId === bulletin.id) {
      setExpandedId(null);
    } else {
      setExpandedId(bulletin.id);
    }
    onSelectBulletin?.(bulletin);
  };

  return (
    <section className="w-full bg-[#FAF7F2] py-12 sm:py-16 px-4 sm:px-8 border-b border-[#EAE4D8] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center space-x-2 text-[11px] font-extrabold tracking-widest text-[#735A00] uppercase mb-1">
            <Bell className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>CORRIDOR ADVISORIES</span>
          </div>
          <h2 className="font-display text-[28px] sm:text-[34px] font-extrabold tracking-wide text-[#15110F] uppercase leading-none">
            IMPORTANT SERVICE UPDATES
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#4A4A4A] mt-1.5">
            Service bulletins keep you up to date with news, regulatory changes, and flight departures across the corridor:
          </p>
        </motion.div>

        {/* Updates List with Staggered Scroll Reveal & Micro-Interactions */}
        <div className="space-y-2.5">
          {SERVICE_BULLETINS.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className={`bg-white rounded-xs border transition-all duration-300 shadow-2xs overflow-hidden ${
                  isExpanded ? 'border-[#C9A227] shadow-sm ring-1 ring-[#C9A227]/30' : 'border-[#EAE4D8] hover:border-[#C9A227] hover:shadow-[0_4px_16px_rgba(201,162,39,0.15)]'
                }`}
              >
                <button
                  id={`service-bulletin-${item.id}`}
                  onClick={() => toggleExpand(item)}
                  className="w-full text-left p-4 sm:px-6 sm:py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden group"
                >
                  <div className="flex items-start sm:items-center space-x-3 text-[13px] sm:text-[14px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] shrink-0 mt-1 sm:mt-0 group-hover:scale-125 transition-transform" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                      <span className="font-bold text-[#15110F] group-hover:text-[#5C0F1E] transition-colors whitespace-normal">
                        {item.title}
                      </span>
                      <span className="hidden sm:inline text-[#CCCCCC]">|</span>
                      <span className="text-[#666666] text-[12px] sm:text-[13px]">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-[#888888] group-hover:text-[#5C0F1E] transition-colors">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#5C0F1E] transition-transform duration-300" />
                    ) : (
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </div>
                </button>

                {/* Expanded Details Drawer with Smooth Animation */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="px-6 pb-5 pt-2 border-t border-[#F6F1E6] bg-[#FCF9F2] text-[13px] text-[#4A4A4A] space-y-2"
                    >
                      <div className="flex items-center space-x-3 text-[11px] font-bold text-[#735A00] uppercase">
                        <span className="bg-[#FDF6E2] px-2 py-0.5 rounded-xs border border-[#C9A227]/40">
                          {item.tag}
                        </span>
                        <span>Published: {item.date}</span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#2C1800]">
                        {item.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
