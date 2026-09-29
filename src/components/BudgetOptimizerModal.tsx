import React from 'react';
import {
  Zap,
  TrendingDown,
  CheckCircle2,
  Building,
  Plane,
  Utensils,
  Camera,
  Car,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TripPlan, CurrencyCode } from '../types/travel';
import { CURRENCY_RATES } from '../data/destinationsData';

interface BudgetOptimizerModalProps {
  tripPlan: TripPlan;
  isOpen: boolean;
  onClose: () => void;
  onApplyOptimization: () => void;
  currency: CurrencyCode;
}

export const BudgetOptimizerModal: React.FC<BudgetOptimizerModalProps> = ({
  tripPlan,
  isOpen,
  onClose,
  onApplyOptimization,
  currency
}) => {
  if (!isOpen) return null;

  const rateSymbol = CURRENCY_RATES[currency]?.symbol || '₹';
  const currentRate = CURRENCY_RATES[currency]?.rateToINR || 1;

  const originalTotal = tripPlan.budget.totalEstimated;
  const optimizedTotal = Math.round(originalTotal * 0.78);
  const totalSaved = originalTotal - optimizedTotal;

  const savingsItems = [
    {
      category: 'Accommodation',
      icon: <Building className="w-4 h-4 text-[#384F40]" />,
      original: tripPlan.budget.accommodation,
      optimized: Math.round(tripPlan.budget.accommodation * 0.75),
      note: 'Selected top-rated boutique stay (4.8★) with complimentary hot breakfast and early-bird tariff.'
    },
    {
      category: 'Transportation',
      icon: <Plane className="w-4 h-4 text-[#384F40]" />,
      original: tripPlan.budget.transportation,
      optimized: Math.round(tripPlan.budget.transportation * 0.85),
      note: 'Locked non-peak departure window with bundled round-trip discount.'
    },
    {
      category: 'Dining & Food',
      icon: <Utensils className="w-4 h-4 text-[#384F40]" />,
      original: tripPlan.budget.food,
      optimized: Math.round(tripPlan.budget.food * 0.82),
      note: 'Balanced fine dining sunset meals with legendary authentic local food spots and cafes.'
    },
    {
      category: 'Activities & Sightseeing',
      icon: <Camera className="w-4 h-4 text-[#384F40]" />,
      original: tripPlan.budget.activities,
      optimized: Math.round(tripPlan.budget.activities * 0.78),
      note: 'Bundled all-in-one island water sports pass + prioritized zero-entry fee scenic viewpoints.'
    },
    {
      category: 'Local Mobility',
      icon: <Car className="w-4 h-4 text-[#384F40]" />,
      original: tripPlan.budget.localTransport,
      optimized: Math.round(tripPlan.budget.localTransport * 0.80),
      note: 'Recommended self-drive scooter / 3-day tourist pass over multiple on-demand taxis.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#1E2922]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-[#DED6D1] overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#384F40] to-[#283618] p-6 text-white flex items-center justify-between border-b border-[#CDD5AE]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAEDCD] text-[#283618] flex items-center justify-center font-bold shadow-xs">
              <Zap className="w-6 h-6 text-[#384F40]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#FAEDCD] font-serif-accent">
                AI Budget Optimizer Analysis
              </h3>
              <p className="text-xs text-stone-200">
                Smart cost-cutting strategies without reducing trip quality or comfort
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Savings Metric Card */}
          <div className="bg-gradient-to-r from-[#FAEDCD]/50 to-[#E9EDCA]/50 p-5 rounded-2xl border border-[#CDD5AE] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#283618]">
                Total Estimated Savings
              </span>
              <div className="text-3xl font-extrabold text-[#384F40] font-mono mt-0.5">
                {rateSymbol}{Math.round(totalSaved / currentRate).toLocaleString()}
                <span className="text-sm text-stone-500 font-sans font-normal ml-2">(-22% trip cost)</span>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-stone-500">New Optimized Total:</span>
              <p className="text-lg font-bold text-emerald-800">
                {rateSymbol}{Math.round(optimizedTotal / currentRate).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">
              Itemized Cost Adjustments
            </h4>
            
            <div className="space-y-2.5">
              {savingsItems.map((item) => (
                <div
                  key={item.category}
                  className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#DED6D1] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="font-bold text-xs text-stone-900">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="line-through text-stone-400">
                        {rateSymbol}{Math.round(item.original / currentRate).toLocaleString()}
                      </span>
                      <ArrowRight className="w-3 h-3 text-stone-400" />
                      <span className="font-bold text-[#384F40]">
                        {rateSymbol}{Math.round(item.optimized / currentRate).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#DED6D1] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold border border-[#DED6D1] transition-colors"
          >
            Keep Original Plan
          </button>
          <button
            onClick={() => {
              onApplyOptimization();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] text-xs font-bold flex items-center gap-2 shadow-xs transition-all border border-[#CDD5AE]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#A4C3B2]" />
            Apply AI Optimizations
          </button>
        </div>

      </div>
    </div>
  );
};
