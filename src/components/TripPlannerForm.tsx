import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Sparkles,
  Heart,
  Compass,
  Wallet,
  Check,
  ChevronRight,
  Plane,
  Luggage,
  Palmtree,
  Sparkle
} from 'lucide-react';
import { TravelStyle, TravelInterest, CurrencyCode } from '../types/travel';
import { CURRENCY_RATES } from '../data/destinationsData';
import { PlanTripRequest } from '../services/aiTravelEngine';

interface TripPlannerFormProps {
  onPlanTrip: (params: PlanTripRequest) => void;
  isGenerating: boolean;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  initialDestination?: string;
}

const TRAVEL_STYLES: { id: TravelStyle; label: string; icon: string; desc: string }[] = [
  { id: 'Couple', label: 'Couple', icon: '💑', desc: 'Romantic stays & scenic viewpoints' },
  { id: 'Family', label: 'Family', icon: '👨‍👩‍👧‍👦', desc: 'Kid-friendly, spacious & safe pace' },
  { id: 'Friends', label: 'Friends Group', icon: '🎉', desc: 'Adventure, nightlife & group activities' },
  { id: 'Solo', label: 'Solo Explorer', icon: '🎒', desc: 'Social hostels, flexibility & freedom' },
  { id: 'Backpacker', label: 'Backpacker', icon: '🏕️', desc: 'Max savings, local transit & culture' },
  { id: 'Luxury', label: 'Luxury Escapes', icon: '💎', desc: '5-star resorts, private cabs & dining' },
  { id: 'Adventure', label: 'Adventure', icon: '🏄‍♂️', desc: 'Water sports, treks & adrenaline' },
  { id: 'Honeymoon', label: 'Honeymoon', icon: '🥂', desc: 'Intimate retreats & candlelit dining' },
  { id: 'Cultural', label: 'Heritage & Art', icon: '🏛️', desc: 'Historic forts, museums & crafts' },
  { id: 'Spiritual', label: 'Spiritual', icon: '🕉️', desc: 'Temples, peace & wellness' },
  { id: 'Senior-Friendly', label: 'Senior-Friendly', icon: '🌿', desc: 'Gentle walking, comfortable transfers' },
  { id: 'Food', label: 'Foodie Trail', icon: '🍛', desc: 'Street eats & authentic culinary gems' }
];

const TRAVEL_INTERESTS: { id: TravelInterest; label: string; icon: string }[] = [
  { id: 'Beaches', label: 'Beaches & Ocean', icon: '🏖️' },
  { id: 'Mountains', label: 'Mountains & Valleys', icon: '⛰️' },
  { id: 'History', label: 'History & Forts', icon: '🏰' },
  { id: 'Food', label: 'Local Food & Dining', icon: '🍲' },
  { id: 'Adventure', label: 'Adventure & Treks', icon: '🧗' },
  { id: 'Shopping', label: 'Shopping & Bazaars', icon: '🛍️' },
  { id: 'Photography', label: 'Photography Spots', icon: '📸' },
  { id: 'Wildlife', label: 'Wildlife & Safari', icon: '🐘' },
  { id: 'Nightlife', label: 'Nightlife & Cafes', icon: '🍸' },
  { id: 'Culture', label: 'Local Culture & Arts', icon: '🎭' },
  { id: 'Relaxation', label: 'Relaxation & Spa', icon: '💆' },
  { id: 'Water Sports', label: 'Water Sports', icon: '🤿' }
];

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  onPlanTrip,
  isGenerating,
  currency,
  setCurrency,
  initialDestination
}) => {
  const today = new Date().toISOString().split('T')[0];
  const defaultReturn = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [startingLocation, setStartingLocation] = useState('Visakhapatnam, India');
  const [destination, setDestination] = useState(initialDestination || 'Goa, India');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(defaultReturn);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedBudget, setSelectedBudget] = useState<number>(50000);
  const [customBudget, setCustomBudget] = useState<string>('');
  const [isCustomBudget, setIsCustomBudget] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<TravelStyle[]>(['Couple', 'Food']);
  const [selectedInterests, setSelectedInterests] = useState<TravelInterest[]>([
    'Beaches',
    'Food',
    'Photography',
    'Nightlife'
  ]);
  const [specialNotes, setSpecialNotes] = useState('');

  // Calculate days
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const calculatedDays = Math.max(1, Math.ceil((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24)) || 5);

  const handleStyleToggle = (style: TravelStyle) => {
    if (selectedStyles.includes(style)) {
      if (selectedStyles.length > 1) {
        setSelectedStyles(selectedStyles.filter((s) => s !== style));
      }
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleInterestToggle = (interest: TravelInterest) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBudget = isCustomBudget && Number(customBudget) > 0 ? Number(customBudget) : selectedBudget;

    onPlanTrip({
      startingLocation,
      destination,
      startDate,
      endDate,
      travellers: { adults, children, infants },
      budgetAmount: finalBudget,
      currency,
      travelStyles: selectedStyles,
      interests: selectedInterests,
      specialPreferences: specialNotes
    });
  };

  const rateSymbol = CURRENCY_RATES[currency]?.symbol || '₹';

  return (
    <div className="bg-white rounded-3xl shadow-md border-2 border-[#CDD5AE] overflow-hidden">
      
      {/* Form Header with 5-Color Gradient */}
      <div className="bg-gradient-to-r from-[#384F40] via-[#283618] to-[#384F40] p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#CDD5AE]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAEDCD] text-[#283618] text-xs font-black mb-2 border border-[#CDD5AE] shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#384F40]" />
            Multi-Agent AI Trip Planner Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif-accent text-[#FAEDCD]">
            Build Your Tailored Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-[#E9EDCA] font-semibold mt-1">
            Coordinated by 8 specialized AI agents for stays, dining, transport & sightseeing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#FAEDCD] px-4 py-2 rounded-2xl border-2 border-[#CDD5AE] flex items-center gap-2 text-[#283618] shadow-xs">
            <span className="text-xs font-bold text-[#384F40]">Duration:</span>
            <span className="text-xs font-black text-[#283618]">{calculatedDays} Days / {Math.max(1, calculatedDays - 1)} Nights</span>
          </div>
        </div>
      </div>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-8 bg-gradient-to-b from-white to-[#F8F6F0]/60">
        
        {/* Step 1: Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Starting Location */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#1E2922] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#384F40]" />
              Starting Location (From)
            </label>
            <div className="relative">
              <input
                type="text"
                value={startingLocation}
                onChange={(e) => setStartingLocation(e.target.value)}
                placeholder="e.g. Visakhapatnam, Hyderabad, Delhi..."
                required
                className="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-[#FAEDCD]/30 border-2 border-[#DED6D1] focus:border-[#384F40] focus:bg-white text-stone-900 font-bold text-xs sm:text-sm focus:outline-none transition-all shadow-2xs"
              />
              <div className="absolute right-3.5 top-3.5 text-[#384F40] pointer-events-none">
                <Plane className="w-4 h-4" />
              </div>
            </div>
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-[#283618] font-bold mr-1">Popular:</span>
              {['Visakhapatnam', 'Hyderabad', 'Mumbai', 'Delhi'].map((city) => (
                <button
                  type="button"
                  key={city}
                  onClick={() => setStartingLocation(`${city}, India`)}
                  className="text-[11px] bg-[#FAEDCD] hover:bg-[#E9EDCA] text-[#283618] px-2.5 py-1 rounded-lg font-extrabold transition-colors border border-[#CDD5AE] cursor-pointer shadow-2xs"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#1E2922] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#384F40]" />
              Destination (To)
            </label>
            <div className="relative">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Goa, Kashmir, Kerala, Paris, Dubai, Tokyo..."
                required
                className="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-[#FAEDCD]/30 border-2 border-[#DED6D1] focus:border-[#384F40] focus:bg-white text-stone-900 font-bold text-xs sm:text-sm focus:outline-none transition-all shadow-2xs"
              />
              <div className="absolute right-3.5 top-3.5 text-[#384F40] pointer-events-none">
                <Palmtree className="w-4 h-4" />
              </div>
            </div>
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-[#283618] font-bold mr-1">Trending:</span>
              {['Goa', 'Kashmir', 'Kerala', 'Dubai', 'Paris', 'Tokyo'].map((dest) => (
                <button
                  type="button"
                  key={dest}
                  onClick={() => setDestination(`${dest}, India`)}
                  className="text-[11px] bg-[#FAEDCD] hover:bg-[#E9EDCA] text-[#283618] px-2.5 py-1 rounded-lg font-extrabold transition-colors border border-[#CDD5AE] cursor-pointer shadow-2xs"
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Dates and Travellers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-gradient-to-r from-[#FAEDCD]/40 via-[#E9EDCA]/40 to-[#CDD5AE]/30 p-6 rounded-3xl border-2 border-[#CDD5AE]">
          {/* Departure Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-[#283618] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#384F40]" />
              Departure Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              required
              className="w-full p-3 rounded-2xl bg-white border-2 border-[#CDD5AE] text-[#1E2922] font-black text-xs focus:outline-none focus:ring-2 focus:ring-[#384F40] shadow-2xs"
            />
          </div>

          {/* Return Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-[#283618] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#384F40]" />
              Return Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              required
              className="w-full p-3 rounded-2xl bg-white border-2 border-[#CDD5AE] text-[#1E2922] font-black text-xs focus:outline-none focus:ring-2 focus:ring-[#384F40] shadow-2xs"
            />
          </div>

          {/* Travellers Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-[#283618] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#384F40]" />
              Travellers ({adults + children + infants})
            </label>
            <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border-2 border-[#CDD5AE] shadow-2xs">
              {/* Adults */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#384F40]">Adults:</span>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="bg-transparent font-black text-xs text-[#283618] focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Children */}
              <div className="flex items-center gap-1.5 border-l-2 border-[#CDD5AE] pl-2.5">
                <span className="text-xs font-bold text-[#384F40]">Kids:</span>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="bg-transparent font-black text-xs text-[#283618] focus:outline-none cursor-pointer"
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Infants */}
              <div className="flex items-center gap-1.5 border-l-2 border-[#CDD5AE] pl-2.5">
                <span className="text-xs font-bold text-[#384F40]">Infants:</span>
                <select
                  value={infants}
                  onChange={(e) => setInfants(Number(e.target.value))}
                  className="bg-transparent font-black text-xs text-[#283618] focus:outline-none cursor-pointer"
                >
                  {[0, 1, 2].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Total Budget Selection */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#1E2922] flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-[#384F40]" />
              Estimated Total Budget
            </label>
            <span className="text-xs font-bold text-[#384F40]">
              Covers transport, hotel/hostel, dining & activities
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[5000, 10000, 25000, 50000, 100000].map((bVal) => {
              const isSelected = !isCustomBudget && selectedBudget === bVal;
              return (
                <button
                  type="button"
                  key={bVal}
                  onClick={() => {
                    setSelectedBudget(bVal);
                    setIsCustomBudget(false);
                  }}
                  className={`py-3 px-3 rounded-2xl text-center font-black text-xs transition-all border-2 cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'bg-[#384F40] text-[#FAEDCD] border-[#283618] shadow-sm'
                      : 'bg-[#FAEDCD]/50 text-[#1E2922] hover:bg-[#FAEDCD] border-[#CDD5AE]'
                  }`}
                >
                  {rateSymbol}{bVal.toLocaleString()}
                </button>
              );
            })}

            {/* Custom Budget Button */}
            <button
              type="button"
              onClick={() => setIsCustomBudget(true)}
              className={`py-3 px-3 rounded-2xl text-center font-black text-xs transition-all border-2 cursor-pointer shadow-2xs ${
                isCustomBudget
                  ? 'bg-[#384F40] text-[#FAEDCD] border-[#283618] shadow-sm'
                  : 'bg-[#FAEDCD]/50 text-[#1E2922] hover:bg-[#FAEDCD] border-[#CDD5AE]'
              }`}
            >
              Custom Budget
            </button>
          </div>

          {/* Custom Budget Input Box */}
          {isCustomBudget && (
            <div className="p-3.5 rounded-2xl bg-[#FAEDCD] border-2 border-[#CDD5AE] flex items-center gap-3">
              <span className="font-black text-[#283618] text-base">{rateSymbol}</span>
              <input
                type="number"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                placeholder="Enter custom budget (e.g. 75000)"
                className="w-full bg-white p-2.5 rounded-xl border-2 border-[#CDD5AE] text-xs font-black text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#384F40]"
              />
            </div>
          )}
        </div>

        {/* Step 4: Travel Style */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-[#1E2922] flex items-center gap-1.5">
            <Luggage className="w-4 h-4 text-[#384F40]" />
            Travel Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {TRAVEL_STYLES.map((style) => {
              const isSelected = selectedStyles.includes(style.id);
              return (
                <div
                  key={style.id}
                  onClick={() => handleStyleToggle(style.id)}
                  className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all duration-150 select-none shadow-2xs ${
                    isSelected
                      ? 'bg-[#384F40] text-white border-[#283618] shadow-md -translate-y-0.5'
                      : 'bg-[#E9EDCA]/40 text-stone-900 hover:bg-[#FAEDCD] border-[#CDD5AE]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">{style.icon}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#FAEDCD] text-[#283618] flex items-center justify-center text-[11px] font-black shadow-2xs">
                        ✓
                      </span>
                    )}
                  </div>
                  <h4 className={`font-black text-xs ${isSelected ? 'text-[#FAEDCD]' : 'text-[#1E2922]'}`}>
                    {style.label}
                  </h4>
                  <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-[#E9EDCA]' : 'text-[#384F40]'}`}>
                    {style.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 5: Main Interests */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-[#1E2922] flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#384F40]" />
            Main Interests
          </label>
          <div className="flex flex-wrap gap-2.5">
            {TRAVEL_INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <button
                  type="button"
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all border-2 cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'bg-[#384F40] text-[#FAEDCD] border-[#283618] shadow-sm'
                      : 'bg-[#FAEDCD]/60 text-[#1E2922] hover:bg-[#E9EDCA] border-[#CDD5AE]'
                  }`}
                >
                  <span className="text-base">{interest.icon}</span>
                  <span>{interest.label}</span>
                  {isSelected && <span className="text-[#A4C3B2] font-black">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Special Requests */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-[#283618] flex items-center gap-1.5">
            <Sparkle className="w-4 h-4 text-[#384F40]" />
            Special Preferences / Dietary Needs (Optional)
          </label>
          <input
            type="text"
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="e.g. Vegetarian food, morning departure, beach facing hostel/room, scooty rental needed..."
            className="w-full p-3.5 rounded-2xl bg-[#FAEDCD]/30 border-2 border-[#DED6D1] text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#384F40] shadow-2xs"
          />
        </div>

        {/* Primary CTA Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#384F40] via-[#283618] to-[#384F40] hover:from-[#283618] hover:to-[#283618] text-[#FAEDCD] text-sm sm:text-base font-black flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all border-2 border-[#CDD5AE] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-3 border-[#FAEDCD] border-t-transparent rounded-full animate-spin" />
                <span>AI Agents Planning Your Trip...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#A4C3B2]" />
                <span>Plan My Trip with AI</span>
                <ChevronRight className="w-5 h-5 text-[#FAEDCD]" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
