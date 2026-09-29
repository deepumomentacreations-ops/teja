import React from 'react';
import {
  Sparkles,
  Compass,
  Plane,
  Building,
  Utensils,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Star,
  Globe,
  Radio,
  MapPin
} from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanning, onExploreClick }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-md bg-gradient-to-br from-[#FAEDCD] via-[#E9EDCA] to-[#CDD5AE]/60 text-[#1E2922] border-2 border-[#CDD5AE]">
      
      {/* Decorative colored ambient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A4C3B2]/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FAEDCD]/80 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#E9EDCA]/60 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
          alt="Travel aesthetic background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 sm:py-16 text-center space-y-6">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border-2 border-[#A4C3B2] text-[#283618] text-xs sm:text-sm font-extrabold shadow-sm">
          <Sparkles className="w-4 h-4 text-[#384F40]" />
          <span>Next-Gen Multi-Agent Travel Guide & Planner</span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#1E2922] font-serif-accent leading-tight">
          Where do you <span className="text-[#283618] bg-[#FAEDCD] px-3 py-0.5 rounded-2xl border border-[#CDD5AE] inline-block shadow-xs">want to go?</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-[#283618]/85 text-sm sm:text-base leading-relaxed font-semibold">
          Tell us where you're going, how much you want to spend, and what kind of experience you want. Our AI will orchestrate your complete travel plan.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartPlanning}
            className="px-8 py-4 rounded-2xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] text-sm font-black flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer group border-2 border-[#CDD5AE]"
          >
            <Compass className="w-5 h-5 text-[#A4C3B2] group-hover:rotate-45 transition-transform" />
            <span>Launch AI Travel Planner</span>
            <ArrowRight className="w-4 h-4 text-[#FAEDCD] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreClick}
            className="px-7 py-4 rounded-2xl bg-white/90 hover:bg-white text-[#283618] text-sm font-black flex items-center gap-2.5 border-2 border-[#A4C3B2] shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Globe className="w-5 h-5 text-[#384F40]" />
            <span>Explore 250+ Places & Countries</span>
          </button>
        </div>

        {/* Key Platform Pillars with Colorful 5-Color Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t-2 border-[#CDD5AE]/60 text-left">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-[#A4C3B2] shadow-xs hover:border-[#384F40] transition-colors">
            <span className="text-2xl font-black text-[#283618] font-mono">10+</span>
            <p className="font-extrabold text-xs text-[#1E2922] mt-1">Specialized AI Agents</p>
            <p className="text-[11px] text-[#384F40]/80 font-medium">Transport, Stay, Food & Sights</p>
          </div>

          <div className="bg-[#FAEDCD]/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-[#CDD5AE] shadow-xs hover:border-[#384F40] transition-colors">
            <span className="text-2xl font-black text-[#283618] font-mono">100%</span>
            <p className="font-extrabold text-xs text-[#1E2922] mt-1">Budget Optimization</p>
            <p className="text-[11px] text-[#384F40]/80 font-medium">Transparent itemized savings</p>
          </div>

          <div className="bg-[#E9EDCA]/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-[#A4C3B2] shadow-xs hover:border-[#384F40] transition-colors">
            <span className="text-2xl font-black text-[#283618] font-mono">🛺 Transit</span>
            <p className="font-extrabold text-xs text-[#1E2922] mt-1">Within Destination</p>
            <p className="text-[11px] text-[#384F40]/80 font-medium">Auto, Scooty, Bike & Metro</p>
          </div>

          <div className="bg-[#CDD5AE]/70 backdrop-blur-sm p-4 rounded-2xl border-2 border-[#A4C3B2] shadow-xs hover:border-[#384F40] transition-colors">
            <span className="text-2xl font-black text-[#283618] font-mono">250+</span>
            <p className="font-extrabold text-xs text-[#1E2922] mt-1">India & World Places</p>
            <p className="text-[11px] text-[#384F40]/80 font-medium">Every Indian state & global hub</p>
          </div>
        </div>

      </div>
    </div>
  );
};
