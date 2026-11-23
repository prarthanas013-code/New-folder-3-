import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Sparkles } from 'lucide-react';

export default function ScheduleTimelineCard() {
  const [currentMonth, setCurrentMonth] = useState('September 2024');

  const days = [
    { name: 'Mon', date: 22 },
    { name: 'Tue', date: 23 },
    { name: 'Wed', date: 24 },
    { name: 'Thu', date: 25 },
    { name: 'Fri', date: 26 },
    { name: 'Sat', date: 27 },
  ];

  const hours = ['8:00 am', '9:00 am', '10:00 am', '11:00 am'];

  return (
    <div className="rounded-[32px] bg-white/85 p-6 border border-[#b2e5bc] shadow-sm space-y-4">
      
      {/* Month Navigation Header (matching "August", "September 2024", "October") */}
      <div className="flex items-center justify-between text-xs font-semibold">
        <button className="text-slate-400 hover:text-slate-800 transition">
          August
        </button>

        <div className="text-sm font-bold text-[#162719]">
          {currentMonth}
        </div>

        <button className="text-slate-400 hover:text-slate-800 transition">
          October
        </button>
      </div>

      {/* Timeline Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[420px]">
          
          {/* Days Row */}
          <div className="grid grid-cols-7 gap-2 text-center pb-2 border-b border-[#cdecd3]">
            <div className="text-[10px] text-slate-400 font-medium" />
            {days.map(d => (
              <div key={d.date} className="flex flex-col items-center">
                <span className="text-[10px] font-medium text-slate-500">{d.name}</span>
                <span className={`text-xs font-bold ${d.date === 24 ? 'text-emerald-700' : 'text-slate-800'}`}>
                  {d.date}
                </span>
              </div>
            ))}
          </div>

          {/* Time Rows with Events */}
          <div className="relative pt-2 space-y-3">
            
            {hours.map((hour, hIdx) => (
              <div key={hour} className="grid grid-cols-7 gap-2 items-center text-[10px] min-h-[36px] relative">
                {/* Hour label */}
                <span className="text-slate-400 font-medium whitespace-nowrap">
                  {hour}
                </span>

                {/* Grid cells with dotted background */}
                <div className="col-span-6 grid grid-cols-6 gap-2 h-full border-t border-dashed border-[#d2edd7] relative">
                  
                  {/* Event 1: "Weekly Team Sync" (Wed 24 - 8:30am) */}
                  {hIdx === 0 && (
                    <div className="absolute top-1 left-[33%] w-[48%] z-10">
                      <div className="rounded-full bg-[#42aa55] text-white px-3 py-1.5 flex items-center justify-between shadow-sm hover:shadow-md transition">
                        <div className="truncate pr-1">
                          <div className="text-[10px] font-bold truncate">Weekly Team Sync</div>
                          <div className="text-[8px] text-emerald-100 truncate">Discuss progress on projects</div>
                        </div>

                        {/* Attendee Avatars */}
                        <div className="flex -space-x-1 shrink-0">
                          <img className="w-4 h-4 rounded-full border border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                          <img className="w-4 h-4 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                          <img className="w-4 h-4 rounded-full border border-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Event 2: "Onboarding Session" (Thu 25 - 10:00am) */}
                  {hIdx === 2 && (
                    <div className="absolute top-1 left-[50%] w-[42%] z-10">
                      <div className="rounded-full bg-white border border-[#9edaa7] text-slate-800 px-3 py-1.5 flex items-center justify-between shadow-sm hover:shadow-md transition">
                        <div className="truncate pr-1">
                          <div className="text-[10px] font-bold text-slate-900 truncate">Onboarding Session</div>
                          <div className="text-[8px] text-slate-500 truncate">Introduction for new hires</div>
                        </div>

                        {/* Attendee Avatars */}
                        <div className="flex -space-x-1 shrink-0">
                          <img className="w-4 h-4 rounded-full border border-[#9edaa7]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                          <img className="w-4 h-4 rounded-full border border-[#9edaa7]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}

          </div>

        </div>
      </div>

    </div>
  );
}
