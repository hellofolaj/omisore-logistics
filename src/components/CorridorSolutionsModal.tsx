import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  ArrowRight,
  Plane,
  Ship
} from 'lucide-react';

interface CorridorSolutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShip: () => void;
}

export const CorridorSolutionsModal: React.FC<CorridorSolutionsModalProps> = ({
  isOpen,
  onClose,
  onOpenShip,
}) => {
  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="corridor-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#15110F]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div className="bg-white w-full max-w-4xl rounded-md shadow-2xl border border-[#EAE4D8] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#5C0F1E] text-white p-4 sm:p-6 flex items-center justify-between border-b border-[#780016]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xs bg-[#C9A227] text-[#15110F] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase">
                BILATERAL TRADE & CUSTOMS PROTOCOL
              </div>
              <h2 id="corridor-modal-title" className="font-display text-[24px] sm:text-[28px] tracking-wider leading-none text-white">
                UK–NIGERIA CUSTOMS CLEARANCE ARCHITECTURE
              </h2>
            </div>
          </div>

          <button
            id="corridor-modal-close-btn"
            onClick={onClose}
            aria-label="Close customs notice"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-[#15110F]">
          
          {/* Top highlight card */}
          <div className="bg-[#FAF7F2] p-5 rounded-xs border border-[#EAE4D8] space-y-2">
            <h3 className="font-bold text-[16px] text-[#5C0F1E]">
              Dedicated Heathrow (LHR) ⇄ Lagos (LOS) Customs Pre-Clearance
            </h3>
            <p className="text-[13px] text-[#4A4A4A] leading-relaxed">
              Omisore Worldwide operates directly within Nigeria Customs Service (NCS) Bonded Cargo Terminal 2 at Murtala Muhammed Airport. Through our automated UK HMRC export declarations and Single Window Pre-Arrival Assessment Report (PAAR) integration, commercial consignments clear without airport demurrage delays.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-[#EAE4D8] rounded-xs shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[14px] text-[#15110F]">Single Window Electronic Filing</h4>
              <p className="text-[12px] text-[#666666] leading-normal">
                Pre-lodging of Harmonized System (HS) Tariff codes directly to Nigeria Customs before cargo airborne departure.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#EAE4D8] rounded-xs shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[14px] text-[#15110F]">Bonded Apron De-Consolidation</h4>
              <p className="text-[12px] text-[#666666] leading-normal">
                Direct transfer from aircraft hold to our secure apron warehouse, preventing physical damage and terminal queueing.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#EAE4D8] rounded-xs shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-xs bg-[#FDF6E2] text-[#5C0F1E] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[14px] text-[#15110F]">36-State In-Bond Transport</h4>
              <p className="text-[12px] text-[#666666] leading-normal">
                Seamless bonded transport onto domestic carrier networks serving Abuja, Port Harcourt, Kano, and nationwide addresses.
              </p>
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="bg-[#FAF6EE] p-5 rounded-xs border border-[#EAE4D8] space-y-3">
            <h4 className="font-bold text-[14px] text-[#15110F] uppercase tracking-wider">
              Required Documentation Checklist for Commercial Consignments
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standard Commercial Invoice with Itemized Value</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Packing List with Gross & Net Weights</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>HS Tariff Code (6 or 8 digits)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Form M & PAAR (For commercial tonnage &gt;250kg)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#EAE4D8] flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#D8D1C5] text-[#15110F] text-[12px] font-bold rounded-xs cursor-pointer"
          >
            Close Notice
          </button>

          <button
            onClick={() => { onClose(); onOpenShip(); }}
            className="px-6 py-2.5 bg-[#5C0F1E] hover:bg-[#780016] text-white text-[13px] font-bold tracking-wider uppercase rounded-xs transition-colors shadow-sm flex items-center space-x-2 cursor-pointer"
          >
            <span>Book Compliant Cargo Dispatch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
