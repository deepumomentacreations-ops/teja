import React, { useState } from 'react';
import {
  BarChart3,
  Server,
  Activity,
  Zap,
  CheckCircle2,
  Users,
  Compass,
  Plane,
  Building,
  Utensils,
  Database,
  Radio,
  RefreshCw,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/destinationsData';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'agents' | 'destinations' | 'api-health'>('analytics');
  const [isSyncing, setIsSyncing] = useState(false);

  const mockAnalytics = {
    totalTripsGenerated: 14820,
    totalBudgetSaved: '₹1.84 Crore',
    activeUsersOnline: 412,
    avgPlanningTimeSeconds: 3.2,
    topDestinations: [
      { name: 'Goa', searches: 4210, percentage: 34 },
      { name: 'Kashmir', searches: 3100, percentage: 25 },
      { name: 'Kerala', searches: 2450, percentage: 20 },
      { name: 'Dubai', searches: 1680, percentage: 14 },
      { name: 'Paris', searches: 890, percentage: 7 }
    ]
  };

  const agentTelemetry = [
    { name: 'Master Travel Orchestrator', status: 'Healthy', load: '14%', latencyMs: 180, uptime: '99.98%' },
    { name: 'Transportation Agent (Flight Radar)', status: 'Healthy', load: '28%', latencyMs: 210, uptime: '99.95%' },
    { name: 'Accommodation Agent', status: 'Healthy', load: '19%', latencyMs: 140, uptime: '99.99%' },
    { name: 'Restaurant & Dining Agent', status: 'Healthy', load: '11%', latencyMs: 120, uptime: '100%' },
    { name: 'Itinerary Pacing Agent', status: 'Healthy', load: '32%', latencyMs: 240, uptime: '99.92%' },
    { name: 'Budget Optimization Agent', status: 'Healthy', load: '22%', latencyMs: 190, uptime: '99.96%' },
    { name: 'Weather & Climate Agent', status: 'Healthy', load: '8%', latencyMs: 90, uptime: '100%' },
    { name: 'Emergency SOS & Safety Agent', status: 'Healthy', load: '4%', latencyMs: 45, uptime: '100%' }
  ];

  const triggerMockSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Global destination metadata and flight radar APIs refreshed successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E2922] via-[#384F40] to-[#1E2922] p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4 border border-[#CDD5AE]/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CDD5AE]/20 border border-[#CDD5AE]/40 text-[#FAEDCD] text-xs font-semibold mb-2">
            <Server className="w-3.5 h-3.5 text-[#E9EDCA]" />
            TravelMate Core Platform Console
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif-accent">
            AI Agent Telemetry & Administration
          </h2>
          <p className="text-[#DED6D1] text-xs sm:text-sm mt-1">
            Monitor real-time agent execution latency, destination databases, and API health
          </p>
        </div>

        <button
          onClick={triggerMockSync}
          disabled={isSyncing}
          className="px-4 py-2.5 rounded-xl bg-[#FAEDCD] text-[#1E2922] font-bold text-xs flex items-center gap-2 hover:bg-[#E9EDCA] transition-colors cursor-pointer border border-[#CDD5AE]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          Refresh Systems
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-[#DED6D1] overflow-x-auto">
        {[
          { id: 'analytics', label: 'Platform Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'agents', label: 'AI Agent Telemetry', icon: <Radio className="w-4 h-4" /> },
          { id: 'destinations', label: 'Destinations Manager', icon: <Compass className="w-4 h-4" /> },
          { id: 'api-health', label: 'API Connectors & Mock Status', icon: <Database className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                : 'text-stone-700 hover:bg-[#FAF8F5]'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-[#DED6D1] shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-stone-400 uppercase">Trips Generated</span>
              <p className="text-2xl font-black text-[#1E2922]">{mockAnalytics.totalTripsGenerated.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-700 font-semibold">↑ +18% this week</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#DED6D1] shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-stone-400 uppercase">User Budget Saved</span>
              <p className="text-2xl font-black text-[#384F40]">{mockAnalytics.totalBudgetSaved}</p>
              <span className="text-[10px] text-emerald-700 font-semibold">Via 1-Click Optimizer</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#DED6D1] shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-stone-400 uppercase">Live Users Online</span>
              <p className="text-2xl font-black text-[#1E2922] flex items-center gap-2">
                {mockAnalytics.activeUsersOnline}
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </p>
              <span className="text-[10px] text-stone-400">Concurrent sessions</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#DED6D1] shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-stone-400 uppercase">Avg Agent Latency</span>
              <p className="text-2xl font-black text-emerald-700">{mockAnalytics.avgPlanningTimeSeconds}s</p>
              <span className="text-[10px] text-stone-400">Multi-agent orchestrator</span>
            </div>
          </div>

          {/* Popular Destinations Progress */}
          <div className="bg-white p-6 rounded-3xl border border-[#DED6D1] shadow-xl space-y-4">
            <h3 className="font-bold text-base text-[#1E2922] font-serif-accent">
              Most Planned Destinations (Real-Time Search Volume)
            </h3>
            <div className="space-y-3">
              {mockAnalytics.topDestinations.map((d) => (
                <div key={d.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-[#1E2922]">
                    <span>{d.name}</span>
                    <span>{d.searches.toLocaleString()} trips ({d.percentage}%)</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#384F40] to-[#A4C3B2] h-full rounded-full"
                      style={{ width: `${d.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Agents */}
      {activeTab === 'agents' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DED6D1] shadow-xl space-y-4">
          <h3 className="font-bold text-base text-[#1E2922] font-serif-accent">
            AI Agent Sub-System Status
          </h3>
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#384F40] text-[#FAEDCD]">
                <tr>
                  <th className="p-3.5">Agent Module</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Compute Load</th>
                  <th className="p-3.5">Avg Response</th>
                  <th className="p-3.5">Uptime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {agentTelemetry.map((ag) => (
                  <tr key={ag.name} className="hover:bg-[#FAF8F5]">
                    <td className="p-3.5 font-bold text-[#1E2922]">{ag.name}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        ● {ag.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-stone-600 font-mono">{ag.load}</td>
                    <td className="p-3.5 text-stone-600 font-mono">{ag.latencyMs} ms</td>
                    <td className="p-3.5 font-bold text-emerald-700">{ag.uptime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Destinations */}
      {activeTab === 'destinations' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DED6D1] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1E2922] font-serif-accent">
              Managed Destinations Repository ({POPULAR_DESTINATIONS.length} Active Hubs)
            </h3>
            <button
              onClick={() => alert('New destination creation dialog opened.')}
              className="px-3 py-1.5 bg-[#384F40] text-[#FAEDCD] text-xs font-bold rounded-xl border border-[#CDD5AE]"
            >
              + Add Hub
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {POPULAR_DESTINATIONS.map((d) => (
              <div key={d.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#DED6D1] space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-[#1E2922]">{d.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#384F40] text-[#FAEDCD] font-bold">
                    {d.region}
                  </span>
                </div>
                <p className="text-xs text-stone-500 line-clamp-1">{d.subtitle}</p>
                <div className="flex justify-between text-[11px] text-stone-600 pt-2 border-t border-stone-200">
                  <span>Rating: ★ {d.rating}</span>
                  <span className="font-bold text-[#384F40]">Avg ₹{d.avgCostPerDay}/day</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: API Health */}
      {activeTab === 'api-health' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DED6D1] shadow-xl space-y-4">
          <h3 className="font-bold text-base text-[#1E2922] font-serif-accent">
            External API Connectors & High-Fidelity Simulator
          </h3>
          <p className="text-xs text-stone-500">
            Algorithmic simulation layer and real-time proxy endpoints for live aviation tracking and interactive mapping.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Multi-Agent Trip Engine', type: 'AI Intelligence', status: 'Connected / Standby', color: 'text-emerald-700' },
              { name: 'Aviation Flight Radar Telemetry', type: 'Flight Tracking', status: 'Live Simulated Feed', color: 'text-emerald-700' },
              { name: 'Vector Cartography Layer', type: 'GPS Maps', status: 'Active Vector Engine', color: 'text-emerald-700' },
              { name: 'Weather & Climate Analytics', type: 'Meteorology', status: 'Connected', color: 'text-emerald-700' },
              { name: 'Hotel GDS Booking Pipeline', type: 'Accommodation', status: 'Phase 2 Hook Ready', color: 'text-amber-700' },
              { name: 'Emergency SOS Database', type: 'Public Safety', status: 'Verified Official Hotlines', color: 'text-emerald-700' },
            ].map((api, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#DED6D1] flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-[#1E2922]">{api.name}</h4>
                  <span className="text-[10px] text-stone-400">{api.type}</span>
                </div>
                <span className={`text-xs font-bold ${api.color}`}>
                  {api.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
