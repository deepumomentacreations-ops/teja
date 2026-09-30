import React, { useState } from 'react';
import {
  Globe,
  Search,
  MapPin,
  Utensils,
  Camera,
  Wallet,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  ChevronRight,
  Coffee,
  CheckCircle2,
  ExternalLink,
  Layers,
  Compass,
  Info
} from 'lucide-react';
import { UN_COUNTRIES_193_DATABASE, UN_193_CONTINENT_DIRECTORY, UNCountryMaster, CityDestinationDetail } from '../data/unCountriesMasterData';
import { CurrencyCode } from '../types/travel';
import { CURRENCY_RATES } from '../data/destinationsData';

interface UN193CountryExplorerProps {
  onPlanDestination: (destName: string) => void;
  currency: CurrencyCode;
}

export const UN193CountryExplorer: React.FC<UN193CountryExplorerProps> = ({
  onPlanDestination,
  currency
}) => {
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCountry, setActiveCountry] = useState<UNCountryMaster>(
    UN_COUNTRIES_193_DATABASE.find((c) => c.id === 'vietnam') || UN_COUNTRIES_193_DATABASE[0]
  );
  const [activeCityIndex, setActiveCityIndex] = useState<number>(0);

  const rateSymbol = CURRENCY_RATES[currency]?.symbol || '₹';
  const currentRate = CURRENCY_RATES[currency]?.rateToINR || 1;

  const continents = ['All', 'Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];

  // Flattened all countries from continent directory
  const all193CountryList = Object.entries(UN_193_CONTINENT_DIRECTORY).flatMap(([contName, data]) =>
    data.countries.map((c) => ({
      ...c,
      continent: contName
    }))
  );

  const filtered193List = all193CountryList.filter((c) => {
    const matchesContinent = selectedContinent === 'All' || c.continent === selectedContinent;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.foodSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keyHighlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.popularPlaces.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesContinent && matchesSearch;
  });

  const currentCityDetail: CityDestinationDetail | undefined =
    activeCountry?.destinations?.[activeCityIndex] || activeCountry?.destinations?.[0];

  const handleSelectCountryQuick = (countryName: string) => {
    const foundMaster = UN_COUNTRIES_193_DATABASE.find(
      (c) => c.name.toLowerCase() === countryName.toLowerCase() || c.id.toLowerCase() === countryName.toLowerCase()
    );

    if (foundMaster) {
      setActiveCountry(foundMaster);
      setActiveCityIndex(0);
    } else {
      // Find from continent list and build synthetic fallback
      const foundInCont = all193CountryList.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
      if (foundInCont) {
        const syntheticCountry: UNCountryMaster = {
          id: foundInCont.name.toLowerCase().replace(/\s+/g, '-'),
          name: foundInCont.name,
          continent: foundInCont.continent as any,
          flag: foundInCont.flag,
          capital: foundInCont.capital,
          currencyCode: foundInCont.currency,
          currencyName: foundInCont.currency,
          currencySymbol: foundInCont.currency,
          conversionRateToINR: 1.0,
          language: 'National & English',
          visaPolicy: 'Tourist E-Visa or Visa on Arrival (30–90 days).',
          bestMonths: 'Best travel seasons vary by region',
          dailyBudgetTiers: {
            budgetTraveler: Math.round(foundInCont.avgDailyBudgetINR * 0.7),
            midRange: foundInCont.avgDailyBudgetINR,
            premium: Math.round(foundInCont.avgDailyBudgetINR * 2.2)
          },
          heroImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
          overview: `${foundInCont.name} offers world-renowned travel attractions including ${foundInCont.keyHighlight}. Famous for ${foundInCont.foodSpecialty}.`,
          destinations: [
            {
              city: foundInCont.popularPlaces[0] || foundInCont.capital,
              famousPlaces: [
                {
                  name: `${foundInCont.keyHighlight.split(',')[0]} (Iconic Landmark)`,
                  entryFee: 'Standard entry pass',
                  bestTime: 'Morning 9:00 AM',
                  visitDuration: '2–3 Hours',
                  highlight: foundInCont.keyHighlight
                },
                {
                  name: `${foundInCont.capital} Historic Old Town & Central Plaza`,
                  entryFee: 'Free entry',
                  bestTime: 'Afternoon / Evening',
                  visitDuration: '2 Hours',
                  highlight: 'Cultural heart of the nation with architectural heritage and markets.'
                }
              ],
              famousFoods: foundInCont.foodSpecialty.split(',').map((f) => ({
                name: f.trim(),
                icon: '🍲',
                description: `Iconic regional delicacy of ${foundInCont.name} served fresh with authentic spices.`,
                approxCostINR: Math.round(foundInCont.avgDailyBudgetINR * 0.12),
                approxCostLocal: `${foundInCont.currency} ~${Math.round(foundInCont.avgDailyBudgetINR * 0.12)}`
              })),
              nearbyRestaurantTypes: [
                {
                  name: `Authentic ${foundInCont.name} Traditional Dining`,
                  cuisine: `Authentic ${foundInCont.name} Local Cuisine`,
                  rating: 4.8,
                  priceRange: '₹₹',
                  distance: 'City Center Plaza',
                  specialty: foundInCont.foodSpecialty.split(',')[0] || 'National Signature Plate'
                },
                {
                  name: `Old Town Street Food & Market Stalls`,
                  cuisine: 'Street Food & Snacks',
                  rating: 4.7,
                  priceRange: '₹',
                  distance: 'Historic Market Square',
                  specialty: 'Freshly prepared local savory bites and refreshing drinks'
                }
              ],
              foodBudgetPerDay: {
                budgetINR: `₹${Math.round(foundInCont.avgDailyBudgetINR * 0.25)}–₹${Math.round(foundInCont.avgDailyBudgetINR * 0.45)}/day`,
                midRangeINR: `₹${Math.round(foundInCont.avgDailyBudgetINR * 0.5)}–₹${Math.round(foundInCont.avgDailyBudgetINR * 0.85)}/day`,
                luxuryINR: `₹${Math.round(foundInCont.avgDailyBudgetINR * 1.2)}–₹${Math.round(foundInCont.avgDailyBudgetINR * 2.5)}/day`,
                summary: `Dining options in ${foundInCont.name} range from vibrant street vendors to exquisite fine dining.`
              },
              thingsToDo: [
                `Explore ${foundInCont.keyHighlight}`,
                `Sample authentic ${foundInCont.foodSpecialty}`,
                `Guided walking tour through historic ${foundInCont.capital}`,
                `Photography at scenic viewpoints`
              ],
              suggestedItineraryHighlights: [
                `Day 1: ${foundInCont.capital} City Tour, Cultural Museums & Local Dinner`,
                `Day 2: ${foundInCont.keyHighlight.split(',')[0]} and Scenic Excursion`
              ]
            }
          ]
        };
        setActiveCountry(syntheticCountry);
        setActiveCityIndex(0);
      }
    }

    // Scroll to active country panel smoothly
    const detailEl = document.getElementById('country-detail-panel');
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Top Banner with 5-Color System */}
      <div className="bg-gradient-to-br from-[#FAEDCD] via-[#E9EDCA] to-[#CDD5AE] p-8 sm:p-10 rounded-3xl text-[#1E2922] shadow-md border-2 border-[#CDD5AE] relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-[#283618] text-xs font-black border-2 border-[#A4C3B2] shadow-2xs">
            <Globe className="w-4 h-4 text-[#384F40]" />
            UN 193 Member States Master Directory • Complete Global Tourism Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif-accent text-[#1E2922] tracking-tight">
            Country & Destination Intelligence
          </h2>
          <p className="text-[#283618]/90 text-xs sm:text-sm font-semibold leading-relaxed">
            Select any country across 6 continents to view structured tourism intelligence: 
            <strong> Country → Famous Places → Nearby Restaurants → Famous Foods → Approx. Food Budget → Things to Do → Suggested Itinerary</strong>.
          </p>
        </div>

        {/* Global Search & Filter Bar */}
        <div className="mt-6 max-w-3xl relative z-10 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full flex items-center bg-white rounded-2xl shadow-sm p-1.5 border-2 border-[#A4C3B2] focus-within:border-[#384F40] focus-within:ring-2 focus-within:ring-[#A4C3B2]/40 transition-all">
            <Search className="w-4 h-4 text-[#384F40] ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 193 UN countries, capitals, Pho, Banh Mi, Sushi, Taj Mahal, Rome, Paris..."
              className="w-full px-3 py-2 text-xs sm:text-sm text-stone-900 font-bold focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-stone-500 mr-2 hover:text-stone-700 font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <span className="text-xs font-black text-[#283618] bg-white/90 px-3.5 py-2.5 rounded-2xl border-2 border-[#CDD5AE] whitespace-nowrap shadow-2xs">
            {filtered193List.length} Countries Available
          </span>
        </div>
      </div>

      {/* Continent Filter Selector */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border-2 border-[#CDD5AE] flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-black text-[#384F40] pl-2 flex items-center gap-1 shrink-0">
          <Compass className="w-3.5 h-3.5" />
          Continents:
        </span>
        {continents.map((cont) => (
          <button
            key={cont}
            onClick={() => setSelectedContinent(cont)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              selectedContinent === cont
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                : 'bg-[#FAEDCD]/40 text-[#1E2922] hover:bg-[#FAEDCD] border border-[#CDD5AE]'
            }`}
          >
            {cont === 'All' ? '🌐 All Continents (193)' : cont}
          </button>
        ))}
      </div>

      {/* Quick Interactive Country Carousel / Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-[#283618] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#384F40]" />
            Quick Select UN Countries ({filtered193List.length})
          </span>
          <span className="text-[11px] text-stone-500 font-bold">
            Click any country below to explore in-depth
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filtered193List.map((c) => {
            const isCurrent = activeCountry.name.toLowerCase() === c.name.toLowerCase();
            return (
              <button
                key={c.name}
                onClick={() => handleSelectCountryQuick(c.name)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 shrink-0 transition-all border-2 cursor-pointer shadow-2xs ${
                  isCurrent
                    ? 'bg-[#384F40] text-[#FAEDCD] border-[#283618] shadow-md scale-105'
                    : 'bg-white text-[#1E2922] hover:bg-[#FAEDCD]/70 border-[#CDD5AE]'
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span>{c.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${isCurrent ? 'bg-[#FAEDCD] text-[#283618]' : 'bg-[#E9EDCA] text-[#384F40]'}`}>
                  {c.capital}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* ACTIVE COUNTRY HIERARCHICAL DRILL-DOWN PANEL             */}
      {/* Country → Famous Places → Nearby Restaurants →           */}
      {/* Famous Foods → Approx Food Budget → Things To Do →       */}
      {/* Suggested Itinerary                                      */}
      {/* ======================================================== */}
      <div id="country-detail-panel" className="bg-white rounded-3xl shadow-md border-2 border-[#CDD5AE] overflow-hidden space-y-8">
        
        {/* Country Main Hero Header */}
        <div className="relative bg-gradient-to-r from-[#384F40] via-[#283618] to-[#384F40] text-white p-6 sm:p-10 border-b-2 border-[#CDD5AE]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-4xl">{activeCountry.flag}</span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-4xl font-black font-serif-accent text-[#FAEDCD]">
                      {activeCountry.name}
                    </h1>
                    <span className="px-3 py-0.5 rounded-lg bg-[#FAEDCD] text-[#283618] text-xs font-black border border-[#CDD5AE]">
                      {activeCountry.continent}
                    </span>
                  </div>
                  <p className="text-xs text-[#E9EDCA] font-semibold mt-0.5">
                    Capital: <strong>{activeCountry.capital}</strong> • Official Currency: <strong>{activeCountry.currencyName} ({activeCountry.currencyCode})</strong> • Best Months: <strong>{activeCountry.bestMonths}</strong>
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-200 max-w-3xl leading-relaxed">
                {activeCountry.overview}
              </p>

              {/* Visa & Practical Info Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-[#FAEDCD] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#A4C3B2]" />
                <span>Visa Policy: {activeCountry.visaPolicy}</span>
              </div>
            </div>

            {/* Country Daily Budget Tiers Summary */}
            <div className="bg-[#FAF8F5]/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-[#A4C3B2]/40 text-left space-y-2 shrink-0">
              <span className="text-[11px] font-black uppercase text-[#FAEDCD] flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-[#A4C3B2]" />
                Daily Travel Budget Tiers / Person
              </span>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-stone-300">🎒 Budget Traveler:</span>
                  <span className="font-black text-[#FAEDCD]">
                    ~{rateSymbol}{Math.round(activeCountry.dailyBudgetTiers.budgetTraveler / currentRate).toLocaleString()}/day
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-stone-300">🏨 Mid-Range:</span>
                  <span className="font-black text-[#FAEDCD]">
                    ~{rateSymbol}{Math.round(activeCountry.dailyBudgetTiers.midRange / currentRate).toLocaleString()}/day
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-stone-300">✨ Premium:</span>
                  <span className="font-black text-[#FAEDCD]">
                    ~{rateSymbol}{Math.round(activeCountry.dailyBudgetTiers.premium / currentRate).toLocaleString()}/day
                  </span>
                </div>
              </div>

              <button
                onClick={() => onPlanDestination(currentCityDetail?.city || activeCountry.capital || activeCountry.name)}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-[#FAEDCD] hover:bg-white text-[#283618] text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs border border-[#CDD5AE] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#384F40]" />
                Plan Full Trip with AI
              </button>
            </div>
          </div>
        </div>

        {/* City Sub-Tabs within Country */}
        {activeCountry.destinations && activeCountry.destinations.length > 1 && (
          <div className="px-6 sm:px-10">
            <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-[#F8F6F0] rounded-2xl border-2 border-[#CDD5AE]">
              <span className="text-xs font-black text-[#384F40] pl-2 shrink-0 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Select City Hub:
              </span>
              {activeCountry.destinations.map((dest, idx) => (
                <button
                  key={dest.city}
                  onClick={() => setActiveCityIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeCityIndex === idx
                      ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                      : 'bg-white text-[#1E2922] hover:bg-[#FAEDCD] border border-[#DED6D1]'
                  }`}
                >
                  <span>📍</span>
                  <span>{dest.city}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* DESTINATION CONTENT BLOCKS                               */}
        {/* ======================================================== */}
        {currentCityDetail && (
          <div className="px-6 sm:px-10 pb-10 space-y-10">
            
            {/* 1. FAMOUS PLACES & ATTRACTIONS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#CDD5AE] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAEDCD] text-[#283618] flex items-center justify-center font-black border border-[#CDD5AE]">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#1E2922] font-serif-accent">
                      1. Famous Places in {currentCityDetail.city}, {activeCountry.name}
                    </h3>
                    <p className="text-[11px] text-[#384F40] font-bold">
                      Key historical landmarks, UNESCO heritage, entry fees & optimal visiting hours
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#283618] bg-[#E9EDCA] px-2.5 py-1 rounded-lg border border-[#CDD5AE]">
                  {currentCityDetail.famousPlaces.length} Iconic Sights
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCityDetail.famousPlaces.map((place, pIdx) => (
                  <div
                    key={place.name}
                    className="p-5 rounded-2xl bg-[#F8F6F0] border-2 border-[#CDD5AE] shadow-2xs hover:border-[#A4C3B2] hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-black text-[#384F40] bg-[#FAEDCD] px-2 py-0.5 rounded border border-[#CDD5AE]">
                          #{pIdx + 1}
                        </span>
                        <h4 className="text-base font-black text-[#1E2922] mt-1">
                          {place.name}
                        </h4>
                      </div>
                      <span className="text-xs font-black text-[#283618] bg-white px-2.5 py-1 rounded-lg border border-[#CDD5AE] shrink-0">
                        {place.entryFee}
                      </span>
                    </div>

                    <p className="text-xs text-stone-700 font-medium leading-relaxed">
                      {place.highlight}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#DED6D1] text-[11px]">
                      <div>
                        <span className="text-stone-400 font-bold">Best Time to Visit:</span>
                        <p className="font-bold text-[#384F40]">{place.bestTime}</p>
                      </div>
                      <div>
                        <span className="text-stone-400 font-bold">Est. Duration:</span>
                        <p className="font-bold text-[#283618]">{place.visitDuration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. FAMOUS FOODS & LOCAL DELICACIES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#CDD5AE] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E9EDCA] text-[#283618] flex items-center justify-center font-black border border-[#CDD5AE]">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#1E2922] font-serif-accent">
                      2. Famous Foods & Must-Try Delicacies ({currentCityDetail.city})
                    </h3>
                    <p className="text-[11px] text-[#384F40] font-bold">
                      Signature dishes, authentic local flavors & approximate meal prices
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#283618] bg-[#FAEDCD] px-2.5 py-1 rounded-lg border border-[#CDD5AE]">
                  {currentCityDetail.famousFoods.length} Specialties
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentCityDetail.famousFoods.map((food) => (
                  <div
                    key={food.name}
                    className="p-4 rounded-2xl bg-white border-2 border-[#CDD5AE] shadow-2xs hover:border-[#A4C3B2] hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{food.icon}</span>
                        <span className="text-xs font-black text-[#283618] bg-[#FAEDCD] px-2.5 py-1 rounded-lg border border-[#CDD5AE]">
                          {rateSymbol}{Math.round(food.approxCostINR / currentRate).toLocaleString()}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-[#1E2922]">{food.name}</h4>
                      <p className="text-xs text-stone-600 font-medium leading-relaxed">
                        {food.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#DED6D1] text-[11px] flex justify-between items-center text-stone-500 font-bold">
                      <span>Local Est:</span>
                      <span className="text-[#384F40] font-black">{food.approxCostLocal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. NEARBY RECOMMENDED RESTAURANTS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#CDD5AE] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#CDD5AE] text-[#283618] flex items-center justify-center font-black border border-[#A4C3B2]">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#1E2922] font-serif-accent">
                      3. Nearby Restaurants & Dining Options ({currentCityDetail.city})
                    </h3>
                    <p className="text-[11px] text-[#384F40] font-bold">
                      Verified local restaurants, authentic cafes, rating scores and distance
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#283618] bg-[#E9EDCA] px-2.5 py-1 rounded-lg border border-[#CDD5AE]">
                  {currentCityDetail.nearbyRestaurantTypes.length} Curated Options
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCityDetail.nearbyRestaurantTypes.map((rest) => (
                  <div
                    key={rest.name}
                    className="p-5 rounded-2xl bg-white border-2 border-[#CDD5AE] shadow-2xs hover:border-[#384F40] transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-black text-[#1E2922]">{rest.name}</h4>
                        <p className="text-xs text-[#384F40] font-bold flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#384F40]" />
                          {rest.distance} • {rest.cuisine}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-md bg-[#FAEDCD] text-[#283618] text-xs font-black border border-[#CDD5AE]">
                          {rest.priceRange}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-black/80 text-white text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {rest.rating}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DED6D1] text-xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400">Signature Specialty:</span>
                      <p className="font-bold text-[#1E2922]">{rest.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. APPROX. FOOD BUDGET PER DAY & TRAVEL BUDGET BREAKDOWN */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#CDD5AE] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAEDCD] text-[#283618] flex items-center justify-center font-black border border-[#CDD5AE]">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#1E2922] font-serif-accent">
                      4. Approximate Food Budget & Daily Expenses ({currentCityDetail.city})
                    </h3>
                    <p className="text-[11px] text-[#384F40] font-bold">
                      Calculated estimates for budget, mid-range and fine dining
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#FAEDCD]/50 via-[#E9EDCA]/40 to-[#CDD5AE]/30 p-6 rounded-3xl border-2 border-[#CDD5AE] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border-2 border-[#CDD5AE] text-center space-y-1 shadow-2xs">
                    <span className="text-xs font-bold text-stone-500">🎒 Street & Budget Dining</span>
                    <p className="text-lg font-black text-[#283618] font-mono">{currentCityDetail.foodBudgetPerDay.budgetINR}</p>
                    <p className="text-[11px] text-stone-500">Local stalls, bakeries & noodles</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border-2 border-[#A4C3B2] text-center space-y-1 shadow-2xs">
                    <span className="text-xs font-bold text-stone-500">🏨 Cafes & Mid-Range Sitdown</span>
                    <p className="text-lg font-black text-[#384F40] font-mono">{currentCityDetail.foodBudgetPerDay.midRangeINR}</p>
                    <p className="text-[11px] text-stone-500">Bistros, air-conditioned restaurants</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border-2 border-[#CDD5AE] text-center space-y-1 shadow-2xs">
                    <span className="text-xs font-bold text-stone-500">✨ Gourmet & Fine Dining</span>
                    <p className="text-lg font-black text-[#1E2922] font-mono">{currentCityDetail.foodBudgetPerDay.luxuryINR}</p>
                    <p className="text-[11px] text-stone-500">Seafood banquets & rooftop lounges</p>
                  </div>
                </div>

                <div className="bg-white/80 p-3.5 rounded-2xl border border-[#CDD5AE] text-xs text-stone-700 leading-relaxed font-medium flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#384F40] shrink-0" />
                  <span>{currentCityDetail.foodBudgetPerDay.summary}</span>
                </div>
              </div>
            </div>

            {/* 5. THINGS TO DO & EXPERIENCES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#CDD5AE] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E9EDCA] text-[#283618] flex items-center justify-center font-black border border-[#CDD5AE]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#1E2922] font-serif-accent">
                      5. Top Things to Do & Authentic Experiences ({currentCityDetail.city})
                    </h3>
                    <p className="text-[11px] text-[#384F40] font-bold">
                      Immersive activities, walking circuits, workshops and nightlife
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentCityDetail.thingsToDo.map((act, aIdx) => (
                  <div
                    key={act}
                    className="p-3.5 rounded-xl bg-[#F8F6F0] border-2 border-[#CDD5AE] flex items-center gap-3 text-xs font-bold text-[#1E2922]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#384F40] shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. SUGGESTED ITINERARY & INSTANT AI TRIP GENERATION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#CDD5AE] pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#384F40] text-[#FAEDCD] flex items-center justify-center font-black border border-[#CDD5AE]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#1E2922] font-serif-accent">
                      6. Suggested Itinerary & Instant AI Trip Generation
                    </h3>
                    <p className="text-[11px] text-[#384F40] font-bold">
                      Paced day-by-day highlights ready for 1-click customization
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#384F40] via-[#283618] to-[#384F40] text-white p-6 rounded-3xl border-2 border-[#CDD5AE] space-y-5">
                <div className="space-y-2.5">
                  {currentCityDetail.suggestedItineraryHighlights.map((itin, idx) => (
                    <div
                      key={itin}
                      className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold text-[#FAEDCD] flex items-center gap-2.5"
                    >
                      <span className="w-6 h-6 rounded-lg bg-[#FAEDCD] text-[#283618] text-xs font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{itin}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/20">
                  <div>
                    <p className="text-xs text-[#E9EDCA] font-medium">
                      Want an hourly day-by-day plan with flights, stays, food spots and GPS map?
                    </p>
                    <p className="text-sm font-black text-[#FAEDCD] mt-0.5">
                      Launch the Multi-Agent Travel Engine for {currentCityDetail.city}, {activeCountry.name}
                    </p>
                  </div>

                  <button
                    onClick={() => onPlanDestination(`${currentCityDetail.city}, ${activeCountry.name}`)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FAEDCD] to-[#E9EDCA] hover:from-white hover:to-[#FAEDCD] text-[#283618] text-sm font-black flex items-center justify-center gap-2 shadow-md cursor-pointer border-2 border-[#CDD5AE]"
                  >
                    <Sparkles className="w-4 h-4 text-[#384F40]" />
                    <span>Plan My Trip to {currentCityDetail.city} with AI</span>
                    <ArrowRight className="w-4 h-4 text-[#283618]" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
