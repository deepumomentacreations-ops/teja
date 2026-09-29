import React, { useState } from 'react';
import {
  Globe,
  Search,
  MapPin,
  Calendar,
  Star,
  Sparkles,
  ArrowRight,
  Filter,
  Building,
  Utensils,
  ShieldCheck,
  Plane,
  Coffee,
  Bed,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  Tag,
  DollarSign,
  Car,
  Navigation,
  Compass,
  Bike
} from 'lucide-react';
import {
  POPULAR_DESTINATIONS,
  GLOBAL_COUNTRIES,
  GLOBAL_HOSTELS_DIRECTORY,
  GLOBAL_RESTAURANTS_DIRECTORY,
  CURRENCY_RATES,
  GlobalCountryGuide,
  VerifiedHostelItem,
  VerifiedRestaurantItem
} from '../data/destinationsData';
import {
  FAMOUS_INDIAN_PLACES_250,
  FAMOUS_WORLD_PLACES_250,
  INDIAN_LOCAL_TRANSPORTS,
  GLOBAL_LOCAL_TRANSPORTS,
  DetailedPlace,
  LocalTransportMode
} from '../data/megaPlacesData';
import { CurrencyCode } from '../types/travel';

interface ExploreDestinationsPageProps {
  onSelectDestination: (destName: string) => void;
  currency: CurrencyCode;
}

export const ExploreDestinationsPage: React.FC<ExploreDestinationsPageProps> = ({
  onSelectDestination,
  currency
}) => {
  const [activeTab, setActiveTab] = useState<'india-places' | 'world-places' | 'local-transport' | 'countries' | 'hostels' | 'restaurants'>('india-places');
  const [searchQuery, setSearchQuery] = useState('');
  const [placeCategoryFilter, setPlaceCategoryFilter] = useState<string>('All');
  const [stateCountryFilter, setStateCountryFilter] = useState<string>('All');
  const [selectedCountryModal, setSelectedCountryModal] = useState<GlobalCountryGuide | null>(null);

  const rateSymbol = CURRENCY_RATES[currency]?.symbol || '₹';
  const currentRate = CURRENCY_RATES[currency]?.rateToINR || 1;

  const placeCategories = ['All', 'Beach', 'Mountain & Hill', 'Heritage & Fort', 'Temple & Spiritual', 'Wildlife & Nature', 'Waterfall & Lake', 'City & Culture', 'Adventure & Island'];

  // 250+ Indian Places Filter
  const indianStatesList = Array.from(new Set(FAMOUS_INDIAN_PLACES_250.map((p) => p.stateOrCountry))).sort();
  const filteredIndiaPlaces = FAMOUS_INDIAN_PLACES_250.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stateOrCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.highlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.localTransportAvailable.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = placeCategoryFilter === 'All' || p.category === placeCategoryFilter;
    const matchesState = stateCountryFilter === 'All' || p.stateOrCountry === stateCountryFilter;
    return matchesSearch && matchesCat && matchesState;
  });

  // 250+ World Places Filter
  const worldCountriesList = Array.from(new Set(FAMOUS_WORLD_PLACES_250.map((p) => p.stateOrCountry.split('(')[0].trim()))).sort();
  const filteredWorldPlaces = FAMOUS_WORLD_PLACES_250.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stateOrCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.highlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.localTransportAvailable.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = placeCategoryFilter === 'All' || p.category === placeCategoryFilter;
    const matchesCountry = stateCountryFilter === 'All' || p.stateOrCountry.toLowerCase().includes(stateCountryFilter.toLowerCase());
    return matchesSearch && matchesCat && matchesCountry;
  });

  // Filtered Countries
  const filteredCountries = GLOBAL_COUNTRIES.filter((c) => {
    const matchesSearch =
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.popularDestinations.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.mustTryFood.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Filtered Hostels
  const filteredHostels = GLOBAL_HOSTELS_DIRECTORY.filter((hostel) => {
    return (
      hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.amenities.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Filtered Restaurants
  const filteredRestaurants = GLOBAL_RESTAURANTS_DIRECTORY.filter((rest) => {
    return (
      rest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.cuisine.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      rest.mustTryDishes.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-8">
      {/* Header Banner - A4C3B2 / FAEDCD / E9EDCA / CDD5AE Palette */}
      <div className="bg-gradient-to-br from-[#FAEDCD] via-[#E9EDCA] to-[#CDD5AE] p-8 sm:p-12 rounded-3xl text-stone-900 shadow-md relative overflow-hidden border-2 border-[#CDD5AE]">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-[#283618] text-xs font-black border-2 border-[#A4C3B2] shadow-2xs">
            <Globe className="w-4 h-4 text-[#384F40]" />
            250+ Places Across India & Around The World • Within-Destination Transport
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif-accent text-[#1E2922]">
            Explore Famous Places & Local Transports
          </h1>
          <p className="text-[#283618]/85 text-xs sm:text-sm max-w-2xl leading-relaxed font-semibold">
            Discover 250+ iconic destinations across every Indian State and global countries, alongside local transit options like Auto-Rickshaws, Scooty Rentals, Royal Enfield Bikes, App Cabs, Metro, and Ferries.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="mt-6 max-w-2xl relative z-10">
          <div className="relative flex items-center bg-white rounded-2xl shadow-sm p-1.5 border-2 border-[#A4C3B2] focus-within:border-[#384F40] focus-within:ring-2 focus-within:ring-[#A4C3B2]/40 transition-all">
            <Search className="w-4 h-4 text-[#384F40] ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 250+ places, Auto, Scooty, Goa, Kashmir, Paris, Tokyo, Taj Mahal, Zostel..."
              className="w-full px-3 py-2 text-xs sm:text-sm text-stone-900 font-bold focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-stone-500 mr-2 hover:text-stone-700 font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Explorer Navigation Tabs */}
      <div className="bg-white p-3.5 rounded-3xl shadow-sm border-2 border-[#CDD5AE] flex flex-col gap-3">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
          <button
            onClick={() => { setActiveTab('india-places'); setStateCountryFilter('All'); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
              activeTab === 'india-places'
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                : 'bg-[#FAEDCD]/60 text-[#1E2922] hover:bg-[#FAEDCD] border border-[#CDD5AE]'
            }`}
          >
            <span>🇮🇳</span>
            India Famous Places ({FAMOUS_INDIAN_PLACES_250.length}+)
          </button>

          <button
            onClick={() => { setActiveTab('world-places'); setStateCountryFilter('All'); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
              activeTab === 'world-places'
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                : 'bg-[#E9EDCA]/60 text-[#1E2922] hover:bg-[#E9EDCA] border border-[#CDD5AE]'
            }`}
          >
            <span>🌍</span>
            World Famous Places ({FAMOUS_WORLD_PLACES_250.length}+)
          </button>

          <button
            onClick={() => setActiveTab('local-transport')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
              activeTab === 'local-transport'
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                : 'bg-[#CDD5AE]/60 text-[#1E2922] hover:bg-[#CDD5AE] border border-[#CDD5AE]'
            }`}
          >
            <span>🛺</span>
            Local Transport & Rentals (Auto, Scooty, Cab, Metro)
          </button>

          <button
            onClick={() => setActiveTab('countries')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
              activeTab === 'countries'
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                : 'bg-[#FAEDCD]/60 text-[#1E2922] hover:bg-[#FAEDCD] border border-[#CDD5AE]'
            }`}
          >
            <Globe className="w-4 h-4" />
            Country Guides ({GLOBAL_COUNTRIES.length})
          </button>

          <button
            onClick={() => setActiveTab('hostels')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
              activeTab === 'hostels'
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                : 'bg-[#E9EDCA]/60 text-[#1E2922] hover:bg-[#E9EDCA] border border-[#CDD5AE]'
            }`}
          >
            <Bed className="w-4 h-4" />
            Hostels ({GLOBAL_HOSTELS_DIRECTORY.length})
          </button>

          <button
            onClick={() => setActiveTab('restaurants')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
              activeTab === 'restaurants'
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                : 'bg-[#CDD5AE]/60 text-[#1E2922] hover:bg-[#CDD5AE] border border-[#CDD5AE]'
            }`}
          >
            <Utensils className="w-4 h-4" />
            Restaurants ({GLOBAL_RESTAURANTS_DIRECTORY.length})
          </button>
        </div>

        {/* Category & State/Country Filter Bar for Places */}
        {(activeTab === 'india-places' || activeTab === 'world-places') && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#DED6D1]">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {placeCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPlaceCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    placeCategoryFilter === cat
                      ? 'bg-[#384F40] text-[#FAEDCD]'
                      : 'text-stone-700 hover:bg-[#E9EDCA] bg-stone-50 border border-[#DED6D1]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* State or Country Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-stone-500 font-medium">Filter Location:</span>
              <select
                value={stateCountryFilter}
                onChange={(e) => setStateCountryFilter(e.target.value)}
                className="bg-[#FAEDCD]/40 text-stone-800 text-xs font-bold py-1 px-2.5 rounded-lg border border-[#CDD5AE] focus:outline-none"
              >
                <option value="All">All States / Nations</option>
                {activeTab === 'india-places'
                  ? indianStatesList.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))
                  : worldCountriesList.map((cnt) => (
                      <option key={cnt} value={cnt}>
                        {cnt}
                      </option>
                    ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 1. INDIA FAMOUS PLACES GRID */}
      {activeTab === 'india-places' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-700">
              Showing {filteredIndiaPlaces.length} Iconic Places Across India
            </h3>
            <span className="text-xs text-[#283618] font-bold bg-[#E9EDCA] px-2.5 py-1 rounded-lg border border-[#CDD5AE]">
              All Indian States & UTs Included
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndiaPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#DED6D1] flex flex-col justify-between group hover:shadow-md hover:border-[#A4C3B2] transition-all"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-[#1E2922] text-[11px] font-bold shadow-xs">
                      {place.stateOrCountry}
                    </span>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-xs">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {place.rating}
                    </span>

                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#384F40]/90 text-[#FAEDCD] text-[10px] font-bold">
                      {place.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="text-base font-bold text-stone-900 group-hover:text-[#384F40] transition-colors line-clamp-1">
                        {place.name}
                      </h4>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#384F40]" />
                        {place.stateOrCountry}, India
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {place.highlight}
                    </p>

                    {/* Local Transport Available at this Destination */}
                    <div className="space-y-1.5 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#DED6D1]">
                      <span className="text-[10px] uppercase font-bold text-stone-500 flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-[#384F40]" />
                        Local Transport Inside Destination:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {place.localTransportAvailable.map((trans) => (
                          <span
                            key={trans}
                            className="text-[10px] bg-white text-stone-800 px-2 py-0.5 rounded-md font-semibold border border-[#DED6D1]"
                          >
                            {trans.includes('Scooty') ? '🛵 ' : trans.includes('Auto') ? '🛺 ' : trans.includes('Bike') ? '🏍️ ' : trans.includes('Boat') || trans.includes('Ferry') || trans.includes('Shikara') ? '⛴️ ' : trans.includes('Train') || trans.includes('Metro') ? '🚇 ' : '🚕 '}
                            {trans}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                      <span>Best Time: <strong className="text-stone-800">{place.bestTimeToVisit}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border-t border-[#DED6D1] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Est. Daily Spend</span>
                    <p className="text-sm font-bold text-stone-900">
                      ~{rateSymbol}{Math.round(place.avgDailyCostINR / currentRate).toLocaleString()}<span className="text-xs text-stone-400 font-normal">/day</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectDestination(place.name.split('&')[0].split('(')[0].trim())}
                    className="px-4 py-2 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border border-[#CDD5AE]/40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#A4C3B2]" />
                    Plan AI Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. WORLD FAMOUS PLACES GRID */}
      {activeTab === 'world-places' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-700">
              Showing {filteredWorldPlaces.length} Iconic Places Worldwide
            </h3>
            <span className="text-xs text-[#283618] font-bold bg-[#E9EDCA] px-2.5 py-1 rounded-lg border border-[#CDD5AE]">
              Europe, Asia, Americas, Middle East & Oceania
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorldPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#DED6D1] flex flex-col justify-between group hover:shadow-md hover:border-[#A4C3B2] transition-all"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-[#1E2922] text-[11px] font-bold shadow-xs">
                      {place.stateOrCountry}
                    </span>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-xs">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {place.rating}
                    </span>

                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#384F40]/90 text-[#FAEDCD] text-[10px] font-bold">
                      {place.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="text-base font-bold text-stone-900 group-hover:text-[#384F40] transition-colors line-clamp-1">
                        {place.name}
                      </h4>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#384F40]" />
                        {place.stateOrCountry}
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {place.highlight}
                    </p>

                    {/* Local Transport Available at this Destination */}
                    <div className="space-y-1.5 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#DED6D1]">
                      <span className="text-[10px] uppercase font-bold text-stone-500 flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-[#384F40]" />
                        Local Transit Available:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {place.localTransportAvailable.map((trans) => (
                          <span
                            key={trans}
                            className="text-[10px] bg-white text-stone-800 px-2 py-0.5 rounded-md font-semibold border border-[#DED6D1]"
                          >
                            {trans.includes('Metro') || trans.includes('Subway') || trans.includes('Train') || trans.includes('Tram') ? '🚇 ' : trans.includes('Scooter') || trans.includes('Scooty') ? '🛵 ' : trans.includes('Boat') || trans.includes('Ferry') || trans.includes('Gondola') ? '🚤 ' : trans.includes('Bike') ? '🚲 ' : '🚕 '}
                            {trans}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                      <span>Best Season: <strong className="text-stone-800">{place.bestTimeToVisit}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border-t border-[#DED6D1] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Est. Daily Spend</span>
                    <p className="text-sm font-bold text-stone-900">
                      ~{rateSymbol}{Math.round(place.avgDailyCostINR / currentRate).toLocaleString()}<span className="text-xs text-stone-400 font-normal">/day</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectDestination(place.name.split('&')[0].split('(')[0].trim())}
                    className="px-4 py-2 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border border-[#CDD5AE]/40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#A4C3B2]" />
                    Plan AI Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. WITHIN-DESTINATION LOCAL TRANSPORT ADVISOR */}
      {activeTab === 'local-transport' && (
        <div className="space-y-8">
          {/* India Local Transport Section */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-[#384F40] to-[#283618] text-white p-6 rounded-3xl space-y-2 border border-[#CDD5AE]/30">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛺</span>
                <h3 className="text-xl font-bold font-serif-accent text-[#FAEDCD]">
                  Local Transportation Within Indian Destinations
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 max-w-3xl leading-relaxed">
                When you land at the airport, railway station, or main bus terminal in any Indian city or state, you have several affordable and flexible modes of local commuting available right at the destination exit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {INDIAN_LOCAL_TRANSPORTS.map((trans) => (
                <div
                  key={trans.id}
                  className="bg-white rounded-3xl p-5 shadow-xs border border-[#DED6D1] flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#A4C3B2] transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{trans.icon}</span>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">{trans.mode}</h4>
                          <span className="text-[10px] font-bold uppercase text-[#283618] bg-[#FAEDCD] px-2 py-0.5 rounded border border-[#CDD5AE]">
                            {trans.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {trans.description}
                    </p>

                    <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#DED6D1] space-y-1.5 text-xs">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold">Typical Fare</span>
                        <p className="font-bold text-stone-900">{trans.typicalCost}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold">Best For</span>
                        <p className="text-stone-700 font-medium">{trans.bestFor}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold">Where Available</span>
                        <p className="text-stone-700">{trans.availability}</p>
                      </div>
                    </div>

                    {trans.helmetLicenseReq && (
                      <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-900 font-medium flex items-center gap-1.5">
                        <span>⚠️</span>
                        <span>{trans.helmetLicenseReq}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#E9EDCA]/40 border border-[#CDD5AE] p-2.5 rounded-xl text-[11px] text-stone-700">
                    <span className="font-bold text-[#384F40]">Pro Tip: </span>
                    <span>{trans.bookingTip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Destination Local Transport Section */}
          <div className="space-y-4 pt-4 border-t border-[#DED6D1]">
            <div className="bg-gradient-to-r from-[#283618] to-[#1E2922] text-white p-6 rounded-3xl space-y-2 border border-[#CDD5AE]/30">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                <h3 className="text-xl font-bold font-serif-accent text-[#FAEDCD]">
                  Local Transportation in Global Destinations
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
                Smart local commuting options when traveling internationally: Subways, island scooter rentals, tuk-tuks, ride-hailing apps, and dockless e-scooters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {GLOBAL_LOCAL_TRANSPORTS.map((trans) => (
                <div
                  key={trans.id}
                  className="bg-white rounded-3xl p-5 shadow-xs border border-[#DED6D1] flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#A4C3B2] transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{trans.icon}</span>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900">{trans.mode}</h4>
                          <span className="text-[10px] font-bold uppercase text-[#283618] bg-[#FAEDCD] px-2 py-0.5 rounded border border-[#CDD5AE]">
                            {trans.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {trans.description}
                    </p>

                    <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#DED6D1] space-y-1.5 text-xs">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold">Typical Fare</span>
                        <p className="font-bold text-stone-900">{trans.typicalCost}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold">Best For</span>
                        <p className="text-stone-700 font-medium">{trans.bestFor}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold">Availability</span>
                        <p className="text-stone-700">{trans.availability}</p>
                      </div>
                    </div>

                    {trans.helmetLicenseReq && (
                      <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-900 font-medium flex items-center gap-1.5">
                        <span>⚠️</span>
                        <span>{trans.helmetLicenseReq}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#E9EDCA]/40 border border-[#CDD5AE] p-2.5 rounded-xl text-[11px] text-stone-700">
                    <span className="font-bold text-[#384F40]">Pro Tip: </span>
                    <span>{trans.bookingTip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. COUNTRIES TAB */}
      {activeTab === 'countries' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((c) => (
              <div
                key={c.country}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#DED6D1] flex flex-col justify-between group hover:shadow-md hover:border-[#A4C3B2] transition-all"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={c.highlightImage}
                      alt={c.country}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/95 text-[#1E2922] text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <span className="text-base">{c.flag}</span>
                      <span>{c.country}</span>
                    </span>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px] font-bold backdrop-blur-xs">
                      {c.region}
                    </span>
                  </div>

                  <div className="p-5 space-y-3.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-stone-900 font-serif-accent">
                          {c.country}
                        </h3>
                        <span className="text-xs text-stone-500 font-medium">Cap: {c.capital}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                    {/* Popular Destinations */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Top Destinations</span>
                      <div className="flex flex-wrap gap-1">
                        {c.popularDestinations.slice(0, 4).map((d) => (
                          <button
                            key={d}
                            onClick={() => onSelectDestination(d.split('(')[0].trim())}
                            className="text-[10px] bg-[#FAF8F5] hover:bg-[#384F40] hover:text-[#FAEDCD] px-2 py-0.5 rounded-md font-medium text-stone-700 transition-colors border border-[#DED6D1]"
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Visa Summary */}
                    <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#DED6D1] text-[11px] text-stone-700 flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{c.visaInfo}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border-t border-[#DED6D1] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Est. Daily Budget</span>
                    <p className="text-sm font-bold text-stone-900">
                      ~{rateSymbol}{Math.round(c.avgDailyBudgetINR / currentRate).toLocaleString()}<span className="text-xs text-stone-400 font-normal">/day</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCountryModal(c)}
                      className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-bold border border-[#DED6D1] transition-all"
                    >
                      Guide
                    </button>
                    <button
                      onClick={() => onSelectDestination(c.popularDestinations[0].split('(')[0].trim())}
                      className="px-3.5 py-1.5 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-xs border border-[#CDD5AE]/40"
                    >
                      <Sparkles className="w-3 h-3 text-[#A4C3B2]" />
                      Plan Trip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. HOSTELS & STAYS DIRECTORY TAB */}
      {activeTab === 'hostels' && (
        <div className="space-y-6">
          <div className="bg-[#FAEDCD]/60 border border-[#CDD5AE] p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#CDD5AE] text-[#283618] flex items-center justify-center shrink-0 font-bold">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">Backpacker Hostels & Boutique Stays Directory</h4>
                <p className="text-[11px] text-stone-600">
                  Compare dorm bunks, private ensuite rooms, co-working facilities, and social community events around the globe.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-white text-stone-800 rounded-lg text-xs font-bold border border-[#CDD5AE] shrink-0">
              {filteredHostels.length} Verified Properties
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHostels.map((h) => (
              <div
                key={h.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#DED6D1] flex flex-col justify-between group hover:shadow-md hover:border-[#A4C3B2] transition-all"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={h.image}
                      alt={h.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-[#1E2922] text-[11px] font-bold shadow-xs">
                      {h.type}
                    </span>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-xs">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {h.rating} ({h.reviewsCount})
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">{h.name}</h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#384F40]" />
                        {h.city}, {h.country}
                      </p>
                    </div>

                    <p className="text-xs font-semibold text-[#283618] bg-[#FAEDCD]/70 px-2.5 py-1 rounded-lg border border-[#CDD5AE]">
                      ✨ {h.vibe}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {h.amenities.slice(0, 4).map((amenity) => (
                        <span
                          key={amenity}
                          className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border-t border-[#DED6D1] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Dorm Bed from</span>
                    <p className="text-sm font-bold text-stone-900">
                      {rateSymbol}{Math.round(h.dormPriceINR / currentRate).toLocaleString()}<span className="text-xs text-stone-400 font-normal">/night</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectDestination(h.city)}
                    className="px-3.5 py-1.5 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
                  >
                    Plan Trip Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. RESTAURANTS & FOOD DIRECTORY TAB */}
      {activeTab === 'restaurants' && (
        <div className="space-y-6">
          <div className="bg-[#E9EDCA]/60 border border-[#CDD5AE] p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#CDD5AE] text-[#283618] flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">Global Restaurant & Street Food Guide</h4>
                <p className="text-[11px] text-stone-600">
                  Curated authentic local bistros, night markets, Michelin-star street food, cozy cafes, and royal dhabas.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-white text-stone-800 rounded-lg text-xs font-bold border border-[#CDD5AE] shrink-0">
              {filteredRestaurants.length} Places
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#DED6D1] flex flex-col justify-between group hover:shadow-md hover:border-[#A4C3B2] transition-all"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-[#1E2922] text-[11px] font-bold shadow-xs">
                      {r.type} • {r.priceTier}
                    </span>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-xs">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {r.rating} ({r.reviewsCount})
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">{r.name}</h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#384F40]" />
                        {r.city}, {r.country}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {r.dietary.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-1 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#DED6D1]">
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Must-Try Specialties</span>
                      <p className="text-xs text-stone-800 font-semibold leading-relaxed">
                        {r.mustTryDishes.slice(0, 3).join(' • ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border-t border-[#DED6D1] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Avg. Cost / Person</span>
                    <p className="text-sm font-bold text-stone-900">
                      ~{rateSymbol}{Math.round(r.avgCostPerPersonINR / currentRate).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectDestination(r.city)}
                    className="px-3.5 py-1.5 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
                  >
                    Plan Food Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Country Guidebook Detail Modal */}
      {selectedCountryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#DED6D1] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DED6D1] pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCountryModal.flag}</span>
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 font-serif-accent">
                    {selectedCountryModal.country}
                  </h2>
                  <p className="text-xs text-stone-500">Capital: {selectedCountryModal.capital} • Region: {selectedCountryModal.region}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCountryModal(null)}
                className="p-2 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-56 rounded-2xl overflow-hidden">
              <img
                src={selectedCountryModal.highlightImage}
                alt={selectedCountryModal.country}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {selectedCountryModal.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#DED6D1] text-xs">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold">Best Months</span>
                <p className="font-semibold text-stone-800">{selectedCountryModal.bestMonths}</p>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold">Currency</span>
                <p className="font-semibold text-stone-800">{selectedCountryModal.currency}</p>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold">Language</span>
                <p className="font-semibold text-stone-800 truncate">{selectedCountryModal.language}</p>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold">Avg Daily Cost</span>
                <p className="font-bold text-[#384F40]">~{rateSymbol}{Math.round(selectedCountryModal.avgDailyBudgetINR / currentRate).toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-[#E9EDCA]/40 border border-[#CDD5AE] p-4 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-[#283618] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Visa Guidelines & Processing
              </span>
              <p className="text-stone-800 leading-relaxed">{selectedCountryModal.visaInfo}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DED6D1]">
              <button
                onClick={() => setSelectedCountryModal(null)}
                className="px-4 py-2 bg-stone-100 text-stone-700 rounded-xl text-xs font-bold hover:bg-stone-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const mainCity = selectedCountryModal.popularDestinations[0].split('(')[0].trim();
                  setSelectedCountryModal(null);
                  onSelectDestination(mainCity);
                }}
                className="px-5 py-2.5 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm border border-[#CDD5AE]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A4C3B2]" />
                Plan AI Trip to {selectedCountryModal.country}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
