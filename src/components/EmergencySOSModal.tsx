import React from 'react';
import { ShieldAlert, PhoneCall, AlertTriangle, X, HeartPulse, Shield, MapPin } from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: string;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  destination = 'India'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-red-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border-2 border-red-600 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-red-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Emergency SOS & Tourist Helplines</h3>
              <p className="text-xs text-red-100">Immediate official contact numbers for {destination}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Numbers Grid */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:112"
              className="p-4 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 block text-center transition-colors group"
            >
              <Shield className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-stone-500 uppercase">National Emergency</span>
              <p className="text-2xl font-black text-red-700 font-mono group-hover:scale-105 transition-transform">112</p>
              <span className="text-[10px] text-red-600 font-semibold">Police / Fire / Medical</span>
            </a>

            <a
              href="tel:1363"
              className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 block text-center transition-colors group"
            >
              <PhoneCall className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-stone-500 uppercase">24x7 Tourist Helpline</span>
              <p className="text-2xl font-black text-emerald-800 font-mono group-hover:scale-105 transition-transform">1363</p>
              <span className="text-[10px] text-emerald-700 font-semibold">Multi-lingual Support</span>
            </a>

            <a
              href="tel:108"
              className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 block text-center transition-colors group"
            >
              <HeartPulse className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-stone-500 uppercase">Ambulance Emergency</span>
              <p className="text-2xl font-black text-amber-800 font-mono group-hover:scale-105 transition-transform">108 / 102</p>
              <span className="text-[10px] text-amber-700 font-semibold">Free Medical Transit</span>
            </a>

            <a
              href="tel:1091"
              className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#E9EDCA]/40 border border-[#DED6D1] block text-center transition-colors group"
            >
              <ShieldAlert className="w-5 h-5 text-[#384F40] mx-auto mb-1" />
              <span className="text-[10px] font-bold text-stone-500 uppercase">Women Helpline</span>
              <p className="text-2xl font-black text-[#1E2922] font-mono group-hover:scale-105 transition-transform">1091 / 181</p>
              <span className="text-[10px] text-[#384F40] font-semibold">24/7 Rapid Response</span>
            </a>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#DED6D1] text-xs space-y-1.5 text-stone-700">
            <h5 className="font-bold text-[#1E2922] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Immediate Travel Safety Protocols:
            </h5>
            <p>• Share your live location link via WhatsApp with trusted family/friends.</p>
            <p>• Keep a physical photocopy of your passport/Aadhaar in your hotel room safe.</p>
            <p>• In case of lost baggage or tickets, contact airport customer assist at terminal exits.</p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#1E2922] text-[#FAEDCD] text-xs font-bold hover:bg-[#384F40] transition-colors cursor-pointer border border-[#CDD5AE]"
          >
            Dismiss SOS View
          </button>
        </div>

      </div>
    </div>
  );
};
