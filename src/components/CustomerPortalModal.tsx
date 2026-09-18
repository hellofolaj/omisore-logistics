import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  User, 
  Key, 
  Building2, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  LogOut,
  PackageCheck
} from 'lucide-react';

interface CustomerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  onTrackShipment?: (waybill: string) => void;
}

export const CustomerPortalModal: React.FC<CustomerPortalModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onTrackShipment,
}) => {
  const [email, setEmail] = useState('ajibolaoluwadamm@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    onLoginSuccess?.();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#15110F]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div className="bg-white w-full max-w-md rounded-md shadow-2xl border border-[#EAE4D8] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#5C0F1E] text-white p-5 flex items-center justify-between border-b border-[#780016]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xs bg-[#C9A227] text-[#15110F] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#C9A227] tracking-widest uppercase">
                ENTERPRISE & SHIPPER GATEWAY
              </div>
              <h2 id="portal-modal-title" className="font-display text-[22px] tracking-wider leading-none text-white">
                CUSTOMER PORTAL {isLoggedIn ? 'DASHBOARD' : 'LOGIN'}
              </h2>
            </div>
          </div>

          <button
            id="portal-modal-close-btn"
            onClick={onClose}
            aria-label="Close customer portal"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#15110F] uppercase tracking-wider mb-1">
                  Registered Corporate Email / Account ID
                </label>
                <div className="relative flex items-center bg-[#FAF7F2] rounded-xs border border-[#D8D1C5]">
                  <User className="w-4 h-4 ml-3 text-[#735A00]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent p-2.5 text-[13px] font-medium text-[#15110F] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#15110F] uppercase tracking-wider mb-1">
                  Security Passphrase / Access Token
                </label>
                <div className="relative flex items-center bg-[#FAF7F2] rounded-xs border border-[#D8D1C5]">
                  <Key className="w-4 h-4 ml-3 text-[#735A00]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent p-2.5 text-[13px] font-medium text-[#15110F] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#FDF6E2] rounded-xs border border-[#C9A227]/40 text-[11px] text-[#735A00]">
                <strong>Corridor Shipper Access:</strong> Manage manifests, download commercial invoice templates, and track bilateral consignments.
              </div>

              <button
                type="submit"
                id="portal-submit-btn"
                className="w-full py-3 bg-[#5C0F1E] hover:bg-[#780016] text-white font-bold text-[13px] tracking-wider uppercase rounded-xs transition-colors shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>SECURE ACCESS PORTAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-2 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-[18px] text-[#15110F]">Welcome, Adeleke Logistics Ltd</h3>
                <p className="text-[12px] text-[#666666]">Account #OMI-CORP-9921 • Tier 1 Verified</p>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-xs border border-[#EAE4D8] text-left text-[12px] space-y-2">
                <div className="flex justify-between font-medium">
                  <span className="text-[#666666]">Active Shipments in Transit:</span>
                  <span className="font-bold text-[#5C0F1E]">4 Consignments</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-[#666666]">Next Scheduled Flight:</span>
                  <span className="font-bold text-[#15110F]">Flight OM-814 (Direct LHR ➔ LOS)</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-[#666666]">Approved Credit Limit:</span>
                  <span className="font-bold text-emerald-700">£15,000.00 / ₦29,700,000</span>
                </div>
              </div>

              {/* Quick Waybill Action */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onTrackShipment?.('OMI-UKNG-2026-00124');
                }}
                className="w-full p-3 bg-white border border-[#C9A227] hover:bg-[#FDF6E2] rounded-xs text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#735A00]">Active Consignment</div>
                  <div className="text-[13px] font-bold font-mono text-[#5C0F1E]">OMI-UKNG-2026-00124</div>
                  <div className="text-[11px] text-[#666666]">Customs Cleared — Out for Dispatch</div>
                </div>
                <PackageCheck className="w-5 h-5 text-[#5C0F1E]" />
              </button>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 py-2 bg-white border border-[#D8D1C5] hover:bg-stone-50 text-[#666666] font-bold text-[12px] rounded-xs flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 bg-[#5C0F1E] hover:bg-[#780016] text-white font-bold text-[12px] tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
