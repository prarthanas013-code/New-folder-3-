import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ProgressBarCard({ onOpenEngine }) {
  const [activeDayIndex, setActiveDayIndex] = useState(5); // Default active on 'F' / 5h 25m

  // Days with progress heights (matching the screenshot's bar distribution)
  const barData = [
    { label: 'S', height: 25, value: '1h 15m' },
    { label: 'M', height: 75, value: '4h 30m' },
    { label: 'T', height: 60, value: '3h 45m' },
    { label: 'W', height: 45, value: '2h 50m' },
    { label: 'T', height: 70, value: '4h 15m' },
    { label: 'F', height: 95, value: '5h 25m', active: true },
    { label: 'S', height: 35, value: '1h 50m' },
  ];

  return (
    <div className="rounded-[32px] bg-white/85 p-6 border border-[#b2e5bc] shadow-sm flex flex-col justify-between relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-800">Progress</div>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-light text-[#162719]">6.1 h</span>
            <span className="text-[11px] font-medium text-slate-500 leading-tight">
              Work Time <br /> this week
            </span>
          </div>
        </div>

        {/* Arrow button in circle */}
        <button 
          onClick={onOpenEngine}
          className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-[#b2e5bc] flex items-center justify-center text-slate-700 shadow-sm transition"
          title="View detailed CLO analytics"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bar Chart Container */}
      <div className="pt-6 pb-1">
        <div className="h-28 flex items-end justify-between gap-2 px-1 relative">
          
          {barData.map((bar, idx) => {
            const isSelected = activeDayIndex === idx;
            return (
              <div 
                key={bar.label + idx} 
                onClick={() => setActiveDayIndex(idx)}
                className="flex-1 flex flex-col items-center cursor-pointer group relative"
              >
                {/* Floating Tooltip Pill (matching "5h 25m" in screenshot) */}
                {isSelected && (
                  <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-[#42aa55] text-white text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce-short z-10">
                    {bar.value}
                  </div>
                )}

                {/* Vertical Bar */}
                <div className="w-full max-w-[12px] h-24 flex items-end justify-center">
                  <div 
                    className={`w-full rounded-full transition-all duration-300 ${
                      isSelected 
                        ? 'bg-[#42aa55] shadow-sm' 
                        : 'bg-[#181a18] group-hover:bg-[#344037]'
                    }`}
                    style={{ height: `${bar.height}%` }}
                  />
                </div>

                {/* Day Label */}
                <span className={`text-[10px] font-semibold mt-2 ${
                  isSelected ? 'text-[#181a18]' : 'text-slate-400 group-hover:text-slate-700'
                }`}>
                  {bar.label}
                </span>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}
