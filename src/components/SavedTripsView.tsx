import React from 'react';
import { Bookmark, Calendar, Users, Wallet, ArrowRight, Trash2, Sparkles, MapPin } from 'lucide-react';
import { TripPlan, CurrencyCode } from '../types/travel';
import { CURRENCY_RATES } from '../data/destinationsData';

interface SavedTripsViewProps {
  savedTrips: TripPlan[];
  onSelectTrip: (trip: TripPlan) => void;
  onDeleteTrip: (tripId: string) => void;
  onStartNewTrip: () => void;
  currency: CurrencyCode;
}

export const SavedTripsView: React.FC<SavedTripsViewProps> = ({
  savedTrips,
  onSelectTrip,
  onDeleteTrip,
  onStartNewTrip,
  currency
}) => {
  const rateSymbol = CURRENCY_RATES[currency]?.symbol || '₹';
  const currentRate = CURRENCY_RATES[currency]?.rateToINR || 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-[#DED6D1]">
        <div>
          <h2 className="text-2xl font-bold text-[#1E2922] font-serif-accent flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-[#384F40]" />
            Your Saved AI Trip Itineraries
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Access your saved plans offline, download PDF travel guides, and check live flight status
          </p>
        </div>

        <button
          onClick={onStartNewTrip}
          className="px-5 py-2.5 rounded-2xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 border border-[#CDD5AE]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A4C3B2]" />
          Plan Another Trip
        </button>
      </div>

      {savedTrips.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#DED6D1] p-12 text-center space-y-4 shadow-xs">
          <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#1E2922]">No Saved Trips Yet</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Plan your first trip with our AI Multi-Agent system to save customized day-by-day itineraries, flight tracking passes, and budget sheets!
          </p>
          <button
            onClick={onStartNewTrip}
            className="px-6 py-3 rounded-2xl bg-[#384F40] text-[#FAEDCD] font-bold text-xs border border-[#CDD5AE]"
          >
            Start Planning Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#DED6D1] flex flex-col justify-between hover:shadow-md hover:border-[#A4C3B2] transition-all"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FAEDCD] text-[#283618] text-[10px] font-bold uppercase border border-[#CDD5AE]">
                      {trip.durationDays} Days / {trip.durationDays - 1} Nights
                    </span>
                    <h3 className="font-extrabold text-lg text-[#1E2922] mt-1">{trip.title}</h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#384F40]" />
                      {trip.startingLocation.split(',')[0]} → {trip.destination}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-1.5 text-stone-300 hover:text-red-500 transition-colors"
                    title="Delete Saved Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#DED6D1] space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Dates:</span>
                    <span className="font-semibold text-stone-800">{trip.startDate} to {trip.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travellers:</span>
                    <span className="font-semibold text-stone-800">{trip.travellers.adults} Adults, {trip.travellers.children} Kids</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Budget:</span>
                    <span className="font-bold text-[#384F40]">
                      {rateSymbol}{Math.round(trip.budget.totalEstimated / currentRate).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] border-t border-[#DED6D1] flex items-center justify-between">
                <span className="text-[10px] text-stone-400">Created: {new Date(trip.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => onSelectTrip(trip)}
                  className="px-4 py-2 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#CDD5AE]/40"
                >
                  Open Dashboard
                  <ArrowRight className="w-3.5 h-3.5 text-[#A4C3B2]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
