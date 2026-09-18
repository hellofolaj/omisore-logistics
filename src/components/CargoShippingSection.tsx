import React from 'react';
import { motion } from 'motion/react';
import { 
  Ship, 
  Briefcase, 
  Plane, 
  Truck, 
  Warehouse, 
  ArrowRight, 
  Container,
  Layers
} from 'lucide-react';

interface CargoShippingSectionProps {
  onExploreCargo: () => void;
  onOpenQuote: () => void;
}

export const CargoShippingSection: React.FC<CargoShippingSectionProps> = ({
  onExploreCargo,
  onOpenQuote,
}) => {
  return (
    <section id="freight-section" className="w-full bg-[#FAF6F0] py-14 sm:py-18 px-4 sm:px-8 border-b border-[#EAE4D8] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Maritime Container Vessel Image Card with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-5 order-2 lg:order-1"
        >
          <div className="relative rounded-lg overflow-hidden shadow-lg border border-[#EAE4D8] hover:border-[#C9A227] hover:shadow-[0_12px_35px_rgba(201,162,39,0.22)] aspect-4/3 sm:aspect-5/4 group transition-all duration-500">
            {/* Cargo container vessel at sea with scale-105 on hover */}
            <img 
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80" 
              alt="Maersk ocean container vessel carrying cargo across Tilbury to Lagos maritime corridor" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* Dark gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#15110F]/95 via-[#15110F]/45 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white transition-opacity duration-300">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#C9A227] text-[#15110F] text-[10px] font-extrabold tracking-wider uppercase rounded-xs w-max mb-2 group-hover:scale-105 transition-transform">
                <Ship className="w-3 h-3" />
                <span>OCEAN & AIR LOGISTICS</span>
              </div>

              <h3 className="font-bold text-[18px] sm:text-[20px] text-white leading-snug">
                Apapa & Tin Can Island Maritime Manifests
              </h3>

              <p className="text-[12px] sm:text-[13px] text-stone-200 mt-1 leading-normal">
                Full container load (FCL) and shared LCL groupage shipped directly from Tilbury / Southampton.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Cargo Shipping Information with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-5 order-1 lg:order-2"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FDF6E2] border border-[#C9A227]/40 rounded-xs text-[11px] font-extrabold tracking-wider text-[#735A00] uppercase">
            <Briefcase className="w-3.5 h-3.5 text-[#5C0F1E]" />
            <span>BUSINESS & COMMERCIAL ONLY</span>
          </div>

          <div>
            <h2 className="font-display text-[34px] sm:text-[42px] leading-none font-extrabold tracking-wide text-[#15110F] uppercase">
              CARGO SHIPPING
            </h2>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#5C0F1E] mt-1">
              Pallets, Containers and Heavy Cargo
            </h3>
          </div>

          <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] leading-relaxed max-w-2xl">
            Discover shipping and logistics service options from Omisore Global Forwarding. Built for commercial merchants, manufacturers, and importers requiring robust tonnage capacity.
          </p>

          {/* Commercial Services Available Card */}
          <div className="bg-white border border-[#EAE4D8] rounded-xs p-5 sm:p-6 space-y-4 shadow-xs hover:border-[#C9A227]/60 transition-colors duration-300">
            <div className="text-[11px] font-extrabold tracking-widest text-[#735A00] uppercase">
              COMMERCIAL SERVICES AVAILABLE
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Service 1 */}
              <div className="flex items-start space-x-3 p-2 rounded-xs hover:bg-[#FCF9F2] transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A227]/30 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    Priority Air Freight
                  </h4>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    Twice-weekly scheduled freighter manifests
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="flex items-start space-x-3 p-2 rounded-xs hover:bg-[#FCF9F2] transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A227]/30 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300">
                  <Container className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    Ocean Freight
                  </h4>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    FCL and LCL consolidated sea containers
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="flex items-start space-x-3 p-2 rounded-xs hover:bg-[#FCF9F2] transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A227]/30 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    Road & Pallet Freight
                  </h4>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    Pallet network collection across England & Wales
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="flex items-start space-x-3 p-2 rounded-xs hover:bg-[#FCF9F2] transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A227]/30 group-hover:scale-110 group-hover:bg-[#5C0F1E] group-hover:text-[#C9A227] transition-all duration-300">
                  <Warehouse className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[#15110F] group-hover:text-[#5C0F1E] transition-colors leading-snug">
                    Bonded Warehousing
                  </h4>
                  <p className="text-[12px] text-[#666666] mt-0.5">
                    Lagos airport apron cross-dock distribution
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <motion.button
              id="cargo-explore-forwarding-btn"
              onClick={onExploreCargo}
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 20px rgba(92, 15, 30, 0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 bg-[#5C0F1E] hover:bg-[#780016] text-white font-bold text-[13px] tracking-wider uppercase rounded-xs transition-all duration-300 shadow-sm inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>EXPLORE GLOBAL CARGO FORWARDING</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
