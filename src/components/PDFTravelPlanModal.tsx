import React from 'react';
import {
  Printer,
  Download,
  X,
  Compass,
  Calendar,
  Building,
  Plane,
  Utensils,
  Camera,
  ShieldCheck,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { TripPlan, CurrencyCode } from '../types/travel';
import { CURRENCY_RATES } from '../data/destinationsData';

interface PDFTravelPlanModalProps {
  tripPlan: TripPlan;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
}

export const PDFTravelPlanModal: React.FC<PDFTravelPlanModalProps> = ({
  tripPlan,
  isOpen,
  onClose,
  currency
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const rateSymbol = CURRENCY_RATES[currency]?.symbol || '₹';
  const currentRate = CURRENCY_RATES[currency]?.rateToINR || 1;

  return (
    <div className="fixed inset-0 z-50 bg-[#1E2922]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl border border-[#DED6D1] overflow-hidden my-6 animate-in fade-in zoom-in-95 flex flex-col max-h-[92vh]">
        
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="bg-[#384F40] text-white p-4 flex items-center justify-between border-b border-[#CDD5AE]/30 print:hidden">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#A4C3B2]" />
            <h3 className="font-bold text-base text-[#FAEDCD] font-serif-accent">
              TravelMate AI — Printable Travel Plan & Travel Document
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-[#FAEDCD] text-[#283618] font-bold text-xs flex items-center gap-1.5 hover:bg-[#E9EDCA] transition-colors cursor-pointer border border-[#CDD5AE]"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div id="printable-travel-doc" className="p-8 sm:p-10 space-y-8 overflow-y-auto print:overflow-visible print:p-4 text-stone-900">
          
          {/* Document Header */}
          <div className="border-b-2 border-[#384F40] pb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-black text-[#1E2922] font-serif-accent">TravelMate AI</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#384F40] text-[#FAEDCD]">
                  Official Travel Guide
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#1E2922] mt-1">{tripPlan.title}</h1>
              <p className="text-xs text-stone-600 mt-1">
                Route: <strong>{tripPlan.startingLocation}</strong> to <strong>{tripPlan.destination}</strong>
              </p>
            </div>

            <div className="text-right text-xs space-y-1 bg-[#FAF8F5] p-3 rounded-2xl border border-[#DED6D1]">
              <p><strong>Duration:</strong> {tripPlan.durationDays} Days / {tripPlan.durationDays - 1} Nights</p>
              <p><strong>Dates:</strong> {tripPlan.startDate} to {tripPlan.endDate}</p>
              <p><strong>Travellers:</strong> {tripPlan.travellers.adults} Adults, {tripPlan.travellers.children} Kids</p>
              <p className="text-sm font-black text-[#384F40] pt-1">
                Total Budget: {rateSymbol}{Math.round(tripPlan.budget.totalEstimated / currentRate).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Quick Contacts & Emergency */}
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#DED6D1] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase text-stone-500 font-bold">Tourist Police</span>
              <p className="font-bold text-stone-900 flex items-center gap-1 mt-0.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#384F40]" />
                {tripPlan.emergency.touristHelpline}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-500 font-bold">Police Hotline</span>
              <p className="font-bold text-stone-900 mt-0.5">{tripPlan.emergency.police}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-500 font-bold">Medical Ambulance</span>
              <p className="font-bold text-stone-900 mt-0.5">{tripPlan.emergency.ambulance}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-500 font-bold">Nearest Hospital</span>
              <p className="font-bold text-stone-900 mt-0.5 truncate">{tripPlan.emergency.nearestHospital.name}</p>
            </div>
          </div>

          {/* Day-by-Day Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#1E2922] font-serif-accent border-b border-[#DED6D1] pb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#384F40]" />
              Detailed Day-by-Day Itinerary
            </h3>

            <div className="space-y-6">
              {tripPlan.itinerary.map((day) => (
                <div key={day.dayNumber} className="border border-[#DED6D1] rounded-2xl p-5 space-y-3 bg-white">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-[#384F40] text-[#FAEDCD] text-xs font-bold mr-2">
                        Day {day.dayNumber}
                      </span>
                      <strong className="text-sm font-bold text-[#1E2922]">{day.title}</strong>
                    </div>
                    <span className="text-xs text-stone-500">Theme: {day.theme}</span>
                  </div>

                  <div className="space-y-2.5">
                    {day.items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-4 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-[#384F40] w-14 shrink-0">{item.time}</span>
                          <div>
                            <strong className="text-stone-900">{item.title}</strong>
                            <p className="text-stone-500 text-[11px]">{item.locationName} • ⏱ {item.duration}</p>
                            {item.notes && <p className="text-stone-600 text-[11px] italic mt-0.5">💡 {item.notes}</p>}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          {item.estimatedCost > 0 ? (
                            <span className="font-bold text-stone-800">
                              {rateSymbol}{Math.round(item.estimatedCost / currentRate).toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-green-700 font-semibold">Included</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accommodation & Transportation Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#DED6D1]">
            {/* Stays */}
            <div className="border border-[#DED6D1] rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-xs uppercase text-[#384F40] flex items-center gap-1.5">
                <Building className="w-4 h-4" />
                Recommended Accommodation
              </h4>
              <p className="text-sm font-bold text-stone-900">{tripPlan.accommodations[0]?.name}</p>
              <p className="text-xs text-stone-600">{tripPlan.accommodations[0]?.address}</p>
              <p className="text-xs text-stone-500">
                Check-in: {tripPlan.accommodations[0]?.checkIn} • Check-out: {tripPlan.accommodations[0]?.checkOut}
              </p>
            </div>

            {/* Transport */}
            <div className="border border-[#DED6D1] rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-xs uppercase text-[#384F40] flex items-center gap-1.5">
                <Plane className="w-4 h-4" />
                Transportation Route
              </h4>
              <p className="text-sm font-bold text-stone-900">{tripPlan.transportOptions[0]?.provider}</p>
              <p className="text-xs text-stone-600">{tripPlan.transportOptions[0]?.route}</p>
              <p className="text-xs text-stone-500">
                Est. Duration: {tripPlan.transportOptions[0]?.duration} • {tripPlan.transportOptions[0]?.type}
              </p>
            </div>
          </div>

          {/* Document Footer */}
          <div className="pt-6 border-t border-[#DED6D1] flex items-center justify-between text-[11px] text-stone-400">
            <span>Generated by TravelMate AI Multi-Agent Travel Planner</span>
            <span>Document ID: TM-{tripPlan.id.toUpperCase().slice(0, 8)}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
