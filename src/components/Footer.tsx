import React from 'react';
import { Compass, Sparkles, Heart, ShieldCheck, Globe, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavToPlanner: () => void;
  onNavToExplore: () => void;
  onEmergencyClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavToPlanner,
  onNavToExplore,
  onEmergencyClick
}) => {
  return (
    <footer className="bg-[#1E2922] text-[#FAF8F5] border-t border-[#CDD5AE]/30 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#384F40] to-[#A4C3B2] flex items-center justify-center text-white shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-serif-accent">
                TravelMate<span className="text-[#FAEDCD]">AI</span>
              </span>
            </div>
            <p className="text-xs text-[#DED6D1] leading-relaxed max-w-sm">
              Your AI Travel Guide — From Dream to Destination.
              Plan your journey, manage your budget, track flights on live radar, and explore India and 250+ world destinations with specialized AI agents.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#FAEDCD]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A4C3B2]" />
                Verified Travel Intelligence
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#A4C3B2]" />
                Global & Domestic
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#FAEDCD]">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-[#DED6D1]">
              <li>
                <button onClick={onNavToPlanner} className="hover:text-[#FAEDCD] transition-colors">
                  AI Trip Planner
                </button>
              </li>
              <li>
                <button onClick={onNavToExplore} className="hover:text-[#FAEDCD] transition-colors">
                  Explore 250+ Places & Countries
                </button>
              </li>
              <li>
                <button onClick={onEmergencyClick} className="text-rose-300 hover:text-rose-200 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" />
                  Emergency SOS Hotlines
                </button>
              </li>
            </ul>
          </div>

          {/* Version 1 Compliance & Transparency */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#FAEDCD]">Data & Booking Transparency</h4>
            <p className="text-[11px] text-[#DED6D1]/80 leading-relaxed">
              TravelMate AI uses realistic travel models, historical fare bands, and simulated aviation telemetry. Prices are clearly labeled as <strong>Estimated</strong>. All booking links forward to authorized airline & hotel providers.
            </p>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-[#384F40] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DED6D1]/70">
          <p>© {new Date().getFullYear()} TravelMate AI. All rights reserved. Crafted with multi-agent intelligence.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Safety Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
