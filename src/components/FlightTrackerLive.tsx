import React, { useState, useEffect } from 'react';
import {
  Plane,
  Radio,
  Clock,
  MapPin,
  QrCode,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Ticket,
  CheckCircle2,
  Calendar,
  Luggage,
  Sparkles,
  ArrowRight,
  Download,
  Info
} from 'lucide-react';
import { FlightTrackingRecord, ReservationItem, CurrencyCode } from '../types/travel';
import { CURRENCY_RATES } from '../data/destinationsData';

interface FlightTrackerLiveProps {
  flightData?: FlightTrackingRecord[];
  reservations?: ReservationItem[];
  currency: CurrencyCode;
}

export const FlightTrackerLive: React.FC<FlightTrackerLiveProps> = ({
  flightData,
  reservations,
  currency
}) => {
  const [flights, setFlights] = useState<FlightTrackingRecord[]>(
    flightData || [
      {
        id: 'flt-default',
        flightNumber: '6E-428',
        airline: 'IndiGo Airlines',
        aircraft: 'Airbus A320neo',
        fromIATA: 'VTZ',
        fromCity: 'Visakhapatnam',
        toIATA: 'GOI',
        toCity: 'Goa (Dabolim)',
        scheduledDeparture: '08:45 AM',
        actualDeparture: '08:52 AM',
        scheduledArrival: '11:10 AM',
        estimatedArrival: '11:12 AM',
        status: 'In Flight',
        gate: 'Gate 4B',
        terminal: 'T2',
        baggageBelt: 'Carousel 3',
        altitudeFt: 32400,
        speedKts: 472,
        progressPercent: 68,
        delayMinutes: 2,
        lastUpdated: 'Just now (Live Radar Feed)',
        reservationCode: 'TM-682914',
        passengerName: 'Primary Passenger & Co-Travelers',
        seat: '14A, 14B',
        class: 'Economy'
      }
    ]
  );

  const [activeReservationTab, setActiveReservationTab] = useState<'flights' | 'all-reservations'>('flights');
  const [selectedBoardingPass, setSelectedBoardingPass] = useState<FlightTrackingRecord | null>(null);
  const [isSimulatingUpdate, setIsSimulatingUpdate] = useState(false);
  const [telemetryTicker, setTelemetryTicker] = useState(0);

  // Live telemetry pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTicker((t) => t + 1);
      setFlights((prev) =>
        prev.map((flt) => ({
          ...flt,
          altitudeFt: Math.min(34000, Math.max(30000, flt.altitudeFt + (Math.floor(Math.random() * 200) - 100))),
          speedKts: Math.min(490, Math.max(450, flt.speedKts + (Math.floor(Math.random() * 6) - 3))),
          progressPercent: Math.min(98, flt.progressPercent + 0.1),
          lastUpdated: 'Live Radar Signal (Active)'
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const triggerLiveSimulatedUpdate = () => {
    setIsSimulatingUpdate(true);
    setTimeout(() => {
      setFlights((prev) =>
        prev.map((flt) => ({
          ...flt,
          gate: flt.gate === 'Gate 4B' ? 'Gate 5A (Gate Updated)' : 'Gate 4B',
          estimatedArrival: '11:08 AM (Arriving 4 mins early!)',
          status: 'In Flight',
          lastUpdated: 'Automated ATC Gateway Update'
        }))
      );
      setIsSimulatingUpdate(false);
      alert('Flight status synchronized with live Aviation Radar feed. Gate confirmed at Terminal 2.');
    }, 1200);
  };

  const currentRate = CURRENCY_RATES[currency]?.rateToINR || 1;
  const rateSymbol = CURRENCY_RATES[currency]?.symbol || '₹';

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#1E2922] via-[#384F40] to-[#1E2922] p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden border border-[#CDD5AE]/30">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CDD5AE]/20 border border-[#CDD5AE]/40 text-[#FAEDCD] text-xs font-semibold mb-2">
              <Radio className="w-3.5 h-3.5 text-[#E9EDCA] animate-pulse" />
              Live Flight Radar & Dynamic Reservation System
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif-accent">
              Real-Time Aviation Telemetry & Booking Vouchers
            </h2>
            <p className="text-[#DED6D1] text-sm mt-1">
              Track your flight altitude, live coordinates, gate updates, baggage belts and verified travel passes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerLiveSimulatedUpdate}
              disabled={isSimulatingUpdate}
              className="px-4 py-2.5 rounded-xl bg-[#FAEDCD] text-[#1E2922] font-bold text-xs flex items-center gap-2 hover:bg-[#E9EDCA] transition-all shadow-md cursor-pointer border border-[#CDD5AE]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingUpdate ? 'animate-spin' : ''}`} />
              Sync Live Radar Feed
            </button>
          </div>
        </div>

        {/* Decorative Grid SVG */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
          <Plane className="w-64 h-64 text-white transform rotate-45 -mr-16 -mt-8" />
        </div>
      </div>

      {/* Flight Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-[#DED6D1] overflow-hidden flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="p-6 bg-[#FAF8F5] border-b border-[#DED6D1] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#384F40] text-[#FAEDCD] flex items-center justify-center font-bold shadow-md border border-[#CDD5AE]">
                  <Plane className="w-6 h-6 transform rotate-45" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-lg text-[#1E2922]">{flight.airline}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#384F40] font-bold text-xs border border-[#DED6D1]">
                      {flight.flightNumber}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">{flight.aircraft} • Ref #{flight.reservationCode}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1.5 animate-pulse-subtle">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  {flight.status}
                </span>
              </div>
            </div>

            {/* Flight Route Diagram */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between gap-4">
                {/* Origin */}
                <div className="text-left">
                  <span className="text-3xl sm:text-4xl font-black text-[#1E2922] font-mono tracking-tight">
                    {flight.fromIATA}
                  </span>
                  <p className="text-sm font-bold text-stone-700 mt-0.5">{flight.fromCity}</p>
                  <p className="text-xs text-stone-400">Departed: {flight.actualDeparture}</p>
                </div>

                {/* Center Route Line */}
                <div className="flex-1 px-4 flex flex-col items-center">
                  <div className="w-full relative flex items-center">
                    <div className="w-full h-1 bg-stone-200 rounded-full">
                      <div
                        className="h-1 bg-gradient-to-r from-[#384F40] to-[#A4C3B2] rounded-full transition-all duration-1000"
                        style={{ width: `${flight.progressPercent}%` }}
                      />
                    </div>
                    {/* Plane on route */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 transform -translate-x-1/2 transition-all duration-1000"
                      style={{ left: `${flight.progressPercent}%` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#384F40] text-[#FAEDCD] flex items-center justify-center shadow-lg border-2 border-white">
                        <Plane className="w-4 h-4 transform rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full text-[11px] text-stone-400 font-medium mt-3">
                    <span>Est. Non-Stop Flight</span>
                    <span className="text-[#384F40] font-bold">{Math.round(flight.progressPercent)}% Completed</span>
                    <span>Direct Route</span>
                  </div>
                </div>

                {/* Destination */}
                <div className="text-right">
                  <span className="text-3xl sm:text-4xl font-black text-[#1E2922] font-mono tracking-tight">
                    {flight.toIATA}
                  </span>
                  <p className="text-sm font-bold text-stone-700 mt-0.5">{flight.toCity}</p>
                  <p className="text-xs text-[#384F40] font-bold">ETA: {flight.estimatedArrival}</p>
                </div>
              </div>

              {/* Live Telemetry Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#DED6D1]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-stone-500">Altitude</span>
                  <p className="font-extrabold text-sm text-[#1E2922] font-mono">
                    {flight.altitudeFt.toLocaleString()} FT
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Cruising altitude</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-stone-500">Ground Speed</span>
                  <p className="font-extrabold text-sm text-[#1E2922] font-mono">
                    {flight.speedKts} KTS (~{Math.round(flight.speedKts * 1.852)} KM/H)
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Optimal airflow</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-stone-500">Terminal & Gate</span>
                  <p className="font-extrabold text-sm text-[#384F40]">
                    {flight.terminal} • {flight.gate}
                  </p>
                  <span className="text-[10px] text-stone-500 font-medium">Baggage {flight.baggageBelt}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-stone-500">Seats & Class</span>
                  <p className="font-extrabold text-sm text-[#1E2922]">{flight.seat}</p>
                  <span className="text-[10px] text-[#384F40] font-bold">{flight.class} Class</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <Radio className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                  <span>{flight.lastUpdated}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedBoardingPass(flight)}
                    className="px-4 py-2 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-[#CDD5AE]"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    View Digital Boarding Pass
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Live Radar Airway Map Widget */}
        <div className="bg-[#1E2922] rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden border border-[#CDD5AE]/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <h4 className="font-bold text-sm text-white font-mono uppercase tracking-wider">
                Aviation Radar Scope
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#FAEDCD]">FREQ: 121.50 MHz</span>
          </div>

          {/* Radar Screen Graphic */}
          <div className="relative h-56 rounded-2xl bg-[#141C17] border border-[#384F40] overflow-hidden flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute w-44 h-44 rounded-full border border-[#A4C3B2]/20"></div>
            <div className="absolute w-32 h-32 rounded-full border border-[#A4C3B2]/30"></div>
            <div className="absolute w-20 h-20 rounded-full border border-[#A4C3B2]/40"></div>
            <div className="absolute w-full h-[1px] bg-[#A4C3B2]/20"></div>
            <div className="absolute h-full w-[1px] bg-[#A4C3B2]/20"></div>

            {/* Sweep Line */}
            <div className="absolute inset-0 origin-center animate-spin-slow pointer-events-none opacity-40">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-[#A4C3B2] to-transparent rounded-tl-full"></div>
            </div>

            {/* Live Aircraft Blip */}
            <div className="absolute transform -translate-x-1 -translate-y-4 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-[#FAEDCD] flex items-center justify-center animate-pulse shadow-lg shadow-[#FAEDCD]">
                <Plane className="w-2.5 h-2.5 text-[#1E2922] transform rotate-45" />
              </div>
              <span className="mt-1 px-1.5 py-0.5 rounded bg-[#1E2922] text-[9px] font-mono font-bold text-[#FAEDCD] border border-[#CDD5AE]/40">
                6E-428 • 32k FT
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#384F40] text-xs text-[#DED6D1] space-y-1">
            <div className="flex justify-between">
              <span>Weather at Approach:</span>
              <span className="text-white font-semibold">Clear Skies, 28°C</span>
            </div>
            <div className="flex justify-between">
              <span>Visibility:</span>
              <span className="text-emerald-400 font-semibold">&gt; 10 km (Excellent)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Reservations List */}
      {reservations && reservations.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl border border-[#DED6D1] p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-[#1E2922] font-serif-accent flex items-center gap-2">
                <Luggage className="w-5 h-5 text-[#384F40]" />
                Confirmed Trip Reservations & Instant Passes
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                All booking vouchers are stored with offline verification keys
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#384F40] text-xs font-bold border border-[#DED6D1]">
              {reservations.length} Active Vouchers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#DED6D1] flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#384F40] text-[#FAEDCD] text-[10px] font-bold uppercase tracking-wider">
                      {res.type}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {res.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[#1E2922] leading-snug">{res.title}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{res.provider} • Code: <span className="font-mono font-bold text-[#384F40]">{res.confirmationCode}</span></p>

                  <div className="mt-3 pt-2 border-t border-[#DED6D1] space-y-1 text-xs text-stone-600">
                    {Object.entries(res.details).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-stone-400">{k}:</span>
                        <span className="font-medium text-stone-800 text-right line-clamp-1">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DED6D1] flex items-center justify-between">
                  <span className="font-extrabold text-sm text-[#384F40]">
                    {rateSymbol}{Math.round(res.price / currentRate).toLocaleString()}
                  </span>
                  <button
                    onClick={() => alert(`Showing voucher confirmation barcode: ${res.confirmationCode}`)}
                    className="px-3 py-1.5 bg-white hover:bg-[#FAF8F5] border border-[#DED6D1] rounded-lg text-xs font-bold text-[#384F40] transition-colors"
                  >
                    View Voucher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Boarding Pass Modal */}
      {selectedBoardingPass && (
        <div className="fixed inset-0 z-50 bg-[#1E2922]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-[#DED6D1] overflow-hidden animate-in fade-in zoom-in-95">
            {/* Top Pass Brand */}
            <div className="bg-[#384F40] text-white p-5 flex items-center justify-between border-b border-[#CDD5AE]/40">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-[#FAEDCD]" />
                <span className="font-bold text-sm tracking-wide font-serif-accent text-[#FAEDCD]">
                  {selectedBoardingPass.airline} Boarding Pass
                </span>
              </div>
              <button
                onClick={() => setSelectedBoardingPass(null)}
                className="text-white/80 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Boarding Pass Details */}
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400">Passenger</p>
                  <p className="font-bold text-sm text-[#1E2922]">{selectedBoardingPass.passengerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-stone-400">Flight</p>
                  <p className="font-bold text-sm text-[#384F40] font-mono">{selectedBoardingPass.flightNumber}</p>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center justify-between bg-[#FAF8F5] p-4 rounded-2xl border border-[#DED6D1]">
                <div>
                  <span className="text-2xl font-black text-[#1E2922] font-mono">{selectedBoardingPass.fromIATA}</span>
                  <p className="text-xs text-stone-500">{selectedBoardingPass.fromCity}</p>
                </div>
                <Plane className="w-5 h-5 text-[#384F40] transform rotate-90" />
                <div className="text-right">
                  <span className="text-2xl font-black text-[#1E2922] font-mono">{selectedBoardingPass.toIATA}</span>
                  <p className="text-xs text-stone-500">{selectedBoardingPass.toCity}</p>
                </div>
              </div>

              {/* Gates and Seats */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-[#FAF8F5] p-2 rounded-xl border border-[#DED6D1]">
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Gate</span>
                  <p className="font-extrabold text-[#384F40]">{selectedBoardingPass.gate}</p>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded-xl border border-[#DED6D1]">
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Seat</span>
                  <p className="font-extrabold text-[#1E2922]">{selectedBoardingPass.seat}</p>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded-xl border border-[#DED6D1]">
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Class</span>
                  <p className="font-extrabold text-[#1E2922]">{selectedBoardingPass.class}</p>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded-xl border border-[#DED6D1]">
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Boarding</span>
                  <p className="font-extrabold text-emerald-700">08:15 AM</p>
                </div>
              </div>

              {/* Mock Barcode / QR */}
              <div className="border-t-2 border-dashed border-stone-200 pt-4 flex flex-col items-center">
                <div className="w-36 h-36 bg-[#FAF8F5] p-2 rounded-xl border border-[#DED6D1] flex items-center justify-center">
                  <QrCode className="w-28 h-28 text-[#1E2922]" />
                </div>
                <p className="text-[10px] text-stone-400 font-mono mt-2">
                  CONFIRMATION: {selectedBoardingPass.reservationCode}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    alert('Boarding pass saved to offline wallet.');
                    setSelectedBoardingPass(null);
                  }}
                  className="w-full py-3 bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-[#CDD5AE]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save to Apple / Google Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
