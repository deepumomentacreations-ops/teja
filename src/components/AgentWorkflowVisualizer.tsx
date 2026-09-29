import React, { useEffect, useState } from 'react';
import {
  Compass,
  Plane,
  Building,
  Utensils,
  MapPin,
  Calendar,
  Wallet,
  CloudSun,
  ShieldCheck,
  Languages,
  CheckCircle2,
  Sparkles,
  Radio
} from 'lucide-react';

interface AgentWorkflowVisualizerProps {
  onComplete: () => void;
  destination?: string;
}

interface AgentItem {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  durationMs: number;
}

const AGENTS: AgentItem[] = [
  { id: 'dest', name: 'Destination Agent', role: 'Scanning landmarks & hidden attractions', icon: <MapPin className="w-4 h-4" />, durationMs: 380 },
  { id: 'trans', name: 'Transportation Agent', role: 'Evaluating flight radar & within-destination transit (Auto/Scooty/Cab)', icon: <Plane className="w-4 h-4" />, durationMs: 380 },
  { id: 'hotel', name: 'Accommodation Agent', role: 'Filtering top-rated hostels, pods & boutique stays', icon: <Building className="w-4 h-4" />, durationMs: 380 },
  { id: 'food', name: 'Restaurant Agent', role: 'Curating authentic local dhabas & dietary dining', icon: <Utensils className="w-4 h-4" />, durationMs: 380 },
  { id: 'itin', name: 'Itinerary Agent', role: 'Constructing day-by-day hourly pacing', icon: <Calendar className="w-4 h-4" />, durationMs: 400 },
  { id: 'budget', name: 'Budget Agent', role: 'Calculating total costs & reserve allocations', icon: <Wallet className="w-4 h-4" />, durationMs: 380 },
  { id: 'weather', name: 'Weather & Safety Agent', role: 'Analyzing 7-day climate & safety advisories', icon: <CloudSun className="w-4 h-4" />, durationMs: 350 },
  { id: 'culture', name: 'Culture & Local Agent', role: 'Compiling local phrases & packing guide', icon: <Languages className="w-4 h-4" />, durationMs: 350 },
];

export const AgentWorkflowVisualizer: React.FC<AgentWorkflowVisualizerProps> = ({
  onComplete,
  destination = 'Your Destination'
}) => {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);

  useEffect(() => {
    let timeout: any;
    if (currentAgentIndex < AGENTS.length) {
      const agent = AGENTS[currentAgentIndex];
      timeout = setTimeout(() => {
        setCompletedAgents((prev) => [...prev, agent.id]);
        setCurrentAgentIndex((prev) => prev + 1);
      }, agent.durationMs);
    } else {
      timeout = setTimeout(() => {
        onComplete();
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [currentAgentIndex, onComplete]);

  const progressPercent = Math.min(100, Math.round(((completedAgents.length) / AGENTS.length) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-[#1E2922]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-2xl border-2 border-[#CDD5AE] overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#384F40] via-[#283618] to-[#384F40] p-6 text-white text-center border-b-2 border-[#CDD5AE]">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAEDCD] text-[#283618] text-xs font-black mb-2 border border-[#CDD5AE] shadow-2xs">
            <Radio className="w-3.5 h-3.5 text-[#384F40] animate-pulse" />
            AI Multi-Agent System Active
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#FAEDCD] font-serif-accent">
            Planning Trip to {destination}
          </h2>
          <p className="text-[#E9EDCA] text-xs font-semibold mt-0.5">
            Orchestrating specialized travel agents in parallel
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-black/40 h-2 rounded-full mt-4 overflow-hidden border border-[#CDD5AE]/30">
            <div
              className="bg-gradient-to-r from-[#A4C3B2] via-[#E9EDCA] to-[#FAEDCD] h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Agents Grid List */}
        <div className="p-6 space-y-2.5 max-h-[55vh] overflow-y-auto bg-[#F8F6F0]">
          {AGENTS.map((agent, index) => {
            const isDone = completedAgents.includes(agent.id);
            const isCurrent = currentAgentIndex === index;

            return (
              <div
                key={agent.id}
                className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  isDone
                    ? 'bg-[#E9EDCA]/60 border-[#CDD5AE] shadow-2xs'
                    : isCurrent
                    ? 'bg-[#FAEDCD] border-[#384F40] ring-2 ring-[#A4C3B2] shadow-sm'
                    : 'bg-white/80 border-[#DED6D1] opacity-70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isDone
                        ? 'bg-[#CDD5AE] text-[#283618]'
                        : isCurrent
                        ? 'bg-[#384F40] text-[#FAEDCD] animate-pulse'
                        : 'bg-[#DED6D1] text-[#384F40]'
                    }`}
                  >
                    {agent.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-xs text-[#1E2922]">{agent.name}</h4>
                    <p className="text-[11px] text-[#384F40] font-semibold">{agent.role}</p>
                  </div>
                </div>

                <div>
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-[#283618]" />
                  ) : isCurrent ? (
                    <div className="w-5 h-5 border-2 border-[#384F40] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="text-[10px] font-black text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">Waiting</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
