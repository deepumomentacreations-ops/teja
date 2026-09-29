import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  Mail,
  QrCode,
  X,
  ExternalLink
} from 'lucide-react';
import { TripPlan } from '../types/travel';

interface ShareTripModalProps {
  tripPlan: TripPlan;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareTripModal: React.FC<ShareTripModalProps> = ({
  tripPlan,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}?trip=${tripPlan.id}&dest=${encodeURIComponent(tripPlan.destination)}`;
  const shareText = `Check out my ${tripPlan.durationDays}-Day AI Travel Plan to ${tripPlan.destination} planned with TravelMate AI! Estimated Budget: ${tripPlan.budget.currency} ${tripPlan.budget.totalEstimated.toLocaleString()}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`, '_blank');
  };

  const shareEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(`Travel Itinerary: ${tripPlan.title}`)}&body=${encodeURIComponent(`${shareText}\n\nLink: ${shareUrl}`)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1E2922]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-[#DED6D1] overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#384F40] text-white p-5 flex items-center justify-between border-b border-[#CDD5AE]/30">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#A4C3B2]" />
            <h3 className="font-bold text-base text-[#FAEDCD] font-serif-accent">
              Share Your AI Travel Plan
            </h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#DED6D1]">
            <h4 className="font-bold text-sm text-[#1E2922]">{tripPlan.title}</h4>
            <p className="text-xs text-stone-500 mt-0.5">
              {tripPlan.durationDays} Days • {tripPlan.travellers.adults} Travellers • {tripPlan.budget.currency} {tripPlan.budget.totalEstimated.toLocaleString()}
            </p>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareWhatsApp}
              className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Share
            </button>

            <button
              onClick={shareEmail}
              className="py-3 px-4 rounded-xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer border border-[#CDD5AE]"
            >
              <Mail className="w-4 h-4" />
              Email Itinerary
            </button>
          </div>

          {/* Copy Link Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-500 uppercase">Shareable Link</label>
            <div className="flex items-center gap-2 bg-[#FAF8F5] p-1.5 rounded-xl border border-[#DED6D1]">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent px-2.5 text-xs text-stone-600 w-full focus:outline-none font-mono"
              />
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 rounded-lg bg-[#384F40] text-[#FAEDCD] text-xs font-bold flex items-center gap-1 shrink-0 hover:bg-[#283618] transition-colors border border-[#CDD5AE]"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div className="border-t border-stone-100 pt-4 flex flex-col items-center">
            <div className="w-28 h-28 bg-[#FAF8F5] p-2 rounded-xl border border-[#DED6D1] flex items-center justify-center">
              <QrCode className="w-22 h-22 text-[#384F40]" />
            </div>
            <p className="text-[10px] text-stone-400 mt-2 text-center">
              Scan with mobile phone to open trip instantly
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
