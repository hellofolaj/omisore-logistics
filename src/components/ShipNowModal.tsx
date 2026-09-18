import React, { useState } from 'react';
import { 
  X, 
  Package, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Calendar, 
  Barcode,
  Truck
} from 'lucide-react';

interface ShipNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: any;
  onBookingSuccess: (waybillNumber: string) => void;
}

export const ShipNowModal: React.FC<ShipNowModalProps> = ({
  isOpen,
  onClose,
  prefillData,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Form State
  const [senderName, setSenderName] = useState('Olumide Adeleke');
  const [senderPhone, setSenderPhone] = useState('+44 7911 123456');
  const [senderCollectionMethod, setSenderCollectionMethod] = useState('dropoff'); // dropoff | van_pickup
  const [senderAddress, setSenderAddress] = useState('60 Acton High Street, London W3 6LE');

  const [receiverName, setReceiverName] = useState('Babatunde Johnson');
  const [receiverPhone, setReceiverPhone] = useState('+234 803 555 7890');
  const [receiverCity, setReceiverCity] = useState('Lagos');
  const [receiverAddress, setReceiverAddress] = useState('12 Admiralty Way, Lekki Phase 1, Lagos');

  const [packageType, setPackageType] = useState('express_parcel');
  const [weightKg, setWeightKg] = useState(prefillData?.weightKg || 8);
  const [contents, setContents] = useState('Personal clothing, documents, and packaged electronics');
  const [generatedWaybill, setGeneratedWaybill] = useState('');

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Generate unique waybill
      const randomId = Math.floor(10000 + Math.random() * 90000);
      const newWaybill = `OMI-UKNG-2026-${randomId}`;
      setGeneratedWaybill(newWaybill);
      setStep(3);
    }
  };

  const handleFinish = () => {
    onBookingSuccess(generatedWaybill || 'OMI-UKNG-2026-00124');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#15110F]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-md shadow-2xl border border-[#EAE4D8] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#5C0F1E] text-white p-4 sm:p-6 flex items-center justify-between border-b border-[#780016]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xs bg-[#C9A227] text-[#15110F] flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase">
                EXPRESS BOOKING ENGINE
              </div>
              <h2 className="font-display text-[24px] sm:text-[28px] tracking-wider leading-none text-white">
                DISPATCH VIA UK ⇄ NIGERIA CORRIDOR
              </h2>
            </div>
          </div>

          <button
            id="ship-modal-close-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-[#FAF7F2] px-6 py-3 border-b border-[#EAE4D8] flex items-center justify-between text-[12px] font-bold">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#5C0F1E]' : 'text-[#888888]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#5C0F1E] text-white' : 'bg-[#EAE4D8]'}`}>1</span>
            <span>Sender & Receiver</span>
          </div>
          <div className="h-0.5 w-12 bg-[#EAE4D8]" />
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#5C0F1E]' : 'text-[#888888]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#5C0F1E] text-white' : 'bg-[#EAE4D8]'}`}>2</span>
            <span>Cargo Details</span>
          </div>
          <div className="h-0.5 w-12 bg-[#EAE4D8]" />
          <div className={`flex items-center space-x-2 ${step === 3 ? 'text-[#5C0F1E]' : 'text-[#888888]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-[#EAE4D8]'}`}>3</span>
            <span>Waybill Issued</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {step === 1 && (
            <div className="space-y-6">
              {/* Sender Details */}
              <div className="space-y-3">
                <h3 className="font-bold text-[14px] text-[#15110F] uppercase tracking-wider flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#5C0F1E]" />
                  <span>United Kingdom Shipper (Sender)</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#555555] uppercase mb-1">Full Name / Company</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#D8D1C5] p-2.5 rounded-xs text-[13px] font-medium text-[#15110F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#555555] uppercase mb-1">UK Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#D8D1C5] p-2.5 rounded-xs text-[13px] font-medium text-[#15110F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#555555] uppercase mb-1">Collection Preference</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSenderCollectionMethod('dropoff')}
                      className={`p-2.5 rounded-xs border text-left text-[12px] font-bold cursor-pointer ${
                        senderCollectionMethod === 'dropoff'
                          ? 'border-[#5C0F1E] bg-[#FDF6E2] text-[#5C0F1E]'
                          : 'border-[#D8D1C5] text-[#555555]'
                      }`}
                    >
                      Drop-off at London Acton Depot
                    </button>
                    <button
                      type="button"
                      onClick={() => setSenderCollectionMethod('van_pickup')}
                      className={`p-2.5 rounded-xs border text-left text-[12px] font-bold cursor-pointer ${
                        senderCollectionMethod === 'van_pickup'
                          ? 'border-[#5C0F1E] bg-[#FDF6E2] text-[#5C0F1E]'
                          : 'border-[#D8D1C5] text-[#555555]'
                      }`}
                    >
                      Doorstep UK Van Collection
                    </button>
                  </div>
                </div>
              </div>

              {/* Receiver Details */}
              <div className="space-y-3 pt-2 border-t border-[#EAE4D8]">
                <h3 className="font-bold text-[14px] text-[#15110F] uppercase tracking-wider flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#5C0F1E]" />
                  <span>Nigeria Consignee (Receiver)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#555555] uppercase mb-1">Receiver Name</label>
                    <input
                      type="text"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#D8D1C5] p-2.5 rounded-xs text-[13px] font-medium text-[#15110F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#555555] uppercase mb-1">Receiver Nigeria Mobile (WhatsApp)</label>
                    <input
                      type="text"
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#D8D1C5] p-2.5 rounded-xs text-[13px] font-medium text-[#15110F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#555555] uppercase mb-1">Destination Address in Nigeria</label>
                  <input
                    type="text"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    placeholder="Street address, Estate, City, State"
                    className="w-full bg-[#FAF7F2] border border-[#D8D1C5] p-2.5 rounded-xs text-[13px] font-medium text-[#15110F]"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-[#FAF7F2] p-4 rounded-xs border border-[#EAE4D8] space-y-3">
                <h4 className="font-bold text-[13px] text-[#15110F] uppercase">Package Manifest Declaration</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#666666] mb-1">Category</label>
                    <select
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                      className="w-full bg-white border border-[#D8D1C5] p-2 rounded-xs text-[13px] font-semibold"
                    >
                      <option value="express_parcel">Express Boxed Goods / Parcel</option>
                      <option value="documents">Official Documents & Passports</option>
                      <option value="commercial_cargo">Commercial Freight & Samples</option>
                      <option value="pallet">Heavy Industrial Pallet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#666666] mb-1">Estimated Weight (kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full bg-white border border-[#D8D1C5] p-2 rounded-xs text-[13px] font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#666666] mb-1">Item Description for Customs Manifest</label>
                  <textarea
                    rows={2}
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    className="w-full bg-white border border-[#D8D1C5] p-2.5 rounded-xs text-[13px] text-[#15110F]"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#FDF6E2] border border-[#C9A227]/40 rounded-xs text-[12px] text-[#735A00] space-y-1">
                <strong>Corridor Regulatory Notice:</strong>
                <p>
                  Flight OM-814 manifests close every Wednesday and Sunday at 17:00 GMT. 
                  Goods accepted at London Acton Depot are sealed directly into air freight secure containers.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[12px] font-extrabold tracking-widest text-[#C9A227] uppercase">
                  BOOKING RECORD CONFIRMED
                </span>
                <h3 className="font-display text-[32px] text-[#5C0F1E] tracking-wider font-bold">
                  {generatedWaybill}
                </h3>
                <p className="text-[14px] text-[#4A4A4A] max-w-md mx-auto">
                  Your consignment has been registered into the London Heathrow (LHR) ⇄ Lagos (LOS) flight manifest queue.
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-xs border border-[#EAE4D8] max-w-md mx-auto text-left text-[12px] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Consignor:</span>
                  <span className="font-bold text-[#15110F]">{senderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Consignee:</span>
                  <span className="font-bold text-[#15110F]">{receiverName} ({receiverCity})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Drop-off Point:</span>
                  <span className="font-bold text-[#5C0F1E]">60 Acton High St, London W3 6LE</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#EAE4D8] flex justify-between items-center">
          {step > 1 && step < 3 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 bg-white border border-[#D8D1C5] text-[#15110F] text-[12px] font-bold rounded-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              id="ship-next-step-btn"
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-[#5C0F1E] hover:bg-[#780016] text-white text-[13px] font-bold tracking-wider uppercase rounded-xs transition-colors shadow-sm flex items-center space-x-2 cursor-pointer"
            >
              <span>{step === 1 ? 'Next: Cargo Details' : 'Generate Waybill & Confirm'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="ship-track-created-btn"
              onClick={handleFinish}
              className="px-6 py-2.5 bg-[#5C0F1E] hover:bg-[#780016] text-white text-[13px] font-bold tracking-wider uppercase rounded-xs transition-colors shadow-sm flex items-center space-x-2 cursor-pointer"
            >
              <span>Track This Waybill Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
