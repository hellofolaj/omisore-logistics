import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calculator, 
  Plane, 
  Ship, 
  Truck, 
  Package, 
  ArrowRight, 
  Check, 
  Info,
  ShieldCheck
} from 'lucide-react';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToShip: (quoteSummary: any) => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
  onProceedToShip,
}) => {
  const [serviceType, setServiceType] = useState<'air_express' | 'air_cargo' | 'sea_lcl' | 'sea_fcl'>('air_express');
  const [origin, setOrigin] = useState('london_depot');
  const [destination, setDestination] = useState('lagos_doorstep');
  const [weightKg, setWeightKg] = useState<number>(10);
  const [lengthCm, setLengthCm] = useState<number>(40);
  const [widthCm, setWidthCm] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(25);
  const [declaredValueGbp, setDeclaredValueGbp] = useState<number>(150);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);

  // Volumetric weight divisor (5000 for air express, 6000 for standard)
  const volDivisor = serviceType === 'air_express' ? 5000 : 6000;
  const volumetricWeightKg = Math.round(((lengthCm * widthCm * heightCm) / volDivisor) * 10) / 10;
  const billableWeightKg = Math.max(weightKg, volumetricWeightKg);

  // Calculation pricing logic
  const calculation = useMemo(() => {
    let ratePerKg = 6.5; // default £6.50/kg for air express
    let transitTime = '3–5 Business Days';
    let baseFreight = 0;

    if (serviceType === 'air_express') {
      ratePerKg = 7.20;
      transitTime = '3–5 Business Days (Flight OM-814)';
      baseFreight = billableWeightKg * ratePerKg;
    } else if (serviceType === 'air_cargo') {
      ratePerKg = 5.40;
      transitTime = '5–7 Business Days';
      baseFreight = Math.max(100, billableWeightKg * ratePerKg);
    } else if (serviceType === 'sea_lcl') {
      // Ocean cubic meter groupage
      const cbm = Math.max(0.2, (lengthCm * widthCm * heightCm) / 1000000);
      baseFreight = Math.max(85, cbm * 290);
      transitTime = '3–4 Weeks (Tilbury ➔ Apapa)';
    } else {
      // FCL 20ft container flat
      baseFreight = 1850;
      transitTime = '18–24 Days Vessel Transit';
    }

    // Collection fee
    const collectionFee = origin === 'london_depot' ? 0 : origin === 'london_van' ? 20 : 35;

    // Customs handling & green lane
    const customsFee = serviceType === 'sea_fcl' ? 180 : 15;

    // Insurance (2% of declared value)
    const insuranceFee = includeInsurance ? Math.max(8, declaredValueGbp * 0.02) : 0;

    // Nigeria regional delivery surcharge
    const destinationFee = destination === 'lagos_doorstep' ? 10 : destination === 'abuja' ? 25 : 35;

    const totalGbp = Math.round(baseFreight + collectionFee + customsFee + insuranceFee + destinationFee);
    const gbpToNgnRate = 1980; // current FX corridor estimate
    const totalNgn = totalGbp * gbpToNgnRate;

    return {
      ratePerKg,
      transitTime,
      baseFreight: Math.round(baseFreight),
      collectionFee,
      customsFee,
      insuranceFee: Math.round(insuranceFee),
      destinationFee,
      totalGbp,
      totalNgn,
    };
  }, [serviceType, origin, destination, billableWeightKg, lengthCm, widthCm, heightCm, declaredValueGbp, includeInsurance]);

  if (!isOpen) return null;

  const handleBookNow = () => {
    onProceedToShip({
      serviceType,
      origin,
      destination,
      weightKg,
      volumetricWeightKg,
      billableWeightKg,
      totalGbp: calculation.totalGbp,
      totalNgn: calculation.totalNgn,
      transitTime: calculation.transitTime,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#15110F]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-md shadow-2xl border border-[#EAE4D8] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#5C0F1E] text-white p-4 sm:p-6 flex items-center justify-between border-b border-[#780016]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xs bg-[#C9A227] text-[#15110F] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase">
                INSTANT TARIFF CALCULATOR
              </div>
              <h2 className="font-display text-[24px] sm:text-[28px] tracking-wider leading-none text-white">
                UK ⇄ NIGERIA CORRIDOR ESTIMATE
              </h2>
            </div>
          </div>

          <button
            id="quote-modal-close-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Service Selection */}
            <div>
              <label className="block text-[12px] font-bold text-[#15110F] uppercase tracking-wider mb-2">
                1. Select Shipment Speed & Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setServiceType('air_express')}
                  className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                    serviceType === 'air_express'
                      ? 'border-[#5C0F1E] bg-[#FDF6E2] text-[#5C0F1E]'
                      : 'border-[#D8D1C5] hover:bg-[#FAF7F2] text-[#4A4A4A]'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold text-[13px]">
                    <Plane className="w-4 h-4 text-[#5C0F1E]" />
                    <span>Priority Air Express</span>
                  </div>
                  <div className="text-[11px] text-[#666666] mt-1">3–5 days (Next flight OM-814)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('air_cargo')}
                  className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                    serviceType === 'air_cargo'
                      ? 'border-[#5C0F1E] bg-[#FDF6E2] text-[#5C0F1E]'
                      : 'border-[#D8D1C5] hover:bg-[#FAF7F2] text-[#4A4A4A]'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold text-[13px]">
                    <Package className="w-4 h-4 text-[#5C0F1E]" />
                    <span>Standard Air Cargo</span>
                  </div>
                  <div className="text-[11px] text-[#666666] mt-1">5–7 business days</div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('sea_lcl')}
                  className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                    serviceType === 'sea_lcl'
                      ? 'border-[#5C0F1E] bg-[#FDF6E2] text-[#5C0F1E]'
                      : 'border-[#D8D1C5] hover:bg-[#FAF7F2] text-[#4A4A4A]'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold text-[13px]">
                    <Ship className="w-4 h-4 text-[#5C0F1E]" />
                    <span>Ocean Groupage (LCL)</span>
                  </div>
                  <div className="text-[11px] text-[#666666] mt-1">3–4 weeks (Tilbury to Apapa)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('sea_fcl')}
                  className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                    serviceType === 'sea_fcl'
                      ? 'border-[#5C0F1E] bg-[#FDF6E2] text-[#5C0F1E]'
                      : 'border-[#D8D1C5] hover:bg-[#FAF7F2] text-[#4A4A4A]'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold text-[13px]">
                    <Truck className="w-4 h-4 text-[#5C0F1E]" />
                    <span>Full Container (20ft FCL)</span>
                  </div>
                  <div className="text-[11px] text-[#666666] mt-1">Direct shipping line booking</div>
                </button>
              </div>
            </div>

            {/* Origin and Destination Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-[#15110F] uppercase tracking-wider mb-1">
                  UK Collection / Drop-off
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D8D1C5] p-2.5 rounded-xs text-[13px] font-medium text-[#15110F] focus:outline-hidden focus:border-[#5C0F1E]"
                >
                  <option value="london_depot">London Acton Depot Drop-off (FREE)</option>
                  <option value="london_van">Greater London Van Pickup (+£20)</option>
                  <option value="midlands">Midlands / Manchester Van (+£35)</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#15110F] uppercase tracking-wider mb-1">
                  Nigeria Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D8D1C5] p-2.5 rounded-xs text-[13px] font-medium text-[#15110F] focus:outline-hidden focus:border-[#5C0F1E]"
                >
                  <option value="lagos_doorstep">Lagos Metropolitan Doorstep Delivery</option>
                  <option value="abuja">Abuja (FCT) Doorstep Delivery</option>
                  <option value="port_harcourt">Port Harcourt / Rivers Delivery</option>
                  <option value="other_states">All Other 33 States Dispatch</option>
                </select>
              </div>
            </div>

            {/* Weight and Dimensions */}
            <div className="bg-[#FAF7F2] p-4 rounded-xs border border-[#EAE4D8] space-y-3">
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-bold text-[#15110F] uppercase tracking-wider">
                  Weight & Box Dimensions
                </span>
                <span className="text-[11px] text-[#735A00] font-semibold">
                  Volumetric Divisor: {volDivisor}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <label className="block text-[11px] text-[#666666] mb-1">Actual (kg)</label>
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-white border border-[#D8D1C5] p-2 rounded-xs text-[13px] font-bold text-[#15110F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#666666] mb-1">Length (cm)</label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Number(e.target.value))}
                    className="w-full bg-white border border-[#D8D1C5] p-2 rounded-xs text-[13px] font-bold text-[#15110F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#666666] mb-1">Width (cm)</label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Number(e.target.value))}
                    className="w-full bg-white border border-[#D8D1C5] p-2 rounded-xs text-[13px] font-bold text-[#15110F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#666666] mb-1">Height (cm)</label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full bg-white border border-[#D8D1C5] p-2 rounded-xs text-[13px] font-bold text-[#15110F]"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 text-[12px] border-t border-[#EAE4D8]">
                <span className="text-[#666666]">
                  Volumetric Weight: <strong className="text-[#15110F]">{volumetricWeightKg} kg</strong>
                </span>
                <span className="text-[#5C0F1E] font-bold">
                  Billable Weight: {billableWeightKg} kg
                </span>
              </div>
            </div>

            {/* Insurance Checkbox */}
            <div className="flex items-center space-x-3 text-[13px] text-[#15110F]">
              <input
                type="checkbox"
                id="insurance-checkbox"
                checked={includeInsurance}
                onChange={(e) => setIncludeInsurance(e.target.checked)}
                className="w-4 h-4 accent-[#5C0F1E]"
              />
              <label htmlFor="insurance-checkbox" className="cursor-pointer">
                Include Comprehensive All-Risk Cargo Insurance (2% of declared value)
              </label>
            </div>
          </div>

          {/* Pricing Summary Column */}
          <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#EAE4D8] rounded-xs p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-[11px] font-extrabold tracking-widest text-[#735A00] uppercase mb-1">
                RATE BREAKDOWN
              </div>
              <h3 className="font-bold text-[17px] text-[#15110F]">
                Guaranteed Bilateral Quote
              </h3>
              <p className="text-[12px] text-[#666666] mt-0.5">
                Estimated Transit: <strong>{calculation.transitTime}</strong>
              </p>

              {/* Line items */}
              <div className="mt-4 space-y-2 text-[13px] border-t border-[#EAE4D8] pt-3">
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Corridor Freight:</span>
                  <span className="font-bold text-[#15110F]">£{calculation.baseFreight}</span>
                </div>
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>UK Collection:</span>
                  <span className="font-bold text-[#15110F]">£{calculation.collectionFee}</span>
                </div>
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Customs Single Window Pre-Clearance:</span>
                  <span className="font-bold text-[#15110F]">£{calculation.customsFee}</span>
                </div>
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Destination Hub & Final Mile:</span>
                  <span className="font-bold text-[#15110F]">£{calculation.destinationFee}</span>
                </div>
                {includeInsurance && (
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Cargo All-Risk Insurance:</span>
                    <span className="font-bold text-[#15110F]">£{calculation.insuranceFee}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total Box */}
            <div className="bg-white p-4 rounded-xs border border-[#C9A227]/40 shadow-xs space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-[12px] font-bold text-[#735A00] uppercase">
                  ESTIMATED TOTAL
                </span>
                <span className="font-display text-[32px] font-bold text-[#5C0F1E] leading-none">
                  £{calculation.totalGbp}
                </span>
              </div>
              <div className="flex justify-between text-[12px] text-[#666666]">
                <span>Naira Equivalent (₦1,980/£):</span>
                <span className="font-bold text-[#15110F]">
                  ₦{calculation.totalNgn.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              id="quote-book-now-btn"
              onClick={handleBookNow}
              className="w-full py-3.5 bg-[#5C0F1E] hover:bg-[#780016] text-white font-bold text-[13px] tracking-wider uppercase rounded-xs transition-colors shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>PROCEED TO BOOK SHIPMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
