import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Compass,
  Zap,
  Radio
} from 'lucide-react';
import { TripPlan, ChatMessage, CurrencyCode } from '../types/travel';

interface AIChatAssistantProps {
  tripPlan?: TripPlan | null;
  tripContext?: TripPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onTriggerOptimizeBudget?: () => void;
  onSelectTab?: (tab: string) => void;
  currency?: CurrencyCode;
  onUpdateTripPlan?: (updated: TripPlan) => void;
}

const QUICK_SUGGESTIONS = [
  '💡 How can I make this trip cheaper?',
  '🥗 Find top vegetarian & Jain food spots',
  '🌊 Best beaches & sunset viewpoints',
  '🛺 What local transport (Auto/Scooty) is near the airport?',
  '🌤 Weather advice & packing tips'
];

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  tripPlan,
  tripContext,
  isOpen,
  onClose,
  onTriggerOptimizeBudget,
  onSelectTab,
  currency = 'INR'
}) => {
  const activeTrip = tripPlan || tripContext;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: activeTrip
        ? `👋 Hello! I am your **TravelMate AI Guide**.\n\nI have loaded your active trip to **${activeTrip.destination}** (${activeTrip.durationDays} Days, ${activeTrip.travellers.adults} Travellers, Budget: ${activeTrip.budget.currency} ${activeTrip.budget.userBudget.toLocaleString()}).\n\nAsk me anything: how to find local Auto/Scooty rentals, swap itinerary stops, discover authentic street food, or reduce trip costs!`
        : `👋 Hello! I am **TravelMate AI**, your personal multi-agent travel guide.\n\nTell me where you want to travel, your budget, or any travel style, and I will assist you!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          tripContext: activeTrip,
          chatHistory: messages.slice(-6).map((m) => ({ role: m.sender, content: m.text }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: data.reply || "I'm analyzing your destination options!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Intelligent fallback
      const q = query.toLowerCase();
      let fallbackReply = '';
      if (q.includes('cheap') || q.includes('budget') || q.includes('save')) {
        fallbackReply = `💡 **Budget Optimization Tips for ${activeTrip?.destination || 'your trip'}:**\n• Rent a self-drive Scooty (₹400/day) instead of full-day private cabs to save up to 60% on local transit.\n• Stay at boutique social hostels like Zostel / The Hosteller (dorm beds from ₹650/night).\n• Dine at authentic local dhabas and beach shacks for fresh regional meals under ₹350.`;
      } else if (q.includes('scooty') || q.includes('auto') || q.includes('transport') || q.includes('bike')) {
        fallbackReply = `🛺 **Local Transit Guide in ${activeTrip?.destination || 'Destination'}:**\n• **Auto-Rickshaws**: Readily available 24/7. Ask for meter or pre-agree on fare (approx ₹15-20/km). UPI QR accepted.\n• **Scooty Rentals**: Available at ₹350–₹500/day near main train stations and beach hubs. Helmet mandatory!\n• **App Cabs**: Ola, Uber, and Rapido Bike Taxis work reliably for fixed-price transfers.`;
      } else if (q.includes('food') || q.includes('veg') || q.includes('eat')) {
        fallbackReply = `🍲 **Culinary Guide for ${activeTrip?.destination || 'Destination'}:**\n• Try regional signature dishes like fresh seafood thalis, butter garlic crab, or pure vegetarian Gujarati/Rajasthani thalis.\n• Check our verified restaurant directory tab for top rated authentic eateries and street food hubs.`;
      } else {
        fallbackReply = `✨ Based on your trip to **${activeTrip?.destination || 'your dream spot'}**, I recommend exploring early mornings for crowd-free sightseeing and using local scooters or metro lines for fast transit!`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-[#DED6D1] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#384F40] to-[#283618] p-4 text-white flex items-center justify-between border-b border-[#CDD5AE]/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FAEDCD] text-[#283618] flex items-center justify-center font-bold">
            <Bot className="w-4 h-4 text-[#384F40]" />
          </div>
          <div>
            <h3 className="font-bold text-xs font-serif-accent text-[#FAEDCD]">TravelMate AI Concierge</h3>
            <p className="text-[10px] text-stone-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online • Context Aware
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
          title="Close Chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Context Banner */}
      {activeTrip && (
        <div className="bg-[#FAF8F5] px-4 py-2 border-b border-[#DED6D1] flex items-center justify-between text-[11px] text-stone-700">
          <span className="font-semibold flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#384F40]" />
            {activeTrip.destination} ({activeTrip.durationDays}D)
          </span>
          {onTriggerOptimizeBudget && (
            <button
              onClick={onTriggerOptimizeBudget}
              className="text-[#384F40] font-bold hover:underline flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-[#384F40]" />
              Optimize Budget
            </button>
          )}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF8F5]/50">
        {messages.map((msg) => {
          const isBot = msg.sender !== 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-6 h-6 rounded-lg bg-[#384F40] text-[#FAEDCD] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[84%] p-3 rounded-2xl text-xs leading-relaxed ${
                  isBot
                    ? 'bg-white text-stone-800 shadow-xs border border-[#DED6D1] rounded-tl-none whitespace-pre-line'
                    : 'bg-[#384F40] text-[#FAEDCD] font-medium rounded-tr-none'
                }`}
              >
                {msg.text}
                <div
                  className={`text-[9px] mt-1 ${
                    isBot ? 'text-stone-400 text-right' : 'text-stone-300 text-right'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2 items-center text-xs text-stone-500 bg-white p-2.5 rounded-xl border border-[#DED6D1] max-w-[65%]">
            <div className="w-3.5 h-3.5 border-2 border-[#384F40] border-t-transparent rounded-full animate-spin" />
            <span>Agent thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-2 bg-white border-t border-[#DED6D1] overflow-x-auto flex items-center gap-1 shrink-0">
        {QUICK_SUGGESTIONS.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(suggestion.replace(/^[^\w]+/, ''))}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#FAEDCD]/40 text-stone-700 text-[10px] font-semibold whitespace-nowrap transition-colors border border-[#DED6D1]"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2.5 bg-white border-t border-[#DED6D1] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask TravelMate about stays, food, scooty, fares..."
          disabled={isLoading}
          className="flex-1 bg-[#FAF8F5] px-3 py-2 rounded-xl border border-[#DED6D1] text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#384F40]"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="p-2 rounded-xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] disabled:opacity-50 transition-colors cursor-pointer border border-[#CDD5AE]"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
