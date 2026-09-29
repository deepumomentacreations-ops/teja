import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Compass,
  Plane,
  Building,
  Utensils,
  MapPin,
  Calendar,
  Wallet,
  Globe,
  Radio,
  Bookmark,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Zap,
  HelpCircle,
  Star,
  Users
} from 'lucide-react';
import { TripPlan, CurrencyCode, TravelStyle, TravelInterest } from './types/travel';
import { POPULAR_DESTINATIONS, CURRENCY_RATES } from './data/destinationsData';
import { generateSyntheticTripPlan, optimizeTripBudget, PlanTripRequest } from './services/aiTravelEngine';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TripPlannerForm } from './components/TripPlannerForm';
import { AgentWorkflowVisualizer } from './components/AgentWorkflowVisualizer';
import { TripDashboard } from './components/TripDashboard';
import { ExploreDestinationsPage } from './components/ExploreDestinationsPage';
import { FlightTrackerLive } from './components/FlightTrackerLive';
import { SavedTripsView } from './components/SavedTripsView';
import { AdminDashboard } from './components/AdminDashboard';
import { AIChatAssistant } from './components/AIChatAssistant';
import { BudgetOptimizerModal } from './components/BudgetOptimizerModal';
import { ShareTripModal } from './components/ShareTripModal';
import { PDFTravelPlanModal } from './components/PDFTravelPlanModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState<
    'home' | 'planner' | 'dashboard' | 'explore' | 'flight-radar' | 'saved-trips' | 'admin'
  >('home');

  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pendingPlanRequest, setPendingPlanRequest] = useState<PlanTripRequest | null>(null);
  const [initialDestinationForPlanner, setInitialDestinationForPlanner] = useState<string>('Goa, India');

  // Initial Sample Trip for instant exploration
  const initialTrip = generateSyntheticTripPlan({
    startingLocation: 'Visakhapatnam, India',
    destination: 'Goa, India',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    travellers: { adults: 2, children: 0, infants: 0 },
    budgetAmount: 50000,
    currency: 'INR',
    travelStyles: ['Couple', 'Food'],
    interests: ['Beaches', 'Food', 'Photography', 'Nightlife']
  });

  const [currentTrip, setCurrentTrip] = useState<TripPlan | null>(initialTrip);
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>([initialTrip]);

  // Modal States
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isBudgetOptimizerOpen, setIsBudgetOptimizerOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  // Handle plan trip submission
  const handlePlanTrip = (params: PlanTripRequest) => {
    setPendingPlanRequest(params);
    setIsGenerating(true);
  };

  // Complete AI Workflow
  const handleAgentWorkflowComplete = () => {
    if (pendingPlanRequest) {
      const newTrip = generateSyntheticTripPlan(pendingPlanRequest);
      setCurrentTrip(newTrip);
      setSavedTrips((prev) => [newTrip, ...prev.filter((t) => t.id !== newTrip.id)]);
      setActiveView('dashboard');
    }
    setIsGenerating(false);
    setPendingPlanRequest(null);
  };

  // 1-Click Select Destination from Explore
  const handleSelectDestinationFromExplore = (destName: string) => {
    setInitialDestinationForPlanner(destName);
    setActiveView('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply budget optimizer
  const handleApplyOptimization = () => {
    if (currentTrip) {
      const optimized = optimizeTripBudget(currentTrip);
      setCurrentTrip(optimized);
      setSavedTrips((prev) => prev.map((t) => (t.id === optimized.id ? optimized : t)));
    }
  };

  // Delete saved trip
  const handleDeleteSavedTrip = (tripId: string) => {
    setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
    if (currentTrip?.id === tripId) {
      setCurrentTrip(savedTrips.find((t) => t.id !== tripId) || null);
    }
  };

  const currentRateSymbol = CURRENCY_RATES[currency]?.symbol || '₹';
  const currentRate = CURRENCY_RATES[currency]?.rateToINR || 1;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#FAEDCD] selection:text-[#283618]">
      
      {/* Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currency={currency}
        setCurrency={setCurrency}
        savedTripsCount={savedTrips.length}
        hasActiveTrip={Boolean(currentTrip)}
        onEmergencyClick={() => setIsEmergencyModalOpen(true)}
        onOpenAIChat={() => setIsAIChatOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-12">
        
        {/* VIEW: HOME */}
        {activeView === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <Hero
              onStartPlanning={() => {
                setActiveView('planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreClick={() => setActiveView('explore')}
            />

            {/* Main AI Trip Planner Card */}
            <div id="planner-section" className="space-y-5">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#283618] bg-[#FAEDCD] px-3.5 py-1.5 rounded-full border-2 border-[#CDD5AE] shadow-2xs inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#384F40]" />
                  AI Travel Orchestrator
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1E2922] font-serif-accent">
                  Build Your Dream Journey in Seconds
                </h2>
                <p className="text-xs sm:text-sm text-[#283618]/80 font-medium">
                  Select your destination, dates, budget and travel vibe — our coordinated AI agents will handle transport, stays, food and itineraries.
                </p>
              </div>

              <TripPlannerForm
                onPlanTrip={handlePlanTrip}
                isGenerating={isGenerating}
                currency={currency}
                setCurrency={setCurrency}
                initialDestination={initialDestinationForPlanner}
              />
            </div>

            {/* How It Works (6-Step Interactive Multi-Agent Roadmap) */}
            <div className="bg-gradient-to-br from-[#FAEDCD]/60 via-[#E9EDCA]/50 to-[#CDD5AE]/40 rounded-3xl p-8 sm:p-12 shadow-sm border-2 border-[#CDD5AE] space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#283618] bg-white/80 px-3 py-1 rounded-full border border-[#A4C3B2]">
                  How TravelMate AI Works
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1E2922] font-serif-accent">
                  From Dream to Destination in 6 Simple Steps
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { step: '01', title: 'Tell us where you want to go', desc: 'Choose any destination in India or around the world with your departure city.', bg: 'bg-[#FAEDCD]/90', border: 'border-[#CDD5AE]' },
                  { step: '02', title: 'Set budget & travel style', desc: 'Specify your comfortable budget range, party size, and travel vibe (Solo, Couple, Family, Luxury).', bg: 'bg-[#E9EDCA]/90', border: 'border-[#A4C3B2]' },
                  { step: '03', title: 'AI multi-agent synthesis', desc: 'Coordinated AI agents analyze flights, verified hotels, authentic food, and top sights.', bg: 'bg-[#A4C3B2]/40', border: 'border-[#384F40]' },
                  { step: '04', title: 'Get day-by-day itinerary', desc: 'Receive an hourly timeline with travel times, distances, costs and weather tips.', bg: 'bg-[#CDD5AE]/80', border: 'border-[#384F40]' },
                  { step: '05', title: 'Optimize budget & compare', desc: '1-click AI budget optimizer cuts unnecessary expenses while preserving luxury.', bg: 'bg-[#FAEDCD]/90', border: 'border-[#CDD5AE]' },
                  { step: '06', title: 'Travel with live GPS & radar', desc: 'Track flight radar, access offline PDF travel documents and chat with your AI guide anytime.', bg: 'bg-[#E9EDCA]/90', border: 'border-[#A4C3B2]' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`p-6 rounded-2xl ${item.bg} border-2 ${item.border} space-y-2.5 shadow-2xs hover:shadow-md transition-all backdrop-blur-xs`}
                  >
                    <span className="text-2xl font-black text-[#283618] font-mono">{item.step}</span>
                    <h3 className="font-extrabold text-base text-[#1E2922]">{item.title}</h3>
                    <p className="text-xs text-[#283618]/85 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Featured Destinations Carousel */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#283618] bg-[#FAEDCD] px-3 py-1 rounded-full border border-[#CDD5AE]">
                    Curated Guidebooks
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#1E2922] font-serif-accent mt-1">
                    Popular Destinations in India & The World
                  </h2>
                </div>
                <button
                  onClick={() => setActiveView('explore')}
                  className="px-4 py-2.5 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] text-xs font-black rounded-xl flex items-center gap-1.5 transition-colors border-2 border-[#CDD5AE] shadow-xs cursor-pointer"
                >
                  View All Places ({POPULAR_DESTINATIONS.length})
                  <ArrowRight className="w-4 h-4 text-[#A4C3B2]" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {POPULAR_DESTINATIONS.slice(0, 4).map((dest) => (
                  <div
                    key={dest.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border-2 border-[#CDD5AE] flex flex-col justify-between group hover:shadow-lg hover:border-[#A4C3B2] hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-44">
                      <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-lg bg-[#384F40] text-[#FAEDCD] text-[11px] font-black border border-[#CDD5AE] shadow-xs">
                        {dest.region}
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/75 text-white text-[11px] font-black flex items-center gap-1 backdrop-blur-xs">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {dest.rating}
                      </span>
                    </div>

                    <div className="p-4 space-y-2 bg-gradient-to-b from-white to-[#FAEDCD]/20">
                      <h3 className="font-black text-base text-[#1E2922]">{dest.name}</h3>
                      <p className="text-xs text-stone-600 line-clamp-2">{dest.subtitle}</p>
                      <div className="text-xs font-bold text-stone-700 flex justify-between pt-2 border-t border-[#DED6D1]">
                        <span>Ideal: {dest.idealDays} Days</span>
                        <span className="font-black text-[#283618] bg-[#FAEDCD] px-2 py-0.5 rounded border border-[#CDD5AE]">
                          ~{currentRateSymbol}{Math.round(dest.avgCostPerDay / currentRate).toLocaleString()}/day
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F8F6F0] border-t-2 border-[#CDD5AE] flex items-center justify-between">
                      <span className="text-[11px] text-[#384F40] font-bold">{dest.bestTimeToVisit.split('(')[0]}</span>
                      <button
                        onClick={() => handleSelectDestinationFromExplore(dest.name)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] text-xs font-black transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#A4C3B2]" />
                        Plan Trip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: TRIP PLANNER */}
        {activeView === 'planner' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#FAEDCD]/60 p-4 sm:p-6 rounded-2xl border-2 border-[#CDD5AE]">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#1E2922] font-serif-accent">
                  Configure Your Trip
                </h1>
                <p className="text-xs sm:text-sm text-[#283618]/80 font-bold">
                  Custom parameters for multi-agent synthesis
                </p>
              </div>
              {currentTrip && (
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="px-4 py-2.5 bg-[#384F40] text-[#FAEDCD] hover:bg-[#283618] rounded-xl text-xs font-black transition-colors border-2 border-[#CDD5AE] shadow-xs cursor-pointer"
                >
                  View Active Dashboard →
                </button>
              )}
            </div>

            <TripPlannerForm
              onPlanTrip={handlePlanTrip}
              isGenerating={isGenerating}
              currency={currency}
              setCurrency={setCurrency}
              initialDestination={initialDestinationForPlanner}
            />
          </div>
        )}

        {/* VIEW: TRIP DASHBOARD */}
        {activeView === 'dashboard' && currentTrip && (
          <TripDashboard
            tripPlan={currentTrip}
            onUpdateTripPlan={setCurrentTrip}
            onOpenBudgetOptimizer={() => setIsBudgetOptimizerOpen(true)}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onOpenPDFModal={() => setIsPDFModalOpen(true)}
            currency={currency}
          />
        )}

        {/* VIEW: EXPLORE PLACES */}
        {activeView === 'explore' && (
          <ExploreDestinationsPage
            onSelectDestination={handleSelectDestinationFromExplore}
            currency={currency}
          />
        )}

        {/* VIEW: FLIGHT RADAR */}
        {activeView === 'flight-radar' && (
          <FlightTrackerLive
            flightData={currentTrip?.flightTracking}
            reservations={currentTrip?.reservations}
            currency={currency}
          />
        )}

        {/* VIEW: SAVED TRIPS */}
        {activeView === 'saved-trips' && (
          <SavedTripsView
            savedTrips={savedTrips}
            onSelectTrip={(t) => {
              setCurrentTrip(t);
              setActiveView('dashboard');
            }}
            onDeleteTrip={handleDeleteSavedTrip}
            onStartNewTrip={() => {
              setActiveView('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currency={currency}
          />
        )}

        {/* VIEW: ADMIN CONSOLE */}
        {activeView === 'admin' && (
          <AdminDashboard />
        )}

      </main>

      {/* AI Multi-Agent Processing Modal Overlay */}
      {isGenerating && (
        <AgentWorkflowVisualizer onComplete={handleAgentWorkflowComplete} />
      )}

      {/* Context-Aware Floating AI Chatbot Assistant */}
      <AIChatAssistant
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        tripPlan={currentTrip}
        currency={currency}
        onUpdateTripPlan={setCurrentTrip}
      />

      {/* Budget Optimization Modal */}
      {isBudgetOptimizerOpen && currentTrip && (
        <BudgetOptimizerModal
          isOpen={isBudgetOptimizerOpen}
          onClose={() => setIsBudgetOptimizerOpen(false)}
          tripPlan={currentTrip}
          onApplyOptimization={handleApplyOptimization}
          currency={currency}
        />
      )}

      {/* Share Trip Modal */}
      {isShareModalOpen && currentTrip && (
        <ShareTripModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          tripPlan={currentTrip}
        />
      )}

      {/* PDF Printable Travel Plan Modal */}
      {isPDFModalOpen && currentTrip && (
        <PDFTravelPlanModal
          isOpen={isPDFModalOpen}
          onClose={() => setIsPDFModalOpen(false)}
          tripPlan={currentTrip}
          currency={currency}
        />
      )}

      {/* Emergency SOS Hotlines Modal */}
      <EmergencySOSModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        destination={currentTrip?.destination}
      />

      {/* Footer */}
      <Footer
        onNavToPlanner={() => {
          setActiveView('planner');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavToExplore={() => {
          setActiveView('explore');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onEmergencyClick={() => setIsEmergencyModalOpen(true)}
      />

    </div>
  );
}
