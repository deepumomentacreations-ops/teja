import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  FileText,
  Shirt,
  Smartphone,
  ShieldCheck,
  CreditCard,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ChecklistItem } from '../types/travel';

interface TravelChecklistProps {
  initialItems: ChecklistItem[];
}

export const TravelChecklist: React.FC<TravelChecklistProps> = ({ initialItems }) => {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem['category']>('Clothing');

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: 'custom-' + Date.now(),
      category: newItemCategory,
      title: newItemTitle.trim(),
      completed: false,
      essential: false
    };

    setItems([...items, newItem]);
    setNewItemTitle('');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const categories = ['all', 'Documents', 'Clothing', 'Electronics', 'Health & Safety', 'Money'];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((i) => i.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Documents': return <FileText className="w-4 h-4 text-emerald-700" />;
      case 'Clothing': return <Shirt className="w-4 h-4 text-[#384F40]" />;
      case 'Electronics': return <Smartphone className="w-4 h-4 text-amber-700" />;
      case 'Health & Safety': return <ShieldCheck className="w-4 h-4 text-rose-700" />;
      case 'Money': return <CreditCard className="w-4 h-4 text-emerald-800" />;
      default: return <Sparkles className="w-4 h-4 text-[#384F40]" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[#DED6D1] p-6 sm:p-8 space-y-6">
      
      {/* Header & Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-[#1E2922] font-serif-accent flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[#384F40]" />
            AI Travel Checklist & Packing Assistant
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Auto-generated based on your destination climate, activities, and travel style
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-[#384F40]">{completedCount} of {items.length} packed</span>
            <div className="w-32 bg-stone-100 h-2.5 rounded-full overflow-hidden mt-1 border border-stone-200">
              <div
                className="h-full bg-gradient-to-r from-[#384F40] to-[#A4C3B2] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-extrabold text-[#1E2922]">{progressPercent}%</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#384F40] text-[#FAEDCD] shadow-sm'
                : 'bg-[#FAF8F5] text-[#1E2922] hover:bg-[#E9EDCA]/40 border border-[#DED6D1]'
            }`}
          >
            {cat === 'all' ? 'All Items' : cat}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between select-none ${
              item.completed
                ? 'bg-emerald-50/70 border-emerald-200 text-stone-500'
                : 'bg-[#FAF8F5] border-[#DED6D1] hover:border-[#384F40] text-[#1E2922]'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={`p-1 rounded-lg transition-colors ${
                  item.completed ? 'text-emerald-700' : 'text-stone-400 hover:text-[#384F40]'
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 fill-emerald-700 text-white" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
              <div>
                <span
                  className={`text-xs font-bold leading-snug block ${
                    item.completed ? 'line-through text-stone-400' : 'text-[#1E2922]'
                  }`}
                >
                  {item.title}
                </span>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                  {item.category} {item.essential && '• Essential'}
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(item.id);
              }}
              className="p-1 text-stone-300 hover:text-red-500 rounded-lg transition-colors"
              title="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={addItem} className="pt-2 flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          placeholder="Add custom packing or document item (e.g. Waterproof pouch, scuba ear drops)..."
          className="flex-1 bg-[#FAF8F5] px-4 py-2.5 rounded-xl border border-[#DED6D1] text-xs text-[#1E2922] font-medium focus:outline-none focus:ring-2 focus:ring-[#384F40]"
        />
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as ChecklistItem['category'])}
            className="bg-[#FAF8F5] px-3 py-2.5 rounded-xl border border-[#DED6D1] text-xs font-bold text-[#384F40] focus:outline-none"
          >
            <option value="Clothing">Clothing</option>
            <option value="Documents">Documents</option>
            <option value="Electronics">Electronics</option>
            <option value="Health & Safety">Health & Safety</option>
            <option value="Money">Money</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#384F40] hover:bg-[#283618] text-[#FAEDCD] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#CDD5AE]"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </form>

    </div>
  );
};
