import React from 'react';
import { Users, GraduationCap, Layers } from 'lucide-react';

export default function TopHeroStats({ currentRole, onOpenEngine }) {
  const roleGreeting = {
    faculty: { name: 'Dr. Elena Vance', title: 'OBE Lead & Course Coordinator' },
    student: { name: 'Alex Rivera', title: 'Computer Science & Engineering' },
    admin: { name: 'Dean Sterling', title: 'Academic Administration' },
  }[currentRole] || { name: 'Faculty Member', title: 'CourseConnect OBE Portal' };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pt-2 pb-2">
      
      {/* Left: "Welcome in," + Multi-segment progress strip */}
      <div className="lg:col-span-8 space-y-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-[#162719]">
            Welcome in,
          </h1>
          <p className="text-sm font-semibold text-[#25462a] mt-0.5">
            {roleGreeting.name} <span className="text-xs text-[#3c6b43] font-normal">• {roleGreeting.title}</span>
          </p>
        </div>

        {/* Multi-segment Segmented Bar (matching exact style in screenshot) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          <div className="flex-1 flex items-center gap-2">
            
            {/* Segment 1: Interviews / Assessments (15% dark pill) */}
            <div className="flex-1 max-w-[110px] bg-[#181a18] text-white rounded-full py-1.5 px-3 text-center shadow-sm">
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium truncate">Assessments</div>
              <div className="text-xs font-bold">15%</div>
            </div>

            {/* Segment 2: Hired / Attained (15% green pill) */}
            <div className="flex-1 max-w-[110px] bg-[#42aa55] text-white rounded-full py-1.5 px-3 text-center shadow-sm">
              <div className="text-[10px] text-emerald-100 uppercase tracking-wider font-medium truncate">Attained</div>
              <div className="text-xs font-bold">15%</div>
            </div>

            {/* Segment 3: Project time / CLO Progress (60% striped green bar) */}
            <div className="flex-[3] min-w-[180px] bg-striped-green text-white rounded-full py-1.5 px-4 flex items-center justify-between shadow-sm">
              <span className="text-[11px] font-medium text-emerald-100">CLO Mastery Time</span>
              <span className="text-xs font-bold">60%</span>
            </div>

            {/* Segment 4: Output / Gap (10% bordered light pill) */}
            <div className="flex-1 max-w-[100px] border border-[#83ca91] bg-white/70 text-slate-800 rounded-full py-1.5 px-3 text-center">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium truncate">Gap</div>
              <div className="text-xs font-bold">10%</div>
            </div>

          </div>

          <button 
            onClick={onOpenEngine}
            className="sm:self-center text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#9edaa7] text-slate-800 shadow-sm transition whitespace-nowrap"
          >
            Attainment Engine →
          </button>
        </div>

      </div>

      {/* Right: The 3 large numbers (78 Employe, 56 Hirings, 203 Projects) */}
      <div className="lg:col-span-4 flex items-center justify-between sm:justify-end gap-6 sm:gap-10 pb-1">
        
        {/* Stat 1: 78 Students */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-white/80 border border-[#9edaa7] flex items-center justify-center text-slate-700">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-light text-[#162719]">78</div>
            <div className="text-[11px] font-medium text-[#2d5232]">Students</div>
          </div>
        </div>

        {/* Stat 2: 56 Assessments */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-white/80 border border-[#9edaa7] flex items-center justify-center text-slate-700">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-light text-[#162719]">56</div>
            <div className="text-[11px] font-medium text-[#2d5232]">Assessments</div>
          </div>
        </div>

        {/* Stat 3: 203 CLO Objectives */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-white/80 border border-[#9edaa7] flex items-center justify-center text-slate-700">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-light text-[#162719]">203</div>
            <div className="text-[11px] font-medium text-[#2d5232]">CLO Maps</div>
          </div>
        </div>

      </div>

    </div>
  );
}
