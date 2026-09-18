import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Plane, 
  Ship, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Printer, 
  FileDown,
  Download,
  MessageSquare, 
  Barcode,
  Package,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { SAMPLE_SHIPMENTS } from '../data/mockData';
import { ShipmentData } from '../types';

interface TrackingModalProps {
  initialWaybill?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenShip?: () => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
  initialWaybill = 'OMI-UKNG-2026-00124',
  isOpen,
  onClose,
  onOpenShip,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialWaybill);
  const [currentWaybill, setCurrentWaybill] = useState(initialWaybill);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (initialWaybill) {
      setSearchQuery(initialWaybill);
      setCurrentWaybill(initialWaybill);
    }
  }, [initialWaybill, isOpen]);

  if (!isOpen) return null;

  const shipment: ShipmentData | undefined = SAMPLE_SHIPMENTS[currentWaybill] || SAMPLE_SHIPMENTS['OMI-UKNG-2026-00124'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentWaybill(searchQuery.trim().toUpperCase());
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintPdf = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 150);
  };

  const handleDownloadSummaryDoc = () => {
    // Generate an official standalone HTML/document file that can be saved offline or opened as PDF
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Waybill Summary - ${shipment.waybillNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #15110F; }
    .header { border-bottom: 3px solid #5C0F1E; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
    .title { color: #5C0F1E; font-size: 24px; font-weight: bold; margin: 0; }
    .subtitle { color: #735A00; font-size: 13px; font-weight: bold; margin-top: 4px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .box { border: 1px solid #D8D1C5; padding: 14px; border-radius: 4px; background: #FAF7F2; }
    .box h4 { margin: 0 0 8px 0; font-size: 12px; color: #735A00; text-transform: uppercase; }
    .box p { margin: 4px 0; font-size: 14px; font-weight: 600; }
    .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .table th, .table td { border: 1px solid #D8D1C5; padding: 10px; font-size: 12px; text-align: left; }
    .table th { background: #5C0F1E; color: white; }
    .stamp { border: 2px dashed #C9A227; color: #5C0F1E; padding: 10px; text-align: center; font-weight: bold; margin-top: 24px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="title">OMISORE LOGISTICS WORLDWIDE</h1>
      <div class="subtitle">UK ⇄ NIGERIA BILATERAL AIR & SEA CORRIDOR | OFFICIAL WAYBILL NOTE</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 18px; font-weight: bold; font-family: monospace;">${shipment.waybillNumber}</div>
      <div style="font-size: 11px; color: #666;">Generated: ${new Date().toLocaleDateString()}</div>
    </div>
  </div>

  <div class="grid">
    <div class="box">
      <h4>Consignor (United Kingdom)</h4>
      <p>${shipment.sender}</p>
      <p style="font-size: 12px; color: #555; font-weight: normal;">Origin Depot: London Consolidation Hub (Acton W3 6LE)</p>
      <p style="font-size: 12px; color: #555; font-weight: normal;">Departure Hub: London Heathrow (LHR)</p>
    </div>
    <div class="box">
      <h4>Consignee (Nigeria)</h4>
      <p>${shipment.receiver}</p>
      <p style="font-size: 12px; color: #555; font-weight: normal;">Destination Hub: Lagos Murtala Muhammed Cargo Apron</p>
      <p style="font-size: 12px; color: #555; font-weight: normal;">Last-Mile Delivery: Doorstep Express Network</p>
    </div>
  </div>

  <div class="box" style="margin-bottom: 24px;">
    <h4>Consignment Specifications</h4>
    <p>Service Category: ${shipment.serviceType}</p>
    <p>Current Status: ${shipment.currentStatus} (${shipment.statusPercent}% Complete)</p>
    <p>Estimated Delivery: ${shipment.estimatedDelivery}</p>
    <p>Actual Weight: ${shipment.weightKg} kg | Volumetric Weight: ${shipment.volumetricWeightKg || shipment.weightKg} kg | Pieces: ${shipment.pieces}</p>
  </div>

  <h3 style="color: #15110F; font-size: 16px; margin-bottom: 8px;">Corridor Chain of Custody Milestones</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Timestamp</th>
        <th>Facility / Location</th>
        <th>Status Event</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      ${shipment.events.map(ev => `
        <tr>
          <td style="font-family: monospace;">${ev.timestamp}</td>
          <td><b>${ev.location}</b></td>
          <td>${ev.status}</td>
          <td>${ev.description}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="stamp">
    AUTHORIZED BILATERAL TRANSIT NOTE - HM REVENUE & CUSTOMS / NCS FORM M VERIFIED
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Omisore_Waybill_${shipment.waybillNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#15110F]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-md shadow-2xl border border-[#EAE4D8] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-[#5C0F1E] text-white p-4 sm:p-6 flex items-center justify-between border-b border-[#780016]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xs bg-[#C9A227] text-[#15110F] flex items-center justify-center font-bold">
              <Barcode className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#C9A227] tracking-widest uppercase">
                BILATERAL WAYBILL TRACKER
              </div>
              <h2 className="font-display text-[24px] sm:text-[28px] tracking-wider leading-none text-white">
                {shipment.waybillNumber}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="tracking-modal-download-print-pdf-header-btn"
              onClick={handlePrintPdf}
              className="px-3.5 py-1.5 bg-[#C9A227] hover:bg-[#D8B137] text-[#15110F] text-[11px] sm:text-[12px] font-bold rounded-xs flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
              title="Download or Print Waybill Summary as PDF"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Download / Print PDF</span>
              <span className="sm:hidden">Print PDF</span>
            </button>

            <button
              id="tracking-modal-close-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar within Modal */}
        <div className="bg-[#FAF7F2] p-3 sm:px-6 border-b border-[#EAE4D8]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative grow flex items-center bg-white rounded-xs border border-[#D8D1C5] focus-within:border-[#5C0F1E]">
              <Search className="w-4 h-4 ml-3 text-[#735A00]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter waybill (e.g. OMI-UKNG-2026-00124)"
                className="w-full bg-transparent py-2 pl-2.5 pr-3 text-[13px] font-mono font-semibold focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-[#5C0F1E] hover:bg-[#780016] text-white text-[12px] font-bold tracking-wider rounded-xs cursor-pointer"
            >
              SEARCH
            </button>
          </form>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Current Status Overview Banner */}
          <div className="bg-[#FCF9F2] border border-[#C9A227]/40 rounded-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>IN ACTIVE TRANSIT</span>
              </div>
              <h3 className="font-bold text-[18px] sm:text-[20px] text-[#15110F]">
                {shipment.currentStatus}
              </h3>
              <p className="text-[13px] text-[#555555]">
                {shipment.serviceType}
              </p>
            </div>

            <div className="sm:text-right bg-white sm:bg-transparent p-3 sm:p-0 rounded-xs border sm:border-0 border-[#EAE4D8]">
              <div className="text-[11px] font-bold text-[#735A00] uppercase tracking-wider">
                ESTIMATED ARRIVAL
              </div>
              <div className="font-bold text-[16px] text-[#5C0F1E]">
                {shipment.estimatedDelivery}
              </div>
              <div className="text-[11px] text-[#777777]">Doorstep Delivery Network</div>
            </div>
          </div>

          {/* Corridor Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[12px] font-bold text-[#15110F]">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#5C0F1E]" />
                <span>{shipment.origin.city}, {shipment.origin.country}</span>
              </span>
              <span className="text-[#C9A227]">{shipment.statusPercent}% Complete</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#5C0F1E]" />
                <span>{shipment.destination.city}, {shipment.destination.country}</span>
              </span>
            </div>

            <div className="w-full bg-[#EAE4D8] h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#5C0F1E] via-[#C9A227] to-emerald-500 h-full rounded-full transition-all duration-700" 
                style={{ width: `${shipment.statusPercent}%` }}
              />
            </div>
          </div>

          {/* Consignment Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] p-4 rounded-xs border border-[#EAE4D8] text-[12px]">
            <div>
              <span className="text-[#777777] block text-[11px]">Consignor (UK)</span>
              <span className="font-bold text-[#15110F] line-clamp-1">{shipment.sender}</span>
            </div>
            <div>
              <span className="text-[#777777] block text-[11px]">Consignee (NG)</span>
              <span className="font-bold text-[#15110F] line-clamp-1">{shipment.receiver}</span>
            </div>
            <div>
              <span className="text-[#777777] block text-[11px]">Actual / Vol. Weight</span>
              <span className="font-bold text-[#15110F]">{shipment.weightKg} kg / {shipment.volumetricWeightKg || shipment.weightKg} kg</span>
            </div>
            <div>
              <span className="text-[#777777] block text-[11px]">Manifest Pieces</span>
              <span className="font-bold text-[#15110F]">{shipment.pieces} item(s)</span>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-3">
            <h4 className="font-bold text-[14px] text-[#15110F] uppercase tracking-wider flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#C9A227]" />
              <span>Corridor Chain of Custody</span>
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D8D1C5]">
              {shipment.events.map((event, idx) => (
                <div key={event.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    event.isCurrent 
                      ? 'bg-[#5C0F1E] border-white shadow-md text-white' 
                      : event.completed 
                        ? 'bg-emerald-500 border-white text-white' 
                        : 'bg-white border-[#D8D1C5] text-transparent'
                  }`}>
                    {event.completed && <CheckCircle2 className="w-3 h-3" />}
                  </div>

                  <div className="bg-white p-3 rounded-xs border border-[#EAE4D8] shadow-2xs space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                      <span className="font-bold text-[#5C0F1E] bg-[#FDF6E2] px-2 py-0.5 rounded-xs">
                        {event.location}
                      </span>
                      <span className="text-[#777777]">{event.timestamp}</span>
                    </div>
                    <div className="font-bold text-[13px] text-[#15110F]">
                      {event.status}
                    </div>
                    <p className="text-[12px] text-[#555555] leading-normal">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#EAE4D8] flex flex-wrap items-center justify-between gap-3 text-[12px]">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 bg-white border border-[#D8D1C5] rounded-xs font-semibold hover:bg-[#FDF6E2] transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#5C0F1E]" />
              <span>{copied ? 'Copied URL!' : 'Share Waybill Link'}</span>
            </button>

            <a
              href={`https://wa.me/?text=Tracking%20Omisore%20Logistics%20Waybill%20${shipment.waybillNumber}:%20${shipment.currentStatus}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-emerald-600 text-white rounded-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Alerts</span>
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="tracking-modal-download-print-pdf-footer-btn"
              onClick={handlePrintPdf}
              className="px-3.5 py-2 bg-[#5C0F1E] hover:bg-[#780016] text-white rounded-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer hover:shadow-md"
            >
              <FileDown className="w-4 h-4 text-[#C9A227]" />
              <span>Download / Print PDF</span>
            </button>

            <button
              id="tracking-modal-save-doc-btn"
              onClick={handleDownloadSummaryDoc}
              className="px-3 py-2 bg-white border border-[#D8D1C5] rounded-xs font-semibold hover:bg-[#FDF6E2] text-[#15110F] transition-colors flex items-center space-x-1.5 cursor-pointer"
              title="Save standalone summary file"
            >
              <Download className="w-3.5 h-3.5 text-[#735A00]" />
              <span className="hidden sm:inline">Save Summary</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-stone-200 hover:bg-stone-300 text-[#15110F] font-bold rounded-xs cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>

      {/* Official Printable Waybill Summary Document (Rendered for Window.Print / Save as PDF) */}
      <div id="printable-waybill-doc" className="hidden print:block text-[#15110F] p-8 max-w-4xl mx-auto bg-white">
        {/* Document Header */}
        <div className="border-b-2 border-[#5C0F1E] pb-4 mb-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-[12px] font-bold tracking-widest text-[#735A00] uppercase">
              OMISORE LOGISTICS WORLDWIDE • BILATERAL AIR & SEA CARGO CORRIDOR
            </div>
            <h1 className="text-3xl font-extrabold tracking-wide text-[#5C0F1E] uppercase">
              OFFICIAL CONSIGNMENT NOTE & AIR WAYBILL
            </h1>
            <p className="text-xs text-stone-600">
              Authorized Cargo Manifest • UK Reg: 60 Acton High St, London W3 6LE • Nigeria Gateway: Murtala Muhammed Airport, Lagos
            </p>
          </div>
          <div className="text-right border-l-2 border-stone-300 pl-4">
            <div className="text-xs font-mono font-bold text-stone-500">WAYBILL IDENTIFIER</div>
            <div className="text-xl font-mono font-black text-[#15110F] tracking-wider">{shipment.waybillNumber}</div>
            <div className="text-[10px] text-stone-500 mt-1">Generated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        {/* Consignor & Consignee Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-stone-300 rounded p-4 bg-stone-50">
            <div className="text-[11px] font-bold uppercase text-[#735A00] mb-1">CONSIGNOR (SHIPPER / UK)</div>
            <div className="text-base font-bold text-stone-900">{shipment.sender}</div>
            <div className="text-xs text-stone-600 mt-1">Origin Hub: London Consolidation Depot (Mok Nails & Cosmetics, 60 Acton High St, W3 6LE)</div>
            <div className="text-xs text-stone-600">Departure Airport: London Heathrow (LHR) Cargo Apron</div>
          </div>

          <div className="border border-stone-300 rounded p-4 bg-stone-50">
            <div className="text-[11px] font-bold uppercase text-[#735A00] mb-1">CONSIGNEE (RECEIVER / NIGERIA)</div>
            <div className="text-base font-bold text-stone-900">{shipment.receiver}</div>
            <div className="text-xs text-stone-600 mt-1">Destination Hub: Lagos Air Cargo Terminal 2 (LOS)</div>
            <div className="text-xs text-stone-600">Distribution: Nationwide Doorstep Delivery Network</div>
          </div>
        </div>

        {/* Specifications & Live Status */}
        <div className="border border-stone-300 rounded p-4 mb-6 bg-stone-50">
          <div className="text-[11px] font-bold uppercase text-[#735A00] mb-2">CONSIGNMENT SPECIFICATIONS & AUDIT</div>
          <div className="grid grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-stone-500 block">Service Class</span>
              <span className="font-bold text-stone-900">{shipment.serviceType}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Current Status</span>
              <span className="font-bold text-emerald-700">{shipment.currentStatus} ({shipment.statusPercent}%)</span>
            </div>
            <div>
              <span className="text-stone-500 block">Actual / Volumetric Weight</span>
              <span className="font-bold text-stone-900">{shipment.weightKg} kg / {shipment.volumetricWeightKg || shipment.weightKg} kg</span>
            </div>
            <div>
              <span className="text-stone-500 block">Estimated Arrival</span>
              <span className="font-bold text-[#5C0F1E]">{shipment.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Milestones Audit Trail */}
        <div className="mb-6">
          <div className="text-[12px] font-bold uppercase tracking-wider text-stone-900 mb-2">
            CHAIN OF CUSTODY TELEMETRY LOG
          </div>
          <table className="w-full text-xs border-collapse border border-stone-300">
            <thead>
              <tr className="bg-[#5C0F1E] text-white">
                <th className="border border-stone-300 p-2 text-left">Date / Time</th>
                <th className="border border-stone-300 p-2 text-left">Facility / Location</th>
                <th className="border border-stone-300 p-2 text-left">Milestone Event</th>
                <th className="border border-stone-300 p-2 text-left">Operational Details</th>
              </tr>
            </thead>
            <tbody>
              {shipment.events.map((ev) => (
                <tr key={ev.id} className="border-b border-stone-200">
                  <td className="p-2 font-mono text-stone-600 whitespace-nowrap">{ev.timestamp}</td>
                  <td className="p-2 font-semibold text-stone-900">{ev.location}</td>
                  <td className="p-2 font-bold text-stone-800">{ev.status}</td>
                  <td className="p-2 text-stone-600">{ev.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legal Signatures & Customs Seal */}
        <div className="border-t-2 border-stone-300 pt-4 grid grid-cols-3 gap-4 text-[11px] text-stone-600">
          <div className="border border-dashed border-stone-400 p-3 rounded text-center flex flex-col justify-between">
            <div className="font-bold text-[#5C0F1E]">CUSTOMS COMPLIANCE</div>
            <div className="text-[10px] text-stone-500 my-2">HMRC Export Cleared • NCS Form M Validated</div>
            <div className="font-mono text-[9px] text-stone-400">SEAL: #OMI-NCS-9482-B</div>
          </div>
          <div className="border border-dashed border-stone-400 p-3 rounded text-center flex flex-col justify-between">
            <div className="font-bold text-stone-800">DISPATCHING CARRIER</div>
            <div className="h-6 border-b border-stone-300"></div>
            <div className="text-[9px] text-stone-500">Authorized Agent Signature</div>
          </div>
          <div className="border border-dashed border-stone-400 p-3 rounded text-center flex flex-col justify-between">
            <div className="font-bold text-stone-800">RECEIVING CONSI-GNEE</div>
            <div className="h-6 border-b border-stone-300"></div>
            <div className="text-[9px] text-stone-500">Proof of Delivery (POD) & Date</div>
          </div>
        </div>

        <div className="text-[9px] text-stone-400 text-center mt-6">
          This document serves as an authorized summary of bilateral cargo carriage under the Montreal Convention and Omisore Logistics Conditions of Carriage. 
          For live electronic verification, visit omisorelogistics.com with waybill {shipment.waybillNumber}.
        </div>
      </div>
    </div>
  );
};
