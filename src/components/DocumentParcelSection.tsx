import React from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  Plane, 
  MapPin, 
  ArrowLeftRight, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  Truck
} from 'lucide-react';

interface DocumentParcelSectionProps {
  onExploreExpress: () => void;
  onOpenShip: () => void;
}

export const DocumentParcelSection: React.FC<DocumentParcelSectionProps> = ({
  onExploreExpress,
  onOpenShip,
}) => {
  return (
    <section id="parcels-section" className="w-full bg-white py-14 sm:py-18 px-4 sm:px-8 border-b border-[#EAE4D8] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Text, Feature Grid, CTA with Reveal on Scroll */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FAF7F2] border border-[#EAE4D8] rounded-xs text-[11px] font-extrabold tracking-wider text-[#5C0F1E] uppercase">
            <Package className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>FOR ALL SHIPPERS</span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-[34px] sm:text-[42px] leading-tight font-extrabold tracking-wide text-[#15110F] uppercase">
            DOCUMENT AND PARCEL SHIPPING
          </h2>

          <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] leading-relaxed max-w-2xl">
            Learn about Omisore Express — the dedicated corridor leader in UK ↔ Nigeria expedited cargo and parcel shipping. Whether documents or gifts, our timed network guarantees seamless handling.
          </p>

          {/* Services Available Container */}
          <div className="bg-[#FAF7F2] border border-[#EAE4D8] rounded-xs p-5 sm:p-6 space-y-4 hover:border-[#C9A227]/60 transition-colors duration-300">
            <div className="text-[11px] font-extrabold tracking-widest text-[#735A00] uppercase">
              SERVICES AVAILABLE
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Feature 1 */}
              <div className="flex items-start space-x-3 p-2 rounded-xs hover:bg-white transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A227]/30 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    Next Possible Flight Dispatch
                  </h4>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    London ➔ Lagos in 3–5 Business Days
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-3 p-2 rounded-xs hover:bg-white transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A227]/30 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    Door-to-Door UK Collection
                  </h4>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    Greater London & Nationwide coverage
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-3 p-2 rounded-xs hover:bg-white transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A227]/30 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    Flexible Bilateral Options
                  </h4>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    UK-to-Nigeria and Nigeria-to-UK cargo
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start space-x-3 p-2 rounded-xs hover:bg-white transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A227]/30 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    Live WhatsApp Telemetry
                  </h4>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    Instant milestone alerts & POD photo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <motion.button
              id="parcel-explore-express-btn"
              onClick={onExploreExpress}
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 20px rgba(92, 15, 30, 0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 bg-[#5C0F1E] hover:bg-[#780016] text-white font-bold text-[13px] tracking-wider uppercase rounded-xs transition-all duration-300 shadow-sm inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>EXPLORE OMISORE EXPRESS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column: Framed Container with Smooth Scale-up & Soft Gold Glow */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-lg overflow-hidden shadow-lg border border-[#EAE4D8] hover:border-[#C9A227] hover:shadow-[0_12px_35px_rgba(201,162,39,0.22)] aspect-4/3 sm:aspect-5/4 group transition-all duration-500">
            {/* Courier van with scale-105 on hover */}
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" 
              alt="Omisore Logistics courier delivery van on scheduled ground runs" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* Dark gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#15110F]/95 via-[#15110F]/45 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white transition-opacity duration-300">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#C9A227] text-[#15110F] text-[10px] font-extrabold tracking-wider uppercase rounded-xs w-max mb-2 group-hover:scale-105 transition-transform">
                <Truck className="w-3 h-3" />
                <span>GUARANTEED SCHEDULED RUNS</span>
              </div>

              <h3 className="font-bold text-[18px] sm:text-[20px] text-white leading-snug">
                Courier & Parcel Ground Network
              </h3>

              <p className="text-[12px] sm:text-[13px] text-stone-200 mt-1 leading-normal">
                Daily van collection across London Acton, Park Royal, Croydon, and Midlands depots.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
