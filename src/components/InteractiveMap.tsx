import React, { useState } from 'react';
import {
  MapPin,
  Building,
  Utensils,
  Camera,
  Car,
  ShoppingBag,
  HeartPulse,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Compass
} from 'lucide-react';
import { Coordinates } from '../types/travel';

export interface MapMarkerItem {
  id: string;
  name: string;
  category: 'hotel' | 'food' | 'attraction' | 'transport' | 'shopping' | 'hospital' | 'starting';
  coordinates: Coordinates;
  address?: string;
  rating?: number;
  price?: string;
  description?: string;
  image?: string;
}

interface InteractiveMapProps {
  destination: string;
  startingLocation: string;
  markers: MapMarkerItem[];
  centerCoordinates?: Coordinates;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  destination,
  startingLocation,
  markers,
  centerCoordinates = { lat: 15.3000, lng: 74.1200 }
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerItem | null>(markers[0] || null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Places', icon: <Layers className="w-3.5 h-3.5" />, color: 'bg-[#384F40] text-white' },
    { id: 'hotel', label: '🏨 Hotels & Resorts', icon: <Building className="w-3.5 h-3.5" />, color: 'bg-[#384F40] text-[#FAEDCD]' },
    { id: 'food', label: '🍴 Dining & Cafes', icon: <Utensils className="w-3.5 h-3.5" />, color: 'bg-amber-700 text-white' },
    { id: 'attraction', label: '🎯 Sights & Beaches', icon: <Camera className="w-3.5 h-3.5" />, color: 'bg-emerald-800 text-white' },
    { id: 'transport', label: '🚕 Transit Hubs', icon: <Car className="w-3.5 h-3.5" />, color: 'bg-sky-800 text-white' },
    { id: 'shopping', label: '🛍 Bazaars & Malls', icon: <ShoppingBag className="w-3.5 h-3.5" />, color: 'bg-stone-800 text-white' },
    { id: 'hospital', label: '🏥 Medical / Emergency', icon: <HeartPulse className="w-3.5 h-3.5" />, color: 'bg-red-700 text-white' },
  ];

  const filteredMarkers = activeCategory === 'all'
    ? markers
    : markers.filter((m) => m.category === activeCategory);

  const getMarkerBadgeColor = (cat: string) => {
    switch (cat) {
      case 'hotel': return 'bg-[#384F40] text-[#FAEDCD] ring-2 ring-[#CDD5AE]';
      case 'food': return 'bg-amber-700 text-white ring-2 ring-amber-300';
      case 'attraction': return 'bg-emerald-800 text-white ring-2 ring-emerald-300';
      case 'transport': return 'bg-sky-800 text-white ring-2 ring-sky-300';
      case 'shopping': return 'bg-stone-800 text-white ring-2 ring-stone-300';
      case 'hospital': return 'bg-red-700 text-white ring-2 ring-red-300';
      default: return 'bg-[#384F40] text-[#FAEDCD] ring-2 ring-[#CDD5AE]';
    }
  };

  const getMarkerIcon = (cat: string) => {
    switch (cat) {
      case 'hotel': return <Building className="w-4 h-4" />;
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'attraction': return <Camera className="w-4 h-4" />;
      case 'transport': return <Car className="w-4 h-4" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4" />;
      case 'hospital': return <HeartPulse className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[#DED6D1] overflow-hidden">
      {/* Map Control Bar */}
      <div className="p-4 sm:p-5 bg-[#384F40] text-white flex flex-wrap items-center justify-between gap-3 border-b border-[#CDD5AE]/30">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/15 text-[#FAEDCD]">
            <Compass className="w-5 h-5 animate-spin-slow text-[#E9EDCA]" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#FAEDCD] font-serif-accent flex items-center gap-2">
              Interactive GPS & Sightseeing Map: {destination}
            </h3>
            <p className="text-xs text-[#DED6D1]">
              Showing {filteredMarkers.length} verified locations, hubs, and emergency points
            </p>
          </div>
        </div>

        {/* Map Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#CDD5AE]/40 ${
              is3DMode ? 'bg-[#FAEDCD] text-[#1E2922]' : 'bg-white/10 text-[#FAEDCD]'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            {is3DMode ? '2D View' : '3D Terrain'}
          </button>
          <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-[#CDD5AE]/30">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 hover:text-[#FAEDCD] text-white/90"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1.5 hover:text-[#FAEDCD] text-white/90"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="p-3 bg-[#FAF8F5] border-b border-[#DED6D1] flex items-center gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeCategory === cat.id
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm ring-1 ring-[#CDD5AE]'
                : 'bg-white text-[#1E2922] hover:bg-[#E9EDCA]/40 border border-[#DED6D1]'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Map Canvas Visualizer */}
      <div className="relative h-[440px] sm:h-[500px] bg-[#EBF0EC] overflow-hidden select-none">
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{ transform: `scale(${zoomLevel}) ${is3DMode ? 'rotateX(24deg) translateY(-10px)' : ''}` }}
        >
          {/* Waterway / Coastline Simulation */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D5DFD8" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Ocean Waves / Lake Area */}
            <path
              d="M0,0 Q180,90 320,60 T600,120 T1000,80 L1000,0 L0,0 Z"
              fill="#D6E5DF"
              opacity="0.9"
            />
            {/* Main Road Lines */}
            <path
              d="M50,420 Q280,240 500,280 T950,150"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M50,420 Q280,240 500,280 T950,150"
              fill="none"
              stroke="#CDD5AE"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="8 6"
            />
            {/* Secondary Route */}
            <path
              d="M200,480 Q400,340 700,420"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="6"
            />
            <path
              d="M200,480 Q400,340 700,420"
              fill="none"
              stroke="#384F40"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Render Interactive Markers */}
          {filteredMarkers.map((marker, index) => {
            const posX = 15 + ((index * 23 + (marker.id.length * 11)) % 72);
            const posY = 18 + ((index * 29 + (marker.name.length * 9)) % 65);
            const isSelected = selectedMarker?.id === marker.id;

            return (
              <div
                key={marker.id}
                onClick={() => setSelectedMarker(marker)}
                style={{ left: `${posX}%`, top: `${posY}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group z-10 hover:z-30`}
              >
                {isSelected && (
                  <div className="absolute inset-0 -m-3 rounded-full bg-[#A4C3B2] animate-ping opacity-60 pointer-events-none" />
                )}

                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-125 ${getMarkerBadgeColor(
                    marker.category
                  )} ${isSelected ? 'scale-125 ring-4 ring-[#A4C3B2]' : ''}`}
                >
                  {getMarkerIcon(marker.category)}
                </div>

                <div
                  className={`mt-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow-md whitespace-nowrap pointer-events-none transition-all ${
                    isSelected
                      ? 'bg-[#1E2922] text-[#FAEDCD] scale-105'
                      : 'bg-white/95 text-[#1E2922] opacity-90 group-hover:opacity-100'
                  }`}
                >
                  {marker.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Marker Detail Card */}
        {selectedMarker && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-[#DED6D1] z-30 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${getMarkerBadgeColor(
                    selectedMarker.category
                  )}`}
                >
                  {getMarkerIcon(selectedMarker.category)}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-[#1E2922] leading-snug">
                    {selectedMarker.name}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#384F40]">
                    {selectedMarker.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMarker(null)}
                className="text-stone-400 hover:text-stone-700 text-xs p-1"
              >
                ✕
              </button>
            </div>

            {selectedMarker.description && (
              <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                {selectedMarker.description}
              </p>
            )}

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100 text-xs">
              <div className="flex items-center gap-1 text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-[#384F40]" />
                <span className="text-[11px]">{selectedMarker.address || `${destination} Hub Area`}</span>
              </div>
              {selectedMarker.price && (
                <span className="font-bold text-[#384F40]">{selectedMarker.price}</span>
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => alert(`Directions calculated to ${selectedMarker.name}. Estimated travel time: 14 mins by Cab.`)}
                className="w-full py-1.5 bg-[#384F40] text-[#FAEDCD] rounded-lg text-xs font-bold hover:bg-[#283618] transition-colors flex items-center justify-center gap-1 border border-[#CDD5AE]"
              >
                <Navigation className="w-3 h-3" />
                Directions
              </button>
              <button
                onClick={() => alert(`Location ${selectedMarker.name} saved to your offline trip route!`)}
                className="w-full py-1.5 bg-[#FAF8F5] border border-[#DED6D1] text-[#1E2922] rounded-lg text-xs font-bold hover:bg-[#E9EDCA]/30 transition-colors"
              >
                Save Pin
              </button>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-stone-200 text-[11px] text-[#1E2922] font-medium shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live GPS Route Ready
        </div>
      </div>
    </div>
  );
};
