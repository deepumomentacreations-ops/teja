import React, { useState } from 'react';
import { Compass, Sparkles, Plane, MapPin, Bookmark, BarChart3, ShieldAlert, Globe, Menu, X, ArrowRight } from 'lucide-react';
import { CurrencyCode } from '../types/travel';
import { CURRENCY_RATES } from '../data/destinationsData';

interface NavbarProps {
  activeView: 'home' | 'planner' | 'dashboard' | 'explore' | 'flight-radar' | 'saved-trips' | 'admin';
  setActiveView: (view: 'home' | 'planner' | 'dashboard' | 'explore' | 'flight-radar' | 'saved-trips' | 'admin') => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  savedTripsCount: number;
  hasActiveTrip: boolean;
  onEmergencyClick: () => void;
  onOpenAIChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  currency,
  setCurrency,
  savedTripsCount,
  hasActiveTrip,
  onEmergencyClick,
  onOpenAIChat
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (view: 'home' | 'planner' | 'dashboard' | 'explore' | 'flight-radar' | 'saved-trips' | 'admin') => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-[#1E2922] shadow-sm border-b-2 border-[#CDD5AE] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with 5-Color Styling */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#384F40] via-[#283618] to-[#A4C3B2] flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-200 border border-[#FAEDCD]">
              <Compass className="w-6 h-6 text-[#FAEDCD]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-[#1E2922] font-serif-accent">
                  TravelMate<span className="text-[#384F40]">AI</span>
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider bg-[#FAEDCD] text-[#283618] rounded-lg border border-[#CDD5AE] shadow-2xs">
                  AI Portal
                </span>
              </div>
              <p className="text-[11px] text-[#384F40] font-semibold hidden sm:block">From Dream to Destination</p>
            </div>
          </div>

          {/* Desktop Navigation Links with Rich Color States */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#F8F6F0] p-1.5 rounded-2xl border border-[#DED6D1]">
            <button
              onClick={() => handleNav('home')}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all ${
                activeView === 'home' 
                  ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm' 
                  : 'text-[#1E2922] hover:text-[#283618] hover:bg-[#FAEDCD]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('explore')}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all flex items-center gap-1.5 ${
                activeView === 'explore' 
                  ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm' 
                  : 'text-[#1E2922] hover:text-[#283618] hover:bg-[#FAEDCD]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#384F40]" />
              Countries & 250+ Places
            </button>

            {hasActiveTrip && (
              <button
                onClick={() => handleNav('dashboard')}
                className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all flex items-center gap-1.5 ${
                  activeView === 'dashboard' 
                    ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm ring-2 ring-[#A4C3B2]' 
                    : 'text-[#283618] bg-[#FAEDCD] hover:bg-[#E9EDCA] border border-[#CDD5AE] shadow-2xs'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#283618]" />
                Active Trip Plan
              </button>
            )}

            <button
              onClick={() => handleNav('flight-radar')}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all flex items-center gap-1.5 ${
                activeView === 'flight-radar' 
                  ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm' 
                  : 'text-[#1E2922] hover:text-[#283618] hover:bg-[#FAEDCD]'
              }`}
            >
              <Plane className="w-3.5 h-3.5 text-[#384F40]" />
              Flight Radar
            </button>

            <button
              onClick={() => handleNav('saved-trips')}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all flex items-center gap-1.5 relative ${
                activeView === 'saved-trips' 
                  ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm' 
                  : 'text-[#1E2922] hover:text-[#283618] hover:bg-[#FAEDCD]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#384F40]" />
              Saved
              {savedTripsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#384F40] text-[#FAEDCD] text-[10px] font-black flex items-center justify-center -mr-1">
                  {savedTripsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNav('admin')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-[#384F40] hover:text-[#1E2922] hover:bg-[#E9EDCA] flex items-center gap-1`}
              title="Agent Telemetry & Admin Console"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Console
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Currency Selector with Warm Cream Tone */}
            <div className="relative flex items-center bg-[#FAEDCD] hover:bg-[#FAEDCD]/80 rounded-xl px-3 py-2 border-2 border-[#CDD5AE] text-xs text-[#283618] font-black shadow-2xs transition-colors">
              <span className="text-[#384F40] mr-1.5 font-black">{CURRENCY_RATES[currency]?.symbol}</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-[#283618] font-black focus:outline-none cursor-pointer pr-1 text-xs"
              >
                {Object.keys(CURRENCY_RATES).map((curr) => (
                  <option key={curr} value={curr} className="bg-white text-stone-900 font-bold">
                    {curr} ({CURRENCY_RATES[curr as CurrencyCode].symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* AI Assistant Fast Toggle with Pistachio Tone */}
            <button
              onClick={onOpenAIChat}
              className="px-3.5 py-2 rounded-xl bg-[#E9EDCA] hover:bg-[#CDD5AE] text-[#283618] text-xs font-black flex items-center gap-1.5 transition-all border-2 border-[#CDD5AE] shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#384F40]" />
              Ask AI Guide
            </button>

            {/* Emergency SOS Button */}
            <button
              onClick={onEmergencyClick}
              className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-black flex items-center gap-1 border-2 border-red-200 transition-all cursor-pointer shadow-2xs"
              title="Emergency Hotlines"
            >
              <ShieldAlert className="w-4 h-4 text-red-600" />
              SOS
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNav('planner')}
              className="px-5 py-2 rounded-xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer border-2 border-[#CDD5AE]"
            >
              Plan Trip
              <ArrowRight className="w-3.5 h-3.5 text-[#A4C3B2]" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onEmergencyClick}
              className="p-2 rounded-xl bg-red-50 text-red-700 border border-red-200"
              aria-label="Emergency Help"
            >
              <ShieldAlert className="w-4 h-4 text-red-600" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[#FAEDCD] text-[#283618] border-2 border-[#CDD5AE] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#283618]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b-2 border-[#CDD5AE] px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => handleNav('home')}
              className={`p-3 rounded-xl text-left text-xs font-black ${
                activeView === 'home' ? 'bg-[#384F40] text-[#FAEDCD]' : 'text-[#1E2922] bg-[#FAEDCD]'
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => handleNav('explore')}
              className={`p-3 rounded-xl text-left text-xs font-black ${
                activeView === 'explore' ? 'bg-[#384F40] text-[#FAEDCD]' : 'text-[#1E2922] bg-[#E9EDCA]'
              }`}
            >
              🌍 Countries & 250+ Places
            </button>
            <button
              onClick={() => handleNav('planner')}
              className={`p-3 rounded-xl text-left text-xs font-black ${
                activeView === 'planner' ? 'bg-[#384F40] text-[#FAEDCD]' : 'text-[#1E2922] bg-[#FAEDCD]'
              }`}
            >
              ✨ AI Trip Planner
            </button>
            <button
              onClick={() => handleNav('flight-radar')}
              className={`p-3 rounded-xl text-left text-xs font-black ${
                activeView === 'flight-radar' ? 'bg-[#384F40] text-[#FAEDCD]' : 'text-[#1E2922] bg-[#CDD5AE]'
              }`}
            >
              ✈ Flight Radar
            </button>
          </div>

          {hasActiveTrip && (
            <button
              onClick={() => handleNav('dashboard')}
              className="w-full py-3 px-4 rounded-xl bg-[#384F40] text-[#FAEDCD] font-black text-xs flex items-center justify-center gap-2 shadow-sm border border-[#CDD5AE]"
            >
              <Sparkles className="w-4 h-4 text-[#A4C3B2]" />
              View Active Trip Dashboard
            </button>
          )}

          <div className="flex items-center justify-between pt-3 border-t-2 border-[#CDD5AE]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#283618] font-bold">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-[#FAEDCD] text-[#283618] text-xs font-black py-1.5 px-2.5 rounded-xl border-2 border-[#CDD5AE]"
              >
                {Object.keys(CURRENCY_RATES).map((c) => (
                  <option key={c} value={c}>
                    {c} ({CURRENCY_RATES[c as CurrencyCode].symbol})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => { setIsMobileMenuOpen(false); onOpenAIChat(); }}
              className="px-3.5 py-1.5 bg-[#E9EDCA] text-[#283618] rounded-xl text-xs font-black border-2 border-[#CDD5AE]"
            >
              Chat with AI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
