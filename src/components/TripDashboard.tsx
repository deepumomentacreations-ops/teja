import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Plane,
  Building,
  Utensils,
  Camera,
  Compass,
  Wallet,
  CloudSun,
  ShieldAlert,
  Languages,
  CheckSquare,
  Share2,
  Printer,
  Zap,
  MapPin,
  Clock,
  ArrowRight,
  TrendingDown,
  ChevronRight,
  Star,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Radio,
  Luggage,
  Coffee,
  BedDouble
} from 'lucide-react';
import {
  TripPlan,
  CurrencyCode,
  TravelInterest,
  TravelStyle,
  DayItinerary,
  ItineraryTimelineItem
} from '../types/travel';
import { CURRENCY_RATES } from '../data/destinationsData';
import { INDIAN_LOCAL_TRANSPORTS, GLOBAL_LOCAL_TRANSPORTS } from '../data/megaPlacesData';
import { InteractiveMap, MapMarkerItem } from './InteractiveMap';
import { FlightTrackerLive } from './FlightTrackerLive';
import { TravelChecklist } from './TravelChecklist';

interface TripDashboardProps {
  tripPlan: TripPlan;
  onUpdateTripPlan: (updated: TripPlan) => void;
  onOpenBudgetOptimizer: () => void;
  onOpenShareModal: () => void;
  onOpenPDFModal: () => void;
  currency: CurrencyCode;
}

export const TripDashboard: React.FC<TripDashboardProps> = ({
  tripPlan,
  onUpdateTripPlan,
  onOpenBudgetOptimizer,
  onOpenShareModal,
  onOpenPDFModal,
  currency
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'itinerary'
    | 'transport'
    | 'hotels'
    | 'restaurants'
    | 'attractions'
    | 'activities'
    | 'budget'
    | 'radar'
    | 'map'
    | 'weather'
    | 'safety'
    | 'culture'
    | 'checklist'
  >('overview');

  const [aiItineraryPrompt, setAiItineraryPrompt] = useState('');
  const [isProcessingCommand, setIsProcessingCommand] = useState(false);
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [hotelFilter, setHotelFilter] = useState<string>('all');
  const [foodFilter, setFoodFilter] = useState<string>('all');

  const rateSymbol = CURRENCY_RATES[currency]?.symbol || '₹';
  const currentRate = CURRENCY_RATES[currency]?.rateToINR || 1;

  // Natural Language Itinerary Modifier
  const handleItineraryAiCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiItineraryPrompt.trim()) return;

    setIsProcessingCommand(true);
    const query = aiItineraryPrompt.toLowerCase();

    setTimeout(() => {
      let updatedItinerary = [...tripPlan.itinerary];

      if (query.includes('cheap') || query.includes('budget') || query.includes('reduce')) {
        updatedItinerary = updatedItinerary.map((day) => ({
          ...day,
          dayEstimatedCost: Math.round(day.dayEstimatedCost * 0.8),
          items: day.items.map((item) =>
            item.category === 'Food'
              ? { ...item, title: `${item.title} (Local Thali / Street Food)`, estimatedCost: Math.round(item.estimatedCost * 0.6) }
              : item
          )
        }));
      } else if (query.includes('relax') || query.includes('less walking') || query.includes('chill')) {
        updatedItinerary = updatedItinerary.map((day) => ({
          ...day,
          theme: `${day.theme} (Relaxed Pace)`,
          items: day.items.slice(0, 4).map((item) => ({
            ...item,
            notes: `${item.notes || ''} • Leisure pace with cafe breaks.`
          }))
        }));
      } else if (query.includes('vegetarian') || query.includes('veg') || query.includes('jain')) {
        updatedItinerary = updatedItinerary.map((day) => ({
          ...day,
          items: day.items.map((item) =>
            item.category === 'Food'
              ? { ...item, title: 'Authentic Pure Vegetarian / Jain Specialty Feast', locationName: 'Green Leaf Gourmet Organic' }
              : item
          )
        }));
      } else if (query.includes('beach') || query.includes('sea')) {
        updatedItinerary = updatedItinerary.map((day) => ({
          ...day,
          items: day.items.map((item, idx) =>
            idx === 1
              ? { ...item, title: 'Golden Sands Beach & Sunset Shacks', category: 'Relaxation' }
              : item
          )
        }));
      }

      onUpdateTripPlan({
        ...tripPlan,
        itinerary: updatedItinerary
      });

      setIsProcessingCommand(false);
      setAiItineraryPrompt('');
      alert(`Itinerary updated for: "${query}"!`);
    }, 1000);
  };

  // Convert places to map markers
  const mapMarkers: MapMarkerItem[] = [
    {
      id: 'm-start',
      name: `Departure: ${tripPlan.startingLocation}`,
      category: 'starting',
      coordinates: { lat: 17.6868, lng: 83.2185 },
      address: tripPlan.startingLocation,
      description: 'Starting airport / railway origin'
    },
    ...tripPlan.accommodations.map((h) => ({
      id: `m-h-${h.id}`,
      name: h.name,
      category: 'hotel' as const,
      coordinates: h.coordinates,
      address: h.address,
      rating: h.rating,
      price: `${rateSymbol}${Math.round(h.pricePerNight / currentRate).toLocaleString()}/night`,
      description: `${h.roomType} • ${h.badge || 'Verified Stay'}`
    })),
    ...tripPlan.restaurants.map((r) => ({
      id: `m-r-${r.id}`,
      name: r.name,
      category: 'food' as const,
      coordinates: r.coordinates,
      address: r.address,
      rating: r.rating,
      price: `${r.priceRange} (${rateSymbol}${Math.round(r.costPerPerson / currentRate)}/person)`,
      description: `Cuisine: ${r.cuisine.join(', ')} • ${r.popularDishes[0]}`
    })),
    ...tripPlan.attractions.map((a) => ({
      id: `m-a-${a.id}`,
      name: a.name,
      category: 'attraction' as const,
      coordinates: a.coordinates,
      rating: a.rating,
      price: a.entryFee === 0 ? 'Free Entry' : `Entry ${rateSymbol}${Math.round(a.entryFee / currentRate)}`,
      description: a.description
    })),
    {
      id: 'm-hosp',
      name: tripPlan.emergency.nearestHospital.name,
      category: 'hospital',
      coordinates: { lat: 15.3080, lng: 74.1220 },
      address: tripPlan.emergency.nearestHospital.address,
      price: '24/7 Emergency Clinic',
      description: `Ph: ${tripPlan.emergency.nearestHospital.phone}`
    }
  ];

  const totalTravellers = tripPlan.travellers.adults + tripPlan.travellers.children + tripPlan.travellers.infants;
  const userBudget = tripPlan.budget.userBudget;
  const estimatedCost = tripPlan.budget.totalEstimated;
  const budgetDelta = userBudget - estimatedCost;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'itinerary', label: 'Daily Timeline', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'transport', label: 'Transport Comparison', icon: <Plane className="w-3.5 h-3.5" /> },
    { id: 'hotels', label: 'Hostels & Hotels', icon: <Building className="w-3.5 h-3.5" /> },
    { id: 'restaurants', label: 'Restaurants & Cafes', icon: <Utensils className="w-3.5 h-3.5" /> },
    { id: 'attractions', label: 'Attractions & Sights', icon: <Camera className="w-3.5 h-3.5" /> },
    { id: 'activities', label: 'Activities & Tours', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'budget', label: 'Budget Planner', icon: <Wallet className="w-3.5 h-3.5" /> },
    { id: 'radar', label: 'Flight Radar & Telemetry', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'map', label: 'GPS Interactive Map', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'weather', label: 'Weather Forecast', icon: <CloudSun className="w-3.5 h-3.5" /> },
    { id: 'safety', label: 'Safety & Visa', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'culture', label: 'Local Culture', icon: <Languages className="w-3.5 h-3.5" /> },
    { id: 'checklist', label: 'Packing Checklist', icon: <CheckSquare className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Summary Card */}
      <div className="bg-gradient-to-br from-[#FAEDCD] via-[#E9EDCA] to-[#CDD5AE] p-6 sm:p-8 rounded-3xl text-stone-900 shadow-md relative overflow-hidden border-2 border-[#CDD5AE]">
        <div className="flex flex-wrap items-start justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl bg-[#384F40] text-[#FAEDCD] text-xs font-black shadow-2xs">
                {tripPlan.durationDays} Days / {tripPlan.durationDays - 1} Nights
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/90 text-[#283618] text-xs font-black border border-[#CDD5AE] shadow-2xs">
                {totalTravellers} Travellers ({tripPlan.travellers.adults} Adults, {tripPlan.travellers.children} Kids)
              </span>
              {tripPlan.isOptimized && (
                <span className="px-3 py-1 rounded-xl bg-[#FAEDCD] text-[#283618] border-2 border-[#A4C3B2] text-xs font-black flex items-center gap-1 shadow-2xs">
                  <Zap className="w-3.5 h-3.5 text-[#283618]" />
                  AI Budget Optimized
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1E2922] font-serif-accent">
              Your {tripPlan.destination} Journey
            </h1>
            <p className="text-[#283618]/90 text-xs sm:text-sm font-semibold mt-1">
              From <strong className="text-[#1E2922]">{tripPlan.startingLocation}</strong> to <strong className="text-[#1E2922]">{tripPlan.destination}</strong> • {tripPlan.startDate} – {tripPlan.endDate}
            </p>
          </div>

          {/* Quick Actions & Budget KPI */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="bg-white/95 p-4 rounded-2xl border-2 border-[#A4C3B2] text-right shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-[#384F40] font-black">Estimated Trip Cost</span>
              <div className="text-2xl sm:text-3xl font-black text-[#283618] font-mono">
                {rateSymbol}{Math.round(estimatedCost / currentRate).toLocaleString()}
              </div>
              <div className="text-xs text-stone-700 font-bold mt-0.5">
                Target: <span className="font-black text-[#1E2922]">{rateSymbol}{Math.round(userBudget / currentRate).toLocaleString()}</span>
                {budgetDelta >= 0 ? (
                  <span className="text-[#283618] font-black bg-[#E9EDCA] px-2 py-0.5 rounded-md ml-1.5 border border-[#CDD5AE]">(Save {rateSymbol}{Math.round(budgetDelta / currentRate).toLocaleString()})</span>
                ) : (
                  <span className="text-amber-900 font-black bg-[#FAEDCD] px-2 py-0.5 rounded-md ml-1.5 border border-[#CDD5AE]">(+{rateSymbol}{Math.round(Math.abs(budgetDelta) / currentRate).toLocaleString()})</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenBudgetOptimizer}
                className="px-4 py-2.5 rounded-xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] text-xs font-black flex items-center gap-1.5 transition-all shadow-md cursor-pointer border-2 border-[#CDD5AE]"
              >
                <Zap className="w-4 h-4 text-[#E9EDCA]" />
                Optimize Budget
              </button>
              <button
                onClick={onOpenShareModal}
                className="p-2.5 rounded-xl bg-white hover:bg-[#FAEDCD] text-[#283618] border-2 border-[#CDD5AE] transition-colors cursor-pointer shadow-2xs"
                title="Share Trip Plan"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenPDFModal}
                className="p-2.5 rounded-xl bg-white hover:bg-[#FAEDCD] text-[#283618] border-2 border-[#CDD5AE] transition-colors cursor-pointer shadow-2xs"
                title="Print / Save PDF Travel Guide"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white rounded-3xl shadow-sm border-2 border-[#CDD5AE] p-2 overflow-x-auto flex items-center gap-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                  : 'text-[#1E2922] bg-[#FAEDCD]/40 hover:bg-[#FAEDCD] border border-[#DED6D1]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#DED6D1] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Transportation</span>
                <Plane className="w-3.5 h-3.5 text-[#384F40]" />
              </div>
              <p className="text-base font-extrabold text-stone-900">
                {rateSymbol}{Math.round(tripPlan.budget.transportation / currentRate).toLocaleString()}
              </p>
              <span className="text-[10px] text-stone-400">Transit Fares</span>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#DED6D1] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Hostels & Hotels</span>
                <Building className="w-3.5 h-3.5 text-[#384F40]" />
              </div>
              <p className="text-base font-extrabold text-stone-900">
                {rateSymbol}{Math.round(tripPlan.budget.accommodation / currentRate).toLocaleString()}
              </p>
              <span className="text-[10px] text-stone-400">{tripPlan.durationDays - 1} Nights</span>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#DED6D1] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Food & Drinks</span>
                <Utensils className="w-3.5 h-3.5 text-[#384F40]" />
              </div>
              <p className="text-base font-extrabold text-stone-900">
                {rateSymbol}{Math.round(tripPlan.budget.food / currentRate).toLocaleString()}
              </p>
              <span className="text-[10px] text-stone-400">All meals</span>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#DED6D1] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Local Cabs</span>
                <Compass className="w-3.5 h-3.5 text-[#384F40]" />
              </div>
              <p className="text-base font-extrabold text-stone-900">
                {rateSymbol}{Math.round(tripPlan.budget.localTransport / currentRate).toLocaleString()}
              </p>
              <span className="text-[10px] text-stone-400">Autos & Bikes</span>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#DED6D1] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Activities</span>
                <Sparkles className="w-3.5 h-3.5 text-[#384F40]" />
              </div>
              <p className="text-base font-extrabold text-stone-900">
                {rateSymbol}{Math.round(tripPlan.budget.activities / currentRate).toLocaleString()}
              </p>
              <span className="text-[10px] text-stone-400">Passes & entry</span>
            </div>

            <div className="bg-[#384F40] p-4 rounded-2xl text-[#FAEDCD] shadow-xs space-y-1 border border-[#CDD5AE]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[#E9EDCA]">Total Est.</span>
                <Wallet className="w-3.5 h-3.5 text-[#FAEDCD]" />
              </div>
              <p className="text-base font-black text-[#FAEDCD]">
                {rateSymbol}{Math.round(estimatedCost / currentRate).toLocaleString()}
              </p>
              <span className="text-[10px] text-[#E9EDCA]">Full package</span>
            </div>
          </div>

          {/* Highlights & Quick Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Top Stay */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#DED6D1] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1E2922] font-serif-accent flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#384F40]" />
                  Recommended Stay
                </h3>
                <button
                  onClick={() => setActiveTab('hotels')}
                  className="text-xs font-bold text-[#384F40] hover:underline"
                >
                  View All ({tripPlan.accommodations.length})
                </button>
              </div>

              {tripPlan.accommodations[0] && (
                <div className="space-y-3">
                  <div className="relative h-40 rounded-2xl overflow-hidden shadow-inner">
                    <img
                      src={tripPlan.accommodations[0].images[0]}
                      alt={tripPlan.accommodations[0].name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#384F40] text-[#FAEDCD] text-[10px] font-bold">
                      {tripPlan.accommodations[0].badge || 'Top Pick'}
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {tripPlan.accommodations[0].rating}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-stone-900">{tripPlan.accommodations[0].name}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">{tripPlan.accommodations[0].distanceToCenter}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tripPlan.accommodations[0].amenities.slice(0, 3).map((a, i) => (
                        <span key={i} className="text-[10px] bg-stone-100 px-2 py-0.5 rounded-md text-stone-700 font-medium">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <div>
                      <span className="text-[10px] text-stone-400">Total {tripPlan.durationDays - 1} Nights</span>
                      <p className="font-bold text-sm text-[#384F40]">
                        {rateSymbol}{Math.round(tripPlan.accommodations[0].totalCost / currentRate).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => alert(`Opening booking provider for ${tripPlan.accommodations[0].name}...`)}
                      className="px-3.5 py-1.5 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold transition-colors border border-[#CDD5AE]"
                    >
                      Book Stay
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Outbound Transport */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#DED6D1] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1E2922] font-serif-accent flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#384F40]" />
                  Outbound Transport
                </h3>
                <button
                  onClick={() => setActiveTab('transport')}
                  className="text-xs font-bold text-[#384F40] hover:underline"
                >
                  Compare ({tripPlan.transportOptions.length})
                </button>
              </div>

              {tripPlan.transportOptions[0] && (
                <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-[#DED6D1]">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-stone-900">
                      {tripPlan.transportOptions[0].provider}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {tripPlan.transportOptions[0].liveStatus || 'On Time'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <div>
                      <p className="font-mono font-bold text-sm text-stone-900">{tripPlan.transportOptions[0].departureTime}</p>
                      <p className="text-[11px] text-stone-400">{tripPlan.startingLocation.split(',')[0]}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-[#384F40] font-semibold">{tripPlan.transportOptions[0].duration}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#384F40]" />
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-sm text-stone-900">{tripPlan.transportOptions[0].arrivalTime}</p>
                      <p className="text-[11px] text-stone-400">{tripPlan.destination.split(',')[0]}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400">Total Fares ({totalTravellers} Pax)</span>
                      <p className="font-bold text-sm text-[#384F40]">
                        {rateSymbol}{Math.round(tripPlan.transportOptions[0].estimatedCost / currentRate).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('radar')}
                      className="px-3 py-1 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-lg text-xs font-bold transition-colors border border-[#CDD5AE]"
                    >
                      Track Radar
                    </button>
                  </div>
                </div>
              )}

              {/* Weather Quick Snippet */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-[#DED6D1] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CloudSun className="w-5 h-5 text-[#384F40]" />
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">{tripPlan.weather.currentTemp}°C • {tripPlan.weather.condition}</h5>
                    <p className="text-[10px] text-stone-500 line-clamp-1">{tripPlan.weather.aiAdvice}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('weather')}
                  className="text-xs text-[#384F40] font-bold hover:underline shrink-0"
                >
                  Forecast →
                </button>
              </div>
            </div>

            {/* AI Assistant Fast Box */}
            <div className="bg-gradient-to-br from-[#1E2922] to-[#384F40] rounded-3xl p-6 text-white shadow-xs flex flex-col justify-between border border-[#CDD5AE]/30">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-xl bg-[#CDD5AE]/20 text-[#FAEDCD] flex items-center justify-center font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#E9EDCA]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#FAEDCD]">TravelMate Orchestrator</h4>
                    <span className="text-[10px] text-emerald-300 font-semibold">Active</span>
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  "I have verified {tripPlan.itinerary.length} days of routes, {tripPlan.restaurants.length} restaurants, and {tripPlan.accommodations.length} stays for {tripPlan.destination}."
                </p>

                <div className="mt-4 space-y-1.5">
                  <button
                    onClick={onOpenBudgetOptimizer}
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAEDCD] text-xs font-semibold text-left flex items-center justify-between transition-colors border border-[#CDD5AE]/20"
                  >
                    <span>⚡ Reduce Trip Cost</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('itinerary')}
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAEDCD] text-xs font-semibold text-left flex items-center justify-between transition-colors border border-[#CDD5AE]/20"
                  >
                    <span>📅 Daily Timeline</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAEDCD] text-xs font-semibold text-left flex items-center justify-between transition-colors border border-[#CDD5AE]/20"
                  >
                    <span>📍 GPS Map</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-white/20 text-[10px] text-stone-300 flex justify-between items-center">
                <span>Multi-Agent Core</span>
                <span className="text-[#FAEDCD] font-semibold">100% Tailored</span>
              </div>
            </div>

          </div>

          {/* Map Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1E2922] font-serif-accent flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#384F40]" />
                Destination Map & Route Points
              </h3>
              <span className="text-xs text-stone-500">
                Hotels, Hostels, Dining, Sights & Emergency Clinics
              </span>
            </div>
            <InteractiveMap
              destination={tripPlan.destination}
              startingLocation={tripPlan.startingLocation}
              markers={mapMarkers}
            />
          </div>
        </div>
      )}

      {/* 2. ITINERARY */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#384F40]" />
              <h3 className="font-bold text-sm text-[#1E2922]">
                Modify Itinerary with AI
              </h3>
            </div>
            <p className="text-xs text-stone-500 mb-4">
              Type requests like "Make Day 2 more relaxed", "Add vegetarian spots", or "Make it cheaper"
            </p>

            <form onSubmit={handleItineraryAiCommand} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={aiItineraryPrompt}
                onChange={(e) => setAiItineraryPrompt(e.target.value)}
                placeholder="e.g. Make Day 2 more relaxed with beachside cafes..."
                className="flex-1 bg-stone-50 px-4 py-2.5 rounded-xl border border-[#DED6D1] text-xs text-stone-900 font-medium focus:outline-none focus:ring-1 focus:ring-[#384F40]"
              />
              <button
                type="submit"
                disabled={isProcessingCommand || !aiItineraryPrompt.trim()}
                className="px-5 py-2.5 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[#CDD5AE]"
              >
                {isProcessingCommand ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Update Plan
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {tripPlan.itinerary.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setSelectedDayNumber(day.dayNumber)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  selectedDayNumber === day.dayNumber
                    ? 'bg-[#384F40] text-[#FAEDCD] shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#DED6D1]'
                }`}
              >
                <span>Day {day.dayNumber}</span>
                <span className="text-[10px] opacity-75">({day.date})</span>
              </button>
            ))}
          </div>

          {tripPlan.itinerary
            .filter((d) => d.dayNumber === selectedDayNumber)
            .map((day) => (
              <div key={day.dayNumber} className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold">
                      {day.date}
                    </span>
                    <h3 className="text-xl font-bold text-[#1E2922] font-serif-accent mt-1">
                      {day.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">Theme: {day.theme}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-400">Day Estimated Spend</span>
                    <p className="text-base font-bold text-[#384F40]">
                      {rateSymbol}{Math.round(day.dayEstimatedCost / currentRate).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-stone-200">
                  {day.items.map((item) => (
                    <div key={item.id} className="relative pl-12 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group">
                      <div className="absolute left-3.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#384F40] border-2 border-white shadow-xs" />

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#384F40] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DED6D1]">
                            {item.time}
                          </span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                            {item.category}
                          </span>
                          <span className="text-xs text-stone-400">⏱ {item.duration}</span>
                        </div>

                        <h4 className="font-bold text-sm text-stone-900 group-hover:text-[#384F40] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-stone-600 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#384F40]" />
                          {item.locationName}
                        </p>

                        {item.travelTimeFromPrev && (
                          <p className="text-[11px] text-stone-600 bg-stone-100 inline-block px-2 py-0.5 rounded">
                            🚕 Transit: {item.travelTimeFromPrev} ({item.distanceFromPrev})
                          </p>
                        )}

                        {item.notes && (
                          <p className="text-xs text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-[#DED6D1] mt-1">
                            💡 {item.notes}
                          </p>
                        )}
                      </div>

                      <div className="sm:text-right shrink-0">
                        {item.estimatedCost > 0 ? (
                          <p className="font-bold text-xs text-stone-800">
                            {rateSymbol}{Math.round(item.estimatedCost / currentRate).toLocaleString()}
                          </p>
                        ) : (
                          <span className="text-xs font-semibold text-emerald-700">Included</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 3. TRANSPORT */}
      {activeTab === 'transport' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1E2922] font-serif-accent flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#384F40]" />
                  Intercity Transportation Comparison
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Route: {tripPlan.startingLocation.split(',')[0]} ↔ {tripPlan.destination.split(',')[0]}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {tripPlan.transportOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                    opt.isRecommended
                      ? 'bg-white border-[#384F40] shadow-sm ring-1 ring-[#384F40]/30'
                      : 'bg-stone-50 border-[#DED6D1]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#384F40] text-[#FAEDCD] text-xs font-bold">
                        {opt.type}
                      </span>
                      {opt.isRecommended && (
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Recommended
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-base text-stone-900">{opt.provider}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">{opt.route}</p>

                    <div className="grid grid-cols-2 gap-2 my-3 bg-white p-2.5 rounded-xl border border-[#DED6D1] text-xs">
                      <div>
                        <span className="text-stone-400 text-[10px]">Travel Time</span>
                        <p className="font-bold text-stone-900">{opt.duration}</p>
                      </div>
                      <div>
                        <span className="text-stone-400 text-[10px]">Transfers</span>
                        <p className="font-bold text-stone-900">{opt.transfers === 0 ? 'Non-Stop' : `${opt.transfers} Stop`}</p>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      {opt.pros.map((p, i) => (
                        <p key={i} className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400">Total Fare</span>
                      <p className="text-lg font-black text-[#384F40]">
                        {rateSymbol}{Math.round(opt.estimatedCost / currentRate).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => alert(`Redirecting to booking provider for ${opt.provider}...`)}
                      className="px-3.5 py-1.5 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold transition-colors border border-[#CDD5AE]"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Within-Destination Local Commuting Advisor */}
          <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1E2922] font-serif-accent flex items-center gap-2">
                  <span className="text-xl">🛺</span>
                  Local Transport Available in {tripPlan.destination}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Available transit once you arrive at the airport, station, or city center (Auto-Rickshaws, Scooty Rentals, App Cabs, Metro & Ferries)
                </p>
              </div>
              <span className="px-3 py-1 bg-[#FAEDCD] text-[#384F40] text-xs font-bold rounded-lg border border-[#CDD5AE]">
                Within-Destination Transit
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {(tripPlan.destinationRegion === 'India' ? INDIAN_LOCAL_TRANSPORTS : GLOBAL_LOCAL_TRANSPORTS).slice(0, 6).map((trans) => (
                <div
                  key={trans.id}
                  className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#DED6D1] flex flex-col justify-between space-y-3 hover:border-[#384F40]/40 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{trans.icon}</span>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900">{trans.mode.split('(')[0]}</h4>
                        <span className="text-[10px] text-[#384F40] font-bold uppercase">{trans.category}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2">
                      {trans.description}
                    </p>

                    <div className="bg-white p-2.5 rounded-xl border border-[#DED6D1] text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Typical Fare:</span>
                        <span className="font-bold text-stone-900">{trans.typicalCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Best For:</span>
                        <span className="font-medium text-stone-700 truncate max-w-[140px]">{trans.bestFor}</span>
                      </div>
                    </div>

                    {trans.helmetLicenseReq && (
                      <p className="text-[10px] text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-200 font-medium">
                        ⚠️ {trans.helmetLicenseReq}
                      </p>
                    )}
                  </div>

                  <div className="text-[11px] text-stone-600 bg-stone-100 p-2 rounded-lg">
                    <strong className="text-[#384F40]">Tip: </strong>{trans.bookingTip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. HOTELS & HOSTELS */}
      {activeTab === 'hotels' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1E2922] font-serif-accent flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#384F40]" />
                  Hostels, Boutique Stays & 5-Star Luxury Resorts
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Browse budget backpacker pod hostels, heritage suites, and beachfront villas
                </p>
              </div>

              {/* Hostels vs Hotels Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {[
                  { id: 'all', label: 'All Stays' },
                  { id: 'Hostel', label: '🎒 Hostels & Pods' },
                  { id: 'Hotel', label: '🏨 Standard Hotels' },
                  { id: 'Resort', label: '💎 Luxury Resorts' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setHotelFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      hotelFilter === cat.id
                        ? 'bg-[#384F40] text-[#FAEDCD] shadow-xs'
                        : 'bg-[#FAF8F5] text-stone-700 hover:bg-stone-100 border border-[#DED6D1]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tripPlan.accommodations
                .filter((h) => hotelFilter === 'all' || h.type === hotelFilter || (hotelFilter === 'Hostel' && h.type === 'Hostel'))
                .map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#DED6D1] flex flex-col justify-between hover:shadow-sm transition-all"
                  >
                    <div>
                      <div className="relative h-44">
                        <img
                          src={hotel.images[0]}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#384F40] text-[#FAEDCD] text-[10px] font-bold">
                          {hotel.type} • {hotel.tier}
                        </span>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {hotel.rating} ({hotel.reviewsCount})
                        </span>
                      </div>

                      <div className="p-4 space-y-2.5">
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">{hotel.name}</h4>
                          <p className="text-xs text-stone-500">{hotel.distanceToCenter}</p>
                        </div>

                        <p className="text-xs text-stone-800 bg-white p-2 rounded-lg border border-[#DED6D1] font-medium">
                          🛏 {hotel.roomType}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {hotel.amenities.slice(0, 4).map((a, i) => (
                            <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded text-stone-600 border border-[#DED6D1]">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white border-t border-[#DED6D1] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400">Total {tripPlan.durationDays - 1} Nights</span>
                        <p className="text-base font-black text-[#384F40]">
                          {rateSymbol}{Math.round(hotel.totalCost / currentRate).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => alert(`Opening reservation portal for ${hotel.name}...`)}
                        className="px-3.5 py-1.5 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold transition-colors border border-[#CDD5AE]"
                      >
                        Book Stay
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. RESTAURANTS & DINING */}
      {activeTab === 'restaurants' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1E2922] font-serif-accent flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#384F40]" />
                  Curated Restaurants, Street Food & Cafes
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Explore pure vegetarian thalis, Jain dining, halal delicacies, cafes, and street food lanes
                </p>
              </div>

              {/* Dietary & Dining Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {[
                  { id: 'all', label: 'All Cuisines' },
                  { id: 'Vegetarian', label: '🥗 Pure Veg & Jain' },
                  { id: 'Halal', label: '🍗 Halal & Non-Veg' },
                  { id: 'Vegan', label: '🌿 Vegan' }
                ].map((diet) => (
                  <button
                    key={diet.id}
                    onClick={() => setFoodFilter(diet.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      foodFilter === diet.id
                        ? 'bg-[#384F40] text-[#FAEDCD] shadow-xs'
                        : 'bg-[#FAF8F5] text-stone-700 hover:bg-stone-100 border border-[#DED6D1]'
                    }`}
                  >
                    {diet.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tripPlan.restaurants
                .filter((r) => foodFilter === 'all' || r.dietaryTags.includes(foodFilter as any))
                .map((rest) => (
                  <div
                    key={rest.id}
                    className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#DED6D1] flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      {rest.image && (
                        <div className="h-36 rounded-xl overflow-hidden shadow-inner">
                          <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">{rest.name}</h4>
                          <p className="text-xs text-stone-500">{rest.cuisine.join(' • ')}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800 text-xs font-bold shrink-0">
                          ★ {rest.rating}
                        </span>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-[#DED6D1] text-xs space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-stone-400">Must-Try Dish</span>
                        <p className="font-semibold text-stone-800">{rest.popularDishes.join(', ')}</p>
                      </div>

                      <p className="text-xs text-stone-500 italic">"{rest.atmosphere}"</p>

                      <div className="flex flex-wrap gap-1">
                        {rest.dietaryTags.map((tag) => (
                          <span key={tag} className="text-[10px] bg-white px-2 py-0.5 rounded text-stone-700 border border-[#DED6D1] font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#DED6D1] flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">
                        {rateSymbol}{Math.round(rest.costPerPerson / currentRate)}/person
                      </span>
                      <button
                        onClick={() => alert(`Table reservation query sent for ${rest.name}.`)}
                        className="px-3 py-1 bg-[#384F40] text-[#FAEDCD] rounded-lg text-xs font-bold hover:bg-[#283618] transition-colors border border-[#CDD5AE]"
                      >
                        Reserve Table
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. ATTRACTIONS */}
      {activeTab === 'attractions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-[#1E2922] font-serif-accent flex items-center gap-2 border-b border-stone-100 pb-4">
              <Camera className="w-4 h-4 text-[#384F40]" />
              Top Attractions & Landmarks
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tripPlan.attractions.map((attr) => (
                <div
                  key={attr.id}
                  className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#DED6D1] flex flex-col sm:flex-row"
                >
                  <div className="sm:w-2/5 h-44 sm:h-auto relative">
                    <img src={attr.image} alt={attr.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="sm:w-3/5 p-4 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">{attr.name}</h4>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">{attr.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                      <span className="font-bold text-[#384F40]">
                        {attr.entryFee === 0 ? 'Free Entry' : `${rateSymbol}${Math.round(attr.entryFee / currentRate)}`}
                      </span>
                      <button
                        onClick={() => alert(`Added ${attr.name} to itinerary!`)}
                        className="px-2.5 py-1 bg-white border border-[#DED6D1] text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-100"
                      >
                        Add to Day
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. ACTIVITIES */}
      {activeTab === 'activities' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-[#1E2922] font-serif-accent flex items-center gap-2 border-b border-stone-100 pb-4">
              <Sparkles className="w-4 h-4 text-[#384F40]" />
              Outdoor & Cultural Activities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {tripPlan.activities.map((act) => (
                <div
                  key={act.id}
                  className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#DED6D1] flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#384F40]">{act.category}</span>
                    <h4 className="font-bold text-sm text-stone-900">{act.title}</h4>
                    <p className="text-xs text-stone-500">Duration: {act.duration} • Difficulty: {act.difficulty}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                    <span className="font-bold text-sm text-stone-900">
                      {rateSymbol}{Math.round(act.price / currentRate).toLocaleString()}
                    </span>
                    <button
                      onClick={() => alert(`Activity pass booked for ${act.title}.`)}
                      className="px-3 py-1.5 bg-[#384F40] text-[#FAEDCD] rounded-lg text-xs font-bold hover:bg-[#283618] transition-colors border border-[#CDD5AE]"
                    >
                      Book Pass
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. BUDGET */}
      {activeTab === 'budget' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1E2922] font-serif-accent flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#384F40]" />
                  Complete Budget Calculator & Optimizer
                </h3>
              </div>

              <button
                onClick={onOpenBudgetOptimizer}
                className="px-4 py-2 rounded-xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] font-bold text-xs flex items-center gap-1.5 shadow-xs border border-[#CDD5AE]"
              >
                <Zap className="w-3.5 h-3.5 text-[#E9EDCA]" />
                Analyze & Optimize Budget
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#DED6D1]">
                <span className="text-xs font-bold text-stone-400 uppercase">Target Budget</span>
                <p className="text-2xl font-black text-stone-900 mt-0.5">
                  {rateSymbol}{Math.round(userBudget / currentRate).toLocaleString()}
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#DED6D1]">
                <span className="text-xs font-bold text-stone-400 uppercase">Estimated Total Cost</span>
                <p className="text-2xl font-black text-[#384F40] mt-0.5">
                  {rateSymbol}{Math.round(estimatedCost / currentRate).toLocaleString()}
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${budgetDelta >= 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                <span className="text-xs font-bold uppercase">{budgetDelta >= 0 ? 'Remaining Budget' : 'Exceeded By'}</span>
                <p className="text-2xl font-black mt-0.5">
                  {rateSymbol}{Math.round(Math.abs(budgetDelta) / currentRate).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="border border-[#DED6D1] rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#384F40] text-[#FAEDCD]">
                  <tr>
                    <th className="p-3">Category</th>
                    <th className="p-3">Details</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="p-3 font-bold text-stone-900">Transportation</td>
                    <td className="p-3 text-stone-500">Transit ({totalTravellers} Travellers)</td>
                    <td className="p-3 text-right font-bold text-stone-900">{rateSymbol}{Math.round(tripPlan.budget.transportation / currentRate).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-900">Hostels & Hotels</td>
                    <td className="p-3 text-stone-500">{tripPlan.durationDays - 1} Nights Total</td>
                    <td className="p-3 text-right font-bold text-stone-900">{rateSymbol}{Math.round(tripPlan.budget.accommodation / currentRate).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-900">Food & Dining</td>
                    <td className="p-3 text-stone-500">Meals for {tripPlan.durationDays} Days</td>
                    <td className="p-3 text-right font-bold text-stone-900">{rateSymbol}{Math.round(tripPlan.budget.food / currentRate).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-900">Local Transport</td>
                    <td className="p-3 text-stone-500">Autos, bikes & taxis</td>
                    <td className="p-3 text-right font-bold text-stone-900">{rateSymbol}{Math.round(tripPlan.budget.localTransport / currentRate).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-900">Activities & Entry Fees</td>
                    <td className="p-3 text-stone-500">Guided tours & tickets</td>
                    <td className="p-3 text-right font-bold text-stone-900">{rateSymbol}{Math.round(tripPlan.budget.activities / currentRate).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-900">Shopping & Souvenirs</td>
                    <td className="p-3 text-stone-500">Handicrafts & markets</td>
                    <td className="p-3 text-right font-bold text-stone-900">{rateSymbol}{Math.round(tripPlan.budget.shopping / currentRate).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-900">Emergency Reserve</td>
                    <td className="p-3 text-stone-500">Contingency buffer</td>
                    <td className="p-3 text-right font-bold text-stone-900">{rateSymbol}{Math.round(tripPlan.budget.emergencyReserve / currentRate).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 9. RADAR */}
      {activeTab === 'radar' && (
        <FlightTrackerLive
          flightData={tripPlan.flightTracking}
          reservations={tripPlan.reservations}
          currency={currency}
        />
      )}

      {/* 10. MAP */}
      {activeTab === 'map' && (
        <InteractiveMap
          destination={tripPlan.destination}
          startingLocation={tripPlan.startingLocation}
          markers={mapMarkers}
        />
      )}

      {/* 11. WEATHER */}
      {activeTab === 'weather' && (
        <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-[#1E2922] font-serif-accent flex items-center gap-2 border-b border-stone-100 pb-4">
            <CloudSun className="w-4 h-4 text-[#384F40]" />
            Weather Intelligence: {tripPlan.destination}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#384F40] p-5 rounded-2xl text-[#FAEDCD] md:col-span-1 border border-[#CDD5AE]">
              <span className="text-xs text-[#E9EDCA] font-bold uppercase">Current</span>
              <div className="text-3xl font-black mt-1 text-[#FAEDCD]">{tripPlan.weather.currentTemp}°C</div>
              <p className="text-xs text-[#E9EDCA] mt-0.5">{tripPlan.weather.condition}</p>
            </div>

            <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {tripPlan.weather.forecast.map((day, idx) => (
                <div key={idx} className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DED6D1] text-center space-y-1">
                  <span className="text-xs font-bold text-stone-800">{day.day}</span>
                  <CloudSun className="w-5 h-5 text-[#384F40] mx-auto" />
                  <p className="font-bold text-xs text-stone-900">{day.tempMax}° / {day.tempMin}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 12. SAFETY */}
      {activeTab === 'safety' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 space-y-4">
            <h3 className="font-bold text-base text-[#1E2922] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#384F40]" />
              Visa & Documents
            </h3>
            <p className="text-xs text-stone-600">Type: <strong className="text-stone-900">{tripPlan.visaAndDocs.visaType}</strong></p>
            <div className="space-y-1 text-xs text-stone-600">
              {tripPlan.visaAndDocs.requirements.map((req, i) => (
                <p key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {req}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xs border border-red-200 p-6 space-y-4">
            <h3 className="font-bold text-base text-red-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Emergency Hotlines
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-red-50 p-2.5 rounded-xl border border-red-200">
                <span className="text-stone-500">Police</span>
                <p className="font-black text-red-800 text-base">{tripPlan.emergency.police}</p>
              </div>
              <div className="bg-red-50 p-2.5 rounded-xl border border-red-200">
                <span className="text-stone-500">Ambulance</span>
                <p className="font-black text-red-800 text-base">{tripPlan.emergency.ambulance}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 13. CULTURE */}
      {activeTab === 'culture' && (
        <div className="bg-white rounded-3xl shadow-xs border border-[#DED6D1] p-6 space-y-4">
          <h3 className="font-bold text-base text-[#1E2922] flex items-center gap-2 border-b border-stone-100 pb-3">
            <Languages className="w-4 h-4 text-[#384F40]" />
            Local Language & Etiquette
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {tripPlan.culture.phrases.map((phrase, idx) => (
                <div key={idx} className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#DED6D1] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-stone-900">{phrase.original}</span>
                    <span className="text-stone-400 block text-[10px]">{phrase.phonetic}</span>
                  </div>
                  <span className="text-stone-600">{phrase.meaning}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#DED6D1] text-xs space-y-1.5 text-stone-700">
              <p><strong>Tipping:</strong> {tripPlan.culture.tippingCustoms}</p>
              <p><strong>Dress Code:</strong> {tripPlan.culture.dressCode}</p>
              <p><strong>Bargaining:</strong> {tripPlan.culture.bargainingTips}</p>
            </div>
          </div>
        </div>
      )}

      {/* 14. CHECKLIST */}
      {activeTab === 'checklist' && (
        <TravelChecklist initialItems={tripPlan.checklist} />
      )}

    </div>
  );
};
