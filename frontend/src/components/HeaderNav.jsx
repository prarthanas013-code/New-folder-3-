import React from 'react';
import { Settings, Bell, User, Check, Sparkles } from 'lucide-react';

export default function HeaderNav({ activeTab, setActiveTab, currentRole, setCurrentRole, onOpenEngine }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'courses', label: 'Courses' },
    { id: 'clos', label: 'CLO Analysis' },
    { id: 'blooms', label: 'Bloom Matrix' },
    { id: 'assessments', label: 'Assessments' },
    { id: 'materials', label: 'Materials' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-2">
      
      {/* Brand Button (Crextio pill style) */}
      <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-start">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="px-6 py-2 rounded-full border border-[#83ca91] bg-white/70 hover:bg-white text-slate-800 font-bold text-lg tracking-tight shadow-sm transition flex items-center space-x-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>CourseConnect</span>
        </button>

        {/* Role Switcher Pill (Quick preview of Admin, Faculty, Student) */}
        <div className="flex items-center p-1 bg-white/60 border border-[#9edaa7] rounded-full text-xs font-semibold">
          {['faculty', 'student', 'admin'].map(role => (
            <button
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`px-3 py-1 rounded-full capitalize transition ${
                currentRole === role
                  ? 'bg-[#181a18] text-white shadow-sm'
                  : 'text-slate-700 hover:text-black'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Center & Right Navigation (matching pill bar in uploaded image) */}
      <div className="flex items-center flex-wrap gap-2 sm:gap-3 bg-white/40 p-1.5 rounded-full border border-[#9edaa7]/60">
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'clos') onOpenEngine();
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[#181a18] text-white shadow-md'
                    : 'text-slate-800 hover:text-black hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Tools: Setting, Bell, Avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#9edaa7]">
          <button 
            onClick={onOpenEngine}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#9edaa7] text-xs font-semibold text-slate-800 transition"
            title="Outcome Analysis Engine"
          >
            <Settings className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline">Engine</span>
          </button>

          <button 
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-[#9edaa7] flex items-center justify-center text-slate-700 relative transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600" />
          </button>

          <button 
            className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold border border-white shadow-sm"
            title={`Logged in as ${currentRole}`}
          >
            <User className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
