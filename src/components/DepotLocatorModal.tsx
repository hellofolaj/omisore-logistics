import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { DEPOT_LOCATIONS } from '../data/mockData';
import { DepotInfo } from '../types';

interface DepotLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDepotId?: string;
  onSelectDropoff?: (depot: DepotInfo) => void;
}

export const DepotLocatorModal: React.FC<DepotLocatorModalProps> = ({
  isOpen,
  onClose,
  initialDepotId = 'london-acton',
  onSelectDropoff,
}) => {
  const [selectedId, setSelectedId] = useState(initialDepotId);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialDepotId) {
      setSelectedId(initialDepotId);
    }
  }, [initialDepotId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentDepot = DEPOT_LOCATIONS.find((d) => d.id === selectedId) || DEPOT_LOCATIONS[0];

  const handleCopyAddress = (text: string, id: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="depot-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#15110F]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div className="bg-white w-full max-w-4xl rounded-md shadow-2xl border border-[#EAE4D8] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#5C0F1E] text-white p-4 sm:p-6 flex items-center justify-between border-b border-[#780016]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xs bg-[#C9A227] text-[#15110F] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase">
                BILATERAL DEPOT & DROP-OFF NETWORK
              </div>
              <h2 id="depot-modal-title" className="font-display text-[24px] sm:text-[28px] tracking-wider leading-none text-white">
                CONSOLIDATION HUBS & TERMINALS
              </h2>
            </div>
          </div>

          <button
            id="depot-modal-close-btn"
            onClick={onClose}
            aria-label="Close depot locator"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Depot list selector */}
          <div className="md:col-span-5 space-y-3">
            <div className="text-[11px] font-extrabold tracking-widest text-[#735A00] uppercase">
              SELECT DEPOT LOCATION
            </div>

            <div className="space-y-2">
              {DEPOT_LOCATIONS.map((depot) => {
                const isSelected = depot.id === currentDepot.id;
                return (
                  <button
                    key={depot.id}
                    onClick={() => setSelectedId(depot.id)}
                    className={`w-full text-left p-3.5 rounded-xs border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#5C0F1E] bg-[#FDF6E2] shadow-xs'
                        : 'border-[#EAE4D8] bg-white hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-xs bg-[#15110F]/5 text-[#5C0F1E]">
                        {depot.type === 'uk_hub' ? 'UK MAIN HUB' : depot.type === 'nigeria_gateway' ? 'NIGERIA GATEWAY' : 'PARTNER HUB'}
                      </span>
                      <span className="text-[11px] text-[#735A00] font-bold">{depot.city}</span>
                    </div>

                    <h4 className="font-bold text-[14px] text-[#15110F] mt-1">
                      {depot.name}
                    </h4>

                    <p className="text-[12px] text-[#666666] line-clamp-1 mt-0.5">
                      {depot.address}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Depot Detailed Card */}
          <div className="md:col-span-7 bg-[#FAF7F2] border border-[#EAE4D8] rounded-xs p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-extrabold text-[#735A00] tracking-widest uppercase">
                  {currentDepot.country} CONSOLIDATION DESK
                </span>
                <h3 className="text-[20px] font-bold text-[#15110F] leading-tight mt-0.5">
                  {currentDepot.name}
                </h3>
              </div>

              {/* Address Box with Copy */}
              <div className="bg-white p-3.5 rounded-xs border border-[#EAE4D8] space-y-1 relative">
                <div className="text-[11px] font-bold text-[#777777] uppercase">Physical Address</div>
                <p className="text-[14px] font-semibold text-[#15110F]">
                  {currentDepot.address}, {currentDepot.city} {currentDepot.postcode}
                </p>
                <button
                  onClick={() => handleCopyAddress(`${currentDepot.address}, ${currentDepot.city} ${currentDepot.postcode}`, currentDepot.id)}
                  className="mt-2 text-[11px] text-[#5C0F1E] font-bold inline-flex items-center space-x-1 hover:underline cursor-pointer"
                >
                  {copiedId === currentDepot.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === currentDepot.id ? 'Address Copied!' : 'Copy Full Address'}</span>
                </button>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-[#5C0F1E] shrink-0" />
                  <a href={`tel:${currentDepot.phone}`} className="font-bold text-[#15110F] hover:text-[#5C0F1E]">
                    {currentDepot.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span className="text-[#4A4A4A] text-[12px]">{currentDepot.hours}</span>
                </div>
              </div>

              {/* Available Services */}
              <div className="space-y-2 pt-2 border-t border-[#EAE4D8]">
                <div className="text-[11px] font-bold text-[#555555] uppercase tracking-wider">
                  Hub Capabilities & Equipment
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                  {currentDepot.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-1.5 text-[#333333]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(currentDepot.address + ' ' + currentDepot.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#5C0F1E] hover:bg-[#780016] text-white font-bold text-[13px] tracking-wider uppercase rounded-xs transition-colors shadow-sm flex items-center justify-center space-x-2"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
