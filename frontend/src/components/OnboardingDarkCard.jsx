import React, { useState } from 'react';
import { 
  Check, 
  Monitor, 
  Zap, 
  FileText, 
  Radio, 
  Link as LinkIcon 
} from 'lucide-react';

export default function OnboardingDarkCard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Interview',
      subtitle: 'Sep 12, 09:30',
      icon: Monitor,
      completed: true,
    },
    {
      id: 2,
      title: 'Team Meeting',
      subtitle: 'Sep 12, 10:30',
      icon: Zap,
      completed: true,
    },
    {
      id: 3,
      title: 'Project Update',
      subtitle: 'Sep 13, 14:45',
      icon: FileText,
      completed: false,
    },
    {
      id: 4,
      title: 'Discuss Q3 Goals',
      subtitle: 'Sep 13, 16:45',
      icon: Radio,
      completed: false,
    },
    {
      id: 5,
      title: 'HR Policy Review',
      subtitle: 'Sep 13, 19:30',
      icon: LinkIcon,
      completed: false,
    },
  ]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-4">
      
      {/* Top Card Section: "Onboarding 18%" with 3-segment progress bar */}
      <div className="flex items-center justify-between pb-1 px-1">
        <div>
          <span className="text-sm font-semibold text-slate-800">Onboarding</span>
          <div className="text-[10px] text-slate-500 font-medium">30% Task</div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-light text-[#162719]">18%</span>
        </div>
      </div>

      {/* 3-Segment Progress Bar (Green, Dark, Grey matching screenshot) */}
      <div className="flex items-center gap-1.5 px-1">
        <div className="flex-[3] h-6 rounded-full bg-[#42aa55] flex items-center px-3 text-[10px] font-bold text-white shadow-sm">
          Task
        </div>
        <div className="flex-[2] h-6 rounded-full bg-[#181a18] shadow-sm" />
        <div className="flex-[1] h-6 rounded-full bg-slate-400/50" />
      </div>

      {/* Floating Dark Card with Stacked Layer Visual behind it */}
      <div className="relative pt-2">
        
        {/* Layer 1 behind (subtle white edge) */}
        <div className="absolute top-0 left-4 right-4 h-6 bg-white/40 rounded-t-[28px] border border-white/50" />
        
        {/* Main Dark Card Container */}
        <div className="relative z-10 rounded-[32px] bg-[#181a18] text-white p-6 shadow-2xl border border-white/10 space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-sm font-semibold text-white">Onboarding Task</h4>
            <span className="text-xl font-light tracking-tight text-white/90">
              {completedCount}/8
            </span>
          </div>

          {/* Task Items */}
          <div className="space-y-4">
            {tasks.map(task => {
              const IconComp = task.icon;
              return (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    {/* Circle Icon Badge */}
                    <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white transition">
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div>
                      <div className={`text-xs font-semibold ${task.completed ? 'text-white' : 'text-white/80'}`}>
                        {task.title}
                      </div>
                      <div className="text-[10px] text-white/40">
                        {task.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div>
                    {task.completed ? (
                      <div className="w-5 h-5 rounded-full bg-[#42aa55] flex items-center justify-center text-white shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/30 group-hover:border-white/60 transition" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
